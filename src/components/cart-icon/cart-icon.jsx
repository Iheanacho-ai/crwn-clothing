import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.scss';
import { dispatch } from 'rxjs/internal/observable/range';
import cartDropdown from '../cart-dropdown/cart-dropdown';
import CartItem from '../cart-item/cart-item';


const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick ={toggleCartHidden}>
       <ShoppingIcon className= 'shopping-icon' />
       <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);