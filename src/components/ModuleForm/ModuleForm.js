import React, { PureComponent } from 'react'
import ModuleFormText from './ModuleFormText'
import ModuleFormObject from './ModuleFormObject'
import ModuleFormGallery from './ModuleFormGallery'
import ModuleFormMap from './ModuleFormMap'
import ModuleFormTextObject from './ModuleFormTextObject'
import ModuleFormTextGallery from './ModuleFormTextGallery'

const getModuleFormComponent = moduleType => {
  switch (moduleType) {
    case 'text':
      return ModuleFormText
    case 'object':
      return ModuleFormObject
    case 'gallery':
      return ModuleFormGallery
    case 'map':
      return ModuleFormMap
    case 'text_object':
      return ModuleFormTextObject
    case 'text_gallery':
      return ModuleFormTextGallery
    default:
      throw new Error(`Invalid module type ${moduleType}`)
  }
}

class ModuleForm extends PureComponent {
  render() {
    const { module, ...passProps } = this.props
    return React.createElement(getModuleFormComponent(module.module), {
      ...passProps,
      initialValues: module,
    })
  }
}

export default ModuleForm
