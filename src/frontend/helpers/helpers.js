

// Creates nice names for feature types
export const typeNames = {
  LIGHTING: "Lighting",
  WATER_FEATURES: "Water Features",
  GROUND_COVER: "Ground Cover",
  FENCING_AND_PRIVACY: "Fencing and Privacy",
  STRUCTURES: "Structures",
  DECK_MATERIAL: "Deck Material"
}


// Returns a boolean if the item is already in the list (handles gravel dup problem)
export const itemContainedInItemList = (array, newItem) => {
  const result = array.some(inListItem => {
    return inListItem.name === newItem.name &&
      inListItem.type === newItem.type;
  })

  return result;
}


// Adds thousands commas to a number
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
