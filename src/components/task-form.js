import React from 'react';
import {connect} from 'react-redux';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     name:this.props.name || '',
     completed:this.props.completed || false,
     groupID: this.props.groupID || '1',
     task_id:this.props._id || '' 
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleOnChange = this.handleOnChange.bind(this);
 }

 componentWillReceiveProps(props, nextState){
   console.log('PROPS IN WILL RECEIVE', props, nextState)
   // this.setState(nextState)
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
    console.log('in submit to post a task::::',this.state.task)
     this.props.handle(this.state);
     if (!this.props.name) this.setState({name:''})
 }

 handleOnChange(e){
   let task = Object.assign(this.state, {completed:!this.state.completed})
   this.setState({task}, () => {
    this.props.handle(this.state.task);
  });
  // console.log('state in onChange button',this.state.task.completed);
 }
 
 render(){
   console.log("props from tasksQueue::::", this.state)
   return(
     <div className='task-form-div'>
       <form
         onSubmit={this.handleSubmit}>
         <input    
           className={this.props.name ? "listInput" : "newInput"}
           id={this.state.completed ? "completedTask" : "incompleteTask"}
           type='text'
           name='name'
           placeholder='What needs to be done?'
           value={this.state.name}
           onChange={this.handleChange}
         />
         {
           renderIf (!this.props.name,
            <button type='submit'> {this.props.button} </button>,
            <input id="checkBox" 
                   type="checkbox" 
                   onChange= {this.handleOnChange} 
                   checked = {this.state.completed}  
            />
           )
         }
       </form>
     </div>
   )
 }
}

export default TaskForm;