
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Gebäude</h1>
    <div v-if="error" class="bg-red-500 text-white p-4 rounded mb-4">
      {{ error }}
    </div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="house in houses"
          :key="house.id"
          class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
          @click="openModal(house.id)"
        >
          <div class="text-lg font-semibold text-gray-800 truncate">
            {{ house.address }}
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white bg-opacity-90 rounded-lg p-6 w-96 shadow-lg transition-transform transform scale-100 hover:scale-105">
        <h2 class="text-xl font-bold mb-4 text-center">Enter Date</h2>
        <input
          v-model="year"
          type="number"
          placeholder="Jahr"
          class="border p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'bg-red-200': yearError}"
          @input="validateYear"
        />

        <input
          v-model="month"
          type="number"
          placeholder="Monat"
          class="border p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'bg-red-200': monthError}"
          @input="validateMonth"
        />

        <input
          v-model="day"
          type="number"
          placeholder="Tag"
          class="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'bg-red-200': dayError}"
          @input="validateDay"
        />

        <select v-model="entryType" class="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Alle</option>
          <option :value="0">Kommunikationsbuch</option>
          <option :value="1">Belüftung Räume</option>
          <option :value="2">Leitungsspülung von Trinkwasserleitungen</option>
        </select>

        <div class="flex justify-between">
          <button @click="submitData" class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
            Submit
          </button>
          <button @click="closeModal" class="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHouses } from '@/api.js'

const router = useRouter()
const houses = ref([])
const error = ref(null)
const isModalOpen = ref(false)
const year = ref('')
const month = ref('')
const day = ref('')
let selectedHouseId = ref(-1)
let entryType = ref("")

const yearError = ref(false)
const monthError = ref(false)
const dayError = ref(false)



onMounted(async () => {
  try {
    houses.value = await getHouses()
    console.log('Houses:', houses.value)

    // Set default values to current date
    const today = new Date()
    year.value = today.getFullYear().toString()
    month.value = (today.getMonth() + 1).toString()
    day.value = today.getDate().toString()
  } catch (err) {
    console.error('Error fetching houses:', err)
    error.value = err.message
  }
})

const openModal = (houseId: number) => {
  selectedHouseId.value = houseId
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  const today = new Date()
  year.value = today.getFullYear().toString()
  month.value = (today.getMonth() + 1).toString()
  day.value = today.getDate().toString()
  yearError.value = false
  monthError.value = false
  dayError.value = false
}

const validateYear = () => {
  const yearValue = parseInt(year.value)
  yearError.value = year.value && (isNaN(yearValue) || yearValue < 1900 || yearValue > new Date().getFullYear() + 10)
}

const validateMonth = () => {
  const monthValue = parseInt(month.value)
  monthError.value = month.value && (isNaN(monthValue) || monthValue < 1 || monthValue > 12)
}

const validateDay = () => {
  const dayValue = parseInt(day.value)
  const monthValue = parseInt(month.value) || new Date().getMonth() + 1
  const yearValue = parseInt(year.value) || new Date().getFullYear()

  const isValidDay = (monthValue === 2)
    ? (dayValue > 0 && dayValue <= (isLeapYear(yearValue) ? 29 : 28))
    : ([4, 6, 9, 11].includes(monthValue) ? dayValue > 0 && dayValue <= 30 : dayValue > 0 && dayValue <= 31)

  dayError.value = day.value && !isValidDay
}

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

const submitData = async () => {
  if (yearError.value || monthError.value || dayError.value) {
    return // Prevent submission if there are validation errors
  }

  try {
    const query = {
      year: year.value ? parseInt(year.value) : undefined,
      month: month.value ? parseInt(month.value) : undefined,
      day: day.value ? parseInt(day.value) : undefined,
      type: entryType.value ? parseInt(entryType.value) : undefined,
    }
    
    await router.push({ path: `/houses/${selectedHouseId.value}`, query })

    closeModal()
  } catch (error) {
    console.error('Error during submission:', error)
    router.push('/login')
  }
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.bg-opacity-90 {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
