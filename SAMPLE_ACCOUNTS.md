# Sample Test Accounts - AUTOMATED SETUP

## ⚡ Quick Setup (Just Run One Command!)

I've created an automated setup script for you. Just run:

```bash
npm run setup-accounts
```

This will automatically create both test accounts in Firebase:
- **User Account**: user@test.com / user123456 → Redirects to User Dashboard
- **Admin Account**: admin@test.com / admin123456 → Redirects to Admin Dashboard

---

## What Each Account Can Do

### 👤 User Account (user@test.com)
After signing in, users get access to:
- **Menu Tab**: Browse all menu items by category (Main Course, Appetizer, Salad, Dessert, Wines, Beverages, Coffee)
- **Cart Tab**: Add items to cart, adjust quantities, enter table number
- **My Orders Tab**: View order history with order numbers, status, and receipts
- **Favorites Tab**: Save favorite dishes for quick ordering

**Features:**
- Add items to cart with quantity controls
- Place orders with table number
- Generate order receipts with order number
- Mark items as favorites
- View order status (pending, preparing, ready, completed)

### 👨‍💼 Admin Account (admin@test.com)
After signing in, admins get access to:
- **Overview Tab**: Dashboard with statistics and charts
  - Total orders, revenue, menu items, pending orders
  - Bar chart showing orders by category
  - Revenue breakdown by category
  - Recent activity feed
- **Orders Tab**: Manage all customer orders
  - View all orders in a table
  - Update order status (pending → preparing → ready → completed)
  - View order details
  - Delete orders
- **Manage Menu Tab**: Full CRUD operations for menu items
  - View all menu items in a table
  - Add new menu items (name, category, price, image)
  - Edit existing items
  - Delete items

---

## Step-by-Step Instructions

1. **Make sure you've installed dependencies:**
   ```bash
   npm install
   ```

2. **Run the setup script:**
   ```bash
   npm run setup-accounts
   ```

3. **You should see output like:**
   ```
   🚀 Starting account creation...
   
   ✅ Successfully created user account:
      Email: user@test.com
      Password: user123456
   
   ✅ Successfully created admin account:
      Email: admin@test.com
      Password: admin123456
   
   ✨ Account setup complete!
   ```

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

5. **Sign in at** `http://localhost:5173/signin`
   - Use user@test.com to access User Dashboard
   - Use admin@test.com to access Admin Dashboard

---

## Testing the System

### Test User Flow:
1. Sign in as user@test.com
2. Browse menu items by category
3. Add items to cart
4. Enter table number (e.g., 5)
5. Place order
6. View order in "My Orders" tab
7. Click "View Receipt" to see order details
8. Add items to favorites

### Test Admin Flow:
1. Sign in as admin@test.com
2. View dashboard statistics and charts
3. Go to "Orders" tab
4. Change order status from dropdown
5. View order details
6. Go to "Manage Menu" tab
7. Click "+ Add New Item" to create a dish
8. Edit or delete existing items

---

## Troubleshooting

**"Account already exists"**
- The accounts are already created! Just sign in.

**Script fails to run**
- Make sure you ran `npm install` first
- Check that you have internet connection (Firebase needs to connect)

**Can't sign in after creating accounts**
- Double-check you're using the correct email/password
- Make sure Firebase Authentication is enabled in your Firebase Console

**Redirected to wrong dashboard**
- admin@test.com goes to Admin Dashboard
- Any other email goes to User Dashboard
