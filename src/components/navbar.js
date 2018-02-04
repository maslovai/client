import React from 'react';
import {renderIf} from '../lib/__'

class Navbar extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {

        return (

            <nav>
                {renderIf(this.props.auth,
                    <ul>
                    <li onClick={() => this.props.switchRoute('/queue') }> Tasks Queue</li>
                    <li onClick={ () => this.props.switchRoute('/profile') }>Profile</li>
                    <li onClick={this.props.logout}>Logout</li>
                    </ul>
                )}
            </nav>

        )

    }

}

export default Navbar;