import Carousel from "./Components/Carousel/Carousel";

import Header from "./Components/Header/Header";

import Categories from "./Components/Catagory/Categories";
import Product from "./Components/Product/Product";
import Landing from "./Pages/Landing/Landing";
import Routing from "./Router";
import { useContext, useEffect } from "react";
import { DataContext } from "./Components/Datapprovider/DataProvider";
import { Type } from "./Utilty/Action.type";
import { auth } from "./Utilty/Firebase";
const App =() =>{
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
       
        dispatch({
          type: Type.SET_USER,
          user: authuser,
          });
      }else
      {
        dispatch({
          type: Type.SET_USER,
          user: null,
          });
      }
    })

  }, []);
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
