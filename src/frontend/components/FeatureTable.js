import React from 'react';
import FeatureRow from './FeatureRow';
import * as HelperFunc from '../helpers/helpers';


const FeatureTable = (props) => {

  const niceSubtitle = HelperFunc.typeToNiceLabel[props.type];

  return (    
    <div>
      <div className="item-type-subheading">{niceSubtitle}</div>
      <table className="feature-table">
        <tbody>
          <tr>
            <th></th>
            <th className="table-name-header">Feature</th>
            <th className="table-lowPrice-header">Low Estimate</th>
            <th className="table-highPrice-header">High Estimate</th>
          </tr>
          <FeatureRow
            items={props.items}
            handleCheckBoxChange={props.handleCheckBoxChange} />
        </tbody>
      </table>
    </div>

  )
}

export default FeatureTable;