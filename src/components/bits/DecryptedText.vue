<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps<{
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  characterSet?: string;
  iterations?: number;
}>();

const defaultCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";
const characters = computed(() => props.characterSet || defaultCharacterSet);
const displayText = ref(props.text);
const isAnimating = ref(false);

const scramble = async () => {
  if (isAnimating.value) return;
  isAnimating.value = true;

  // const steps = props.iterations || 10;
  const frameRate = 30;
  const duration = props.duration || 800;
  const delay = props.delay || 0;

  await new Promise((resolve) => setTimeout(resolve, delay));

  const length = props.text.length;
  let frame = 0;
  const totalFrames = Math.round(duration / (1000 / frameRate));

  const interval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    let result = "";

    for (let i = 0; i < length; i++) {
      if (progress >= 1 || i < Math.floor(progress * length)) {
        result += props.text[i];
      } else {
        result += characters.value[Math.floor(Math.random() * characters.value.length)];
      }
    }

    displayText.value = result;

    if (frame >= totalFrames) {
      clearInterval(interval);
      displayText.value = props.text;
      isAnimating.value = false;
    }
  }, 1000 / frameRate);
};

onMounted(() => {
  scramble();
});

watch(
  () => props.text,
  () => {
    scramble();
  }
);
</script>

<template>
  <span :class="['decrypted-text', className]">{{ displayText }}</span>
</template>

<style scoped>
.decrypted-text {
  display: inline-block;
  font-family: monospace; /* Monospace works best for scrambling effect */
  white-space: pre;
}
</style>