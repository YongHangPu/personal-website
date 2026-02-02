<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import resumeData from '../data/resume.json'
  import { Monitor, DataLine, Platform, ArrowRight } from '@element-plus/icons-vue'
  import DecryptedText from '../components/bits/DecryptedText.vue'

  const router = useRouter()
  const profile = resumeData.profile
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div
          class="avatar-box"
          v-motion
          :initial="{ opacity: 0, scale: 0.5 }"
          :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }">
          <div class="avatar-circle">
            {{ profile.name[0] }}
          </div>
          <div class="avatar-ring"></div>
        </div>

        <div
          class="text-content"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }">
          <h1 class="name">
            Hello, I'm
            <span class="highlight">
              <DecryptedText :text="profile.name" :duration="1000" class="name-text" />
            </span>
          </h1>
          <h2 class="title">{{ profile.title }}</h2>
          <div class="intro">
            <p>专注于 PC 后台管理系统、前端监控 SDK、桌面端应用及 UniApp 跨端开发。</p>
            <p>热衷于探索前沿技术，致力于打造极致用户体验。</p>
          </div>

          <div class="actions">
            <el-button type="primary" size="large" class="primary-btn" @click="router.push('/resume')">
              查看简历
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
            <el-button size="large" class="secondary-btn" @click="router.push('/projects')">开源项目</el-button>
          </div>
        </div>
      </div>

      <!-- Decorative Background Elements -->
      <div
        class="bg-shape shape-1"
        v-motion
        :initial="{ opacity: 0, x: -100, rotate: -45 }"
        :enter="{ opacity: 0.6, x: 0, rotate: 0, transition: { duration: 1200, ease: 'easeOut' } }"></div>
      <div
        class="bg-shape shape-2"
        v-motion
        :initial="{ opacity: 0, x: 100, rotate: 45 }"
        :enter="{ opacity: 0.6, x: 0, rotate: 0, transition: { duration: 1200, ease: 'easeOut' } }"></div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2
          class="section-title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }">
          核心技术方向
        </h2>
        <div class="features-grid">
          <div
            class="feature-card"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100, ease: 'easeOut' } }">
            <div class="icon-box blue">
              <el-icon><Monitor /></el-icon>
            </div>
            <h3>架构设计</h3>
            <p>深耕企业级后台管理系统与前端监控 SDK，具备复杂业务场景下的架构设计与性能优化经验。</p>
          </div>

          <div
            class="feature-card"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200, ease: 'easeOut' } }">
            <div class="icon-box green">
              <el-icon><DataLine /></el-icon>
            </div>
            <h3>数据可视化</h3>
            <p>Echarts 大屏开发专家，擅长复杂地图交互与海量数据实时渲染优化。</p>
          </div>

          <div
            class="feature-card"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300, ease: 'easeOut' } }">
            <div class="icon-box purple">
              <el-icon><Platform /></el-icon>
            </div>
            <h3>跨端开发</h3>
            <p>Electron 桌面端与 UniApp 移动端全栈覆盖，解决复杂本地化交互难题。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Preview (Simple) -->
    <section class="tech-section">
      <div class="container">
        <div
          class="tech-bar"
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 200, ease: 'easeOut' } }">
          <span class="tech-item">Vue 3</span>
          <span class="dot">•</span>
          <span class="tech-item">TypeScript</span>
          <span class="dot">•</span>
          <span class="tech-item">Electron</span>
          <span class="dot">•</span>
          <span class="tech-item">Frontend-Monitoring</span>
          <span class="dot">•</span>
          <span class="tech-item">Node.js</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
  .home {
    overflow-x: hidden;
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    min-height: 550px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--el-color-primary-light-9);
    // border: 1px solid var(--el-border-color-light);
    padding: 40px 20px;
    overflow: hidden;

    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 800px;
    }

    .avatar-box {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto 30px;

      .avatar-circle {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #409eff, #3a8ee6);
        color: #fff;
        font-size: 48px;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        box-shadow: 0 10px 25px rgba(64, 158, 255, 0.3);
      }

      .avatar-ring {
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 3px solid var(--el-color-primary);
        border-radius: 50%;
        opacity: 0.3;
        animation: pulse 2s infinite;
      }
    }

    .text-content {
      flex: 1;
      text-align: left;
    }

    .name {
      font-size: 42px;
      margin: 0 0 10px;
      color: var(--el-text-color-primary);
      font-weight: 800;

      .highlight {
        color: var(--el-color-primary);
        position: relative;
        display: inline-block;

        .name-text {
          font-family: inherit; /* Inherit font from parent, not monospace */
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 8px;
          background: var(--el-color-primary-light-8);
          z-index: -1;
        }
      }
    }

    .title {
      font-size: 24px;
      color: var(--el-text-color-regular);
      margin: 0 0 25px;
      font-weight: 500;
    }

    .intro {
      font-size: 18px;
      color: var(--el-text-color-secondary);
      line-height: 1.8;
      margin: 0 auto 40px;
      max-width: 800px;

      p {
        margin: 8px 0;
      }
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 20px;

      .el-button {
        padding: 12px 30px;
        font-weight: 600;
        border-radius: 8px;
        transition: transform 0.2s;
        height: auto;
        font-size: 16px;

        &:hover {
          transform: translateY(-2px);
        }
      }

      .primary-btn {
        box-shadow: 0 8px 15px rgba(64, 158, 255, 0.25);
      }
    }

    /* Decorative Background */
    .bg-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      z-index: 1;
    }

    .shape-1 {
      top: -100px;
      right: -50px;
      width: 400px;
      height: 400px;
      background: var(--el-color-primary-light-9);
    }

    .shape-2 {
      bottom: -50px;
      left: -100px;
      width: 300px;
      height: 300px;
      background: var(--el-color-success-light-9);
    }
  }

  /* Features Section */
  .features-section {
    padding: 60px 20px 80px 20px;
    background: var(--el-bg-color);

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      font-size: 32px;
      color: var(--el-text-color-primary);
      margin-bottom: 50px;
      font-weight: 700;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        margin: 0;
        padding: 0;
      }
    }

    .feature-card {
      background: var(--el-bg-color-overlay);
      padding: 40px 30px;
      border-radius: 16px;
      border: 1px solid var(--el-border-color-light);
      transition: all 0.3s ease;
      text-align: center;
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        border-color: var(--el-border-color-lighter);
      }

      .icon-box {
        width: 70px;
        height: 70px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 25px;
        font-size: 32px;
        transition: transform 0.3s;

        &.blue {
          background: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
        }
        &.green {
          background: var(--el-color-success-light-9);
          color: var(--el-color-success);
        }
        &.purple {
          background: var(--el-color-danger-light-9);
          color: var(--el-color-danger);
        }
      }

      &:hover .icon-box {
        transform: scale(1.1) rotate(5deg);
      }

      h3 {
        font-size: 22px;
        color: var(--el-text-color-primary);
        margin-bottom: 15px;
      }

      p {
        color: var(--el-text-color-regular);
        line-height: 1.6;
        font-size: 15px;
      }
    }
  }

  /* Tech Section */
  .tech-section {
    padding: 40px 0;
    background: var(--el-fill-color-light);
    border-top: 1px solid var(--el-border-color-lighter);

    .tech-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      color: var(--el-text-color-secondary);
      font-size: 18px;
      font-weight: 500;

      .tech-item {
        color: var(--el-text-color-regular);
      }

      .dot {
        color: var(--el-border-color);
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      min-height: auto;
      padding: 60px 20px 40px;

      .hero-content {
        padding: 0;
        width: 100%;
      }

      .avatar-box {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;

        .avatar-circle {
          font-size: 40px;
        }
      }

      .name {
        font-size: 32px;
        text-align: center;
        margin-bottom: 5px;
      }

      .title {
        font-size: 16px;
        margin-bottom: 20px;
        text-align: center;
      }

      .intro {
        font-size: 15px;
        margin-bottom: 30px;
        text-align: center;
        padding: 0 10px;
      }

      .actions {
        flex-direction: column;
        gap: 15px;
        max-width: 100%;
        margin: 0 auto;

        .el-button {
          width: 100%;
          margin: 0;
          height: 48px; /* Larger touch target */
        }
      }

      .text-content {
        text-align: center;
      }
    }

    .features-section {
      padding: 50px 20px;

      .section-title {
        font-size: 26px;
        margin-bottom: 30px;
      }

      .feature-card {
        padding: 30px 20px;
      }
    }
  }
</style>
