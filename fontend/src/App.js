import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Hoc from './hoc/Hoc/Hoc';
import Layout from './containers/Layout/Layout';
import Feed from './containers/Posts/posts';
import Auth from './containers/Auth/Auth';
import Profile from './containers/Profile/Profile';
import Friends from './containers/Friends/Friends';
import Favorites from './containers/Favorites/Favorites';
import * as actions from './store/actions/index';


const App = props => {
  const { onTryAutoSignin } = props;

  useEffect(() => {
    onTryAutoSignin();
 }, [onTryAutoSignin])
  
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
              <PrivateRoute authed={props.isAuthenticated} path='/search' component={Friends}/>
              <Route path='/auth' component={Auth}/>
              <PrivateRoute authed={props.isAuthenticated} path='/' exact component={Feed}/> 
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

const madDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, madDispatchToProps)(App);
