export const CART_API = {
  FETCH: "http://localhost:8080/api/cart",
  ADD: "http://localhost:8080/api/cart/add",
  UPDATE: "http://localhost:8080/api/cart/update",
  REMOVE: (productId: number) => `http://localhost:8080/api/cart/remove/${productId}`,
  CLEAR: "http://localhost:8080/api/cart/clear",
};
