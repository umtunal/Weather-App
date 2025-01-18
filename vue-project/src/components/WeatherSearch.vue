<template>
  <div class="max-w-md mx-auto p-4">
    <form @submit.prevent="searchWeather" class="mb-4">
      <div class="flex gap-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Şehir adı giriniz..."
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
        >
          {{ loading ? 'Aranıyor...' : 'Ara' }}
        </button>
      </div>
    </form>

    <div v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </div>

    <div v-if="currentWeather" class="bg-white rounded-lg shadow-lg p-4">
      <h2 class="text-2xl font-bold mb-4">{{ currentWeather.name }}</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <p class="text-4xl font-bold">{{ Math.round(currentWeather.main.temp) }}°C</p>
          <p class="text-gray-500">{{ currentWeather.weather[0].description }}</p>
        </div>
        <div class="space-y-2">
          <p>Nem: {{ currentWeather.main.humidity }}%</p>
          <p>Rüzgar: {{ currentWeather.wind.speed }} m/s</p>
        </div>
      </div>
    </div>

    <div v-if="searchHistory.length" class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Son Aramalar</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="city in searchHistory"
          :key="city"
          @click="searchCity(city)"
          class="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          {{ city }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '../stores/weather'
import { storeToRefs } from 'pinia'

const store = useWeatherStore()
const searchQuery = ref('')
const { currentWeather, loading, error, searchHistory } = storeToRefs(store)

const searchWeather = async () => {
  if (searchQuery.value.trim()) {
    await store.fetchWeather(searchQuery.value.trim())
    searchQuery.value = ''
  }
}

const searchCity = (city) => {
  searchQuery.value = city
  searchWeather()
}

onMounted(() => {
  store.loadSearchHistory()
})
</script> 