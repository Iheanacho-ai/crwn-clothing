import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shopPage/shopPage';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header';



import SignInAndSignUpPage from './pages/signIn-and-signUp/signIn-and-signUp';
import { selectCurrentUser } from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';




class App extends React.Component {
  

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component = {HomePage} />
          <Route  path='/shop' component={ShopPage} />
          <Route  path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin'render={() => this.props.currentUser? (<Redirect to= '/' />) : <SignInAndSignUpPage/>} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps, mapDispatchToProps )(App);



