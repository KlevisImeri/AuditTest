<template>
  <div class="p-3 mb-20">
    <div v-if="error" class="bg-red-500 text-white p-4 rounded">
      {{ error }}
    </div><div v-else>
      <table id="table" class="report-header"> 
        <thead class="report-header">

          <tr>
            <th colspan="9">
              <div class="flex items-center justify-between font-bold mb-3 p-3">
                <p class="text-lg font-bold mr-2">Kommunikationsbuch</p>
                <div class="flex flex-col items-center">
                  <p class="text-md">Gebäudename: {{ address }}</p>
                  <div class="flex justify-center items-center"> 
                    <p class="text-md">Monat und Jahr: {{ formattedDate }}</p>
                    <p v-if="toGerman[type]" class="text-md ml-20">{{ toGerman[type] }}</p> </div>
                </div>
                <p class="text-md">K-V-I Gebäudemanagement</p>
              </div>
            </th>
          </tr>

          <tr class="bg-gray-100">
            <th class="border px-1">Pos.</th>
            <th class="border px-1">Haus-Nr.</th>
            <th class="border px-1">Raum-Nr.</th>
            <th class="border px-55">Reparatur (Beschreibungstext)</th>
            <th class="border px-1 print:hidden">Typ</th> 
            <th class="border px-1">festgestellt am:</th>
            <th class="border px-5">erledigt am:</th>
            <th class="border px-1">Uhrzeit bei Noteinsatz:</th>
            <th class="border px-4">Anfahrt</th>
            <th class="border px-1">Rückinfo ans Amt</th> 
          </tr>

        </thead>

        <tbody class="report-content">
          <tr v-for="(entry, index) in entries" :key="entry.id" 
            :class="{ 'bg-red-200': entry.deleted, 'bg-gray-200': entry.edited}" >

            <td class="border text-center">{{ index + 1 }}</td>  

            <td class="border text-center">
              <Textarea 
                v-model="entry.houseNumber"
                :wfull="true"
                @input="entry.edited = true"
              />
            </td>

            <td class="border text-center">
              <Textarea 
                v-model="entry.roomNumber" 
                :wfull="true"
                @input="entry.edited = true"
              />
            </td>

            <td class="border">
              <Textarea 
                v-model="entry.repairDescription" 
                @input="entry.edited = true"
              ></Textarea>
            </td>

             <td class="border print:hidden">
              <select v-model.number="entry.type" 
                @input="entry.edited = true">
                <option :value="0">Kommunikationsbuch</option>
                <option :value="1">Belüftung Räume</option>
                <option :value="2">Leitungsspülung von Trinkwasserleitungen</option>
              </select>
            </td>

            <td class="border text-center">
              <input 
                v-model="entry.noticedDate" 
                type="date" 
                class="w-full p-1 print:hidden" 
                @input="entry.edited = true"
              />
              <div class="hidden print:block">{{ formatDateGerman(entry.noticedDate)  }}</div>
            </td>
            
            <td class="border text-center">
              <input 
                v-model="entry.completedDate" 
                type="date" 
                class="w-full p-1 print:hidden" 
                @input="entry.edited = true"
              />
              <div class="hidden print:block">{{ formatDateGerman(entry.completedDate) }}</div>
            </td>

            <td class="border">
              <Textarea 
                v-model="entry.emergencyStartTime" 
                @input="entry.edited = true"
              />
            </td>

            <td class="border">
              <Textarea 
                v-model="entry.travelInfo" 
                @input="entry.edited = true"
              />
            </td>

            <td class="border">
              <Textarea 
                v-model="entry.feedbackToOffice" 
                @input="entry.edited = true"
              />
            </td>

            <td class="text-center px-4 print:hidden">
                <BinIcon class="hover:text-red-500" @click="entry.deleted=!entry.deleted;" />
            </td>

          </tr>
          <tr>
            <td class="border text-center">{{ entries.length + 1 }}</td>
            <td class="border text-center"></td>
            <td class="border text-center"></td>
            <td class="border p-1">Bearbeitet:</td>
            <td class="border print:hidden"></td>
            <td class="border"></td>
            <td class="border"></td>
            <td class="border p-1">Anfahrt</td>
            <td class="border">
              <Textarea 
                v-model="anfahrt"
              />
            </td>
            <td class="border">
              <Textarea v-model="placeholder2" class=" p1" />
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <div class="fixed bottom-0 left-0 ml-4 mb-4 flex space-x-4 z-50">
      <button
        class="print:hidden text-blue-500 hover:text-red-500 transition-colors"
        @click="addNewEntry"
      >
        <AddIcon class="inline-block" />
      </button>
      <button
        class="print:hidden disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        @click="saveChanges"
        :disabled="isSaving"
      >
        <SaveIcon class="text-green-500 hover:text-red-500 inline-block" /> 
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getHouseById, getEntries, updateEntries, deleteEntries } from '@/api.js'
import BinIcon from '../components/icons/Bin.vue'
import SaveIcon from '../components/icons/Save.vue'
import AddIcon from '../components/icons/Add.vue'
import Textarea from '../components/Textarea.vue'

const route = useRoute();
const address = ref('');
const entries = ref([]);
const error = ref<Error | null>(null);
const houseId = route.params.houseId;
const { year, month, day, type } = route.query;
const anfahrt = ref('');
const placeholder2 = ref();
const isSaving = ref(false);
// console.log(year, month, day)
const toGerman = {
  0: undefined,
  1: 'Belüftung Räume',
  2: 'Leitungsspülung von Trinkwasserleitungen',
  // '': 'Alle', //it cant be this
};

const formatDateGerman = (dateString: string) => {
  if (!dateString) return '';
  
  const parts = dateString.split('-');
  if (parts.length !== 3) return '';

  const [year, month, day] = parts;
  const paddedDay = day.padStart(2, '0');
  const paddedMonth = month.padStart(2, '0');

  return `${paddedDay}.${paddedMonth}.${year}`;
};

//You dont need to validate but we did a dumb validation Houses.vue has better valiadation
const formattedDate = computed(() => {
  const parts = [];

  if (day) {
    const dayNum = Number(day);
    if (!isNaN(dayNum)) {
      const isValidDay = dayNum >= 1 && dayNum <= 31;
      if (isValidDay) parts.push(dayNum.toString());
    }
  }

  if (month) {
    const monthNum = Number(month);
    if (!isNaN(monthNum)) {
      const isValidMonth = monthNum >= 1 && monthNum <= 12;
      if (isValidMonth) {
        const formatter = new Intl.DateTimeFormat('de-DE', { month: 'long' });
        const dummyDate = new Date(2000, monthNum - 1, 1);
        parts.push(formatter.format(dummyDate));
      }
    }
  }

  if (year) {
    const yearNum = Number(year);
    if (!isNaN(yearNum)) {
      parts.push(yearNum.toString());
    }
  }

  return parts.join(' ');
});

onMounted(async () => {
  try {
    if (houseId) {
      const house = await getHouseById(houseId);
      address.value = house.address;
    }
    console.debug(houseId, year, month, day, type);
    entries.value = await getEntries(houseId, year, month, day, type);
    entries.value.forEach(entry => entry.edited = false);
    console.debug("Entries: ", entries.value)
  } catch (err) {
    error.value = err as Error;
    console.error(err);
  }
});

onUnmounted(async () => {
  await saveChanges();
});

const saveChanges = async () => {
  if (isSaving.value) return;
  isSaving.value = true;

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
    entries.value = await getEntries(houseId, year, month, day, type);
    entries.value.forEach(entry => entry.edited = false);

  } catch (err) {
    error.value = err as Error;
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};

const addNewEntry = async () => {  
  const newEntry = {
    houseId: Number(houseId), 
    year: Number(year),
    month: Number(month),
    day: Number(day),
    houseNumber: '',
    roomNumber: '',
    repairDescription: '',
    type: Number(type),
    noticedDate: '',
    completedDate: '',
    emergencyStartTime: '',
    travelInfo: '',
    feedbackToOffice: '',
    edited: true
  };
  console.log(newEntry);

  entries.value.push(newEntry);


  await nextTick();
  const table = document.getElementById('table');
  window.scrollTo({
    top: table.scrollHeight,
    left: 0,  
    behavior: "smooth"
  });
};

onUnmounted(() => {
  saveChanges().catch(error => {
    console.error("Error saving changes on unmount:", error);
  });
});
</script>

<style>
@media print {
  .report-header {
    display: table-header-group;
  }
  
  table.report-container {
    page-break-after: always;
    width: 100% !important;
  }
  
  /* Ensure header doesn't get cut off between pages */
  thead.report-header th {
    break-inside: avoid;
  }
}
</style>
