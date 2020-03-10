
import React, {useState, useEffect, useContext } from 'react';
import FeatureTable from './FeatureTable';
import * as HelperFunc from '../helpers/helpers';
import BudgetContext from '../contexts/BudgetContext';
import classNames from 'classnames';


function Worksheet() {

  const [budget, setBudget] = useContext(BudgetContext);
  const [{
    isLoading,
    allItems, 
    allItemCheckboxes,
    totalLowPrice,
    totalHighPrice}, setVals] = useState({ 
                                  isLoading: true,
                                  totalLowPrice: 0,
                                  totalHighPrice: 0 });

  useEffect(() => {
    
    const updateState = async () => {
      const allItems = await HelperFunc.fetchAndParseItemData();
      const allItemCheckBoxes = HelperFunc.createCheckboxKeys(allItems);
      
      setVals(currentState => ({
        ...currentState,
        isLoading: false,
        allItems,
        allItemCheckBoxes
      }))
    };

    updateState();
  }, []);


  const budgetFigureClassName = classNames("table-total", { overbudget: budget < totalLowPrice })
  const allItemsArray = Object.entries(allItems);

  if (isLoading) return ("Loading...");

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
            <td className="table-lowPrice">{totalLowPrice}</td>
            <td className="table-highPrice">{totalHighPrice}</td>
          </tr>

          <tr>
            <td>Total Budget</td>
            <td></td>
            <td></td>
            <td className={budgetFigureClassName}>{HelperFunc.numberWithCommas(budget)}</td>
          </tr>

        </tbody>
      </table>

      <button className="submit-ideas">Submit Ideas</button>

    </div>
  )



}


export default Worksheet;