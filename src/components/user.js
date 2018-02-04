import React from 'react';
import {connect} from 'react-redux';
import userActions from '../app/actions/user';

class User extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = this.props.user || {};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]:(e.target.value)});  
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.addGroup(this.state);
    this.setState(this.props.profile);
  }


    
  render() {
      
    return (
      <h1>My Groups</h1>
    )    
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch, getState) => ({
  showGroups: (user) => dispatch(groupActions.showGroups(user)),
  updateGroups: (user) => dispatch(groupActions.updateGroups(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);