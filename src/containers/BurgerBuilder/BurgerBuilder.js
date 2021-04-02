import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('https://burger-builder-185ff-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchaseable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You Continuie!!');
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i])); //encondes my elements such that they can be used on the url
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString

        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded :(</p> : <Spinner />

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                            <BuildControls 
                                ingredientAdded={this.props.onAddIngredient}
                                ingredientRemoved={this.props.onRemoveIngredient}
                                disabled={disabledInfo}
                                price={this.props.price}
                                purchaseable={this.state.purchaseable}
                                ordered={this.purchaseHandler}
                            />
                </Aux>
                );
            orderSummary = <OrderSummary
                price={this.props.price.toFixed(2)}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} 
                ingredients={this.props.ings} />
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }



        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));