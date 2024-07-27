import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrenyFormat";
import classes from "./product.module.css";
import { DataContext } from "../Datapprovider/DataProvider";
import { Type } from "../../Utilty/Action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  // Always call useContext at the top level of your component
  const { id, image, title, description, rating, price } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { id, image, title, description, rating, price },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div>{description}</div>}

        <div className={classes.rating}>
          {rating && (
            <>
              <Rating value={rating.rate} precision={0.1} />
              <small>{rating.count}</small>
            </>
          )}
          <div>
            <CurrencyFormat amount={price} />
          </div>

          {renderAdd && (
            <button className={classes.button} onClick={addToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
