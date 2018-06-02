import React from 'react';
import { Sidebar, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Projects from './components/Home';
import Teams from './components/Teams';
import Events from './components/Events';
import Menu from '../../components/Menu';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.setView = this.setView.bind(this);
  }

  setView() {
    switch (this.props.path) {
    case '/teams':
      return <Teams />;
    case '/events':
      return <Events />;
    case '/':
      return <Projects />;
    default:
      return <h1>Not found</h1>;
    }
  }
  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Icon name="content" size="big" className="side-menu" onClick={this.toggleVisibility} />
        <Sidebar.Pushable as="div">
          <Menu visible={visible} />
          <Sidebar.Pusher className="side-menu">{this.setView()}</Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default Dashboard;
Dashboard.propTypes = {
  path: PropTypes.string.isRequired,
};
