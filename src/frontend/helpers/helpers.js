import * as firebase from 'firebase/app';


// Creates nice names for ALL_CAPS feature types
export const typeToNiceLabel = {
  LIGHTING: "Lighting",
  WATER_FEATURES: "Water Features",
  GROUND_COVER: "Ground Cover",
  FENCING_AND_PRIVACY: "Fencing and Privacy",
  STRUCTURES: "Structures",
  DECK_MATERIAL: "Deck Material"
}

// Pull data from firestore, parse using helper below
export const fetchAndParseItemData = async () => {
  const db = firebase.firestore();
  const response = await db.collection('items').get();
  const parsed = normalizeData(response);
  return parsed;
}

// Parse data from database;
export const normalizeData = response => {

  const allItems = { 
    LIGHTING: [],
    WATER_FEATURES: [],
    GROUND_COVER: [],
    FENCING_AND_PRIVACY: [],
    STRUCTURES: [],
    DECK_MATERIAL: [],
    OTHER: [],
  };

  // categorize data by type
  response.docs.forEach(doc => {
    
    let newItem = doc.data();
    let allItemsSlice = allItems[newItem.type];

    switch (newItem.type) {

      case "LIGHTING":        
        if (isUniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "WATER_FEATURES":
        if (isUniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "GROUND_COVER":
        if (isUniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "FENCING_AND_PRIVACY":
        if (isUniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "STRUCTURES":
        if (isUniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      case "DECK_MATERIAL":
        if (isUniqueItem(allItemsSlice, newItem)) {
          allItemsSlice.push(newItem);
        }
        break;

      default: 
        allItems.OTHER.push(newItem);
        
    }
  })

  // Sort data by high price
  for (let type in allItems) {
    allItems[type].sort((a, b) => parseInt(a.highPrice) - parseInt(b.highPrice))
  }

  return allItems;
}

// Creates checkbox keys
export const createCheckboxKeys = allItems => {
  
  const allItemCheckBoxes = {};

  for (let type in allItems) {
    allItems[type].forEach(item => {
      let key = `${item.type},${item.name},${item.lowPrice},${item.highPrice}`;
      allItemCheckBoxes[key] = false;
    })
  }

  return allItemCheckBoxes;
}


// Returns a boolean if the item is already in the list (handles gravel dup problem)
export const isUniqueItem = (array, newItem) => {
  const result = array.every(inListItem => {
    return inListItem.name !== newItem.name
  })

  return result;
}


// Adds thousands commas to a number
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
