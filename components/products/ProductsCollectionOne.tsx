// app/components/ProductsCollectionOne.tsx (Server Component)
import { getProductsFromBackend } from "@/lib/api-adapter";
import ProductsCollectionOneClient from "@/components/products/ProductsCollectionOneClient";

const ProductsCollectionOne = async () => {
  const products = await getProductsFromBackend();
  return <ProductsCollectionOneClient productsData={products ?? { content: [], totalPages: 0}} />;
};

export default ProductsCollectionOne;
