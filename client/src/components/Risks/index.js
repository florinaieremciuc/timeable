import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Container, Header, Divider } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from '../Modal/action';
import AddRisk from './components/AddRisk';

import { getRole } from '../../State/Users/login/reducers';

import { getRisksAttempt } from '../../State/Risks/get/actions';
import { getItems as getRisks, isAttempting as loadingRisks } from '../../State/Risks/get/reducer';

import ListRisks from './components/ListRisks';

import { isAttempting as loadDelete } from '../../State/Risks/delete/reducer';
import { riskPropType, isAttempting as loadCreate } from '../../State/Risks/create/reducer';

import './style.css';

class Risks extends React.Component {
  componentWillMount() {
    this.props.getRisksAttempt(this.props.match.params.projectid);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loadCreate === 1 || nextProps.loadDelete === 1) {
      nextProps.getRisksAttempt(nextProps.match.params.projectid);
    }
  }
  render() {
    const {
      modalVisible, match, risks, role,
    } = this.props;
    const risksToList = risks.filter(risk => risk.project === Number(match.params.projectid));

    return (
      <Container>
        <Header>
          <h1>
            <Icon name="risks" />Risks list
          </h1>
          <Link to="/">
            <Icon name="close" />
          </Link>
        </Header>
        <Divider />
        <Container>
          {role === 'teamlead' ? <AddRisk project={this.props.match.params.projectid} /> : null}
          <ListRisks
            editable
            open={modalVisible}
            project={match.params.projectid}
            risks={risksToList}
            role={role}
          />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
  risks: getRisks(state.risks),
  loadingRisks: loadingRisks(state.risks),
  loadCreate: loadCreate(state.newRisk),
  loadDelete: loadDelete(state.deleteRisk),
  role: getRole(state.user),
});
export default connect(
  mapStateToProps,
  {
    openModal,
    closeModal,
    getRisksAttempt,
  },
)(Risks);

Risks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  modalVisible: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  getRisksAttempt: PropTypes.func.isRequired,
  risks: PropTypes.arrayOf(riskPropType).isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
};
