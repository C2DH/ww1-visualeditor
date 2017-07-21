export const createEmptyModule = (moduleType, languages) => {
  switch (moduleType) {
    case 'text':
      return createEmptyModuleText(languages)
    case 'object':
      return createEmptyModuleObject(languages)
    default:
      throw new Error(`Invalid module type ${moduleType}`)
  }
}

const createEmptyMultilangObj = (languages, term = '') => languages.reduce((r, l) => ({
  ...r,
  [l.code]: term,
}), {})

const createEmptyModuleText = languages => ({
  module: 'text',
  background: {
    object: {},
  },
  text: {
    color: '#000',
    position: 'center',
    content: createEmptyMultilangObj(languages, 'Hello I am module text!'),
  }
})

const createEmptyModuleObject = languages => ({
  module: 'object',
  background: {
    object: {},
  },
  type: 'image',
  position: 'center',
  size: 'medium',
  caption: createEmptyMultilangObj(languages, 'Hello I am module object!'),
})
