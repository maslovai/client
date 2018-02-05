import React from 'react';
import {connect} from 'react-redux';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   console.log(this.props.current)
   this.state = {
     name: this.props.current|| '',
     _id:this.props._id || ''
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
  //  console.log('state in submit form', this.state);
     this.props.handle(this.state);
     if (!this.props.current) this.setState({name:''});
    
 };
 
 render(){
   return(
     <div className='task-form-div'>
       <form
         onSubmit={this.handleSubmit}>
         <input         
           className={this.props.current ? "listInput" : "newInput"}
           type='text'
           name='name'
           placeholder='What needs to be done?'
           value={this.state.name}
           onChange={this.handleChange}
         />
         {
           renderIf(!this.props.current,
            <button type='submit'> {this.props.button} </button>,
            null  )
         }
        
       </form>
     </div>
   )
 }
}

export default TaskForm;