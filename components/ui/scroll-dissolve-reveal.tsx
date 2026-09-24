"use client"

import { Suspense, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrthographicCamera, useTexture } from "@react-three/drei"
import { useMotionValueEvent, useScroll } from "framer-motion"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const frontFragmentShader = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform float uGrayscale;
  varying vec2 vUv;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 color = texture2D(uTexture, uv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(color.rgb, vec3(gray), uGrayscale);

    vec2 centered = vUv - vec2(0.5);
    centered.x *= uResolution.x / uResolution.y;
    float distanceFromCenter = length(centered) * 1.35;
    float blockNoise = hash(floor(vUv * uResolution / 8.0)) * 0.12;
    float maximumDistance = length(vec2(uResolution.x / uResolution.y * 0.5, 0.5)) * 1.35;
    float threshold = uDissolve * (maximumDistance + 0.2);
    float alpha = smoothstep(threshold - 0.08, threshold + 0.04, distanceFromCenter + blockNoise);

    gl_FragColor = vec4(color.rgb, color.a * alpha);
  }
`

const backFragmentShader = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDarkness;
  uniform float uGrayscale;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 color = texture2D(uTexture, uv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(color.rgb, vec3(gray), uGrayscale);
    color.rgb = mix(color.rgb, vec3(0.0), uDarkness);
    gl_FragColor = color;
  }
`

// Scroll progress → dissolve amount. The first and last stretches of the scroll hold the
// fully "before" and fully "after" images; the shader and the labels both read this.
const DISSOLVE_START = 0.12
const DISSOLVE_END = 0.8
const dissolveAt = (progress: number) => Math.min(1, Math.max(0, (progress - DISSOLVE_START) / (DISSOLVE_END - DISSOLVE_START)))
type Phase = "before" | "dissolving" | "after"
const phaseAt = (progress: number): Phase => {
  const d = dissolveAt(progress)
  return d <= 0 ? "before" : d >= 1 ? "after" : "dissolving"
}

type ScrollProgress = {
  get: () => number
}

type SceneProps = {
  imageFront: string
  imageBack: string
  scrollYProgress: ScrollProgress
}

function textureSize(texture: THREE.Texture) {
  const image = texture.image as { width: number; height: number }
  return new THREE.Vector2(image.width, image.height)
}

function Scene({ imageFront, imageBack, scrollYProgress }: SceneProps) {
  const [frontTexture, backTexture] = useTexture([imageFront, imageBack])
  const frontMaterial = useRef<THREE.ShaderMaterial>(null)
  const backMaterial = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const frontUniforms = useMemo(() => ({
    uTexture: { value: frontTexture },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uImageResolution: { value: textureSize(frontTexture) },
    uDissolve: { value: 0 },
    uGrayscale: { value: 0 },
  }), [frontTexture, size])

  const backUniforms = useMemo(() => ({
    uTexture: { value: backTexture },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uImageResolution: { value: textureSize(backTexture) },
    uDarkness: { value: 1 },
    uGrayscale: { value: 1 },
  }), [backTexture, size])

  useFrame(() => {
    const progress = dissolveAt(scrollYProgress.get())
    const grayscale = Math.min(1, progress / 0.4)
    const accelerated = Math.min(1, progress * 1.1)

    if (frontMaterial.current) {
      frontMaterial.current.uniforms.uResolution.value.set(size.width, size.height)
      frontMaterial.current.uniforms.uDissolve.value = progress
      frontMaterial.current.uniforms.uGrayscale.value = grayscale
    }

    if (backMaterial.current) {
      backMaterial.current.uniforms.uResolution.value.set(size.width, size.height)
      backMaterial.current.uniforms.uDarkness.value = 1 - accelerated
      backMaterial.current.uniforms.uGrayscale.value = 1 - accelerated
    }
  })

  return (
    <>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={backMaterial} vertexShader={vertexShader} fragmentShader={backFragmentShader} uniforms={backUniforms} transparent />
      </mesh>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={frontMaterial} vertexShader={vertexShader} fragmentShader={frontFragmentShader} uniforms={frontUniforms} transparent />
      </mesh>
    </>
  )
}

export type ScrollDissolveRevealProps = {
  imageFront: string
  imageBack: string
  /** Accessible description of the comparison (the canvas itself has no alt text). */
  label: string
  className?: string
  containerClassName?: string
  scrollContainerRef?: React.RefObject<HTMLElement | null>
}

export function ScrollDissolveReveal({ imageFront, imageBack, label, className, containerClassName, scrollContainerRef }: ScrollDissolveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    ...(scrollContainerRef && { container: scrollContainerRef }),
  })
  // "Before" only on the untouched image, "After" only once it has fully dissolved.
  const [phase, setPhase] = useState<Phase>("before")
  useMotionValueEvent(scrollYProgress, "change", (p) => setPhase(phaseAt(p)))

  return (
    <div ref={containerRef} className={`scroll-dissolve-reveal ${containerClassName ?? ""}`}>
      <div className={`scroll-dissolve-reveal-sticky ${className ?? ""}`} role="img" aria-label={label} data-phase={phase}>
        <Canvas dpr={1} gl={{ antialias: false, alpha: false }}>
          <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={0.1} far={10} position={[0, 0, 1]} />
          <Suspense fallback={null}>
            <Scene imageFront={imageFront} imageBack={imageBack} scrollYProgress={scrollYProgress} />
          </Suspense>
        </Canvas>
        <span className="dissolve-label dissolve-label-before" aria-hidden="true">Before</span>
        <span className="dissolve-label dissolve-label-after" aria-hidden="true">After</span>
      </div>
    </div>
  )
}
