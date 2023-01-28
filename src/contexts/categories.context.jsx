import { useState, useEffect, createContext } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //useEffect to set the initial categories values in firestore
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async (collectionName) => {
      const categoryMap = await getCategoriesAndDocuments(collectionName);

      setCategoriesMap(categoryMap);
    };
    getCategoriesMap("categories");
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
