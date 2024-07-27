import React from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import Carousel from '../../Components/Carousel/Carousel';
import Categories from '../../Components/Catagory/Categories';
import Product from '../../Components/Product/Product';

function Landing() {
  return (
    <LayOut>
      <Carousel/>
      <Categories/>
      <Product />
    </LayOut>
  );
}

export default Landing