import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartItems: [],
    favorites: [],

    addToCart: (newItem) => {
        set((state) => {
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return {
                    cartItems: state.cartItems.map((item) =>
                        item.id === newItem.id
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    cartItems: [...state.cartItems, { ...newItem, quantity: 1 }],
                };
            }
        });
    },

    addToCartWithQuantity: (newItem, qty) => {
        set((state) => {
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return {
                    cartItems: state.cartItems.map((item) =>
                        item.id === newItem.id
                            ? { ...item, quantity: (item.quantity || 1) + qty }
                            : item
                    ),
                };
            } else {
                return {
                    cartItems: [...state.cartItems, { ...newItem, quantity: qty }],
                };
            }
        });
    },

    removeFromCart: (itemToRemove) => {
        set((state) => ({
            cartItems: state.cartItems
                .map((item) =>
                    item.id === itemToRemove.id
                        ? item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : null
                        : item
                )
                .filter((item) => item !== null),
        }));
    },

    clearCart: () => set({ cartItems: [] }),

    toggleFavorite: (productId) => {
        set((state) => ({
            favorites: state.favorites.includes(productId)
                ? state.favorites.filter((id) => id !== productId)
                : [...state.favorites, productId],
        }));
    },

    getTotalPrice: () =>
        useCartStore.getState().cartItems.reduce(
            (total, item) => total + item.price * (item.quantity || 1),
            0
        ),

    getTotalItems: () =>
        useCartStore.getState().cartItems.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        ),
}));

export { useCartStore };
