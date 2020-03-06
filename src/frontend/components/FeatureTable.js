import React from 'react';
import FeatureRow from './FeatureRow';



const FeatureTable = (props) => {

  return (    
    <div>
      <div className="item-type-subheading">Lighting</div>
      <table className="feature-table">
        <tbody>
          <tr>
            <th></th>
            <th className="table-name-header">No. of Lights</th>
            <th className="table-lowPrice-header">Low Estimate</th>
            <th className="table-highPrice-header">High Estimate</th>
          </tr>
          <FeatureRow rows={this.props.data}/>
        </tbody>
      </table>
    </div>

  )
}

export default FeatureTable;