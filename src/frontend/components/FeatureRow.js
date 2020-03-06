import React from 'react';
import * as HelperFunc from '../helpers/helpers';



const FeatureRow = (props) => {

  return this.props.featureList.map((item, idx) => {

    const { type, name, highPrice, lowPrice } = this.props.data;

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
        <td className="table-lowPrice">{HelperFunc.numberWithCommas(lowPrice)}</td>
        <td className="table-highPrice">{HelperFunc.numberWithCommas(highPrice)}</td>
      </tr>
    )

  })

}

export default FeatureRow;

