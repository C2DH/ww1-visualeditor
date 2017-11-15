import { DEFAULT_BG_COLOR } from '../state/consts'

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
    case 'text_gallery':
      return createEmptyModuleTextGallery(languages)
    case 'text_map':
      return createEmptyModuleTextMap(languages)
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
    color: DEFAULT_BG_COLOR,
  },
  text: {
    color: '#000',
    position: 'center',
    content: createEmptyMultilangObj(languages, ''),
  }
})

const createEmptyModuleObject = languages => ({
  module: 'object',
  background: {
    color: DEFAULT_BG_COLOR,
  },
  type: 'image',
  position: 'center',
  size: 'medium',
  caption: createEmptyMultilangObj(languages, ''),
})

const createEmptyModuleGallery = languages => ({
  module: 'gallery',
  background: {
    color: DEFAULT_BG_COLOR,
  },
  objects: [],
  layout: 'grid',
  caption: createEmptyMultilangObj(languages, ''),
})

const createEmptyModuleMap = languages => ({
  module: 'map',
  background: {},
  objects: [],
  caption: createEmptyMultilangObj(languages, ''),
})

const createEmptyModuleTextObject = languages => ({
  module: 'text_object',
  background: {
    color: DEFAULT_BG_COLOR,
  },
  text: {
    color: '#000',
    content: createEmptyMultilangObj(languages, ''),
  },
  object: {
    type: 'image',
    caption: createEmptyMultilangObj(languages, ''),
  },
  layout: 'text-object'
})

const createEmptyModuleTextGallery = languages => ({
  module: 'text_gallery',
  background: {
    color: DEFAULT_BG_COLOR,
  },
  text: {
    color: '#000',
    content: createEmptyMultilangObj(languages, ''),
  },
  gallery: {
    objects: [],
    layout: 'grid',
    caption: createEmptyMultilangObj(languages, ''),
  },
  layout: 'text-gallery'
})

const createEmptyModuleTextMap = languages => ({
  module: 'text_map',
  background: {
    color: DEFAULT_BG_COLOR,
  },
  text: {
    color: '#000',
    content: createEmptyMultilangObj(languages, ''),
  },
  map: {
    objects: [],
  },
  layout: 'text-map'
})
