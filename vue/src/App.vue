<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { validateToken } from "@/api.js"

const router = useRouter();

const checkToken = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const data = await validateToken();
      router.push(`/${data.username}`);
    } catch (error) {
      router.push('/login');
    }
  } else {
    router.push('/login');
  }
};

onMounted(() => {
  checkToken();
});
</script>
