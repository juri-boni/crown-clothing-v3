import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, Title } from "./category.styles";
import { selectCategoriesMap } from "../../app/categories/category.selector";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  // console.log("render/re-rendering component");
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // console.log("effect fired calling setProducts");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
