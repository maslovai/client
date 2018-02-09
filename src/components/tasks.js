import React from 'react';
import {connect} from 'react-redux';
import * as tasksActions from '../app/actions/tasks';
import TaskForm from './task-form';




class TasksQueue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks || [],
            groupID:this.props.location.pathname.slice(7)
        }
    }
    componentWillMount(){
        let groupID = this.props.location.pathname.slice(7)
        this.props.tasksInitialize(groupID);
    }

    render() {
        return (
            <div className = 'queueView'>
                <div className='inputDiv'>
                    {/* <h2 className='taskHeader'>Create a task:</h2> */}

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
                                    <span onClick={()=>this.props.taskDelete(task)}>x</span>
                                    <TaskForm handle = {this.props.taskUpdate} 
                                        name={task.name}
                                        completed={task.completed}
                                        _id={task._id}
                                        groupID={this.state.groupID}
                                        userID = {this.props.user._id}
                                        userName = {this.props.user.username.split('.').slice(1)}
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
    user:state.user
})

const mapDispatchToProps = (dispatch, getState)=>({
    taskCreate: task => dispatch(tasksActions.taskCreate(task)),
    taskUpdate: task => dispatch(tasksActions.taskUpdate(task)),
    taskDelete: task => dispatch(tasksActions.taskDelete(task)),
    tasksInitialize: id => dispatch(tasksActions.tasksInitialize(id))
})

export default  connect(mapStateToProps, mapDispatchToProps)(TasksQueue);
