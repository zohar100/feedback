import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Hoc from './hoc/Hoc/Hoc';
import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/posts';
import Auth from './containers/Auth/Auth';
import Profile from './containers/Profile/Profile'
import Favorites from './containers/Favorites/Favorites';

const app = props => {
  
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
        <Layout show={props.isAuthenticated}>
            <Switch>
              <PrivateRoute authed={props.isAuthenticated} path='/profile/:id' component={Profile}/>
              <PrivateRoute authed={props.isAuthenticated} path='/favorites' component={Favorites}/>
              <Route path='/auth' component={Auth}/>
              <PrivateRoute authed={props.isAuthenticated} path='/' exact component={Posts}/> 
            </Switch>
        </Layout>
      </Hoc>
    )
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(app);
