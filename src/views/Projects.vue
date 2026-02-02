<script setup lang="ts">
import projectsData from '../data/projects.json'
</script>

<template>
  <div class="projects">
    <div
      class="page-header"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
    >
      <h1>开源项目 & 贡献</h1>
      <p>探索我的代码世界，这里展示了我维护的开源项目以及参与贡献的重要仓库。</p>
    </div>

    <el-row :gutter="20">
      <el-col
        :span="12"
        v-for="(project, index) in projectsData"
        :key="index"
        class="col-item"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
      >
        <el-card shadow="hover" class="project-card">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <h3>{{ project.name }}</h3>
                <el-tag :type="project.role === '作者' ? 'primary' : 'success'" size="small" effect="plain">{{ project.role }}</el-tag>
              </div>
              <a :href="project.link" target="_blank" rel="noopener noreferrer" class="github-link">
                <el-button type="primary" link>
                  GitHub <el-icon class="el-icon--right"><TopRight /></el-icon>
                </el-button>
              </a>
            </div>
          </template>

          <p class="description">{{ project.description }}</p>

          <div v-if="project.contributions.length > 0" class="contributions">
            <h4>核心贡献:</h4>
            <ul>
              <li v-for="(item, idx) in project.contributions" :key="idx">{{ item }}</li>
            </ul>
          </div>

          <div class="tags">
            <el-tag v-for="tag in project.tags" :key="tag" size="small" class="tag-item">{{ tag }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.projects {
  .page-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    p {
      color: var(--el-text-color-secondary);
      font-size: 16px;
    }
  }

  .col-item {
    margin-bottom: 20px;
  }

  .project-card {
    height: 100%;
    display: flex;
    flex-direction: column;

    :deep(.el-card__body) {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-left {
        display: flex;
        align-items: center;
        gap: 10px;

        h3 {
          margin: 0;
          font-size: 18px;
        }
      }
    }

    .description {
      color: var(--el-text-color-regular);
      margin-bottom: 20px;
      line-height: 1.5;
      min-height: 48px;
    }

    .contributions {
      margin-bottom: 20px;
      background: var(--el-fill-color-light);
      padding: 10px;
      border-radius: 4px;

      h4 {
        margin: 0 0 10px;
        font-size: 14px;
        color: var(--el-text-color-primary);
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          font-size: 13px;
          color: var(--el-text-color-regular);
          margin-bottom: 4px;
        }
      }
    }

    .tags {
      margin-top: auto;

      .tag-item {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
}
/* Mobile Responsive */
@media (max-width: 768px) {
  .projects {
    padding: 0 10px;

    .page-header {
      margin-bottom: 30px;

      h1 {
        font-size: 26px;
      }

      p {
        font-size: 14px;
        padding: 0 10px;
      }
    }

    .el-col {
      width: 100% !important;
      max-width: 100% !important;
      flex: 0 0 100% !important;
      margin-bottom: 20px;
    }

    .project-card {
      margin: 0 -10px; /* Bleed to edges on very small screens */
      border-radius: 0;
      border-left: none;
      border-right: none;

      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;

        .header-left {
          width: 100%;
          justify-content: space-between;
          align-items: flex-start;

          h3 {
            font-size: 18px;
            white-space: normal;
            line-height: 1.4;
            flex: 1;
            margin-right: 10px;
          }
        }

        .github-link {
          width: 100%;

          .el-button {
            width: 100%;
            justify-content: center;
            background-color: var(--el-fill-color-lighter);
            height: 40px;

            &:hover {
              background-color: var(--el-fill-color);
            }
          }
        }
      }

      .description {
        font-size: 14px;
        margin-bottom: 15px;
      }

      .contributions {
        h4 {
          font-size: 14px;
        }

        ul li {
          font-size: 13px;
        }
      }

      .tags {
        margin-top: 15px;

        .tag-item {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
