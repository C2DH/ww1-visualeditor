import { some } from 'lodash'

// At least one lang must be filled...
export const requiredAtLeastOne = value => {
  if (some(value)) {
    return undefined
  }
  return 'At least one translaton is required'
}
