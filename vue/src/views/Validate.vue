<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-8">
      <!-- Animated spinner -->
      <div class="flex items-center justify-center">
        <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <!-- Loading text -->
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-gray-900">Loading Application</h1>
        <p class="text-gray-600">Checking authentication status...</p>
      </div>

      <!-- Optional decorative elements -->
      <div class="flex items-center justify-center space-x-2 text-gray-400">
        <div class="h-2 w-2 bg-current rounded-full animate-bounce"></div>
        <div class="h-2 w-2 bg-current rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="h-2 w-2 bg-current rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { validateToken } from '@/api.js';

const router = useRouter();
router.push('/login');

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
        // query.day = String(today.getDate()).padStart(2, '0');
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
