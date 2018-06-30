import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'react-moment';

import { userPropType } from '../../../../../../State/Users/login/reducers';

import { deleteDeviceAttempt } from '../../../../../../State/Devices/delete/actions';

import { devicePropType } from '../../../../../../State/Devices/create/reducer';

class ListDevices extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDevice = this.deleteDevice.bind(this);
    this.selectOwner = this.selectOwner.bind(this);
  }

  deleteDevice(id) {
    _.remove(this.props.devices, device => device.id !== id);
    this.props.deleteDeviceAttempt(id);
  }

  selectOwner(user) {
    const { members } = this.props;
    return members.filter(member => member.id === user);
  }

  render() {
    const { role, devices } = this.props;
    return (
      <div>
        {devices.length > 0 ? (
          <Table celled inverted selectable className="devices-list">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Technical specs</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Start date</Table.HeaderCell>
                <Table.HeaderCell>End date</Table.HeaderCell>
                <Table.HeaderCell>Owner</Table.HeaderCell>
                {role === 'teamlead' ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {devices.map(device => (
                <Table.Row>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{device.name}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{device.specs}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{device.price}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>
                    <Moment parse="YYYY-MM-DD">{device.startDate}</Moment>
                  </Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>
                    <Moment parse="YYYY-MM-DD">{device.endDate}</Moment>
                  </Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>
                    {this.selectOwner(device.user)[0].first_name +
                      ' ' +
                      this.selectOwner(device.user)[0].last_name}
                  </Table.Cell>
                  {role === 'teamlead' ? (
                    <Table.Cell>
                      <Icon
                        size="large"
                        name="trash"
                        onClick={() => this.deleteDevice(device.id)}
                      />
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          'No devices here man'
        )}
      </div>
    );
  }
}
export default connect(
  null,
  { deleteDeviceAttempt },
)(ListDevices);

ListDevices.propTypes = {
  members: PropTypes.arrayOf(userPropType).isRequired,
  role: PropTypes.string.isRequired,
  deleteDeviceAttempt: PropTypes.func.isRequired,
  devices: PropTypes.arrayOf(devicePropType).isRequired,
};
