import React from 'react';
import {connect} from 'react-redux';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     name: this.props.name || ''
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
   this.setState({name:''});
 };
 
 render(){
   return(
     <div className='task-form-div'>
       <form
         onSubmit={this.handleSubmit}>
 
         <input         
           className={this.props.name ? "listInput" : "newInput"}
           type='text'
           name='name'
           placeholder='take out the smelly compost'
           value={this.state.name}
           onChange={this.handleChange}
         />
          {
            renderIf(!this.props.name,
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