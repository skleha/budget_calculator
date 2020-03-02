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

  // Sets state on input into budget field
  handleBudgetInput(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  // Allows user to proceed to next step non-empty-string state
  handleProceedClick() {
    if (this.state.budget === "") {
      window.alert("Please enter a valid number");
    } else {
      this.setState({ haveBudget: true });
    }
  }

  renderTableData(items) {
    return items.map((item, idx) => {
      const {name, highPrice, lowPrice } = item
      
      return (
        <tr key={idx}>
          <td className="table-checkbox"><input type="checkbox"></input></td>
          <td className="table-name">{name}</td>
          <td className="table-lowPrice">{this.numberWithCommas(lowPrice)}</td>
          <td className="table-highPrice">{this.numberWithCommas(highPrice)}</td>
        </tr>
      )
    })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
          placeholder="enter a number"
          onChange={this.handleBudgetInput("budget")}/>
          <button className="proceed-button" onClick={this.handleProceedClick}>Proceed to Checklist</button>
        </div>
      )

    } else {

      //Parse allItems by type, add additional sorting logic where needed
      const lighting = this.state.allItems.filter(item => item.type === "LIGHTING").sort((a,b) => parseInt(a.highPrice) - parseInt(b.highPrice));
      // const waterFeatures = this.state.allItems.filter(item => item.type === "WATER_FEATURES");
      // const groundCover = this.state.allItems.filter(item => item.type === "GROUND_COVER");
      // const fencingAndPrivacy = this.state.allItems.filter(item => item.type === "FENCING_AND_PRIVACY");
      // const deckMaterial = this.state.allItems.filter(item => item.type === "DECK_MATERIAL");
      // const structures = this.state.allItems.filter(item => item.type === "STRUCTURES");


      return (
        <div className="checklist">
          <div className="checklist-title">So tell us what you had in mind (check all that apply):</div>

          <div className="item-type-subheading">Lighting</div>
            <table className="feature-table">
              <tbody>
                <tr>
                  <td></td>
                  <td>Number of Lights</td>
                  <td>Low Estimate</td>
                  <td>High Estimate</td>
                </tr>
                {this.renderTableData(lighting)}
              </tbody>
            </table>
          </div>







        )
    } 
  }
    
        
}
    
    
    
    
    export default App;
