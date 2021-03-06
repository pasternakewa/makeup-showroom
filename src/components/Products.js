import React, { useState, useEffect } from "react";
import GalleryImage from "./GalleryImage";
import { Link } from "react-router-dom";

export default function Products() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    fetchItems();
    setItems([]);
  }, []);

  const fetchItems = async () => {
    try {
      const fetchedData = await fetch(
        "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
      );
      const items = await fetchedData.json();
      setItems(items);
      setIsLoading(false);
    } catch (e) {
      setIsError(e.toString());
      setIsLoading(false);
    }
  };

  let getUniqueCategoryProducts = [
    ...new Map(items?.map((item) => [item.product_type, item])).values(),
  ];
  const showErrorMsg = isError || items.length === 0;

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Products</h1>
      {isLoading ? (
        <h4>Loading products...</h4>
      ) : showErrorMsg ? (
        <p>
          Problem loading data. {isError} Get back to
          <Link to="/"> home page</Link>.
        </p>
      ) : getUniqueCategoryProducts ? (
        <div className="gallery">
          {getUniqueCategoryProducts.map((item) => (
            <GalleryImage
              name={item.name}
              src={item.image_link}
              category={item.product_type}
              id={item.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
