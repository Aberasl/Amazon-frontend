import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/Datapprovider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrenyFormat"; // Fixed typo in import
import { Type } from "../../Utilty/Action.type";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);

  // Calculate total correctly
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };

  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };

  return (
    
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Oops! No items in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section className={classes.cart_product} key={i}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div>
                  <button onClick={() => increment(item)}>
                    {<FaAngleUp />}+
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => decrement(item.id)}>
                    -{<FaAngleDown />}
                  </button>
                </div>
              </section>
            ))
          )}

          {/* Conditional rendering for subtotal and checkout */}
          {basket.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket.length} items)</p>
                <CurrencyFormat amount={total} />
                {/* Assuming CurrencyFormat component is correctly implemented */}
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <div>
                <Link to="/payment">Proceed to checkout</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;
