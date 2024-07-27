// CategoryCard.jsx

import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import Classes from "./Categories.module.css"; // Import the CSS module

function CategoryCard({ data }) {
  return (
    <div className={Classes.category}>
      {/* Use backticks (`) for template literals in JSX */}
      <Link to={`/category/${data.name}`}>
        <span>
          <h4>{data?.title}</h4>
        </span>
        <img src={data?.image_link} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
