import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../app/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async (collectionName) => {
      const categoriesMap = await getCategoriesAndDocuments(collectionName);

      dispatch(setCategoriesMap(categoriesMap));
    };
    getCategoriesMap("categories");
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
