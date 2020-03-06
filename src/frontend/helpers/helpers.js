import * as firebase from 'firebase/app';


// Creates nice names for ALL_CAPS feature types
export const typeNames = {
  LIGHTING: "Lighting",
  WATER_FEATURES: "Water Features",
  GROUND_COVER: "Ground Cover",
  FENCING_AND_PRIVACY: "Fencing and Privacy",
  STRUCTURES: "Structures",
  DECK_MATERIAL: "Deck Material"
}

// Pull data from firestore, 
export const fetchAndParseItemData = async () => {
  const db = firebase.firestore();
  const response = await db.collection('items').get();
  const parsed = normalizeData(response);
  return parsed;
}

// Parse data from database;
export const normalizeData = (response) => {

  const allItems = { 
    LIGHTING: [],
    WATER_FEATURES: [],
    GROUND_COVER: [],
    FENCING_AND_PRIVACY: [],
    STRUCTURES: [],
    DECK_MATERIAL: [],
    OTHER: [],
  };

  response.docs.forEach(doc => {
    
    let newItem = doc.data();
    let allItemsSlice = allItems[newItem.type];

    switch (newItem.type) {

      case "LIGHTING":
        if (uniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "WATER_FEATURES":
        if (uniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "GROUND_COVER":
        if (uniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "FENCING_AND_PRIVACY":
        if (uniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "STRUCTURES":
        if (uniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "DECK_MATERIALS":
        if (uniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      default: 
        allItems.OTHER.push(newItem);
        
    }
  })

  return allItems;
}




// Returns a boolean if the item is already in the list (handles gravel dup problem)
export const uniqueItem = (array, newItem) => {
  const result = array.every(inListItem => {
    return inListItem.name !== newItem.name &&
      inListItem.type !== newItem.type;
  })

  return result;
}


// Adds thousands commas to a number
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
