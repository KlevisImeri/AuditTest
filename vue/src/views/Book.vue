<template>
  <div class="p-3">

    <div class="flex items-center justify-between font-bold mb-3">
      <p class="text-lg font-bold mr-2">Kommunikationsbuch</p>
      <div class="flex flex-col items-center">
        <p class="text-md">Gebäudename: {{address}}</p>
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
          <tr v-for="(entry, index) in entries" :key="entry.id" class="text-center" 
            :class="{ 'bg-red-200': entry.deleted, 'bg-gray-200': entry.edited}" >

            <td class="border text-center">{{ index + 1 }}</td>  <td class="border text-center">
              <input 
                v-model="entry.houseNumber" 
                class="w-full p-1" 
                @input="entry.edited = true"
              />
            </td>
            <td class="border text-center">
              <input 
                v-model="entry.roomNumber" 
                class="w-full p-1" 
                @input="entry.edited = true"
              />
            </td>
            <td class="border">
              <textarea 
                v-model="entry.repairDescription" 
                class="w-full p-1" 
                @input="entry.edited = true"
              ></textarea>
            </td>
            <td class="border">
              <input 
                v-model="entry.noticedDate" 
                type="date" 
                class="w-full p-1 print:hidden" 
                @input="entry.edited = true"
              />
              <div class="hidden print:block">{{ entry.noticedDate }}</div>
            </td>
            <td class="border">
              <input 
                v-model="entry.completedDate" 
                type="date" 
                class="w-full p-1 print:hidden" 
                @input="entry.edited = true"
              />
              <div class="hidden print:block">{{ entry.completedDate }}</div>
            </td>
            <td class="border">
              <input 
                v-model="entry.emergencyStartTime" 
                class="w-full p-1" 
                @input="entry.edited = true"
              />
            </td>
            <td class="border">
              <input 
                v-model="entry.travelInfo" 
                class="w-full p-1" 
                @input="entry.edited = true"
              />
            </td>
            <td class="border">
              <input 
                v-model="entry.feedbackToOffice" 
                class="w-full p-1" 
                @input="entry.edited = true"
              />
            </td>

            <td class="text-center px-4 print:hidden">
                <BinIcon class="hover:text-red-500" @click="entry.deleted=!entry.deleted;" />
            </td>

          </tr>
          <tr>
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
          </tr>

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
import { ref, onMounted, computed, onUnmounted} from 'vue'
import { useRoute } from 'vue-router'
import { getHouseById, getEntries, updateEntries, deleteEntries } from '@/api.js'
import BinIcon from '../components/icons/Bin.vue'
import SaveIcon from '../components/icons/Save.vue'
import AddIcon from '../components/icons/Add.vue'

const route = useRoute();
const address = ref('');
const entries = ref([]);
const error = ref<string | null>(null);
const houseId = route.params.houseId;
const { year, month, day } = route.query;

const formattedDate = computed(() => {
  if (year && month && day) {
    const date = new Date(Number(year), Number(month) - 1, Number(day)); // Month is 0-indexed
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  return '';
});

onMounted(async () => {
  try {
    if (houseId) {
      const house = await getHouseById(houseId);
      address.value = house.address;
    }
    entries.value = await getEntries(houseId, year, month, day);
    entries.value.forEach(entry => entry.edited = false);
    // console.debug(entries)
  } catch (err) {
    error.value = 'Failed to load data.';
    console.error(err);
  }
});

const saveChanges = async () => {
  try {
    if(entries.value.length === 0) return;
    const entriesToDelete = entries.value.filter(entry => entry.deleted);
    const idsToDelete = []; // Array to hold IDs *only* for API call

    entriesToDelete.forEach(entry => {
        if (entry.id) { // Check if ID exists *before* adding to array
            idsToDelete.push(entry.id);
        }
    });
    if (idsToDelete.length > 0) {
      await deleteEntries(idsToDelete);
      // console.log(entries)
    }
    entries.value = entries.value.filter(entry => !entry.deleted);
    const editedEntries = entries.value.filter(entry => entry.edited);
    if (editedEntries.length > 0) {
      await updateEntries(editedEntries);
    }
    entries.value = await getEntries(houseId, year, month, day);
    entries.value.forEach(entry => entry.edited = false);

  } catch (err) {
    error.value = 'Failed to save changes.';
    console.error(err);
  }
};

const addNewEntry = () => {  
  const newEntry = {
    houseId: Number(houseId), 
    year: Number(year),
    month: Number(month),
    day: Number(day),
    houseNumber: '',
    roomNumber: '',
    repairDescription: '',
    noticedDate: '',
    completedDate: '',
    emergencyStartTime: '',
    travelInfo: '',
    feedbackToOffice: '',
    edited: true
  };
  console.log(newEntry);

  entries.value.push(newEntry);
};

onUnmounted(() => {
  saveChanges().catch(error => {
    console.error("Error saving changes on unmount:", error);
  });
});
</script>
