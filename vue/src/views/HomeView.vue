<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Gebäude</h1>
    <div v-if="error" class="bg-red-500 text-white p-4 rounded">
      {{ error }}
    </div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="house in houses"
          :key="house.ID"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
          @click="viewBook(house.address)"
        >
          <div class="text-lg font-semibold text-gray-800 truncate">
            {{ house.address }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHouses } from '@/api.js';


const router = useRouter()
const houses = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    houses.value = await getHouses()

    console.log('Houses:', houses.value)
  } catch (err) {
    console.error('Error fetching houses:', err)
    error.value = err.message
  }
})

const viewBook = (houseAddress: number) => {
  const today = new Date().toISOString().split('T')[0]
  router.push({
    name: 'CommunicationBook',
    params: { houseAddress, date: today }
  })
}
</script>
