import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Edu',
                address: {
                    street: 'Test street 123',
                    zipCode: '17310',
                    country: 'Spain'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {

        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name Here' />
                <input className={classes.Input} type='email' name='email' placeholder='Your Email Here' />
                <input className={classes.Input} type='text' name='street' placeholder='Your Street Here' />
                <input className={classes.Input} type='text' name='postal' placeholder='Your Postal Code Here' />
                <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Entry your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;