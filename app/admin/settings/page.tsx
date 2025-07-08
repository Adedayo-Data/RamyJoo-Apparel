'use client';

import { useEffect, useState } from 'react';
import { ProductPayload, ProductWithId } from '@/types';
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
    Category: '',
    subCategory: '',
    sizeList: [],
    colorList: [],
    images: [],
    available: true,
  });

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin/login');
  }, [isAuthenticated, router]);

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
        Category: '',
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

  return <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <h1 className="text-3xl font-bold text-indigo-700 mb-4">Hey RamyJoo 👋</h1>
    <p className="text-gray-600 text-lg">This page is yet to be deployed.</p>
    <p className="text-sm text-gray-400 mt-2">We&apos;re working behind the scenes to bring it to life! 🚀</p>
  </div>;
}
