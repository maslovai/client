import React from 'react';
import {connect} from 'react-redux';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
  //  console.log(this.props.completed)
   this.state = {
     name: this.props.name|| '',
     _id:this.props._id || '',
     completed:this.props.completed || 'false'
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleOnChange = this.handleOnChange.bind(this);
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
     this.props.handle(this.state);
     if (!this.props.name) this.setState({name:''})
 }

 handleOnChange(e){
  this.setState({completed: e.target.checked});
  this.props.handle(this.state);
  console.log(this.state);
 }
 
 render(){
   return(
     <div className='task-form-div'>
       <form
         onSubmit={this.handleSubmit}>
         <input    
           className={this.props.name ? "listInput" : "newInput"}
           id={this.props.completed ? "completedTask" : "incompleteTask"}
           type='text'
           name='name'
           placeholder='What needs to be done?'
           value={this.state.name}
           onChange={this.handleChange}
         />
         {
           renderIf(!this.props.name,
            <button type='submit'> {this.props.button} </button>,
            <input id="checkBox" 
                   type="checkbox" 
                   checked={this.props.completed} 
                   onChange= {this.handleOnChange}   
            />
           )
         }
       </form>
     </div>
   )
 }
}

export default TaskForm;