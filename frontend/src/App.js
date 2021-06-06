import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import Feed from './containers/Feed/Feed';
import Post from './containers/Post/Post';
import Auth from './containers/Auth/Auth';
import Profile from './containers/Profile/Profile';
import Chats from './containers/Chats/Chats';
import Chat from './containers/Chat/Chat';
import Search from './containers/Search/Search';
import Favorites from './containers/Favorites/Favorites';
import * as actions from './store/actions/index';


const App = props => {
  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector(state => state.auth.token !== null)

  const { onTryAutoSignin} = props;

  useEffect(() => {
    onTryAutoSignin();
 }, [onTryAutoSignin]);

const checkMobile = () => {
  const w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  windowWidth = w.innerWidth || e.clientWidth || g.clientWidth; //window width

  return windowWidth > 768
 }
  
 let routes = (
   <Switch>
      <Route path='/auth'>
        <Auth/>
      </Route>
      <Redirect to="/auth"/>
   </Switch>
  )
 if(props.isAuthenticated) {
   routes = (
    <Switch>
      <Route path='/' exact> 
        <Feed/>
      </Route> 
      <Route path='/profile/:id'> 
        <Profile/>
      </Route>
      <Route path='/chats' exact>
        {checkMobile() ? <Redirect to='/'/> : <Chats/>}
        {/* <Chats/> */}
      </Route>
      <Route path='/chats/:id'> 
        <Chat/>
      </Route>
      <Route path='/favorites' exact>
        <Favorites/>
      </Route>
      <Route path='/favorites/:id'>
        <Post/>
      </Route>
      <Route path='/search'>
        <Search/>
      </Route>
      <Route path='/auth'> 
        <Auth/>
      </Route>
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
