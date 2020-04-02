import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route } from 'react-router-dom';

class App extends Component {

  render(){
    return (
      <div >
          <Layout>
 <Route path ="/" exact component= {BurgerBuilder} /> 
 <Route path ="/Checkout" component={Checkout} />
          </Layout>
      </div>
    );
  }

}

export default App;
