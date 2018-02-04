import React from 'react';
import {connect} from 'react-redux';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     task : this.props.task || ''
   }
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
   this.setState({task:''});
 };
 
 render(){
   return(
     <div className='task-form'>
       <form
         onSubmit={this.handleSubmit}>
 
         <input         
           className={this.props.task ? "listInput" : "newInput"}
           type='text'
           name='task'
           placeholder='take out the smelly compost'
           value={this.state.task}
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