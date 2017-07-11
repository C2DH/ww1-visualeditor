export const createEmptyModule = (moduleType, languages) => {
  switch (moduleType) {
    case 'text':
      return createEmptyModuleText(languages)
    default:
      throw new Error(`Invalid module type ${moduleType}`)
  }
}

const createEmptyMultilangObj = languages => languages.reduce((r, l) => ({
  ...r,
  [l.code]: '',
}), {})

const createEmptyModuleText = languages => ({
  module: 'text',
  background: {
    color: '#fff',
  },
  text: {
    color: '#fff',
    position: 'center',
    content: createEmptyMultilangObj(languages),
  }
})
