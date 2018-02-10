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
     groupID:this.props.groupID || '',
     _id:this.props._id || '',
     completedBy:this.props.userID || '',
     userName:this.props.userName
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleOnChange = this.handleOnChange.bind(this);
 }

 componentWillReceiveProps(props){
   this.setState(props)
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
    console.log('in submit to post a task, this.state::::',this.state)
     this.props.handle(this.state);
     if (!this.props.name) this.setState({name:''})
 }

 handleOnChange(e){
   let task = Object.assign(this.state, {completed:!this.state.completed, completedBy:this.props.userID})
   this.setState({task}, () => {
      this.props.handle(this.state);
   })   
 }
 
 render(){
   return(
     <div className='task-form-div'>
       <form autoComplete="off" className='newTasks' id={this.props.name ? "listForm" : null}
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
            <button id='taskButton' type='submit'> {this.props.button} </button>,
            <div id = {`checkedTest${this.state._id}`}className = 'currentTask'>
              <input  
                    type="checkbox" 
                    id='checkbox'
                    onChange= {this.handleOnChange} 
                    checked = {this.state.completed}  
              />
              {
                  renderIf(this.state.completed,
                    <input
                      type = "text"
                      defaultValue = {this.state.userName}
                      />,
                      null
                    )
              }
            
            </div>
           )
         }
       </form>
     </div>
   )
 }
}

export default TaskForm;
