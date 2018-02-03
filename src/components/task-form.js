import React from 'react';
import {connect} from 'react-redux';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

// let initialState = {
//  taskName:  '',
//  //dueDate: ,
//  //reoccurance: ,
// }

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     taskName : this.props.task || ''
   }
   console.log('in note-form', this.props.task)
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
   this.props.handleCreate(this.state);
   console.log("in noteform, state:",this.state);
   this.setState({taskName:''});
 };
 
 render(){
   return(
     <div className='task-form'>
       <form
         onSubmit={this.handleSubmit}>
 
         <input
           className='type-input'
           type='text'
           name='taskName'
           placeholder='take out the smelly compost'
           value={this.state.taskName}
           onChange={this.handleChange}
         />
          {
            renderIf(!this.props.task,
              <button type='submit'> Save Task </button>,
              null
            )
          }
        
       
       </form>
     </div>
   )
 }
}

export default TaskForm;