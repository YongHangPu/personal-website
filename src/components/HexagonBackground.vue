<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useWindowSize, useDark } from '@vueuse/core'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { width, height } = useWindowSize()
const isDark = useDark()

interface Hexagon {
  x: number
  y: number
  opacity: number
  targetOpacity: number
  lastUpdate: number
}

// 核心参数配置
const CONFIG = {
  hexSize: 40,      // 六边形半径
  gap: 2,           // 间隙
  baseOpacity: 0.05, // 基础透明度
  activeOpacity: 0.4, // 激活（脉冲）透明度
  pulseSpeed: 0.02,   // 脉冲变化速度
  chance: 0.001       // 随机点亮概率 (每帧)
}

let ctx: CanvasRenderingContext2D | null = null
let animationId: number
const hexagons: Hexagon[] = []
let mouseX = -1000
let mouseY = -1000

// 六边形几何计算
const hexHeight = CONFIG.hexSize * Math.sqrt(3)
const hexWidth = CONFIG.hexSize * 2
const xOffset = hexWidth * 0.75
const yOffset = hexHeight

const initHexagons = () => {
  hexagons.length = 0
  const cols = Math.ceil(width.value / xOffset) + 2
  const rows = Math.ceil(height.value / yOffset) + 2

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // 奇偶列错位
      const x = i * xOffset
      const y = j * yOffset + (i % 2 === 0 ? 0 : hexHeight / 2)

      hexagons.push({
        x,
        y,
        opacity: CONFIG.baseOpacity,
        targetOpacity: CONFIG.baseOpacity,
        lastUpdate: 0
      })
    }
  }
}

const drawHexagon = (x: number, y: number, size: number) => {
  if (!ctx) return
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const hx = x + size * Math.cos(angle)
    const hy = y + size * Math.sin(angle)
    if (i === 0) ctx.moveTo(hx, hy)
    else ctx.lineTo(hx, hy)
  }
  ctx.closePath()
  ctx.fill()
}

const animate = () => {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, width.value, height.value)

  // 颜色配置 (适配深色/浅色模式)
  const color = isDark.value ? '59, 130, 246' : '30, 64, 175' // 深色模式亮蓝，浅色模式深蓝

  hexagons.forEach(hex => {
    // 鼠标交互：计算距离
    const dx = hex.x - mouseX
    const dy = hex.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    // 状态更新逻辑
    if (dist < 150) {
      // 鼠标附近高亮
      hex.targetOpacity = CONFIG.activeOpacity + 0.2 * (1 - dist/150)
    } else if (Math.random() < CONFIG.chance) {
      // 随机脉冲
      hex.targetOpacity = CONFIG.activeOpacity
    } else {
      // 回归基础状态
      hex.targetOpacity = CONFIG.baseOpacity
    }

    // 渐变动画
    hex.opacity += (hex.targetOpacity - hex.opacity) * 0.05

    // 绘制
    ctx!.fillStyle = `rgba(${color}, ${hex.opacity})`
    drawHexagon(hex.x, hex.y, CONFIG.hexSize - CONFIG.gap)
  })

  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    initHexagons()
    animate()
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', handleMouseMove)
})

// 监听窗口大小变化
watch([width, height], () => {
  if (canvasRef.value) {
    canvasRef.value.width = width.value
    canvasRef.value.height = height.value
    initHexagons()
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="width"
    :height="height"
    class="hexagon-bg"
  ></canvas>
</template>

<style scoped>
.hexagon-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
