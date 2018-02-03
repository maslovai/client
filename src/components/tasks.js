import React from 'react';
import {connect} from 'react-redux';
import * as tasksActions from '../app/actions/tasks';
import TaskForm from './task-form';

const renderIf = (test, component, alternative) => {
    return test ? component : alternative
}

class TasksQueue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks:this.props.tasks||[]}
    }
    
    // componentWillReceiveProps(taskArray) {
    //     if(taskArray) { this.setState(taskArray.tasks) }
    //   }

    render() {
        return (
            <div>{
                renderIf(this.props.tasks.length, 
                    <div className = 'taskQueue'>
                        <h2>Here are your tasks:</h2>
                        <ul className = "taskQueue">
                            {
                                this.props.tasks.map((task, i)=> 
                                    <li key = {i}>
                                        <TaskForm
                                            task = {task.taskName}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                    </div>,
                    <div>
                        <p>No tasks yet, create one.</p>
                        <TaskForm handleCreate= {this.props.taskCreate} 
                                  handleDel={this.props.taskDelete}
                                  handleUpdate={this.props.taskUpdate}
                        />
                    </div>
                )
            }
            </div>    
        )
    }
}
const mapStateToProps = state => ({
    tasks:state.tasks
})

const mapDispatchToProps = (dispatch, getState)=>({
    taskCreate: task => dispatch(tasksActions.taskCreate(task)),
    taskUpdate: task => dispatch(tasksActions.taskUpdate(task)),
    taskDelete: task => dispatch(tasksActions.taskDelete(task))
})

export default  connect(mapStateToProps, mapDispatchToProps)(TasksQueue);