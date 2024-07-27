import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Order.module.css";
import { db } from "../../Utilty/Firebase";
import { DataContext } from "../../Components/Datapprovider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { collection,  onSnapshot, query, orderBy } from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Create a reference to the collection
      const ordersRef = collection(db, "users", user.uid, "orders");
      
      // Create a query with ordering
      const q = query(ordersRef, orderBy("created", "desc"));
      
      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        // console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // Clean up the subscription on component unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // Add `user` to the dependency array

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          <div>
            {orders?.length === 0 && (
              <div
                style={{
                  padding: "20px",
                }}
              >
                you don't have orders yet.
              </div>
            )}
          </div>
          {/* Ordered items */}
          <div>
            {orders?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
