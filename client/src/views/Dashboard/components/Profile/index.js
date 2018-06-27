import React from 'react';
import { connect } from 'react-redux';
import { Header, Container, Reveal, Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getUserData, userPropType } from '../../../../State/Users/login/reducers';
import { getItems } from '../../../../State/Projects/get/reducer';
import { getItems as getMembers } from '../../../../State/Users/team/reducer';
import { newTeamPropType } from '../../../../State/Teams/create/reducer';
import { getTeam } from '../../../../State/Teams/get/reducer';
import { getTeamAttempt } from '../../../../State/Teams/get/actions';
import { projectPropType } from '../../../../State/Projects/create/reducer';

import './styles.css';

class Profile extends React.Component {
  componentWillMount() {
    this.props.getTeamAttempt(this.props.userData.team);
  }
  render() {
    const avatars = [
      'https://react.semantic-ui.com//images/avatar/large/matthew.png',
      'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
      'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
      'https://react.semantic-ui.com//images/avatar/large/molly.png',
      'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
    ];
    const {
      userData, projects, members, team,
    } = this.props;
    return (
      <div>
        <Container className="profile">
          <Header dividing as="h1" style={{ textTransform: 'capitalize' }}>
            {`${userData.username}'s Profile`}
          </Header>
          <Reveal animated="move up">
            <Reveal.Content visible>
              <Image src={avatars[4]} size="medium" />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Card>
                <Card.Content>
                  <Image floated="right" size="small" src={avatars[4]} />
                  <Card.Header>{`${userData.firstname} ${userData.lastname}`}</Card.Header>
                  <Card.Meta>
                    {`- ${userData.role} -`}
                    <br />
                    <em style={{ textTransform: 'capitalize' }}>
                      {`team ${team.team && team.team.name}`}
                    </em>
                  </Card.Meta>
                  <Card.Description>
                    {projects.length > 0 && 'Your projects: '}
                    {projects.length > 0 &&
                      projects.map(project => <Label key={project.id}>{project.name}</Label>)}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  Your team mates:&nbsp;
                  {members.map(member => (
                    <Label style={{ textTransform: 'capitalize' }} key={member.id}>
                      {`${member.first_name} ${member.last_name}`}
                    </Label>
                  ))}
                </Card.Content>
              </Card>
            </Reveal.Content>
          </Reveal>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userData: getUserData(state.user),
  projects: getItems(state.projects),
  members: getMembers(state.members),
  team: getTeam(state.team),
});
export default connect(
  mapStateToProps,
  { getTeamAttempt },
)(Profile);

Profile.propTypes = {
  getTeamAttempt: PropTypes.func.isRequired,
  userData: userPropType.isRequired,
  members: PropTypes.arrayOf(userPropType).isRequired,
  team: newTeamPropType.isRequired,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
};
