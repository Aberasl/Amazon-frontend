import React, { useState } from "react";
import { useContext } from "react";
import classes from "./Paynment.module.css";
import { ClipLoader } from "react-spinners";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/Datapprovider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrenyFormat";
import { db } from "../../Utilty/Firebase";
import { Type } from "../../Utilty/Action.type";
import { axiosInstance } from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import {  doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [Processing, setprocessing] = useState(false);
  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setcardError(e?.error?.message) : setcardError("");
  };

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setcardError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setprocessing(true);
      // Contact backend to get client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;

      // Confirm payment on client side

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);
      // TODO: Handle successful payment, update UI accordingly

      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      // emoty the basket

      dispatch({ type: Type.EMPTY_BASKET });
      setprocessing(false);

      navigate("/Order", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      // console.error("Error during payment:", error);
      setcardError(error.message); // Update cardError state based on error message
      setprocessing(false);
    }
  };
  // order firestore database save ,clear basket

  return (
    <LayOut>
      {/* header */}
      <div className={classes.Payment_container}>
        Checkout({totalItem})items
      </div>
      {/* payment method */}
      <section className={classes.Payment}>
        {/* adress */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user.email}</div>
            <div>123 react lane</div>
            <div>Nashville , TN</div>
          </div>
        </div>
        <hr />
        {/* products */}

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>

          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment__details}>
              <form onSubmit={handlePayment} action="">
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* stripe card */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.Payment__price}>
                  <div>
                    <span style={{ display: "flex" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {Processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
