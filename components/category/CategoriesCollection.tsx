
import React from "react";

import CategoriesCollectionClient from "./CategoriesCollectionClient";
import { API_URL } from "@/config/api";

const CategoriesCollection = async () => {
  const res = await fetch(`${API_URL}/api/products/all`, {
    cache: "no-store",
  });

  const productsData = await res.json();

  return <CategoriesCollectionClient productsData={productsData} />;
};

export default CategoriesCollection;