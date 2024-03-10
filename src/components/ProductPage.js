import { NavLink } from 'react-router-dom';
import { useCartContext } from './CartContext';

const ProductPage = () => {
    const { itemQuantity, cart, cardData, hiddenDescriptions, discountedPrice, toggleDescription, updateCart } = useCartContext();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5 py-3">
                    <NavLink to='./' className="navbar-brand fs-2">Shopping WebApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        </ul>
                        <form className="d-flex">
                            <NavLink exact to='./cart' className="btn btn-outline-dark navlink-cart">
                                <i className="fas fa-cart-shopping me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white rounded-pill ms-1">{cart.length}</span>
                            </NavLink>
                        </form>
                    </div>
                </div>
            </nav>
            <section className="py-3">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center">
                        {cardData.map((card) => (
                            <div className="col mb-5" key={card.id}>
                                <div className="card h-100">
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt={card.title} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{card.title}</h5>
                                            <div>
                                                <div className='row align-items-top text-start fw-light fs-6 pt-2'>
                                                    <div className='col-auto'>
                                                        <button className="btn btn-outline-dark" onClick={() => toggleDescription(card.id)}><i class="fa-solid fa-caret-down"></i></button>
                                                    </div>
                                                    <div className='col'>
                                                        <p className={hiddenDescriptions[card.id] ? "d-none" : ""}>{card.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-around align-items-center pt-2'>
                                                <span className='fw-medium'><i className="fa-solid fa-star mx-1 text-warning"></i>{card.rating}</span>
                                            </div>
                                            <br />
                                            
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-around'>
                                        <div className='d-flex flex-column justify-content-end align-items-start pb-4'>
                                            <span className='text-muted text-decoration-line-through px-2 fw-semibold fs-6'>${card.price}</span>
                                            <span className='fw-medium text-danger fw-semibold fs-6'>-{card.discountPercentage}%</span>
                                        </div>
                                        <div>
                                            <span className=' fw-semibold fs-6'>${discountedPrice[card.id-1]}</span>
                                        </div>                                       
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent fs-5">
                                        <div className="d-flex justify-content-around align-items-center">                                            
                                            {cart.includes(card.id) ?
                                            <div className="btn-group">
                                                <button className="btn btn-outline-dark fs-5" onClick={() => updateCart(card.id, 'decrease')}>-</button>
                                                <span className="btn btn-outline-dark fs-5">{itemQuantity[card.id]}</span>
                                                <button className="btn btn-outline-dark fs-5" onClick={() => updateCart(card.id, 'increase')}>+</button>
                                            </div> :
                                            <button className='btn btn-outline-dark mt-auto fs-5' onClick={() => updateCart(card.id, 'add')}>
                                                Add to Cart
                                            </button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductPage;