import React from 'react';
import {connect} from 'react-redux';
import * as tasksActions from '../app/actions/tasks';
import * as groupActions from '../app/actions/groups';
import TaskForm from './task-form';
import request from 'superagent';
// import Stats from './stats'

let API = `${__API_URL__}`;

class TasksQueue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks || [],
            groupID:this.props.location.pathname.slice(7, 31),
            groupName: this.props.location.pathname.slice(32).split('/')[0],
            groupAlias: this.props.location.pathname.match(/[^/]*$/gi)[0],
            buttonName: this.props.buttonName || '',
            buttonText: this.props.buttonText || ''
        }
        this.getCreator = this.getCreator.bind(this);
        this.routeToGroups = this.routeToGroups.bind(this);
    }
    componentWillMount(){
        let groupID = this.props.location.pathname.slice(7, 31)
        this.props.tasksInitialize(groupID);
        this.getCreator(this.state.groupID);
    }

    componentWillReceiveProps(props, nextProps){
        if(props) this.setState(this.props.tasks);
    }

    getCreator(groupID) {
        request.get(`${API}/group/mod/${groupID}`)
            .then(res => {
              let creatingUser = res.text;
              let buttonName = this.props.user._id === creatingUser ? 'deleteButton' : 'unsubscribe';
              let buttonText = this.props.user._id === creatingUser ? 'delete group' : 'unsubscribe from group';               
              this.setState({['buttonName']: buttonName, ['buttonText']: buttonText});              
            });
    }

    routeToGroups() {
        this.props.remove(this.props.user._id, this.state.groupID);
    }

    render() {
        
        let groupName = this.state.groupName || '';
        let alias = this.state.groupAlias || '';

        console.log("GROUP ID::::::", this.state.groupID);

        return (
            <div className = 'queueView'>
                <div className='inputDiv'>
                    <div className='title'>
                        <h2 id='groupName'>Team {groupName}</h2>
                         <a className={this.state.buttonName} href=''
                           onClick={this.routeToGroups}
                           title={this.state.buttonText}>
                        </a>
                    </div>
                    <h4 id='alias' title='Code name to join group'>Alias: {alias}</h4>

                    <TaskForm handle = {this.props.taskCreate}
                                button = "Save Task"
                                groupID={this.state.groupID}
                    />
                </div>
                <div className = 'taskQueue'>

                    <h2 className='taskHeader' id='listHeader'>Click on a task and write your name when complete:</h2>
                    <ul className = "taskQueue">
                        {
                            this.props.tasks.map((task, i)=>
                                <li key = {i} >
                                    <a id='deleteTask' href="javascript:;" title='Delete task'
                                      onClick={()=>this.props.taskDelete(task)}></a>
                                    <TaskForm handle = {this.props.taskUpdate} 
                                        name={task.name}
                                        completed={task.completed}
                                        _id={task._id}
                                        groupID={this.state.groupID}
                                        userID = {this.props.user._id}
                                        userName = {this.props.user.firstName}
                                    />
                                </li>
                            )
                        }
                    </ul>
                </div>        
            </div>
        )
    }
}
const mapStateToProps = state => ({
    tasks : state.tasks,
    user: state.user,
})

const mapDispatchToProps = (dispatch, getState)=>({
    taskCreate: task => dispatch(tasksActions.taskCreate(task)),
    taskUpdate: task => dispatch(tasksActions.taskUpdate(task)),
    taskDelete: task => dispatch(tasksActions.taskDelete(task)),
    tasksInitialize: id => dispatch(tasksActions.tasksInitialize(id)),
    remove: (userID, groupID) => dispatch(groupActions.remove(userID, groupID)),
})

export default  connect(mapStateToProps, mapDispatchToProps)(TasksQueue);
