import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartContext } from './CartContext';
import './CartPage.css';

const CartPage = () => {
    const { itemQuantity, cart, discountedPrice, cartItems, decreaseQuantity, increaseQuantity, removeFromCart } = useCartContext();

    return (
        <div className="container mt-5">
            <div className='container nav d-flex justify-content-between align-items-center pb-3'>
                <h2 className='pb-3 mx-5'>Shopping Cart</h2>
                <NavLink exact to="../" className="text-decoration-none mx-5">
                    <span className='fw-medium fs-5'>Add More Products</span>
                </NavLink>
            </div>
            {cart.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center'>
                    <p className='fw-bold fs-1 mt-3'>Your cart is empty</p>
                </div>
            ) : (
                <div>
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="row border rounded-3 p-4 mb-3">
                                <div className="col-12 col-md-3">
                                    <img className="img-fluid" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt={item.title} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <p className='fw-semibold fs-4 pt-2'>{item.title}</p>
                                    <p className='fw-medium mb-0'>Details & Core:</p>
                                    <p className='fw-light fixedWidth'>{item.description}</p>
                                </div>
                                <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
                                    <button className="btn btn-secondary btn-sm me-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <span className="px-2 fs-5">{itemQuantity[item.id]}</span>
                                    <button className="btn btn-secondary btn-sm ms-2" onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>
                                <div className="col-12 col-md-2 d-flex flex-column justify-content-around align-items-center pt-4">
                                    <span className='pb-2 fw-bold fs-4'>${(discountedPrice[item.id-1] * itemQuantity[item.id]).toFixed(2)}</span>
                                    <button className="btn btn-danger btn-sm mb-2" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr/>
                    <div className="row d-flex flex-column align-items-end">
                        <div className="container me-0 col-12 col-md-6 fw-medium fs-4 ms-0 me-2">
                            <div className='d-flex justify-content-between align-items-center'>
                                <span>Sub Total </span>
                                <span>${(cartItems.reduce((acc, item) => acc + discountedPrice[item.id-1] * itemQuantity[item.id], 0)).toFixed(2)}</span>
                            </div>                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <span>Shipping</span> 
                                <span>Free</span>
                            </div>                            
                        </div>
                    </div>
                    <hr/>
                    <div className="row d-flex flex-column align-items-end">
                        <div className="container me-0 col-12 col-md-6 fw-bold fs-4 ms-0 me-2">
                            <div className='d-flex justify-content-between align-items-center'>
                                <span>Total </span>
                                <span>${(cartItems.reduce((acc, item) => acc + discountedPrice[item.id-1] * itemQuantity[item.id], 0)).toFixed(2)}</span>
                            </div>                                                       
                        </div>
                    </div>
                    <hr/>
                </div>
            )}
        </div>
    );
}

export default CartPage;