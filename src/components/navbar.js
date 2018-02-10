import React from 'react';
import {renderIf} from '../lib/__'

class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.showGroups = this.showGroups.bind(this);
    }

    showGroups() {
      this.props.switchRoute('/groups');        
    }
    
    render() {
      return (
        <nav>
          {renderIf(this.props.auth,
            <ul>
              <li onClick={this.showGroups}>Groups</li>
              <li onClick={this.props.logout}>Logout</li>
              {renderIf(this.props.viewTasks,
              <li onClick={() => this.props.switchRoute('/queue') }> Tasks Queue</li>)}  
            </ul>
           )}                    
        </nav>
      )
    }
}

export default Navbar;