import '../style/main.scss';

import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from './header'
import Footer from './footer'
import Navbar from './navbar'
import Login from './login'
import Groups from './groups'
import TasksQueue from './tasks'


import * as authActions from '../app/actions/auth';
import * as routeActions from '../app/actions/routes';
import * as taskActions from '../app/actions/tasks'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { viewTasks: false}

    this.toggleView = this.toggleView.bind(this);
  }
    
  componentWillMount() {
    this.props.validate();
  }

  toggleView() {    
    let viewTasks = Object.assign(this.state, {viewTasks:true})  
    this.setState(viewTasks)      
  }
  
  render() {
    return (
      <React.Fragment>

        <Header appTitle="Task-Off" />

        <Navbar auth={this.props.auth}
            viewTasks={this.state.viewTasks}
            switchRoute={this.props.switchRoute} logout={this.props.logout}/> 

        <main>
          <Switch location={{pathname:this.props.route}}>
            <Route path='/queue' component={TasksQueue}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/groups' component={() => 
              <Groups toggleView={this.toggleView} switchRoute={this.props.switchRoute}/>}/>
          </Switch>
        </main>

        <Footer>
          <p>&copy;2018 The Awesome People</p>
        </Footer>

      </React.Fragment>
    )
  }
}

// TODO: Map state, dispatch, and connect the App
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  route: state.route, 
});
    
const mapDispatchToProps = (dispatch, getState) => ({
    validate: () => dispatch(authActions.validate()),
    switchRoute: (route) => dispatch(routeActions.switchRoute(route)),
    logout: () => dispatch(authActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
