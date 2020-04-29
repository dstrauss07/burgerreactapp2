import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients){
         const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
            return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
        console.log('cancelling');
    }

    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }


render() {
    const disabledInfo={
        ...this.props.ings
    };
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <=0;
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> :<Spinner />
    
    if (this.props.ings){
        burger = (
            <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls 
                price = {this.props.price}
                ingredientAdded ={this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                disabled = {disabledInfo}
                purchasable ={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                />
               </Aux>
               );
        orderSummary = <OrderSummary 
               ingredients = {this.props.ings}
               totalPrice = {this.props.price}
               clickedCancel={this.purchaseCancelHandler}
               clickedContinue={this.purchaseContinueHandler}
           />
    }


    return (
        <Aux>
            <Modal show={this.state.purchasing}  modalClosed={this.purchaseCancelHandler} >
             {orderSummary}
                </Modal> 
            {burger}

        </Aux>



    );
}

}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
