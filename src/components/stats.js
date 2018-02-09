import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';//is react-redux doing this?
import Chart from 'react-d3-core';//need to install
import LineChart from 'react-d3-basic';//need to install
import * as userAction from '../app/actions/users';//we need to create a user action

class UserStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.userStats || {};//what kind of state do we need
    }

    componentWillMount(){
        //not sure what we need to use this for, if we need to use it
    }
    
    render() {
        return (
            <div>
                <div>
                    <h2>Completed Tasks, By Users </h2>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    userStats: state.userStats
  });
  
const mapDispatchToProps = (dispatch, getState) => ({
    updateProfile: (user) => dispatch(profileActions.update(user))
});//do we need this for charts and stats?
  
export default connect(mapStateToProps, mapDispatchToProps)(UserStats);



//demo code from FusionCharts (a react chart plugin)
//https://www.fusioncharts.com/react-charts/#/demos/ex2
//or
//https://medium.com/localmed-engineering/svg-pie-chart-using-react-and-d3-43a381ce7246