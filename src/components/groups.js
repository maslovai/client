import React from 'react';
import {connect} from 'react-redux';
import * as groupActions from '../app/actions/groups';
import GroupForm from './group-form';
import {renderIf} from '../lib/__';
import {Link} from 'react-router-dom';

class Groups extends React.Component {

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleJoin = this.handleJoin.bind(this);    
    this.handleRemove = this.handleRemove.bind(this);
  }

  // componentWillMount() {
  //   const user = this.props.user;   
  //   console.log('this.props is ', this.props) 
    
  //   if(user && user.groupNames.length) {
  //     this.props.initGroups(user.groups_IDs);
  //   } 
  // }

  componentWillReceiveProps(props) {
    if(this.props.user) { this.setState(this.props.user) }
  }

  handleAdd(group) {
    let userID = this.props.user._id;
    this.props.addGroup(userID, group);
  }

  handleJoin(alias) {
    let userID = this.props.user._id;    
    this.props.joinGroup(userID, alias);
  }

  handleRemove(group) {
    let userID = this.props.user._id;
    this.props.removeGroup(userID, group);
  }

  render() {

    const user = this.props.user;

    return (
      <div className='groups'>

      {renderIf(user.groupNames.length, 
        <div id="groupList">
        <p className='groupHeader'>My Groups</p>
        {
          user.groupNames.map((groupName, i) =>
          <li className='groupli' 
          key={i} 
          onClick={() => this.props.switchRoute(`/queue/${user.group_IDs[i]}`) }>{groupName}
          </li>   
        )}
        </div>
      )} 
      <GroupForm 
        handleAdd={this.handleAdd} 
        handleJoin={this.handleJoin}
        handleRemove={this.handleRemove}
      />     
      </div>
    )    
  }
}

const mapStateToProps = (state) => ({
   user: state.user
});

const mapDispatchToProps = (dispatch, getState) => ({
  initGroups: user => dispatch(groupActions.initGroups(user)),
  addGroup: (userID, group) => dispatch(groupActions.addGroup(userID, group)),
  joinGroup: (userID, alias) => dispatch(groupActions.joinGroup(userID, alias)),  
  removeGroup: (userID, group) => dispatch(groupActions.removeGroup(userID, group))
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);