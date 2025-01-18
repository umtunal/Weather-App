import { defineStore } from 'pinia'
import axios from 'axios' 
const API_KEY = 'c315f75893da0ded9a6031b2ed822a75' // OpenWeatherMap API anahtarınız
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
export const useWeatherStore = defineStore('weather', {
  state: () => ({
    currentWeather: null,
    searchHistory: [],
    loading: false,
    error: null,
    comparisonCities: []
  }),

  actions: {
    async fetchWeather(city) {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.get(`${BASE_URL}/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
          }
        })

        this.currentWeather = response.data
        this.addToSearchHistory(city)
      } catch (error) {
        this.error = 'Şehir bulunamadı veya bir hata oluştu'
        console.error('Hata:', error)
      } finally {
        this.loading = false
      }
    },

    addToSearchHistory(city) {
      if (!this.searchHistory.includes(city)) {
        this.searchHistory.push(city)
        if (this.searchHistory.length > 5) {
          this.searchHistory.shift()
        }
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      }
    },

    loadSearchHistory() {
      const history = localStorage.getItem('searchHistory')
      if (history) {
        this.searchHistory = JSON.parse(history)
      }
    }
  }
}) 