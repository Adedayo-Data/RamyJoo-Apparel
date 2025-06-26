import { API_URL } from "@/config/api";

export const CART_API = {
  FETCH: `${API_URL}/api/cart`,
  ADD: `${API_URL}/api/cart/add`,
  UPDATE: `${API_URL}/api/cart/update`,
  REMOVE: (productId: number) => `${API_URL}/api/cart/remove/${productId}`,
  CLEAR: `${API_URL}/api/cart/clear`,
};
