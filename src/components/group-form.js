import React from 'react';

const initialState = {
  groupName: '',
  alias: ''
}

class GroupForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = initialState;
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.handleSubmitAlias = this.handleSubmitAlias.bind(this);
    
  }

  handleChange(e) {
    this.setState({[e.target.name]:(e.target.value)});  
  }
  
  handleSubmitName(e) {
    e.preventDefault();
    this.props.handleAdd(this.state.groupName);
    this.setState(initialState)
  }

  handleSubmitAlias(e) {
    e.preventDefault();
    this.props.handleJoin(this.state.alias);
    this.setState(initialState)
  }
    
  render() {
      let nameForm = 'name';
      let aliasForm = 'alias';

    return [
      <form autoComplete="off" key={nameForm} className="groupAdd" onSubmit={this.handleSubmitName}>			
      <label className='groupCreateLabel'>
        <span className='grpLabel'>Create a new group!</span>
        <input 
          type="text"
          name="groupName"
          placeholder="Name your group"
          value={this.state.groupName}
          onChange={this.handleChange}/>
      </label>	
      <button data-key='groupName' type="submit">Create</button>
      </form>,
 
      <form key={aliasForm} className="groupAdd" onSubmit={this.handleSubmitAlias}>
      <label className='groupCreateLabel'>
        <span className='grpLabel'>Join a group!</span>
        <input 
          type="text"
          name="alias"
          placeholder="Enter group alias"
          value={this.state.alias}
          onChange={this.handleChange}/>
      </label>	
      <button data-key='alias' type="submit">Join</button>
      </form>
    ]   
  }
}

export default GroupForm;