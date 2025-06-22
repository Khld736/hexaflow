"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

// This is a self-contained 2D Simplex noise implementation.
// No new dependencies are needed.
const SimplexNoise = (() => {
  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0
  const F3 = 1.0 / 3.0
  const G3 = 1.0 / 6.0

  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i

  let n
  let q
  for (let i = 255; i > 0; i--) {
    n = Math.floor((i + 1) * Math.random())
    q = p[i]
    p[i] = p[n]
    p[n] = q
  }
  const perm = new Uint8Array(512)
  const permMod12 = new Uint8Array(512)
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255]
    permMod12[i] = perm[i] % 12
  }

  const grad3 = new Float32Array([
    1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1,
    -1,
  ])

  return {
    noise3D: (xin: number, yin: number, zin: number) => {
      let n0, n1, n2, n3
      const s = (xin + yin + zin) * F3
      const i = Math.floor(xin + s)
      const j = Math.floor(yin + s)
      const k = Math.floor(zin + s)
      const t = (i + j + k) * G3
      const X0 = i - t
      const Y0 = j - t
      const Z0 = k - t
      const x0 = xin - X0
      const y0 = yin - Y0
      const z0 = zin - Z0

      let i1, j1, k1
      let i2, j2, k2

      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1
          j1 = 0
          k1 = 0
          i2 = 1
          j2 = 1
          k2 = 0
        } else if (x0 >= z0) {
          i1 = 1
          j1 = 0
          k1 = 0
          i2 = 1
          j2 = 0
          k2 = 1
        } else {
          i1 = 0
          j1 = 0
          k1 = 1
          i2 = 1
          j2 = 0
          k2 = 1
        }
      } else {
        if (y0 < z0) {
          i1 = 0
          j1 = 0
          k1 = 1
          i2 = 0
          j2 = 1
          k2 = 1
        } else if (x0 < z0) {
          i1 = 0
          j1 = 1
          k1 = 0
          i2 = 0
          j2 = 1
          k2 = 1
        } else {
          i1 = 0
          j1 = 1
          k1 = 0
          i2 = 1
          j2 = 1
          k2 = 0
        }
      }

      const x1 = x0 - i1 + G3
      const y1 = y0 - j1 + G3
      const z1 = z0 - k1 + G3
      const x2 = x0 - i2 + 2.0 * G3
      const y2 = y0 - j2 + 2.0 * G3
      const z2 = z0 - k2 + 2.0 * G3
      const x3 = x0 - 1.0 + 3.0 * G3
      const y3 = y0 - 1.0 + 3.0 * G3
      const z3 = z0 - 1.0 + 3.0 * G3

      const ii = i & 255
      const jj = j & 255
      const kk = k & 255

      let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
      if (t0 < 0) n0 = 0.0
      else {
        const gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3
        t0 *= t0
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0)
      }

      let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
      if (t1 < 0) n1 = 0.0
      else {
        const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3
        t1 *= t1
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1)
      }

      let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
      if (t2 < 0) n2 = 0.0
      else {
        const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3
        t2 *= t2
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2)
      }

      let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
      if (t3 < 0) n3 = 0.0
      else {
        const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3
        t3 *= t3
        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3)
      }
      return 32.0 * (n0 + n1 + n2 + n3)
    },
  }
})()

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return // Don't run animation on the server

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let particles: Particle[] = []
    const particleCount = 2000
    let time = 0

    class Particle {
      x: number
      y: number
      constructor() {
        this.x = Math.random() * w
        this.y = Math.random() * h
      }

      update() {
        const angle = SimplexNoise.noise3D(this.x / 200, this.y / 200, time) * Math.PI * 2
        this.x += Math.cos(angle) * 0.5
        this.y += Math.sin(angle) * 0.5

        if (this.x < 0) this.x = w
        if (this.x > w) this.x = 0
        if (this.y < 0) this.y = h
        if (this.y > h) this.y = 0
      }

      draw() {
        const noiseVal = (SimplexNoise.noise3D(this.x / 500, this.y / 500, time) + 1) / 2
        
        if (resolvedTheme === 'dark') {
          const hue = 180 + noiseVal * 60 // Blue to Teal range for dark
          const lightness = 20 + noiseVal * 40
          ctx!.fillStyle = `hsla(${hue}, 100%, ${lightness}%, 0.6)`
        } else {
          // Use darker, less saturated particles for light theme for better visibility
          const hue = 200 + noiseVal * 40 
          const lightness = 40 + noiseVal * 30 
          ctx!.fillStyle = `hsla(${hue}, 70%, ${lightness}%, 0.7)`
        }

        ctx!.beginPath()
        ctx!.arc(this.x, this.y, 0.5, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    let animationFrameId: number
    const animate = () => {
      // Set the background color based on the current theme
      ctx!.fillStyle = resolvedTheme === "dark" ? "rgba(10, 10, 10, 0.1)" : "rgba(255, 255, 255, 0.2)"
      ctx!.fillRect(0, 0, w, h)
      time += 0.001

      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      particles = []
      init()
    }

    window.addEventListener("resize", handleResize)

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted, resolvedTheme])

  if (!mounted) {
    // Return null on the server to prevent hydration errors
    return null
  }

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}