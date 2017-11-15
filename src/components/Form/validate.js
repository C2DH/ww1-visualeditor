import { some } from 'lodash'

export const required = value => value ? undefined : 'Field required'

// At least one lang must be filled...
export const requiredAtLeastOne = value => {
  if (some(value)) {
    return undefined
  }
  return 'At least one translaton is required'
}

export const notAnEmptyList = value => {
  if (value && value.length > 0) {
    return undefined
  }
  return 'Insert at least one item'
}
