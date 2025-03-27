# ZapTech Store - E-Commerce Frontend

A modern React-based e-commerce frontend application with features like shopping cart management, checkout process, and promotional code integration.

## 🌐 Live Demo

Take a look the live demo here 👉 https://t-shirt-designer-webapp.vercel.app/

![project-zaptech](https://github.com/user-attachments/assets/d7c97e74-fe60-46bb-b5f3-c5dc4ff91e9f)

## 🌐 Features

### Shopping Experience
- Product browsing and detailed views
- Real-time cart management
- Wishlist functionality
- Responsive design for all devices

### Checkout Process
- Multi-step checkout flow
- Shipping address validation
- Promo code application
- Order summary with real-time calculations

### User Management
- Authentication using Clerk
- User profile management
- Order history tracking

### Cart System
- Real-time cart updates
- Quantity management
- Price calculations

## 🛠️ Technology Stack
- **Framework**: React
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **API Integration**: RTK Query
- **Routing**: React Router
- **UI Components**: Shadcn

## 📦 Key Components

### Shopping Cart
```jsx
// Features:
// - Real-time quantity updates
// - Price calculations
// - Remove items
// - Cart persistence
const CartPage = () => {
  const cart = useSelector((state) => state.cart?.value) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
};
```

### Checkout Form
```jsx
// Features:
// - Address validation
// - Phone number formatting
// - Error handling
// - Form submission
const formSchema = z.object({
  line_1: z.string().min(1, "Address line 1 is required"),
  line_2: z.string().min(1, "Address line 2 is required"),
  city: z.string().min(1, "City is required"),
  // ... more validation rules
});
```

### Navigation
```jsx
// Features:
// - Responsive design
// - Cart counter
// - User authentication status
// - Mobile menu
const Navigation = () => {
  const cart = useSelector((state) => state.cart.value);
  const savedItems = useSelector((state) => state.savedItems.value);
};
```
## 🧩 Challenges and How I Overcame Them

### 1. Global State Management and Prop Drilling
**Challenge:**
- Complex state management across components
- Prop drilling through multiple component levels
- Maintaining cart state across page refreshes
- Real-time updates across components

**Solution:**
✅ Implemented Redux Toolkit with persistent storage:

![Capture](https://github.com/user-attachments/assets/e2d30c26-fa1b-4c96-9ed0-3fb40a12e253)

```javascript
// cartSlice.js
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const foundItem = state.value.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
        return;
      }
      state.value.push({ product: action.payload, quantity: 1 });
    },
    // Other reducers...
  },
});

// Usage in components
const CartComponent = () => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
};
```

**Benefits:**
- Eliminated prop drilling
- Centralized state management
- Predictable state updates
- Persistent cart state
- Easy debugging with Redux DevTools

### 2. CORS and API Integration
**Challenge:**
- Cross-Origin Resource Sharing (CORS) issues when connecting to the backend
- Inconsistent request headers
- Authentication token management across requests

**Solution:**
✅ Implemented a centralized API configuration using RTK Query:

```javascript
export const Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-vihan.onrender.com/api/v1",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Endpoint definitions
  }),
});
```

**Benefits:**
- Consistent header management
- Automatic token injection
- Centralized error handling
- Simplified API calls across components
```
