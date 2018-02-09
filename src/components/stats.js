import React from 'react';
import {connect} from 'react-redux';

class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentWillMount(){
        let groupID = this.props.location.pathname.slice(7)
        this.props.statsInitialize(groupID);
    }
}

export default Stats;