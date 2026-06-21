import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MarioGame.css";

const TILE = 32;
const GRAVITY = 0.65;
const JUMP_VELOCITY = -12.5;
const BOUNCE_VELOCITY = -7;
const MOVE_SPEED = 2.6;
const MAX_FALL = 14;
const LEVEL_WIDTH = TILE * 64;
const FLAG_X = LEVEL_WIDTH - 70;
const MARIO_W = 26;
const MARIO_H = 30;
const GOOMBA_W = 28;
const GOOMBA_H = 26;
const COIN_SIZE = 20;
const SQUISH_FRAMES = 14;

const ASSET_BASE = "/mario/";
const SPRITES = {
  marioIdle: ASSET_BASE + "mario-idle.png",
  marioRun1: ASSET_BASE + "mario-run1.png",
  marioRun2: ASSET_BASE + "mario-run2.png",
  marioRun3: ASSET_BASE + "mario-run3.png",
  marioJump: ASSET_BASE + "mario-jump.png",
  goomba1: ASSET_BASE + "goomba-1.png",
  goomba2: ASSET_BASE + "goomba-2.png",
  brick: ASSET_BASE + "tile-brick.png",
  coin: ASSET_BASE + "coin.png",
};

const KEY_MAP = {
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
  ArrowUp: "jump",
  w: "jump",
  W: "jump",
  " ": "jump",
  Spacebar: "jump",
};

function createLevel(groundY) {
  const platformDefs = [
    { x: 380, w: 3, hOff: 56 },
    { x: 760, w: 3, hOff: 80 },
    { x: 1180, w: 4, hOff: 56 },
    { x: 1560, w: 3, hOff: 68 },
  ];

  const platforms = [
    { x: 0, y: groundY, w: LEVEL_WIDTH, h: TILE },
    ...platformDefs.map((p) => ({
      x: p.x,
      y: groundY - p.hOff,
      w: p.w * TILE,
      h: TILE,
    })),
  ];

  const goombaDefs = [
    [260, 200, 360],
    [900, 820, 1020],
    [1320, 1240, 1440],
    [1750, 1680, 1860],
  ];
  const goombas = goombaDefs.map(([x, minX, maxX]) => ({
    x,
    minX,
    maxX,
    y: groundY - GOOMBA_H,
    vx: 1.1,
    alive: true,
    squish: 0,
    animTimer: 0,
    animFrame: 0,
  }));

  const coinDefs = [
    [150, 50],
    [630, 50],
    [1080, 50],
    [1480, 50],
    [1850, 50],
    [1900, 50],
    [470, 56 + 22],
    [505, 56 + 22],
    [540, 56 + 22],
    [850, 80 + 22],
    [885, 80 + 22],
    [1260, 56 + 22],
    [1295, 56 + 22],
    [1330, 56 + 22],
    [1640, 68 + 22],
    [1675, 68 + 22],
  ];
  const coins = coinDefs.map(([x, hOff]) => ({
    x,
    y: groundY - hOff,
    collected: false,
  }));

  return { platforms, goombas, coins };
}

function createMario(groundY) {
  return {
    x: 40,
    y: groundY - MARIO_H,
    vx: 0,
    vy: 0,
    facing: 1,
    onGround: true,
    animTimer: 0,
    animFrame: 0,
    state: "idle",
  };
}

function drawCloud(ctx, x, y) {
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.ellipse(x, y, 18, 10, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 14, y - 4, 14, 10, 0, 0, Math.PI * 2);
  ctx.ellipse(x - 14, y + 2, 12, 8, 0, 0, Math.PI * 2);
  ctx.fill();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const CLOUD_SPOTS = [
  [60, 24],
  [260, 16],
  [520, 30],
  [820, 20],
  [1150, 28],
  [1500, 18],
  [1820, 26],
];

const MarioGame = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef({
    left: false,
    right: false,
    jumpHeld: false,
    jumpQueued: false,
  });
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [gameStatus, setGameStatus] = useState("playing");
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const images = {};
    let loadedCount = 0;
    const total = Object.keys(SPRITES).length;
    let imagesReady = false;
    Object.entries(SPRITES).forEach(([key, src]) => {
      const img = new Image();
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === total) imagesReady = true;
      };
      img.src = src;
      images[key] = img;
    });

    let width = container.clientWidth;
    let height = container.clientHeight;
    let groundY = height - TILE;
    let { platforms, goombas, coins } = createLevel(groundY);
    let mario = createMario(groundY);
    let camera = 0;
    let scoreVal = 0;
    let hintDismissed = false;
    let status = "playing";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;

      const newGroundY = height - TILE;
      const dy = newGroundY - groundY;
      if (dy !== 0) {
        mario.y += dy;
        platforms.forEach((p) => {
          p.y += dy;
        });
        goombas.forEach((g) => {
          g.y += dy;
        });
        coins.forEach((c) => {
          c.y += dy;
        });
        groundY = newGroundY;
      }
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 },
    );
    io.observe(container);

    const input = inputRef.current;

    function update(dt) {
      const jumpPressed = input.jumpQueued;
      input.jumpQueued = false;

      if (input.left && !input.right) {
        mario.vx = -MOVE_SPEED;
        mario.facing = -1;
      } else if (input.right && !input.left) {
        mario.vx = MOVE_SPEED;
        mario.facing = 1;
      } else {
        mario.vx = 0;
      }

      if (jumpPressed && mario.onGround) {
        mario.vy = JUMP_VELOCITY;
        mario.onGround = false;
      }

      mario.vy = Math.min(mario.vy + GRAVITY * dt, MAX_FALL);

      mario.x += mario.vx * dt;
      mario.x = Math.max(0, Math.min(mario.x, LEVEL_WIDTH - MARIO_W));

      const prevBottom = mario.y + MARIO_H;
      mario.y += mario.vy * dt;
      mario.onGround = false;
      if (mario.vy >= 0) {
        for (const p of platforms) {
          const newBottom = mario.y + MARIO_H;
          const horizOverlap =
            mario.x + MARIO_W > p.x && mario.x < p.x + p.w;
          if (horizOverlap && prevBottom <= p.y + 0.5 && newBottom >= p.y) {
            mario.y = p.y - MARIO_H;
            mario.vy = 0;
            mario.onGround = true;
            break;
          }
        }
      }
      if (mario.y < 0) {
        mario.y = 0;
        mario.vy = 0;
      }

      // Safety net: the ground platform spans the full level, so Mario's
      // top should never end up below it. If a resize/visibility glitch
      // ever lets him slip through, snap him back onto solid ground
      // instead of letting him fall forever and vanish off-screen.
      if (mario.y > groundY) {
        mario.y = groundY - MARIO_H;
        mario.vy = 0;
        mario.onGround = true;
      }

      if (!mario.onGround) {
        mario.state = "jump";
      } else if (mario.vx !== 0) {
        mario.state = "run";
        mario.animTimer += dt;
        if (mario.animTimer > 6) {
          mario.animTimer = 0;
          mario.animFrame = (mario.animFrame + 1) % 3;
        }
      } else {
        mario.state = "idle";
        mario.animFrame = 0;
      }

      const targetCam = mario.x - width * 0.4;
      camera = Math.max(0, Math.min(targetCam, Math.max(0, LEVEL_WIDTH - width)));

      for (const g of goombas) {
        if (!g.alive) {
          g.squish -= dt;
          continue;
        }
        g.x += g.vx * dt;
        if (g.x < g.minX || g.x + GOOMBA_W > g.maxX) {
          g.vx *= -1;
          g.x = Math.max(g.minX, Math.min(g.x, g.maxX - GOOMBA_W));
        }
        g.animTimer += dt;
        if (g.animTimer > 10) {
          g.animTimer = 0;
          g.animFrame = (g.animFrame + 1) % 2;
        }

        const overlapX = mario.x < g.x + GOOMBA_W && mario.x + MARIO_W > g.x;
        const overlapY = mario.y < g.y + GOOMBA_H && mario.y + MARIO_H > g.y;
        if (overlapX && overlapY) {
          const fallingOnTop =
            mario.vy > 0 && mario.y + MARIO_H - g.y < GOOMBA_H * 0.6;
          if (fallingOnTop) {
            g.alive = false;
            g.squish = SQUISH_FRAMES;
            mario.vy = BOUNCE_VELOCITY;
            scoreVal += 100;
            setScore(scoreVal);
          } else {
            status = "lost";
            setGameStatus("lost");
            break;
          }
        }
      }
      for (let i = goombas.length - 1; i >= 0; i--) {
        if (!goombas[i].alive && goombas[i].squish <= 0) goombas.splice(i, 1);
      }

      for (const c of coins) {
        if (c.collected) continue;
        const overlapX = mario.x < c.x + COIN_SIZE && mario.x + MARIO_W > c.x;
        const overlapY = mario.y < c.y + COIN_SIZE && mario.y + MARIO_H > c.y;
        if (overlapX && overlapY) {
          c.collected = true;
          scoreVal += 10;
          setScore(scoreVal);
        }
      }

      if (status === "playing" && mario.x + MARIO_W >= FLAG_X) {
        status = "won";
        setGameStatus("won");
      }

      if (!hintDismissed && (jumpPressed || input.left || input.right)) {
        hintDismissed = true;
        setShowHint(false);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#5c94fc");
      grad.addColorStop(1, "#a6dcff");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      CLOUD_SPOTS.forEach(([cx, cy]) => {
        drawCloud(ctx, cx - camera * 0.3, cy);
      });

      ctx.save();
      ctx.translate(-camera, 0);

      const poleH = Math.max(60, Math.min(120, groundY - 20));
      ctx.fillStyle = "#e6e6e6";
      ctx.fillRect(FLAG_X, groundY - poleH, 4, poleH);
      ctx.fillStyle = status === "won" ? "#ffd23f" : "#43b047";
      ctx.beginPath();
      ctx.moveTo(FLAG_X + 4, groundY - poleH + 6);
      ctx.lineTo(FLAG_X + 34, groundY - poleH + 16);
      ctx.lineTo(FLAG_X + 4, groundY - poleH + 26);
      ctx.closePath();
      ctx.fill();

      if (imagesReady) {
        for (const p of platforms) {
          const tilesAcross = Math.ceil(p.w / TILE);
          for (let i = 0; i < tilesAcross; i++) {
            ctx.drawImage(images.brick, p.x + i * TILE, p.y, TILE, TILE);
          }
        }

        for (const c of coins) {
          if (c.collected) continue;
          const t = performance.now() / 250;
          const scaleX = Math.abs(Math.cos(t + c.x));
          ctx.save();
          ctx.translate(c.x + COIN_SIZE / 2, c.y + COIN_SIZE / 2);
          ctx.scale(Math.max(0.15, scaleX), 1);
          ctx.drawImage(
            images.coin,
            -COIN_SIZE / 2,
            -COIN_SIZE / 2,
            COIN_SIZE,
            COIN_SIZE,
          );
          ctx.restore();
        }

        for (const g of goombas) {
          let img = g.animFrame === 0 ? images.goomba1 : images.goomba2;
          let h = GOOMBA_H;
          let yDraw = g.y;
          if (!g.alive) {
            const progress = 1 - Math.max(0, g.squish) / SQUISH_FRAMES;
            h = GOOMBA_H * (1 - 0.6 * progress);
            yDraw = g.y + (GOOMBA_H - h);
            img = images.goomba1;
            ctx.globalAlpha = Math.max(0, g.squish / SQUISH_FRAMES);
          }
          ctx.drawImage(img, g.x, yDraw, GOOMBA_W, h);
          ctx.globalAlpha = 1;
        }

        let marioImg;
        if (mario.state === "jump") marioImg = images.marioJump;
        else if (mario.state === "run")
          marioImg = [images.marioRun1, images.marioRun2, images.marioRun3][
            mario.animFrame
          ];
        else marioImg = images.marioIdle;

        ctx.save();
        if (mario.facing === -1) {
          ctx.translate(mario.x + MARIO_W, mario.y);
          ctx.scale(-1, 1);
          ctx.drawImage(marioImg, 0, 0, MARIO_W, MARIO_H);
        } else {
          ctx.drawImage(marioImg, mario.x, mario.y, MARIO_W, MARIO_H);
        }
        ctx.restore();
      }

      ctx.restore();

      ctx.fillStyle = "rgba(0,0,0,0.35)";
      roundRect(ctx, 10, 10, 86, 28, 8);
      ctx.fill();
      if (imagesReady) ctx.drawImage(images.coin, 16, 15, 18, 18);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px monospace";
      ctx.textBaseline = "middle";
      ctx.fillText("x " + scoreVal, 40, 25);
    }

    let lastTime = performance.now();
    let rafId;
    function loop(now) {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / (1000 / 60), 2);
      lastTime = now;
      if (!document.hidden && isVisible) {
        if (status === "playing") update(dt);
        draw();
      }
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, [restartKey]);

  const handleKeyDown = useCallback((e) => {
    const action = KEY_MAP[e.key];
    if (!action) return;
    e.preventDefault();
    if (action === "jump") {
      if (!inputRef.current.jumpHeld) inputRef.current.jumpQueued = true;
      inputRef.current.jumpHeld = true;
    } else {
      inputRef.current[action] = true;
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    const action = KEY_MAP[e.key];
    if (!action) return;
    e.preventDefault();
    if (action === "jump") inputRef.current.jumpHeld = false;
    else inputRef.current[action] = false;
  }, []);

  const handleRestart = useCallback(() => {
    inputRef.current = {
      left: false,
      right: false,
      jumpHeld: false,
      jumpQueued: false,
    };
    setScore(0);
    setShowHint(true);
    setGameStatus("playing");
    setRestartKey((k) => k + 1);
  }, []);

  const press = (key) => () => {
    inputRef.current[key] = true;
  };
  const release = (key) => () => {
    inputRef.current[key] = false;
  };
  const pressJump = () => {
    inputRef.current.jumpQueued = true;
  };

  return (
    <div
      ref={containerRef}
      className="mario-game"
      tabIndex={0}
      role="application"
      aria-label="Mini Mario platformer game. Use the arrow keys or on-screen buttons to run and jump."
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <canvas ref={canvasRef} className="mario-game-canvas" />
      {showHint ? (
        <div className="mario-game-hint">
          <span className="mario-game-hint-desktop">
            ← → to move · Space to jump
          </span>
          <span className="mario-game-hint-mobile">Tap to play</span>
        </div>
      ) : null}
      {gameStatus !== "playing" ? (
        <div className="mario-overlay">
          <div className="mario-overlay-card">
            <h3>{gameStatus === "won" ? "You Win! 🏁" : "Game Over"}</h3>
            <p>
              {gameStatus === "won"
                ? "You reached the flag!"
                : "A Goomba got you!"}{" "}
              Score: {score}
            </p>
            <button
              type="button"
              className="mario-restart-btn"
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        </div>
      ) : null}
      <div className="mario-controls" aria-hidden="true">
        <div className="mario-controls-left">
          <button
            type="button"
            className="mario-btn mario-btn-left"
            onPointerDown={press("left")}
            onPointerUp={release("left")}
            onPointerLeave={release("left")}
            onPointerCancel={release("left")}
          >
            ◀
          </button>
          <button
            type="button"
            className="mario-btn mario-btn-right"
            onPointerDown={press("right")}
            onPointerUp={release("right")}
            onPointerLeave={release("right")}
            onPointerCancel={release("right")}
          >
            ▶
          </button>
        </div>
        <button
          type="button"
          className="mario-btn mario-btn-jump"
          onPointerDown={pressJump}
        >
          ⤴
        </button>
      </div>
    </div>
  );
};

export default MarioGame;
