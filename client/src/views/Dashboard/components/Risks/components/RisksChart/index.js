import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

import PropTypes from 'prop-types';
import _ from 'lodash';

import { riskPropType } from '../../../../../../State/Risks/create/reducer';

import './styles.css';

/** probability
 * 1 - unlikely to occur
 * 2 - may or may not occur
 * 3 - likely to occur
/** impact
 * 1 - minimal
 * 2 - moderate
 * 3 - significant
 */
class RisksChart extends React.Component {
  static selectText(risk, check) {
    switch (risk) {
    case '1':
      return check ? 'Unlikely to occur' : 'Minimal';
    case '2':
      return check ? 'May or may not occur' : 'Moderate';
    case '3':
      return check ? 'Likely to occur' : 'Significant';
    default:
      return null;
    }
  }

  render() {
    const { risks } = this.props;
    const groupedByCategory = _.groupBy(risks, risk => risk.category);
    const categoryGrouped = _.keys(groupedByCategory).map((crt) => {
      const data = Object.assign({
        name: crt,
        value: _.countBy(risks, risk => risk.category === crt).true,
      });
      return data;
    });

    const groupedByProbability = _.groupBy(risks, risk => risk.probability);
    const probabilityGrouped = _.keys(groupedByProbability).map((crt) => {
      const data = Object.assign({
        name: RisksChart.selectText(crt, 1),
        value: _.countBy(risks, risk => risk.probability === crt).true,
      });
      return data;
    });
    const groupedByImpact = _.groupBy(risks, risk => risk.impact);
    const impactGrouped = _.keys(groupedByImpact).map((crt) => {
      const data = Object.assign({
        name: RisksChart.selectText(crt),
        value: _.countBy(risks, risk => risk.impact === crt).true,
      });
      return data;
    });
    const groupedByResponse = _.groupBy(risks, risk => risk.response);
    const responseGrouped = _.keys(groupedByResponse).map((crt) => {
      const data = Object.assign({
        name: crt,
        value: _.countBy(risks, risk => risk.response === crt).true,
      });
      return data;
    });

    const data01 = categoryGrouped;
    const data02 = probabilityGrouped;
    const data03 = impactGrouped;
    const data04 = responseGrouped;
    // const data02 = [
    //   { name: 'Group A', value: 2400 },
    //   { name: 'Group B', value: 4567 },
    //   { name: 'Group C', value: 1398 },
    //   { name: 'Group D', value: 9800 },
    //   { name: 'Group E', value: 3908 },
    //   { name: 'Group F', value: 4800 },
    // ];
    return (
      <div className="risks-charts">
        {risks.length > 0 ? (
          <PieChart width={800} height={400}>
            <Pie data={data01} cx="10%" cy="50%" outerRadius={80} fill="#8884d8" label />
            <Pie data={data02} cx="35%" cy="50%" innerRadius={40} outerRadius={80} fill="#82ca9d" />
            <Pie data={data03} cx="60%" cy="50%" outerRadius={80} fill="#ff9800" label />
            <Pie
              data={data04}
              cx="85%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="c86464"
              label
            />
            <Tooltip />
          </PieChart>
        ) : null}
      </div>
    );
  }
}
export default RisksChart;

RisksChart.propTypes = {
  risks: PropTypes.arrayOf(riskPropType).isRequired,
};
