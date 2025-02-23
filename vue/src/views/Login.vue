<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-80 transition-all duration-300 hover:shadow-xl">
      <h1 class="text-3xl font-bold mb-6 text-center text-blue-900">Willkommen zurück</h1>
      
      <!-- Status Message -->
      <div v-if="statusMessage" :class="statusType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="p-3 mb-4 rounded-lg text-center">
        {{ statusMessage }}
      </div>

      <form @submit.prevent="loginForm" class="flex flex-col">
        <div class="mb-6">
          <input 
            v-model="formUsername" 
            type="text" 
            placeholder="Benutzername"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>
        <div class="mb-8">
          <input 
            v-model="formPassword"
            type="password" 
            placeholder="Passwort"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>
        <button 
          type="submit" 
          class="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Anmelden
        </button>
      </form>
      <p class="text-center text-gray-500 mt-6 text-sm">
        Noch kein Konto? 
        <button type="button" class="button text-blue-600 hover:text-blue-700 font-medium underline" @click="router.push('/Signup')">Signup</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api.js'; 

const router = useRouter();
const formUsername = ref('');
const formPassword = ref('');
const statusMessage = ref('');
const statusType = ref('');

const loginForm = async () => {
  try {
    const data = await login(formUsername.value, formPassword.value);
    statusMessage.value = 'Login erfolgreich!';
    statusType.value = 'success';
    router.push('/houses');
  } catch (error) {
    statusMessage.value = 'Login fehlgeschlagen';
    statusType.value = 'error';
    console.error('Error:', error);
  }
};
</script>
