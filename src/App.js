import React  from 'react';
import "firebase/firestore";
import './App.css';
import * as firebase from 'firebase/app';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      haveBudget: false,  
      budget: "",
      allItems: "",
      allItemCheckBoxes: "",
      totalLowPrice: 0,
      totalHighPrice: 0
    }

    // Conditional in constructor prevents double-initialization
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
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  // Pull data from firestore, store uniques in array, itemData
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
      return  inListItem.name === newItem.name &&
              inListItem.type === newItem.type;
    })

    return result;
  }

  // On mounting, store data from firestore in state 
  async componentDidMount() {
    
    const allItems = await this.getItemData();
    
    // This logic creates a key value pair for use by checkboxes
    const allItemCheckBoxes = {};
    allItems.forEach(item => {
      let key = `${item.type},${item.name},${item.lowPrice},${item.highPrice}`
      allItemCheckBoxes[key] = false;
    })

    this.setState({
      allItems,
      allItemCheckBoxes,
      isLoading: false
    });
  }

  // Sets state on input into budget input, needs validation logic
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

  handleCheckBoxChange(e) {
    const key = e.currentTarget.value
    const keyValues = key.split(",");
    const lowPrice = parseInt(keyValues[2]);
    const highPrice = parseInt(keyValues[3]);
    const copy = Object.assign({}, this.state.allItemCheckBoxes);
    
    if (copy[key]) {
      copy[key] = false;
      this.setState({totalLowPrice: this.state.totalLowPrice - lowPrice})
      this.setState({totalHighPrice: this.state.totalHighPrice - highPrice})
    } else {
      copy[key] = true;
      this.setState({ totalLowPrice: this.state.totalLowPrice + lowPrice })
      this.setState({ totalHighPrice: this.state.totalHighPrice + highPrice })
    }
  
    this.setState({ allItemCheckBoxes: copy });
  }


  // Takes list of item objects, transforms into a table row with checkbox and table data
  renderTableData(items) {
    return items.map((item, idx) => {
      const {type, name, highPrice, lowPrice } = item
      
      return (
        <tr key={idx}>
          <td className="table-checkbox">
            <input
              type="checkbox"
              value={`${type},${name},${lowPrice},${highPrice}`}
              onChange={this.handleCheckBoxChange}>
            </input>
          </td>
          <td className="table-name">{name}</td>
          <td className="table-lowPrice">{this.numberWithCommas(lowPrice)}</td>
          <td className="table-highPrice">{this.numberWithCommas(highPrice)}</td>
        </tr>
      )
    })
  }

  // Helper function, adds thousands commas to a number
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    // If still retrieving data, then show "Loading..."
    if (this.state.isLoading) return ("Loading...");

    // If app doesn't have budget, then show budget query
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

    // If app does have a budget, show the checklist
    } else {

      //Parse allItems by type, add additional sorting logic where needed
      const lighting = this.state.allItems.filter(item => item.type === "LIGHTING").sort((a,b) => parseInt(a.highPrice) - parseInt(b.highPrice));
      const waterFeatures = this.state.allItems.filter(item => item.type === "WATER_FEATURES").sort((a, b) => parseInt(a.highPrice) - parseInt(b.highPrice));
      const groundCover = this.state.allItems.filter(item => item.type === "GROUND_COVER");
      const fencingAndPrivacy = this.state.allItems.filter(item => item.type === "FENCING_AND_PRIVACY");
      const deckMaterial = this.state.allItems.filter(item => item.type === "DECK_MATERIAL");
      const structures = this.state.allItems.filter(item => item.type === "STRUCTURES");


      return (
        <div className="checklist">
          <div className="checklist-title">So tell us what you had in mind (check all that apply):</div>

          <div className="item-type-subheading">Lighting</div>
            <table className="feature-table">
              <tbody>
                <tr>
                  <td></td>
                  <td className="table-name-header">No. of Lights</td>
                  <td className="table-lowPrice-header">Low Estimate</td>
                  <td className="table-highPrice-header">High Estimate</td>
                </tr>
                {this.renderTableData(lighting)}
              </tbody>
            </table>

          <div className="item-type-subheading">Water Features</div>
          <table className="feature-table">
            <tbody>
              <tr>
                <td></td>
                <td className="table-name-header">Feature</td>
                <td className="table-lowPrice-header">Low Estimate</td>
                <td className="table-highPrice-header">High Estimate</td>
              </tr>
              {this.renderTableData(waterFeatures)}
            </tbody>
          </table>

          <div className="item-type-subheading">Ground Cover</div>
          <table className="feature-table">
            <tbody>
              <tr>
                <td></td>
                <td className="table-name-header">Feature</td>
                <td className="table-lowPrice-header">Low Estimate</td>
                <td className="table-highPrice-header">High Estimate</td>
              </tr>
              {this.renderTableData(groundCover)}
            </tbody>
          </table>

          <div className="item-type-subheading">Fencing And Privacy</div>
          <table className="feature-table">
            <tbody>
              <tr>
                <td></td>
                <td className="table-name-header">Feature</td>
                <td className="table-lowPrice-header">Low Estimate</td>
                <td className="table-highPrice-header">High Estimate</td>
              </tr>
                {this.renderTableData(fencingAndPrivacy)}
            </tbody>
          </table>

          <div className="item-type-subheading">Deck Material</div>
          <table className="feature-table">
            <tbody>
              <tr>
                <td></td>
                <td className="table-name-header">Material</td>
                <td className="table-lowPrice-header">Low Estimate</td>
                <td className="table-highPrice-header">High Estimate</td>
              </tr>
              {this.renderTableData(deckMaterial)}
            </tbody>
          </table>

          <div className="item-type-subheading">Structures</div>
          <table className="feature-table">
            <tbody>
              <tr>
                <td></td>
                <td className="table-name-header">Structure</td>
                <td className="table-lowPrice-header">Low Estimate</td>
                <td className="table-highPrice-header">High Estimate</td>
              </tr>
              {this.renderTableData(structures)}
            </tbody>
          </table>

          <table className="feature-table">
            <tbody>
              <tr>
                <td>Estimated Range</td>
                <td></td>
                <td className="table-lowPrice">{this.numberWithCommas(this.state.totalLowPrice)}</td>
                <td className="table-highPrice">{this.numberWithCommas(this.state.totalHighPrice)}</td>
              </tr>
            </tbody>
          </table>

          <table className="feature-table">
            <tbody>
              <tr>
                <td>Total Budget</td>
                <td></td>
                <td></td>
                <td className="table-total">{this.numberWithCommas(this.state.budget)}</td>
              </tr>
            </tbody>
          </table>

          <button className="submit-ideas">Submit Ideas</button>

        </div>



        )
    } 
  }
    
        
}
    
    
    
    
    export default App;
