import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import Feed from './containers/Posts/posts';
import Auth from './containers/Auth/Auth';
import Profile from './containers/Profile/Profile';
import Search from './containers/Search/Search';
import Favorites from './containers/Favorites/Favorites';
import * as actions from './store/actions/index';


const App = props => {

  const { onTryAutoSignin} = props;

  useEffect(() => {
    onTryAutoSignin();
 }, [onTryAutoSignin]);
  
 let routes = (
   <Switch>
      <Route path='/auth' render={() => <Auth/>}/>
      <Redirect to="/auth"/>
   </Switch>
  )
 if(props.isAuthenticated) {
   routes = (
    <Switch>
      <Route path='/profile/:id' exact component={Profile}/>
      <Route path='/favorites' component={Favorites}/>
      <Route path='/search' component={Search}/>
      <Route path='/auth' render={() => <Auth/>}/>
      <Route path='/' component={Feed}/> 
      <Redirect to="/auth"/>
    </Switch>
   )
 }
    
    return(
        <Layout show={props.isAuthenticated}>
            {routes}
        </Layout>
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
