import React from 'react';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     name:this.props.name || '',
     completed:this.props.completed || false,
     groupID:this.props.groupID || '1',
     _id:this.props._id || '',
     competedBy:this.props.userID || '',
     initials:this.props.userName
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleOnChange = this.handleOnChange.bind(this);
 }

 componentWillReceiveProps(props){
  //  console.log('PROPS IN WILL RECEIVE', props)
   this.setState(props)
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
    console.log('in submit to post a task, this.state::::',this.state)
    //  this.setState()
     this.props.handle(this.state);
     if (!this.props.name) this.setState({name:''})
 }

 handleOnChange(e){
   let task = Object.assign(this.state, {completed:!this.state.completed, completedBy:this.props.userID})
   this.setState({task}, () => {
      // console.log("State after the checkbox is checked:  ", this.state)
      this.props.handle(this.state);
   })
   let input = document.createElement('input');
   input.value = this.state.initials;
   input.id = this.state._id;

   if (this.state.completed){
      let input = document.createElement('input');
      input.value = this.state.initials;
      input.id = this.state._id
      console.log("input is",input.id)
      document.getElementById(`checkedTest${this.state._id}`).appendChild(input);
   }
   else{
      document.getElementById(input.id).remove();
   }
   
 }
 
 render(){
  //  console.log("props from tasksQueue::::", this.state)
   return(
     <div className='task-form-div'>
       <form id={this.props.name ? "listForm" : null}
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
            <div id = {`checkedTest${this.state._id}`}className = 'currentTask'>
              <input  
                    type="checkbox" 
                    onChange= {this.handleOnChange} 
                    checked = {this.state.completed}  
              />
            </div>
           )
         }
       </form>
     </div>
   )
 }
}

export default TaskForm;