import React, { PureComponent } from 'react'
import ModuleFormText from './ModuleFormText'

class ModuleForm extends PureComponent {
  render() {
    const { module } = this.props
    switch (module.module) {
      case 'text':
        return <ModuleFormText initialValues={module} />
      default:
        throw new Error('Invalid module')
    }
  }
}

export default ModuleForm
