<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Homes</h1>
    <div v-if="error" class="bg-red-500 text-white p-4 rounded">
      {{ error }}
    </div>
    <div v-else>
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">House ID</th>
            <th class="border px-4 py-2">House Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="house in houses" :key="house.HouseID" class="border-b">
            <td class="border px-4 py-2">{{ house.HouseID }}</td>
            <td class="border px-4 py-2">{{ house.HouseNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { DBHouses } from '@/db'; // Correct import path

const houses = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    houses.value = await DBHouses();
  } catch (err) {
    console.error('Error fetching houses:', err);
    error.value = err.message;
  }
});
</script>