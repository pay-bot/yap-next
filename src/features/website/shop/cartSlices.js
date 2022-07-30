import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const currState = state;

      const existingIndex = currState.cartItems.findIndex((item) => item.id === action.payload.id);

      if (existingIndex >= 0) {
        currState.cartItems[existingIndex] = {
          ...currState.cartItems[existingIndex],
          cartQuantity: currState.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info('Increased product quantity', { position: 'bottom-left' });
      } else {
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        currState.cartItems.push(tempProductItem);
        toast.success('Product added to cart', { position: 'bottom-left' });
      }
      console.log(currState.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(currState.cartItems));
    },
    decreaseCart(state, action) {
      const currState = state;

      const itemIndex = currState.cartItems.findIndex((item) => item.id === action.payload.id);

      if (currState.cartItems[itemIndex].cartQuantity > 1) {
        currState.cartItems[itemIndex].cartQuantity -= 1;

        toast.info('Decreased product quantity', { position: 'bottom-left' });
      } else if (currState.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = currState.cartItems.filter((item) => item.id !== action.payload.id);

        currState.cartItems = nextCartItems;

        toast.error('Product removed from cart', { position: 'bottom-left' });
      }

      localStorage.setItem('cartItems', JSON.stringify(currState.cartItems));
    },
    removeFromCart(state, action) {
      const currState = state;

      currState.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = currState.cartItems.filter((item) => item.id !== cartItem.id);

          currState.cartItems = nextCartItems;

          toast.error('Product removed from cart', { position: 'bottom-left' });
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        return currState;
      });
    },
    getTotals(state) {
      const currState = state;

      // eslint-disable-next-line prefer-const
      let { total, quantity } = currState.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { amount, cartQuantity } = cartItem;
          const itemTotal = amount * cartQuantity;

          // eslint-disable-next-line no-param-reassign
          cartTotal.total += itemTotal;
          // eslint-disable-next-line no-param-reassign
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      currState.cartTotalQuantity = quantity;
      currState.cartTotalAmount = total;
    },
    clearCart(state) {
      const currState = state;

      currState.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(currState.cartItems));
      toast.error('Cart cleared', { position: 'bottom-left' });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
