<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { validateToken } from '@/api.js';

const router = useRouter();

const checkToken = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/login');
    return;
  }

  try {
    const data = await validateToken();
    const query = {};

    if (data.houseId != -1) {
      if (data.todayOnly) {
        const today = new Date();
        query.year = today.getFullYear();
        query.month = String(today.getMonth() + 1).padStart(2, '0');
        query.day = String(today.getDate()).padStart(2, '0');
      }
      router.push({ path: `/houses/${data.houseId}`, query });
    } else {
      router.push({ path: `/houses/`, query });
    }
  } catch (error) {
    router.push('/login');
  }
};

onMounted(() => {
  checkToken();
});
</script>
