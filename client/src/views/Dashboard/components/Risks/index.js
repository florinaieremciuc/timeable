import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from '../../../../components/Modal/action';

import { getRole } from '../../../../State/Users/login/reducers';

import { getRisksAttempt } from '../../../../State/Risks/get/actions';
import {
  getItems as getRisks,
  isAttempting as loadingRisks,
} from '../../../../State/Risks/get/reducer';

import ListRisks from '../../../../components/Risks/components/ListRisks';
import RisksChart from './components/RisksChart';

import { isAttempting as loadDelete } from '../../../../State/Risks/delete/reducer';
import { riskPropType, isAttempting as loadCreate } from '../../../../State/Risks/create/reducer';

import './styles.css';

class Risks extends React.Component {
  componentWillMount() {
    this.props.getRisksAttempt(this.props.projectid);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.loadCreate === 1 ||
      nextProps.loadDelete === 1 ||
      nextProps.projectid !== this.props.projectid
    ) {
      nextProps.getRisksAttempt(nextProps.projectid);
    }
  }
  render() {
    const {
      modalVisible, projectid, risks, role,
    } = this.props;
    const risksToList = risks.filter(risk => risk.project === Number(projectid));
    return (
      <Container className="risks-overview">
        <h1>Risks overview</h1>
        <Container>
          {risks.length > 0 ? <RisksChart risks={risks} /> : null}
          <ListRisks
            editable={false}
            open={modalVisible}
            project={projectid}
            risks={risksToList}
            role={role}
          />
          {role === 'teamlead' ? (
            <Link to={`/risks/${projectid}`}>
              <Button>Edit risks</Button>
            </Link>
          ) : null}
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
  projectid: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  getRisksAttempt: PropTypes.func.isRequired,
  risks: PropTypes.arrayOf(riskPropType).isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
};
