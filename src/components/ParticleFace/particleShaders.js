export const VERTEX_SHADER = /* glsl */ `
attribute float aBrightA;
attribute float aBrightB;
attribute float aSeed;

uniform float uTime;
uniform float uMorph;
uniform float uIntro;
uniform vec3 uMouse;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uPixelRatio;

varying float vAlpha;

void main() {
  float brightness = mix(aBrightA, aBrightB, uMorph);

  vec3 pos = position;

  float t = uTime * 0.6 + aSeed * 6.2831853;
  pos.x += sin(t) * 0.006;
  pos.y += cos(t * 0.8) * 0.006;
  pos.z += sin(t * 1.3) * 0.012;

  pos += position * (1.0 - uIntro) * 1.6 * aSeed;

  vec2 toParticle = pos.xy - uMouse.xy;
  float dist = length(toParticle);
  float falloff = smoothstep(uMouseRadius, 0.0, dist);
  vec2 dir = dist > 0.0001 ? normalize(toParticle) : vec2(0.0);
  pos.xy += dir * falloff * uMouseStrength;
  pos.z += falloff * uMouseStrength * 0.35;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float size = (1.2 + brightness * 2.4) * uPixelRatio;
  gl_PointSize = size * (280.0 / -mvPosition.z);

  vAlpha = brightness * uIntro;
}
`;

export const FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  float d = length(c);
  if (d > 0.5) discard;
  float edge = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(uColor, edge * vAlpha);
}
`;
