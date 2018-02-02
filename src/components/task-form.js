import React from 'react';
import {connect} from 'react-redux';

let emptyState = {
 taskName: '',
 //dueDate: ,
 //reoccurance: ,
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   
   this.state = emptyState;
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
   //this.props.handleSomething(this.state);
   this.setState(emptyState);
 };
 
 render(){
   return(
     <div className='task-form'>
       <form
         onSubmit={this.handleSubmit}>
 
         <input
           className='type-input'
           type='text'
           name='name'
           placeholder='take out the smelly compost'
           value={this.state.name}
           onChange={this.handleChange}
         />
 
         <button type='submit'> {button} </button>
       
       </form>
     </div>
   )
 }
}

export default TaskForm;