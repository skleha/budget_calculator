




// Helper function, returns a boolean if the item is already in the list (handles gravel dup problem)
export const itemContainedInItemList = (array, newItem) => {
  const result = array.some(inListItem => {
    return inListItem.name === newItem.name &&
      inListItem.type === newItem.type;
  })

  return result;
}


// Helper function, adds thousands commas to a number
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
