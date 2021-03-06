import React from 'react';
// import "firebase/firestore";
import '../stylesheets/App.css';
import * as firebase from 'firebase/app';
import * as HelperFunc from '../helpers/helpers';
import classNames from 'classnames';
import FeatureTable from './FeatureTable';

class Worksheet extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      budget: "",
      allItems: "",
      allItemCheckBoxes: "",
      totalLowPrice: 0,
      totalHighPrice: 0
    }

    // Conditional in constructor prevents double-initialization of firestore
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

    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }


  // On mounting, parse and store data from firestore in state 
  async componentDidMount() {
    const allItems = await HelperFunc.fetchAndParseItemData();
    const allItemCheckBoxes = HelperFunc.createCheckboxKeys(allItems);

    this.setState({
      allItems,
      allItemCheckBoxes,
      isLoading: false
    });
  }

  
  handleCheckBoxChange(e) {
    const key = e.currentTarget.value
    const keyValues = key.split(",");
    const lowPrice = parseInt(keyValues[2]);
    const highPrice = parseInt(keyValues[3]);
    const copy = Object.assign({}, this.state.allItemCheckBoxes);

    if (copy[key]) {
      copy[key] = false;
      this.setState({ totalLowPrice: this.state.totalLowPrice - lowPrice })
      this.setState({ totalHighPrice: this.state.totalHighPrice - highPrice })
    } else {
      copy[key] = true;
      this.setState({ totalLowPrice: this.state.totalLowPrice + lowPrice })
      this.setState({ totalHighPrice: this.state.totalHighPrice + highPrice })
    }

    this.setState({ allItemCheckBoxes: copy });
  }


  render() {
    // If still retrieving data, then show "Loading..."
    if (this.state.isLoading) return ("Loading...");

      const budgetFigureClassName = classNames("table-total", { overbudget: this.state.budget < this.state.totalLowPrice })
      const allItemsArray = Object.entries(this.state.allItems);

      return (
        <div className="checklist">
          <div className="checklist-title">Part 2: So tell us what you had in mind (check all that apply):</div>

          {allItemsArray.map((featureItems, idx) => (
            <FeatureTable
              key={idx}
              type={featureItems[0]}
              items={featureItems[1]}
              handleCheckBoxChange={this.handleCheckBoxChange} />
          ))}

          <table className="feature-table">
            <tbody>

              <tr>
                <td>Estimates</td>
                <td></td>
                <td className="table-lowPrice">{this.state.totalLowPrice}</td>
                <td className="table-highPrice">{this.state.totalHighPrice}</td>
              </tr>

              <tr>
                <td>Total Budget</td>
                <td></td>
                <td></td>
                <td className={budgetFigureClassName}>{HelperFunc.numberWithCommas(this.state.budget)}</td>
              </tr>

            </tbody>
          </table>

          <button className="submit-ideas">Submit Ideas</button>

        </div>

      )
    
  }


}

export default Worksheet;
