<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-80 transition-all duration-300 hover:shadow-xl">
      <h1 class="text-3xl font-bold mb-6 text-center text-blue-900">Registrierung</h1>

      <!-- Status Message -->
      <div v-if="statusMessage" :class="statusType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="p-3 mb-4 rounded-lg text-center">
        {{ statusMessage }}
      </div>

      <form @submit.prevent="signup" class="flex flex-col">
        <!-- Username -->
        <div class="mb-4">
          <input 
            v-model="username" 
            type="text" 
            placeholder="Benutzername"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <!-- Password -->
        <div class="mb-4">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Passwort"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <!-- Email -->
        <div class="mb-6">
          <input 
            v-model="email" 
            type="email" 
            placeholder="beispiel@email.de"
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <!-- Select House -->
        <div class="mb-4">
          <select 
            v-model="selectedHouse" 
            class="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            required>
            <option value="" disabled>Wähle ein Haus</option>
            <option :value="-1">Alle</option>
            <option v-for="house in houses" :key="house.id" :value="house.id">
              {{ house.address }}
            </option>
          </select>
        </div>
        <!-- Today Only Checkbox -->
        <div class="mb-6 flex items-center">
          <input 
            type="checkbox" 
            v-model="todayOnly" 
            id="todayOnly" 
            class="mr-2"
          />
          <label for="todayOnly" class="text-gray-700">Nur heute</label>
        </div>
        <!-- Submit Button -->
        <button 
          type="submit" 
          class="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none">
          Konto erstellen
        </button>
        <!-- Back Button -->
        <button 
          type="button" 
          @click="router.push('/Login')"
          class="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg focus:outline-none">
          Zurück zur Anmeldung
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { signUp, getHouses } from '@/api.js';

const router = useRouter();
const username = ref('');
const password = ref('');
const email = ref('');
const houses = ref([]);
const selectedHouse = ref('');
const todayOnly = ref(true);
const statusMessage = ref('');
const statusType = ref(''); // 'success' or 'error'

const signup = async () => {
  try {
    await signUp(username.value, password.value, email.value, selectedHouse.value, todayOnly.value);
    statusMessage.value = 'Registrierung erfolgreich!';
    statusType.value = 'success';
    setTimeout(() => router.push('/login'), 1000);
  } catch (error) {
    statusMessage.value = 'Registrierung fehlgeschlagen';
    statusType.value = 'error';
    console.error('Fehler:', error);
  }
};

onMounted(async () => {
  houses.value = await getHouses();
});
</script>
