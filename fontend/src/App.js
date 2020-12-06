import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Hoc from './hoc/Hoc/Hoc';
import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/posts';
import Auth from './containers/Auth/Auth';
import Profile from './containers/Profile/Profile'

class App extends Component {
  
  render(){
    const PrivateRoute = ({component: Component, authed, ...rest}) => {
      return (
        <Route
          {...rest}
          render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/auth'}} />}
        />
      )
    }
    return(
      <Hoc>
        <Layout show={this.props.isAuthenticated}>
            <Switch>
              <PrivateRoute authed={this.props.isAuthenticated} path='/profile' component={Profile}/>
              <Route path='/auth' component={Auth}/>
              <PrivateRoute authed={this.props.isAuthenticated} path='/' exact component={Posts}/> 
            </Switch>
        </Layout>
      </Hoc>
    )
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(App);
