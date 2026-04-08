"use client";

import { useEffect, useRef, useCallback } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

vec3 mod289(vec3 x){ return x - floor(x/289.0)*289.0; }
vec2 mod289(vec2 x){ return x - floor(x/289.0)*289.0; }
vec3 permute(vec3 x){ return mod289((x*34.0+1.0)*x); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0*fract(p*C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x = a0.x*x0.x + h.x*x0.y;
  g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.0*dot(m, g);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  // ── Heavy pulsating time — always alive ──
  float t = u_time * 0.45;

  // Cursor adds extra push on top of the constant pulsation
  float mx = (u_mouse.x - 0.5) * 0.8;
  float my = (u_mouse.y - 0.5) * 0.6;

  // Breathing pulse — the whole wave field expands and contracts
  float breath = sin(u_time * 0.8) * 0.12 + sin(u_time * 1.3) * 0.06;

  // ── Colors ──
  vec3 bg       = vec3(0.937);                    // #efefef
  vec3 peach    = vec3(0.96, 0.89, 0.82);         // warm cream
  vec3 cyan     = vec3(0.0, 0.75, 0.98);          // vivid cyan blue
  vec3 magenta  = vec3(0.92, 0.05, 0.58);         // hot magenta pink
  vec3 purple   = vec3(0.40, 0.10, 0.70);         // deep purple
  vec3 lightBlue = vec3(0.75, 0.92, 1.0);         // soft blue edge

  // ── Noise fields — fast time + strong cursor = heavy movement ──
  float n1 = snoise(vec2(uv.x * 1.5 + mx + t, uv.y * 1.2 + my + t * 0.8 + breath)) * 0.5 + 0.5;
  float n2 = snoise(vec2(uv.x * 2.0 - mx * 0.7 - t * 0.6, uv.y * 1.8 + my * 0.8 + t * 0.7)) * 0.5 + 0.5;
  float n3 = snoise(vec2(uv.x * 0.8 + mx * 0.5 + t * 0.5, uv.y * 0.6 - my * 0.6 - t * 0.4 + breath * 0.7)) * 0.5 + 0.5;

  // ── S-curve boundary — pulsates with time + reacts hard to cursor ──
  float sCurve = 0.55 + sin(uv.y * 3.14159 * 1.2 - 0.3 + my * 1.2 + t * 0.3) * (0.12 + breath * 0.5)
                      + (n1 - 0.5) * 0.12
                      + mx * 0.25;

  // ── PEACH zone ──
  float peachStart = sCurve - 0.25;
  float peachMask = smoothstep(peachStart - 0.1, peachStart + 0.05, uv.x)
                  * smoothstep(sCurve + 0.02, sCurve - 0.08, uv.x);

  // ── CYAN: soft band near boundary ──
  float cyanDist = abs(uv.x - sCurve);
  float cyanMask = smoothstep(0.08, 0.0, cyanDist)
                 * smoothstep(0.8, 0.15, uv.y + (n2 - 0.5) * 0.2);

  // ── MAGENTA: single continuous fill ──
  float magentaMask = smoothstep(sCurve - 0.04, sCurve + 0.15, uv.x)
                    * smoothstep(-0.1, 0.15, uv.y + (n1 - 0.5) * 0.1)
                    * smoothstep(1.1, 0.85, uv.y - (n3 - 0.5) * 0.1);

  // ── PURPLE: overlap blend zone ──
  float purpleMask = cyanMask * magentaMask * 2.5;
  purpleMask += smoothstep(sCurve, sCurve + 0.12, uv.x)
              * smoothstep(0.5, 0.2, uv.y)
              * smoothstep(0.2, 0.5, uv.y + (n2 - 0.5) * 0.12)
              * 0.6;
  purpleMask += smoothstep(sCurve, sCurve + 0.10, uv.x)
              * smoothstep(0.2, 0.0, uv.y)
              * 0.5;

  // ── LIGHT BLUE: top-right ──
  float lightBlueMask = smoothstep(0.25, 0.0, uv.y)
                       * smoothstep(0.45, 0.85, uv.x)
                       * 0.7;

  // ── Compose ──
  vec3 color = bg;
  color = mix(color, peach, peachMask * 0.9);
  color = mix(color, lightBlue, lightBlueMask);
  color = mix(color, cyan, cyanMask * 0.95);
  color = mix(color, magenta, magentaMask * 0.9);
  color = mix(color, purple, clamp(purpleMask, 0.0, 1.0) * 0.85);

  // ── Edges ──
  float rightEdgeFade = smoothstep(0.95, 1.0, uv.x);
  color = mix(color, bg * 0.95, rightEdgeFade * 0.4);

  float brCorner = smoothstep(0.6, 1.0, uv.y) * smoothstep(0.7, 1.0, uv.x);
  color = mix(color, purple * 0.7 + bg * 0.3, brCorner * 0.5);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function GradientBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;
    const glCtx = gl as WebGLRenderingContext;

    const vs = compileShader(glCtx, glCtx.VERTEX_SHADER, VERT);
    const fs = compileShader(glCtx, glCtx.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = glCtx.createProgram();
    if (!prog) return;
    glCtx.attachShader(prog, vs);
    glCtx.attachShader(prog, fs);
    glCtx.linkProgram(prog);

    if (!glCtx.getProgramParameter(prog, glCtx.LINK_STATUS)) {
      console.error("Link error:", glCtx.getProgramInfoLog(prog));
      glCtx.deleteProgram(prog);
      return;
    }

    const posLoc = glCtx.getAttribLocation(prog, "a_pos");
    const resLoc = glCtx.getUniformLocation(prog, "u_res");
    const timeLoc = glCtx.getUniformLocation(prog, "u_time");
    const mouseLoc = glCtx.getUniformLocation(prog, "u_mouse");

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(glCtx.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      glCtx.STATIC_DRAW
    );

    let animId: number;
    const t0 = performance.now();

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    function frame() {
      if (!canvas || !glCtx) return;
      resize();
      if (canvas.width === 0 || canvas.height === 0) {
        animId = requestAnimationFrame(frame);
        return;
      }

      // Fast lerp — snappy cursor response
      const lerp = 0.12;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp;

      glCtx.viewport(0, 0, canvas.width, canvas.height);
      glCtx.useProgram(prog);
      glCtx.enableVertexAttribArray(posLoc);
      glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
      glCtx.vertexAttribPointer(posLoc, 2, glCtx.FLOAT, false, 0, 0);
      glCtx.uniform2f(resLoc, canvas.width, canvas.height);
      glCtx.uniform1f(timeLoc, (performance.now() - t0) / 1000);
      glCtx.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);
      glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(animId);
      glCtx.deleteProgram(prog);
      glCtx.deleteShader(vs);
      glCtx.deleteShader(fs);
      glCtx.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
