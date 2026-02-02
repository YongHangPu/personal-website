<script setup lang="ts">
import { marked } from 'marked'
import resumeData from '../data/resume.json'
import {
  Message, Iphone, Location, School, Link,
  Suitcase, Monitor, Collection, FolderOpened, ArrowRight
} from '@element-plus/icons-vue'

const renderMarkdown = (text: string) => {
  return marked(text)
}
</script>

<template>
  <div class="resume-wrapper">
    <div
      class="resume-card"
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
    >
      <!-- Left Sidebar -->
      <aside class="sidebar">
        <div
          class="profile-section"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 200 } }"
        >
          <div class="avatar-placeholder">
            {{ resumeData.profile.name[0] }}
          </div>
          <h1 class="name">{{ resumeData.profile.name }}</h1>
          <p class="title">{{ resumeData.profile.title }}</p>
        </div>

        <div class="divider"></div>

        <div
          class="sidebar-section contact-info"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }"
        >
          <div class="info-item">
            <el-icon><Message /></el-icon>
            <span>{{ resumeData.profile.email }}</span>
          </div>
          <div class="info-item">
            <el-icon><Iphone /></el-icon>
            <span>{{ resumeData.profile.phone }}</span>
          </div>
          <div class="info-item">
            <el-icon><Location /></el-icon>
            <span>{{ resumeData.profile.location }}</span>
          </div>
          <div class="info-item">
            <el-icon><School /></el-icon>
            <span>{{ resumeData.profile.education }}</span>
          </div>
          <div class="info-item link-item">
            <el-icon><Link /></el-icon>
            <a :href="resumeData.profile.github" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <div class="divider"></div>

        <div
          class="sidebar-section skills"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 600 } }"
        >
          <h3 class="sidebar-title">
            <el-icon><Collection /></el-icon> 技术亮点
          </h3>
          <div v-for="(skill, index) in resumeData.skills" :key="index" class="skill-group">
            <h4 class="skill-category">{{ skill.category }}</h4>
            <div class="skill-tags">
              <span v-for="(item, idx) in skill.items" :key="idx" class="skill-tag">{{ item }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Content -->
      <main class="main-content">

        <!-- Open Source -->
        <section class="content-section">
          <div
            class="section-header"
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 300 } }"
          >
            <div class="header-icon-box">
              <el-icon><Monitor /></el-icon>
            </div>
            <h2>开源贡献 & 个人项目</h2>
          </div>
          <div class="items-grid">
            <div
              v-for="(project, index) in resumeData.openSource"
              :key="index"
              class="project-card"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 + (index * 100) } }"
            >
              <div class="card-top">
                <div class="title-row">
                  <h3 class="item-title">{{ project.name }}</h3>
                  <a :href="project.link" target="_blank" rel="noopener noreferrer" class="link-icon">
                    <el-icon><Link /></el-icon>
                  </a>
                </div>
                <el-tag
                  :type="project.role === '作者' ? '' : 'success'"
                  size="small"
                  effect="light"
                  class="role-tag"
                >
                  {{ project.role }}
                </el-tag>
              </div>
              <p class="item-desc">{{ project.description }}</p>
              <div class="details-preview" v-if="project.details?.length">
                 <div class="detail-dot"></div>
                 <span v-html="renderMarkdown(project.details?.[0] ?? '')"></span>
              </div>
            </div>
          </div>
        </section>

        <!-- Work Experience -->
        <section class="content-section">
          <div
            class="section-header"
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
          >
            <div class="header-icon-box">
              <el-icon><Suitcase /></el-icon>
            </div>
            <h2>工作经历</h2>
          </div>
          <div class="timeline-wrapper">
             <div
               v-for="(job, index) in resumeData.workExperience"
               :key="index"
               class="timeline-item"
               v-motion
               :initial="{ opacity: 0, x: 30 }"
               :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 300 + (index * 150) } }"
             >
                <div class="timeline-left">
                  <span class="period">{{ job.period }}</span>
                </div>
                <div class="timeline-content">
                  <div class="job-header">
                    <h3 class="company">{{ job.company }}</h3>
                    <span class="role">{{ job.role }}</span>
                  </div>
                  <ul class="detail-list">
                    <li v-for="(achievement, idx) in job.achievements" :key="idx">
                      <el-icon class="list-icon"><ArrowRight /></el-icon>
                      <span v-html="renderMarkdown(achievement)"></span>
                    </li>
                  </ul>
                </div>
             </div>
          </div>
        </section>

        <!-- Projects -->
        <section class="content-section">
          <div
            class="section-header"
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
          >
            <div class="header-icon-box">
              <el-icon><FolderOpened /></el-icon>
            </div>
            <h2>项目经历</h2>
          </div>
          <div class="items-list">
            <div
              v-for="(project, index) in resumeData.projects"
              :key="index"
              class="item-block"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 + (index * 100) } }"
            >
              <div class="item-header">
                <div class="header-main">
                  <h3 class="item-title">{{ project.name }}</h3>
                  <span class="role-text">{{ project.role }}</span>
                </div>
                <span class="period">{{ project.period }}</span>
              </div>
              <p class="item-desc">{{ project.description }}</p>
              <ul class="detail-list">
                <li v-for="(detail, idx) in project.details" :key="idx">
                   <el-icon class="list-icon"><ArrowRight /></el-icon>
                   <span v-html="renderMarkdown(detail)"></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.resume-wrapper {
  padding: 40px 0;
  min-height: 100vh;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

.resume-card {
  display: flex;
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 1200px;
}

/* Sidebar Styles */
.sidebar {
  width: 300px;
  background: var(--el-color-primary-light-9);
  :global(html.dark) & {
    background: var(--el-bg-color-page);
  }
  padding: 40px 30px;
  border-right: 1px solid var(--el-border-color-light);
  flex-shrink: 0;

  .profile-section {
    text-align: center;
    margin-bottom: 30px;

    .avatar-placeholder {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #409eff, #3a8ee6);
      color: #fff;
      font-size: 36px;
      font-weight: bold;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      box-shadow: 0 4px 10px rgba(64, 158, 255, 0.3);
    }

    .name {
      font-size: 24px;
      color: var(--el-text-color-primary);
      margin: 0 0 8px;
      font-weight: 700;
    }

    .title {
      font-size: 16px;
      color: var(--el-text-color-regular);
      margin: 0;
      font-weight: 500;
    }
  }

  .divider {
    height: 1px;
    background: var(--el-border-color);

    :global(html.dark) & {
      background: rgba(255, 255, 255, 0.15);
    }
    margin: 25px 0;
  }

  .sidebar-section {
    margin-bottom: 20px;

    .sidebar-title {
      font-size: 18px;
      color: var(--el-text-color-primary);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;

      .el-icon {
        color: #409eff;
      }
    }
  }

  .contact-info {
    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      color: var(--el-text-color-regular);
      font-size: 14px;
      line-height: 1.5;

      .el-icon {
        margin-right: 12px;
        color: var(--el-text-color-secondary);
        font-size: 16px;
      }

      a {
        color: #409eff;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: var(--el-text-color-primary);
        }
      }
    }
  }

  .skills {
    .skill-group {
      margin-bottom: 20px;

      .skill-category {
        font-size: 14px;
        color: var(--el-text-color-secondary);
        margin: 0 0 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .skill-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .skill-tag {
          background: var(--el-fill-color-blank);
          border: 1px solid var(--el-border-color);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 13px;
          color: var(--el-text-color-regular);
          transition: all 0.2s;

          &:hover {
            border-color: #409eff;
            color: #409eff;
            background: rgba(64, 158, 255, 0.05);
          }
        }
      }
    }
  }
}

/* Main Content Styles */
.main-content {
  flex: 1;
  padding: 50px 60px;
  background: var(--el-bg-color-overlay);
}

.content-section {
  margin-bottom: 50px;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .header-icon-box {
      width: 40px;
      height: 40px;
      background: rgba(64, 158, 255, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;

      .el-icon {
        font-size: 20px;
        color: #409eff;
      }
    }

    h2 {
      font-size: 22px;
      color: var(--el-text-color-primary);
      margin: 0;
      font-weight: 700;
    }
  }
}

/* Open Source Grid */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  .project-card {
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.05);
      border-color: var(--el-border-color);
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;

      .title-row {
        display: flex;
        align-items: center;
        gap: 8px;

        .item-title {
          font-size: 16px;
          margin: 0;
          color: var(--el-text-color-primary);
        }

        .link-icon {
          color: var(--el-text-color-secondary);
          transition: color 0.2s;
          &:hover { color: #409eff; }
        }
      }
    }

    .item-desc {
      font-size: 14px;
      color: var(--el-text-color-regular);
      margin: 0 0 15px;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .details-preview {
      display: flex;
      align-items: flex-start;
      font-size: 13px;
      color: var(--el-text-color-secondary);

      .detail-dot {
        width: 6px;
        height: 6px;
        background: #409eff;
        border-radius: 50%;
        margin-top: 6px;
        margin-right: 8px;
        flex-shrink: 0;
      }

      span {
        :deep(p) { margin: 0; }
      }
    }
  }
}

/* Timeline Styles */
.timeline-wrapper {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 140px;
    top: 10px;
    bottom: 0;
    width: 2px;
    background: var(--el-border-color);

    :global(html.dark) & {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  .timeline-item {
    display: flex;
    margin-bottom: 40px;
    position: relative;

    .timeline-left {
      width: 160px;
      padding-right: 40px;
      text-align: right;
      flex-shrink: 0;
      box-sizing: border-box;

      .period {
        font-size: 14px;
        color: var(--el-text-color-secondary);
        font-weight: 500;
        display: block;
        margin-top: 2px;
      }
    }

    .timeline-content {
      flex: 1;
      padding-left: 10px;

      &::before {
        content: '';
        position: absolute;
        left: 135px;
        top: 6px;
        width: 12px;
        height: 12px;
        background: var(--el-bg-color);
        border: 3px solid #409eff;
        border-radius: 50%;
        z-index: 1;
      }

      .job-header {
        margin-bottom: 12px;

        .company {
          font-size: 18px;
          color: var(--el-text-color-primary);
          margin: 0 0 4px;
        }

        .role {
          font-size: 14px;
          color: #409eff;
          font-weight: 500;
        }
      }
    }
  }
}

/* List Styles */
.detail-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--el-text-color-regular);
    line-height: 1.6;
    display: flex;
    align-items: flex-start;

    .list-icon {
      color: #409eff;
      margin-top: 4px;
      margin-right: 8px;
      font-size: 12px;
      flex-shrink: 0;
    }

    :deep(strong) {
      color: var(--el-text-color-primary);
      font-weight: 600;
    }

    :deep(p) {
      margin: 0;
    }
  }
}

/* Projects List */
.items-list {
  .item-block {
    margin-bottom: 35px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    padding-bottom: 30px;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;

      .header-main {
        display: flex;
        align-items: baseline;
        gap: 12px;

        .item-title {
          font-size: 18px;
          color: var(--el-text-color-primary);
          margin: 0;
        }

        .role-text {
          font-size: 14px;
          color: #67c23a;
          background: rgba(103, 194, 58, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }
      }

      .period {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }
    }

    .item-desc {
      font-size: 15px;
      color: var(--el-text-color-regular);
      margin: 0 0 15px;
    }
  }
}

/* Responsive */
@media (max-width: 900px) {
  .resume-wrapper {
    padding: 20px 0;
  }

  .resume-card {
    flex-direction: column;
    margin: 0 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--el-border-color-light);
    padding: 30px 20px;
    box-sizing: border-box;

    .profile-section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;

      .info-item {
        margin-bottom: 0;
        justify-content: center;
      }
    }
  }

  .main-content {
    padding: 30px 20px;
  }

  .timeline-wrapper {
    &::before {
      display: none;
    }

    .timeline-item {
      flex-direction: column;
      background: var(--el-bg-color-page);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid var(--el-border-color-lighter);

      .timeline-left {
        width: 100%;
        text-align: left;
        padding: 0;
        margin-bottom: 12px;
        box-sizing: border-box;

        .period {
          display: inline-block;
          background: var(--el-color-primary-light-9);
          color: #1890ff;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
        }
      }

      .timeline-content {
        padding-left: 0;

        &::before {
          display: none;
        }

        .job-header {
          margin-bottom: 15px;

          .company {
            font-size: 18px;
            color: var(--el-text-color-primary);
            margin-bottom: 6px;
            display: block;
          }

          .role {
            font-size: 15px;
            color: var(--el-text-color-regular);
            font-weight: 500;
          }
        }

        .detail-list {
          li {
            margin-bottom: 10px;
            padding-left: 0;

            .list-icon {
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .resume-wrapper {
    padding: 0;
  }

  .resume-card {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    border: none;
  }

  .sidebar {
    padding: 30px 20px;
    background: var(--el-bg-color);
  }

  .main-content {
    padding: 30px 20px;
  }

  .timeline-item {
    padding: 15px !important;
  }
}

@media (max-width: 480px) {
  .sidebar .contact-info {
    grid-template-columns: 1fr;

    .info-item {
      justify-content: flex-start;
    }
  }
}
</style>
