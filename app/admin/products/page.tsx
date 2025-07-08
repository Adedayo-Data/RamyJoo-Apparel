'use client';

import { useEffect, useState } from 'react';
import { ProductPayload } from '@/types';
import { ProductWithId } from '@/types';
import { toast } from 'sonner';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useRouter } from 'next/navigation';

export default function AdminProductsPage() {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();

  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductWithId | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductPayload>({
    productName: '',
    description: '',
    price: 0,
    brand: '',
    category: '',
    subCategory: '',
    sizeList: [],
    colorList: [],
    images: [],
    available: true,
  });

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin/login');
  }, []);

  const openEditModal = (product: ProductWithId) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!productToEdit) return;

      const res = await fetch(
        `https://ramyjoo-apparel-backend.onrender.com/api/admin/products/${productToEdit.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productToEdit),
        }
      );

      if (!res.ok) throw new Error('Failed to update');

      setProducts((prev) =>
        prev.map((p) => (p.id === productToEdit.id ? productToEdit : p))
      );
      setShowEditModal(false);
      toast.success('Product updated successfully');
    } catch (err) {
      console.error(err);
      toast.warning('Failed to update product.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://ramyjoo-apparel-backend.onrender.com/api/admin/products?page=${currentPage}&size=12`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        setProducts(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('admin_token');

      const res = await fetch(
        `https://ramyjoo-apparel-backend.onrender.com/api/admin/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to delete product');

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.warning('Something went wrong while deleting.');
    }
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('admin_token');

      const res = await fetch(
        'https://ramyjoo-apparel-backend.onrender.com/api/admin/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!res.ok) throw new Error('Failed to add product');

      const created = await res.json();
      setProducts((prev) => [created, ...prev]);
      setShowAddModal(false);
      setNewProduct({
        productName: '',
        description: '',
        price: 0,
        brand: '',
        category: '',
        subCategory: '',
        sizeList: [],
        colorList: [],
        images: [],
        available: true,
      });
      toast.success('Product added successfully');
    } catch (err) {
      console.error(err);
      toast.warning('Something went wrong while adding product.');
    }
  };

return (
  <div className="min-h-screen bg-gray-50 px-6 py-10">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Products</h1>

    {loading ? (
      <p>Loading products...</p>
    ) : (
      <>
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200">
            + Add Product
          </button>
        </div>

        {showAddModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-lg">
              <h2 className="text-xl font-bold mb-4">Add New Product</h2>

              <input
                value={newProduct.productName}
                onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                placeholder="Product Name"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                placeholder="Description"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                placeholder="Price"
                type="number"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.brand}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                placeholder="Brand"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                placeholder="Category"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.subCategory}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, subCategory: e.target.value })
                }
                placeholder="Subcategory"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.sizeList.join(",")}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sizeList: e.target.value.split(",") })
                }
                placeholder="Sizes (comma-separated)"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.colorList.join(",")}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, colorList: e.target.value.split(",") })
                }
                placeholder="Colors (comma-separated)"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.images.join(",")}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, images: e.target.value.split(",") })
                }
                placeholder="Image URLs (comma-separated)"
                className="w-full border rounded p-2 mb-4"
              />

              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  checked={newProduct.available}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, available: e.target.checked })
                  }
                />
                <span>Available</span>
              </label>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 border-b">Product Name</th>
                <th className="p-4 border-b">Brand</th>
                <th className="p-4 border-b">Price (₦)</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{product.productName}</td>
                  <td className="p-4 border-b">{product.brand || 'N/A'}</td>
                  <td className="p-4 border-b">₦{product.price.toLocaleString()}</td>
                  <td className="p-4 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-indigo-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button disabled={currentPage === 0} onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            disabled={currentPage + 1 === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

        {showEditModal && productToEdit && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-lg">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>

              <input
                value={newProduct.productName}
                onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                placeholder="Product Name"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                placeholder="Description"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                placeholder="Price"
                type="number"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.brand}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                placeholder="Brand"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                placeholder="Category"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.subCategory}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, subCategory: e.target.value })
                }
                placeholder="Subcategory"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.sizeList.join(",")}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sizeList: e.target.value.split(",") })
                }
                placeholder="Sizes (comma-separated)"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.colorList.join(",")}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, colorList: e.target.value.split(",") })
                }
                placeholder="Colors (comma-separated)"
                className="w-full border rounded p-2 mb-4"
              />

              <input
                value={newProduct.images.join(",")}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, images: e.target.value.split(",") })
                }
                placeholder="Image URLs (comma-separated)"
                className="w-full border rounded p-2 mb-4"
              />

              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  checked={newProduct.available}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, available: e.target.checked })
                  }
                />
                <span>Available</span>
              </label>


              <div className="flex justify-end gap-2">
                <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )}
  </div>
);
}































