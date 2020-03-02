import React  from 'react';
import "firebase/firestore";
import './App.css';
import * as firebase from 'firebase/app';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      allItems: "",
      haveBudget: false,  
      budget: ""
    }

    // Conditional here prevents double-initialization
    if (!firebase.apps.length) {
      firebase.initializeApp(
        {
          apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
          authDomain: "yardzen-demo.firebaseapp.com",
          databaseURL: "https://yardzen-demo.firebaseio.com",
          projectId: "yardzen-demo",
          storageBucket: "yardzen-demo.appspot.com",
          messagingSenderId: "509183652730",
          appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
        }
      )
    }

    this.handleProceedClick = this.handleProceedClick.bind(this);
  }

  // Pull data from firestore, store uniques in array
  async getItemData() {
    const db = firebase.firestore();
    const res = await db.collection('items').get();
    const itemData = [];
    res.docs.forEach(doc => {
      let newItem = doc.data();
      if (!this.itemContainedInItemList(itemData, newItem)) {
        itemData.push(doc.data());
      }      
    })
    console.log(itemData);
    return itemData;
  }  

  // Helper function, returns a boolean if the item is already in the list (handles gravel dup problem)
  itemContainedInItemList(array, newItem) {
    const result = array.some(inListItem => {
      return inListItem.name === newItem.name &&
      inListItem.type === newItem.type;
    })

    return result;
  }


  // Store data from firestore in state
  async componentDidMount() {
    const allItems = await this.getItemData();
    this.setState({
      allItems,
      isLoading: false
    });
  }


  handleBudgetInput(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleProceedClick() {
    if (this.state.budget === "") {
      window.alert("Please enter a valid number");
    } else {
      this.setState({ haveBudget: true });
    }
  }


  render() {
    if (this.state.isLoading) return ("Loading...");

    // const lighting = this.state.allItems.filter(item => item.type === "LIGHTING");
    // const waterFeatures = this.state.allItems.filter(item => item.type === "WATER_FEATURES");
    // const groundCover = this.state.allItems.filter(item => item.type === "GROUND_COVER");
    // const fencingAndPrivacy = this.state.allItems.filter(item => item.type === "FENCING_AND_PRIVACY");
    // const deckMaterial = this.state.allItems.filter(item => item.type === "DECK_MATERIAL");
    // const structures = this.state.allItems.filter(item => item.type === "STRUCTURES");
    

    if (!this.state.haveBudget) {

      return (
        <div className="budget-query">
          <div className="budget-title">What is your budget for this project?</div>
          <input
          className="budget-input"
          type="text"
          placeholder="enter a number"
          onChange={this.handleBudgetInput("budget")}/>
          <button onClick={this.handleProceedClick}>Proceed</button>
        
        </div>
      )

    } else {

      


      return (
        <div>Here is the checklist</div>
      )

    } 
  }
    
        
}
    
    
    
    
    export default App;
