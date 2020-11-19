import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Hoc from './hoc/Hoc/Hoc';
import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/posts';
import Auth from './containers/Auth/Auth';

class App extends Component {

  render(){
    return(
      <Hoc>
        <Layout show={this.props.isAuthenticated}>
            <Switch>
              <Route path='/auth' component={Auth}/>
              <Route path='/' exact component={Posts}/> 
            </Switch>
        </Layout>
      </Hoc>
    )
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.localId !== null
  }
}

export default connect(mapStateToProps)(App);
