import React from 'react';
import {connect} from 'react-redux';
import * as groupActions from '../app/actions/groups';
import GroupForm from './group-form';
import {renderIf} from '../lib/__';

class Groups extends React.Component {

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleJoin = this.handleJoin.bind(this);    
    this.handleRemove = this.handleRemove.bind(this);
    this.routeToTasks = this.routeToTasks.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props) { this.setState(this.props) }
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

  routeToTasks(e){
    let groupID = e.target.dataset['id'];
    let name = e.target.dataset['name'];
    let alias = e.target.dataset['alias'];    
    console.log('alias is ', alias)
    this.props.toggleView();
    this.props.switchRoute(`/queue/${groupID}/${name}/${alias}`);
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
          <a className='groupli' 
          href="javascript:;"
          key={i} 
          data-id={user.group_IDs[i]}
          data-name={groupName}
          data-alias={user.groupAliases[i]}
          onClick={this.routeToTasks}>{groupName}</a>
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
   user: state.user,
});

const mapDispatchToProps = (dispatch, getState) => ({
  initGroups: (user) => dispatch(groupActions.initGroups(user)),
  addGroup: (userID, group) => dispatch(groupActions.addGroup(userID, group)),
  joinGroup: (userID, alias) => dispatch(groupActions.joinGroup(userID, alias)),
  removeGroup: (userID, group) => dispatch(groupActions.removeGroup(userID, group))
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
