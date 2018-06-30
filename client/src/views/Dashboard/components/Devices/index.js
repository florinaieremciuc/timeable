import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from '../../../../components/Modal/action';
import AddDevice from './components/AddDevice';

import { getRole, getTeam, userPropType } from '../../../../State/Users/login/reducers';

import { getMembersAttempt } from '../../../../State/Users/team/actions';
import {
  getItems as getMembers,
  isAttempting as attemptMembers,
} from '../../../../State/Users/team/reducer';

import { getDevicesAttempt } from '../../../../State/Devices/get/actions';
import {
  getItems as getDevices,
  isAttempting as loadingDevice,
} from '../../../../State/Devices/get/reducer';

import ListDevice from './components/ListDevices';

import { isAttempting as loadDelete } from '../../../../State/Devices/delete/reducer';
import {
  devicePropType,
  isAttempting as loadCreate,
} from '../../../../State/Devices/create/reducer';

import './styles.css';

class Device extends React.Component {
  componentWillMount() {
    const { team, projectid } = this.props;
    this.props.getMembersAttempt(team);
    this.props.getDevicesAttempt(projectid);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.loadCreate === 1 ||
      nextProps.loadDelete === 1 ||
      nextProps.projectid !== this.props.projectid
    ) {
      nextProps.getDevicesAttempt(nextProps.projectid);
    }
  }
  render() {
    const {
      modalVisible, projectid, devices, role, members,
    } = this.props;
    const devicesToList = devices.filter(risk => risk.project === Number(projectid));
    return (
      <Container className="devices-overview">
        <h1>Devices overview</h1>
        <Container>
          <ListDevice
            editable={false}
            open={modalVisible}
            project={projectid}
            devices={devicesToList}
            role={role}
            members={members}
          />
          {role === 'teamlead' ? <AddDevice project={projectid} members={members} /> : null}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
  devices: getDevices(state.devices),
  loadingDevice: loadingDevice(state.devices),
  loadCreate: loadCreate(state.newDevice),
  loadDelete: loadDelete(state.deleteDevice),
  role: getRole(state.user),
  team: getTeam(state.user),
  loadMembers: attemptMembers(state.members),
  members: getMembers(state.members),
});
export default connect(
  mapStateToProps,
  {
    openModal,
    closeModal,
    getDevicesAttempt,
    getMembersAttempt,
  },
)(Device);

Device.propTypes = {
  projectid: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.number.isRequired,
  getDevicesAttempt: PropTypes.func.isRequired,
  getMembersAttempt: PropTypes.func.isRequired,
  devices: PropTypes.arrayOf(devicePropType).isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(userPropType).isRequired,
};
