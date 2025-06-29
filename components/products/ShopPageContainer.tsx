"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProductViewChange from "../product/ProductViewChange";
import { getProductsFromBackend } from "@/lib/api-adapter";
import Pagination from "../others/Pagination";
import SingleProductListView from "@/components/product/SingleProductListView";
import { Product, SearchParams } from "@/types";
import SingleProductCartView from "../product/SingleProductCartView";
import { Loader2 } from "lucide-react";
import Loader from "../others/Loader";

interface ShopPageContainerProps {
  searchParams: SearchParams;
  gridColumn?: number;
}

const ShopPageContainer = ({ searchParams, gridColumn }: ShopPageContainerProps) => {
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(false);
  const [productData, setProductData] = useState<{
    content: Product[];
    totalPages: number;
    totalElements: number;
    size:number;
  }>({
    content: [],
    totalPages: 1,
    totalElements:0,
    size:24,
  });

  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = productData.size;

  useEffect(() => {
  setLoading(true);

  const fetchData = async () => {
    const pageNumber = (Number(searchParams.page) || 1) - 1; // zero-based index
    const data = await getProductsFromBackend(pageNumber);
    if (data) {
      setProductData({
        content: data.content,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        size:data.size,
      });
    }
    setLoading(false);
  };

  fetchData();
}, [searchParams]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
        <Loader2 className="animate-spin text-xl" size={50} />
        <p>Loading products...</p>
      </div>
    );
  }

  if (productData.content.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col gap-4 text-xl mx-auto font-semibold space-y-4">
        <ProductViewChange
          listView={listView}
          setListView={setListView}
          totalPages={productData.totalPages}
          itemPerPage={itemsPerPage}
          currentPage={currentPage}
          totalElements={productData.totalElements}
        />
        <p>Sorry, no result found with your filter selection</p>
      </div>
    );
  }

  return (
    <div className="md:ml-4 p-2 md:p-0">
      {/* product status and filter options */}
      <ProductViewChange
        listView={listView}
        setListView={setListView}
        totalPages={productData.totalPages}
        itemPerPage={itemsPerPage}
        currentPage={currentPage}
        totalElements={productData.totalElements}
      />

      {/* showing product list or card view based on state */}
      {listView ? (
        <div className="max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 gap-4 lg:gap-6">
          {productData.content.map((product) => (
            <SingleProductListView key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className={`max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridColumn || 3} gap-4 lg:gap-6`}
        >
          {productData.content.map((product) => (
            <SingleProductCartView key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* pagination */}
      <Suspense fallback={<Loader />}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageName="page"
        />

      </Suspense>
    </div>
  );
};

export default ShopPageContainer;
