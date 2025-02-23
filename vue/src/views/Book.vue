<template>
  <div class="p-3">

    <div class="flex items-center justify-between font-bold mb-3">
      <p class="text-lg font-bold mr-2">Kommunikationsbuch</p>
      <div class="flex flex-col items-center">
        <p class="text-md">Gebäudename: WERFEWEG 15</p>
        <p class="text-md text-right">Monat und Jahr: {{formattedDate}}</p>
      </div>
      <p class="text-md">K-V-I Gebäudemanagement</p>
    </div>


    <div v-if="error" class="bg-red-500 text-white p-4 rounded">
      {{ error }}
    </div>

    <div v-else>

      <table>
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-1">Pos.</th>
            <th class="border px-1">Haus-Nr.</th>
            <th class="border px-1">Raum-Nr.</th>
            <th class="border px-55">Reparatur (Beschreibungstext)</th>
            <th class="border px-1">festgestellt am:</th>
            <th class="border px-5">erledigt am:</th>
            <th class="border px-1">Uhrzeit bei Notleinsatz:</th>
            <th class="border px-1">Anfahrt</th>
            <th class="border px-1">Rückinfo ans Amt</th> 
          </tr>
        </thead>

        <tbody>
          <tr v-for="(entry, index) in entries" :key="entry.ID" class="text-center">

            <td class="border text-center">
              {{ index + 1 }}
            </td>
            <td class="border text-center">
              <input v-model="entry.houseNumber" type="number" class="w-full p-1" />
            </td>
            <td class="border text-center">
              <input v-model="entry.roomNumber" type="number" class="w-full p-1" />
            </td>
            <td class="border">
              <textarea v-model="entry.repairDescription" class="w-full p-1"></textarea>
            </td>
            <td class="border">
              <input v-model="entry.noticedDate" type="date" class="w-full p-1 print:hidden" />
              <div class="hidden print:block">{{ entry.noticedDate }}</div>
            </td>
            <td class="border">
              <input v-model="entry.completedDate" type="date" class="w-full p-1 print:hidden" />
              <div class="hidden print:block">{{ entry.completedDate }}</div>
            </td>
            <td class="border">
              <input v-model="entry.emergencyStartTime" class="w-full p-1" />
            </td>
            <td class="border">
              <input v-model="entry.travelInfo" class="w-full p-1" />
            </td>
            <td class="border">
              <input v-model="entry.feedbackToOffice" class="w-full p-1" />
            </td>
            <td class="text-center px-4 print:hidden">
              <BinIcon class="hover:text-red-500"/>
            </td>


          </tr>

            <td class="border text-center">
              {{ entries.length + 1 }}
            </td>
            <td class="border text-center">
            </td>
            <td class="border text-center">
            </td>
            <td class="border p-1">
              Bearbeitet:
            </td>
            <td class="border">
            </td>
            <td class="border">
            </td>
            <td class="border p-1">
              Anfahrt
            </td>
            <td class="border">
              <input class="w-full p1" />
            </td>
            <td class="border">
              <input class="w-full p1" />
            </td>
        </tbody>

      </table>
    </div>
    <div class="mt-4 flex">
      <AddIcon class="text-blue-500 hover:text-red-500 print:hidden" @click="addNewEntry" />
      <SaveIcon class="text-green-500 hover:text-red-500 print:hidden" @click="saveChanges" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBook, getEntriesByBookId } from '@/api.js'
import BinIcon from '../components/icons/Bin.vue'
import SaveIcon from '../components/icons/Save.vue'
import AddIcon from '../components/icons/Add.vue'

const route = useRoute()
const houseAddress = route.params.houseAddress as string
console.log('House Address:', houseAddress)
const entries = ref([])
const error = ref(null)
// const currentDate = new Date()
const currentDate = new Date(2024, 6, 1)

const formattedDate = computed(() => {
  return currentDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const saveChanges = () => {

}

const addNewEntry = () => {
  const newEntry = {
    houseNumber: null,
    roomNumber: null,
    repairDescription: '',
    noticedDate: '',
    completedDate: '', 
    emergencyStartTime: '', 
    travelInfo: '', 
    feedbackToOffice: '',
  };

  entries.value.push(newEntry);
};

onMounted(async () => {
  try {
    const book = await getBook(
      houseAddress,
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    )
    console.log('Book:', book)

    entries.value = await getEntriesByBookId(book.id)
    console.log('Entries:', entries.value)
  } catch (err) {
    error.value = err.message
  }
})
</script>

