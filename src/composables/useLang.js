import { ref, computed } from 'vue'
import nl from '../content/nl/index.js'
import en from '../content/en/index.js'

// Global state for language
const getInitialLang = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('language') || 'nl'
  }
  return 'nl'
}

const currentLang = ref(getInitialLang())
const translations = { nl, en }

export function useLang() {
  const setLang = (lang) => {
    currentLang.value = lang
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', lang)
    }
  }

  // Computed property updates instantly when language changes
  const t = computed(() => translations[currentLang.value])

  return { currentLang, setLang, t }
}