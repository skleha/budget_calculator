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

  }

  // Pull data from firestore, store in array
  async getItemData() {
    const db = firebase.firestore();
    const res = await db.collection('items').get();
    const itemData = [];
    res.docs.forEach(doc => itemData.push(doc.data()));
    return itemData;
  }  

  // Store data from firestore in state
  async componentDidMount() {
    const allItems = await this.getItemData();
    this.setState({
      allItems,
      isLoading: false
    });
  }






  render() {
    if (this.state.isLoading) return ("Loading...");

    if (!this.state.haveBudget) {

      return (
        <div className="budget-query">
          <div className="budget-title">What is your budget for this project?</div>
          <input
          className="budget-input"
          type="text"
          placeholder="enter a number"/>
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
