// Categories.jsx

import React from "react";
import { Categorinfo } from "./CategoryFunction"; // Assuming this imports your data correctly
import Classess from "./Categories.module.css"; // Import the CSS module
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    
    <section className={Classess.category_container}>
      {Categorinfo.map((infos) => (
        <CategoryCard data={infos}/>
        
      ))}
    </section>
  );
};

export default Categories;
