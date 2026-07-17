import React, { useEffect, useRef, useState } from "react";
import { initParticleFace } from "./particleFaceScene";
import imageA from "../../assets/img/david particle reduction i.png";
import imageB from "../../assets/img/david particle reduction f.png";
import "./ParticleFace.css";

export default function ParticleFace() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;

    initParticleFace(container, { imageUrlA: imageA, imageUrlB: imageB })
      .then((scene) => {
        if (cancelled) {
          scene.destroy();
          return;
        }
        sceneRef.current = scene;
        requestAnimationFrame(() => {
          if (!cancelled) setIsVisible(true);
        });
      })
      .catch((err) => {
        console.error("[ParticleFace]", err);
      });

    return () => {
      cancelled = true;
      setIsVisible(false);
      sceneRef.current?.destroy();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      className={`particle-face${isVisible ? " particle-face--visible" : ""}`}
      ref={containerRef}
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
    />
  );
}
