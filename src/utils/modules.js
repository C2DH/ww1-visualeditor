export const createEmptyModule = (moduleType, languages) => {
  switch (moduleType) {
    case 'text':
      return createEmptyModuleText(languages)
    case 'object':
      return createEmptyModuleObject(languages)
    case 'gallery':
      return createEmptyModuleGallery(languages)
    case 'map':
      return createEmptyModuleMap(languages)
    case 'text_object':
      return createEmptyModuleTextObject(languages)
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

const createEmptyModuleGallery = languages => ({
  module: 'gallery',
  background: {
    object: {},
  },
  objects: [],
  layout: 'grid',
  caption: createEmptyMultilangObj(languages, 'Hello I am module gallery!'),
})

const createEmptyModuleMap = languages => ({
  module: 'map',
  background: {
    object: {},
  },
  objects: [],
  caption: createEmptyMultilangObj(languages, 'Hello I am module map!'),
})

const createEmptyModuleTextObject = languages => ({
  module: 'text_object',
  background: {
    object: {},
  },
  text: {
    color: '#000',
    content: createEmptyMultilangObj(languages, 'Hello I am module text object! Cekka'),
  },
  object: {
    type: 'image',
    size: 'medium',
    caption: createEmptyMultilangObj(languages, 'Caption!'),
  },
  layout: 'text-object'
})
