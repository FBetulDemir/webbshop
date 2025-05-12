import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartItems: [],
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

    removeFromCart: (itemToRemove) => {
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === itemToRemove.id
                ? item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : null
                : item
            ).filter(item => item !== null),
        }));
    },
    clearCart: () => set({ cartItems: [] }),
    // getTotalItems: () => set((state) => state.cartItems.length),
    getTotalPrice: () => set((state) => state.cartItems.reduce((total, item) => total + item.price, 0)),
    getTotalItems: (state) => state.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
      
}));


export { useCartStore };