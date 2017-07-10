export const TRANSLATE_UNLOAD = 'TRANSLATE_UNLOAD'
export const SAVE_TRANSLATIONS = 'SAVE_TRANSLATIONS'

export const saveTranslations = (key, values) => ({
  type: SAVE_TRANSLATIONS,
  payload: { key, values },
})

export const unloadTranslate = () => ({
  type: TRANSLATE_UNLOAD,
})
