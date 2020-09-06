import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shopPage/shopPage';
import SIGNINANDSIGNUP from './pages/signIn-and-signUp/signIn-and-signUp';
import Header from './components/header/header';
import { auth } from './firebase/firebase.utils';



class App extends React.Component {
  constructor(){
    super()

    this.state = {
      currentUser: null
    }
  } 

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({currentUser: user});

      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser} />
        <Switch>
          <Route exact path='/' component = {HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SIGNINANDSIGNUP} />
        </Switch>
      </div>
    )
  }
}

export default App;
