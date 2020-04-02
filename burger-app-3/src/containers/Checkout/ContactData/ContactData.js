import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
  state = {
    name: '',
    email: '',
    address:{
      street: '',
      postalCode: ''
    },
    loading:false
  }

  orderHandler= (event) =>{
    event.preventDefault();
    console.log(this.props.ingredients)
            this.setState({loading:true});
        const order= {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Dave Strauss',
                address:{
                    street: 'test Street1',
                    zipCode: '30068',
                    country:'USA'
                },
                email: 'dave@dave.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response=>{
            this.setState({loading:false});
            this.props.history.push('/');
    })
        .catch(error=>{
            this.setState({loading:false});
        });
  }

  render(){

    let form =(
      <form>
        <input className={classes.Input} type="text" name="name" placeHolder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeHolder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeHolder="Street" />
        <input className={classes.Input} type="text" name="postal" placeHolder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
      );
    if(this.state.loading){
      form= <Spinner />
    }
    return(    
      <div className={classes.ContactData}>  
      {form}
      </div>
    )
  }

}

export default ContactData;