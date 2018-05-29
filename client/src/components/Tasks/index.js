import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';

import { openModal, closeModal } from './action';
import AddTask from './components/AddTask';

class Tasks extends React.Component {
  render() {
    const open = this.props.modalVisible;
    return (
      <Modal open={open} onOpen={this.props.openModal} trigger={<Button>Activity list</Button>}>
        <Modal.Header>
          Activity list<Icon name="tasks" />
          <Icon name="close" onClick={this.props.closeModal} />
        </Modal.Header>
        <Modal.Content image>
          <div className="image">
            <Icon name="right arrow" />
          </div>
          <Modal.Description>
            <p>list de taskuri</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <AddTask project={this.props.project} />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
});
export default connect(mapStateToProps, { openModal, closeModal })(Tasks);

Tasks.propTypes = {
  project: PropTypes.number.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
