<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Monitor, Menu as IconMenu, Document, Folder, Moon, Sunny, Close } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const isDark = useDark({
  initialValue: 'dark',
})
const toggleDark = useToggle(isDark)

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <el-container class="layout-container">
    <!-- Global Animated Background -->
    <div class="global-bg">
      <div
        class="bg-blob blob-1"
        v-motion
        :initial="{ x: -100, y: -100, opacity: 0, scale: 0.5 }"
        :enter="{
          x: 50,
          y: 50,
          opacity: 0.4,
          scale: 1,
          transition: {
            duration: 8000,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }
        }"
      ></div>
      <div
        class="bg-blob blob-2"
        v-motion
        :initial="{ x: 100, y: 200, opacity: 0, scale: 0.5 }"
        :enter="{
          x: -50,
          y: 100,
          opacity: 0.3,
          scale: 1.2,
          transition: {
            duration: 10000,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 1000
          }
        }"
      ></div>
      <div
        class="bg-blob blob-3"
        v-motion
        :initial="{ x: 0, y: 0, opacity: 0, scale: 0.5 }"
        :enter="{
          x: 100,
          y: -100,
          opacity: 0.3,
          scale: 0.8,
          transition: {
            duration: 12000,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 2000
          }
        }"
      ></div>
    </div>

    <el-header class="header">
      <div class="header-content container">
        <div class="logo">
          <router-link to="/">
            <el-icon class="logo-icon"><Monitor /></el-icon>
            <span class="logo-text">YongHang's Space</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="nav-right">
          <el-menu
            mode="horizontal"
            :router="true"
            :ellipsis="false"
            :default-active="route.path"
            class="nav-menu desktop-menu"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/resume">简历</el-menu-item>
            <el-menu-item index="/projects">开源项目</el-menu-item>
          </el-menu>

          <button class="theme-toggle" @click="toggleDark()">
            <el-icon v-if="isDark"><Moon /></el-icon>
            <el-icon v-else><Sunny /></el-icon>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="mobile-menu-btn" @click="isMobileMenuOpen = true">
          <el-icon><IconMenu /></el-icon>
        </div>
      </div>
    </el-header>

    <!-- Mobile Navigation Drawer -->
    <el-drawer
      v-model="isMobileMenuOpen"
      direction="ttb"
      size="100%"
      :with-header="false"
      class="mobile-nav-drawer"
      :show-close="false"
    >
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <span class="menu-title">菜单</span>
          <div class="close-btn" @click="closeMobileMenu">
            <el-icon><Close /></el-icon>
          </div>
        </div>
        <div class="mobile-menu-items">
          <el-menu
            :router="true"
            :default-active="route.path"
            class="mobile-menu"
            @select="closeMobileMenu"
          >
            <el-menu-item index="/">
              <el-icon><Monitor /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/resume">
              <el-icon><Document /></el-icon>
              <span>简历</span>
            </el-menu-item>
            <el-menu-item index="/projects">
              <el-icon><Folder /></el-icon>
              <span>开源项目</span>
            </el-menu-item>
          </el-menu>
        </div>

        <div class="mobile-menu-footer">
          <p class="copyright">&copy; 2026 YongHangPu</p>
        </div>
      </div>
    </el-drawer>

    <el-main class="main">
      <div class="container">
        <RouterView />
      </div>
    </el-main>

    <el-footer class="footer" height="auto">
      <div class="container">
        <p>&copy; 2026 YongHangPu. All Rights Reserved.</p>
        <div class="social-links">
          <a href="https://github.com/YongHangPu" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span class="divider">|</span>
          <a href="mailto:1251679661@qq.com">Email</a>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--el-bg-color-page);
}

.header {
  background-color: var(--header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
  height: 64px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .logo {
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      gap: 10px;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }

    .logo-icon {
      font-size: 28px;
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
      padding: 6px;
      border-radius: 8px;
    }

    .logo-text {
      font-size: 20px;
      font-weight: 700;
      color: var(--el-text-color-primary);
      letter-spacing: 0.5px;
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .theme-toggle {
    background: none;
    border: 1px solid var(--el-border-color);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--el-text-color-primary);
    transition: all 0.3s;

    &:hover {
      background-color: var(--el-fill-color);
      color: var(--el-color-primary);
    }
  }

  .nav-menu {
    border-bottom: none;
    background: transparent;

    .el-menu-item {
      font-size: 16px;
      color: var(--el-text-color-regular);
      font-weight: 500;
      background: transparent;

      &:hover, &.is-active {
        color: var(--el-color-primary);
        background: transparent !important;
      }

      &.is-active {
        font-weight: 600;
        border-bottom: 2px solid var(--el-color-primary);
      }
    }
  }

  .mobile-menu-btn {
    display: none;
    cursor: pointer;
    font-size: 24px;
    color: var(--el-text-color-primary);
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--el-fill-color);
    }
  }
}

.main {
  flex: 1;
  padding: 0;
  overflow: visible;
}

.footer {
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  padding: 30px 0;
  text-align: center;
  color: var(--el-text-color-secondary);
  font-size: 14px;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 15px;

    a {
      color: var(--el-text-color-regular);
      transition: color 0.2s;

      &:hover {
        color: var(--el-color-primary);
      }
    }

    .divider {
      color: var(--el-border-color);
    }
  }
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .header {
    .desktop-menu {
      display: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .logo-text {
      font-size: 18px;
    }
  }
}

  .mobile-menu-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    background: var(--el-bg-color);

    .mobile-menu-header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .menu-title {
        font-size: 24px;
        font-weight: 800;
        color: var(--el-text-color-primary);
      }

      .close-btn {
        font-size: 24px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: var(--el-fill-color);
          color: var(--el-text-color-primary);
        }
      }
    }

    .mobile-menu-items {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 40px;

      .mobile-menu {
        border: none;
        background: transparent;

        .el-menu-item {
          height: 60px;
          line-height: 60px;
          font-size: 20px;
          font-weight: 600;
          color: var(--el-text-color-regular);
          border-radius: 12px;
          margin-bottom: 10px;

          &:hover, &.is-active {
            color: var(--el-color-primary);
            background: var(--el-color-primary-light-9) !important;
          }

          .el-icon {
            font-size: 22px;
            margin-right: 15px;
          }
        }
      }
    }

    .mobile-menu-footer {
      padding: 30px;
      text-align: center;

      .copyright {
        color: var(--el-text-color-secondary);
        font-size: 14px;
      }
    }
  }

/* Global Background Styles */
.global-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  .bg-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  .blob-1 {
    top: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: var(--el-color-primary-light-8);
    opacity: 0.3;
  }

  .blob-2 {
    bottom: 20%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: var(--el-color-success-light-8);
    opacity: 0.2;
  }

  .blob-3 {
    top: 40%;
    left: 20%;
    width: 300px;
    height: 300px;
    background: var(--el-color-warning-light-8);
    opacity: 0.2;
  }
}
</style>
