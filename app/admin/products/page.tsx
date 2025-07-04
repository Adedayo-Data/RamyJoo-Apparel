'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { toast, Toaster } from 'sonner';


export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://ramyjoo-apparel-backend.onrender.com/api/admin/products?page=${currentPage}&size=12`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        setProducts(data.content);
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (id:number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`https://ramyjoo-apparel-backend.onrender.com/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) throw new Error("Failed to delete product");

        // Refresh product list after deleting
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
            toast.warning("Something went wrong while deleting.");
        }
    };

  return (
  <div className="min-h-screen bg-gray-50 px-6 py-10">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Products</h1>

    {loading ? (
      <p>Loading products...</p>
    ) : (
      <>
        {/* Add Product Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200">
            + Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 border-b">Product Name</th>
                <th className="p-4 border-b">Brand</th>
                <th className="p-4 border-b">Price (₦)</th>
                <th className="p-4 border-b">Stock</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{product.productName}</td>
                  <td className="p-4 border-b">{product.brand || 'N/A'}</td>
                  <td className="p-4 border-b">₦{product.price.toLocaleString()}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stockItems > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stockItems > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button className="text-indigo-600 hover:underline">Edit</button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                Previous
                </button>

                <span>Page {currentPage + 1} of {totalPages}</span>

                <button
                disabled={currentPage + 1 === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                Next
                </button>

        </div>
      </>
    )}
  </div>
);

}
