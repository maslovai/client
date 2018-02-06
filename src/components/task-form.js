import React from 'react';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = this.props || {
     task: {
      name: '',
      _id: '',
      completed: false
     }
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleOnChange = this.handleOnChange.bind(this);
 }

 componentWillReceiveProps(props){
  console.log('PROPS IN WILL RECEIVE', props)
  // this.setState(nextState)
}
 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
     this.props.handle(this.state);
     if (!this.props.task.name) this.setState({task:{name:''}})
 }

 handleOnChange(e){
  this.setState({completed: e.target.checked}, ()=>this.props.handle(this.state));
 }
 
 render(){
   console.log("last try:::::::::", this.state)
   return(
     <div className='task-form-div'>
       <form
         onSubmit={this.handleSubmit}>
         <input    
           className={this.props.task ? "listInput" : "newInput"}
           id={this.state.task.completed ? "completedTask" : "incompleteTask"}
           type='text'
           name='name'
           placeholder='What needs to be done?'
           value={this.state.task.name}
           onChange={this.handleChange}
         />
         {
           renderIf(this.state.button,
            <button type='submit'> {this.state.button} </button>,
            <input id="checkBox" 
                   type="checkbox" 
                   onChange= {this.handleOnChange} 
                   checked = {this.state.task.completed}  
            />
           )
         }
       </form>
     </div>
   )
 }
}

export default TaskForm;