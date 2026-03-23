import { ref, computed } from 'vue'
import nl from '../assets/lang/nl.json'
import en from '../assets/lang/en.json'

// Global state for language
const currentLang = ref(localStorage.getItem('language') || 'nl')
const translations = { nl, en }

export function useLang() {
  const setLang = (lang) => {
    currentLang.value = lang
    localStorage.setItem('language', lang)
  }

  // Computed property updates instantly when language changes
  const t = computed(() => translations[currentLang.value])

  return { currentLang, setLang, t }
}