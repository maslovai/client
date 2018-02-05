import React from 'react';

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
  //  console.log('state in submit form', this.state);
   if (!this.props.name) {
     this.props.handleCreate(this.state);
     this.setState({name:''});
   } 
    else this.props.handleUpdate(this.state)  
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
           placeholder='What needs to be done?'
           value={this.state.name}
           onChange={this.handleChange}
         />
         {
           renderIf(!this.props.name,
            <button type='submit'> {this.props.button} </button>,
            null  )
         }
        
       </form>
     </div>
   )
 }
}

export default TaskForm;