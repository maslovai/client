import React from 'react';
import {connect} from 'react-redux';
import * as tasksActions from '../app/actions/tasks';
import TaskForm from './task-form';

// const renderIf = (test, component, alternative) => {
//     return test ? component : alternative
// }

class TasksQueue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: this.props.tasks || [] }
    }
    componentWillMount(){
        this.props.tasksInitialize();
    }


    render() {
        return (
            <div>
                <div className='inputDiv'>
                    <h2>Create a task:</h2>
                    <TaskForm handle = {this.props.taskCreate} 
                                button = "Save Task"
                                task={{}}
                    />
                </div>
                <div className = 'taskQueue'>
                    <h2>Group's tasks. Click on task and write your name to claim</h2>
                    <ul className = "taskQueue">
                        {
                            this.props.tasks.map((task, i)=> 
                                <li key = {i} >
                                    <span onClick={()=>this.props.taskDelete(task)}>x</span>
                                    <TaskForm handle = {this.props.taskUpdate} 
                                        task={{name:task.name, completed:task.completed,_id:task._id}}
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
    tasks : state.tasks
})

const mapDispatchToProps = (dispatch, getState)=>({
    taskCreate: task => dispatch(tasksActions.taskCreate(task)),
    taskUpdate: task => dispatch(tasksActions.taskUpdate(task)),
    taskDelete: task => dispatch(tasksActions.taskDelete(task)), 
    tasksInitialize: ()=> dispatch(tasksActions.tasksInitialize())
})

export default  connect(mapStateToProps, mapDispatchToProps)(TasksQueue);