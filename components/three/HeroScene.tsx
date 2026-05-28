'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth || window.innerWidth
    const height = mount.clientHeight || window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.display = 'block'
    mount.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 10

    const planeConfigs: Array<{
      w: number
      h: number
      x: number
      y: number
      z: number
      rx: number
      ry: number
      opacity: number
    }> = [
      { w: 3.2, h: 5.0, x: 0,    y: 0.4,  z: -2, rx: 0.04, ry: 0,     opacity: 0.55 },
      { w: 4.8, h: 0.08, x: 0,   y: 2.2,  z: -3, rx: 0,    ry: 0.04,  opacity: 0.45 },
      { w: 1.6, h: 2.4, x: -1.1, y: 1.2,  z: -4, rx: 0.08, ry: -0.12, opacity: 0.48 },
      { w: 6.0, h: 7.0, x: 0,    y: 0,    z: -7, rx: 0,    ry: 0,     opacity: 0.22 },
      { w: 1.2, h: 3.8, x: 0,    y: -1.6, z: -5, rx: 0,    ry: 0.06,  opacity: 0.38 },
    ]

    const meshes: THREE.LineSegments[] = []

    for (const cfg of planeConfigs) {
      const geo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(cfg.w, cfg.h))
      const mat = new THREE.LineBasicMaterial({
        color: 0xc0c0c0,
        transparent: true,
        opacity: cfg.opacity,
      })
      const mesh = new THREE.LineSegments(geo, mat)
      mesh.position.set(cfg.x, cfg.y, cfg.z)
      mesh.rotation.set(cfg.rx, cfg.ry, 0)
      scene.add(mesh)
      meshes.push(mesh)
    }

    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', onMouseMove)

    function onResize() {
      const w = mount!.clientWidth || window.innerWidth
      const h = mount!.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize)

    let frameId: number

    function animate() {
      frameId = requestAnimationFrame(animate)

      if (!prefersReducedMotion) {
        scene.rotation.y += 0.0003
        scene.rotation.x += 0.0001

        target.x += (mouse.x * 0.08 - target.x) * 0.04
        target.y += (mouse.y * 0.08 - target.y) * 0.04
        scene.rotation.y += target.x * 0.01
        scene.rotation.x += target.y * 0.01
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      for (const mesh of meshes) {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
      }
      if (mount.contains(canvas)) {
        mount.removeChild(canvas)
      }
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
