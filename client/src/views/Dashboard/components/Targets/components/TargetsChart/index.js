import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

import PropTypes from 'prop-types';
import _ from 'lodash';

import { targetPropType } from '../../../../../../State/Targets/create/reducer';

import './styles.css';

class TargetsChart extends React.Component {
  static selectText(target) {
    switch (target) {
    case '1':
      return 'Achieved';
    case '0':
      return 'Not achieved';
    default:
      return null;
    }
  }

  render() {
    const { targets } = this.props;
    const grouped = _.groupBy(targets, target => target.achieved);
    const groupedData = _.keys(grouped).map((crt) => {
      const data = Object.assign({
        name: TargetsChart.selectText(crt),
        value: _.countBy(targets, target => target.achieved == crt).true,
      });
      return data;
    });
    const data01 = groupedData;
    return (
      <div className="targets-charts">
        {targets.length > 0 ? (
          <PieChart width={800} height={400}>
            <Pie
              data={data01}
              cx={550}
              cy={200}
              innerRadius={30}
              outerRadius={90}
              fill="#c86464"
              label
            />
            <Tooltip />
          </PieChart>
        ) : null}
      </div>
    );
  }
}
export default TargetsChart;

TargetsChart.propTypes = {
  targets: PropTypes.arrayOf(targetPropType).isRequired,
};
