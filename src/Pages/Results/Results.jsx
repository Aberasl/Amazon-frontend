import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../Api/EndPoint";

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Include categoryName in dependency array if it can change

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category/{categoryName}</p>
        <br />

        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product}
            renderDesc={false}
            renderAdd={true} />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
