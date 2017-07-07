export const SAVE_CROP_BBOX = 'SAVE_CROP_BBOX'
export const BBOX_CROP_UNLOAD = 'BBOX_CROP_UNLOAD'

export const saveCropBbox = bbox => ({
  type: SAVE_CROP_BBOX,
  payload: bbox,
})

export const unloadBboxCrop = () => ({
  type: BBOX_CROP_UNLOAD,
})
