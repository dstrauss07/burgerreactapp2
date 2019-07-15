import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate(){
        console.log("order will update")
    }

    render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}: </span> 
            {this.props.ingredients[igKey]}
            </li>);
    });

        return(
           <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h4>Total Price : ${this.props.totalPrice.toFixed(2)}</h4>
            <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.clickedCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.clickedContinue}>CONTINUE</Button>
        </Aux>
        )
    }




};

export default OrderSummary;