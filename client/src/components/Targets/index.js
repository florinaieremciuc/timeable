import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Container, Header, Divider } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from '../Modal/action';
import AddTarget from './components/AddTarget';

import { getRole } from '../../State/Users/login/reducers';

import { getTargetsAttempt } from '../../State/Targets/get/actions';
import {
  getItems as getTargets,
  isAttempting as loadingTargets,
} from '../../State/Targets/get/reducer';

import ListTargets from './components/ListTargets';

import { isAttempting as loadDelete } from '../../State/Targets/delete/reducer';
import { targetPropType, isAttempting as loadCreate } from '../../State/Targets/create/reducer';

import './style.css';

class Targets extends React.Component {
  componentWillMount() {
    this.props.getTargetsAttempt(this.props.match.params.projectid);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loadCreate === 1 || nextProps.loadDelete === 1) {
      nextProps.getTargetsAttempt(nextProps.match.params.projectid);
    }
  }
  render() {
    const {
      modalVisible, match, targets, role,
    } = this.props;
    const targetsToList = targets.filter(target => target.project === Number(match.params.projectid));

    return (
      <Container>
        <Header>
          <h1>
            <Icon name="targets" />Targets list
          </h1>
          <Link to="/">
            <Icon name="close" />
          </Link>
        </Header>
        <Divider />
        <Container>
          {role === 'teamlead' ? <AddTarget project={this.props.match.params.projectid} /> : null}
          <ListTargets
            editable
            open={modalVisible}
            project={match.params.projectid}
            targets={targetsToList}
            role={role}
          />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
  targets: getTargets(state.targets),
  loadingTargets: loadingTargets(state.targets),
  loadCreate: loadCreate(state.newTarget),
  loadDelete: loadDelete(state.deleteTarget),
  role: getRole(state.user),
});
export default connect(
  mapStateToProps,
  {
    openModal,
    closeModal,
    getTargetsAttempt,
  },
)(Targets);

Targets.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  modalVisible: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  getTargetsAttempt: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(targetPropType).isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
};
