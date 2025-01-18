<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-primary text-white py-4">
      <div class="container mx-auto px-4">
        <h1 
          class="text-2xl font-bold cursor-pointer hover:text-gray-300 transition-colors" 
          @click="refreshPage"
        >
          Hava Durumu
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <WeatherSearch />
    </main>
  </div>
</template>

<script setup>
import WeatherSearch from './components/WeatherSearch.vue'

const refreshPage = () => {
  window.location.reload()
}
</script> 