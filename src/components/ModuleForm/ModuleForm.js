import React, { PureComponent } from 'react'
import ModuleFormText from './ModuleFormText'

const getModuleFormComponent = moduleType => {
  switch (moduleType) {
    case 'text':
      return ModuleFormText
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
