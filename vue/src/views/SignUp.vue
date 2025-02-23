<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-80 transition-all duration-300 hover:shadow-xl">
      <h1 class="text-3xl font-bold mb-6 text-center text-blue-900">Registrierung</h1>
      <form @submit.prevent="signup" class="flex flex-col">
        <div class="mb-4">
          <input 
            v-model="username" 
            type="text" 
            placeholder="Benutzername"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>

        <div class="mb-4">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Passwort"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>

        <div class="mb-6">
          <input 
            v-model="email" 
            type="email" 
            placeholder="beispiel@email.de"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            required
          />
        </div>

        <button 
          type="submit" 
          class="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Konto erstellen
        </button>

        <button 
          type="button" 
          @click="router.push('/Login')"
          class="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Zurück zur Anmeldung
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signUp } from '@/api.js'

const router = useRouter();
const username = ref('');
const password = ref('');
const email = ref('');

const signup = async () => {
  try {
    await signUp(username.value, password.value, email.value);
    alert('Registrierung erfolgreich!');
    router.push('/login');
  } catch (error) {
    alert('Registrierung fehlgeschlagen');
    console.error('Fehler:', error);
  }
};
</script>
