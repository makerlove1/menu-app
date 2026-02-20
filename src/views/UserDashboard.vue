<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { menuCategories } from '@/data/menuData';

const router = useRouter();
const auth = getAuth();

const userName = ref(auth.currentUser?.email || 'User');
const activeSection = ref('menu');
const activeCategory = ref('MAIN COURSE');
const selectedDish = ref(null);
const activeTab = ref('Preparation');
const tabs = ['Preparation', 'Ingredients', 'Procedure', 'Demo Video'];

// Cart and orders
const tableNumber = ref('');
const cartItems = ref([]);
const orders = ref([]);
const favorites = ref([]);
const showReceipt = ref(false);
const selectedOrder = ref(null);

// Use imported menu data
const categories = ref(menuCategories);

// Computed properties
const currentCategoryItems = computed(() => {
  const category = categories.value.find(cat => cat.name === activeCategory.value);
  return category ? category.items : [];
});

const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
});

// Methods
const addToCart = (dish) => {
  const existingItem = cartItems.value.find(item => item.id === dish.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ ...dish, quantity: 1 });
  }
};

const removeFromCart = (index) => {
  cartItems.value.splice(index, 1);
};

const placeOrder = () => {
  if (!tableNumber.value || cartItems.value.length === 0) {
    alert('Please enter table number and add items to cart');
    return;
  }
  
  const order = {
    id: Date.now(),
    tableNumber: tableNumber.value,
    items: [...cartItems.value],
    total: cartTotal.value,
    date: new Date().toLocaleString(),
    status: 'Pending'
  };
  
  orders.value.unshift(order);
  cartItems.value = [];
  tableNumber.value = '';
  activeSection.value = 'orders';
};

const viewReceipt = (order) => {
  selectedOrder.value = order;
  showReceipt.value = true;
};

const addToFavorites = (dish) => {
  if (!favorites.value.find(fav => fav.id === dish.id)) {
    favorites.value.push(dish);
  }
};

const removeFromFavorites = (index) => {
  favorites.value.splice(index, 1);
};

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};
</script>

<template>
  <div class="user-dashboard">
    <header class="dashboard-header">
      <h1>Welcome, {{ userName }}</h1>
    </header>

    <nav class="dashboard-nav">
      <button 
        v-for="section in ['menu', 'cart', 'orders', 'favorites']" 
        :key="section"
        :class="{ active: activeSection === section }"
        @click="activeSection = section"
      >
        {{ section.charAt(0).toUpperCase() + section.slice(1) }}
      </button>
    </nav>

    <main class="dashboard-content">
      <!-- Menu Section -->
      <div v-if="activeSection === 'menu'" class="menu-section">
        <div class="category-tabs">
          <button 
            v-for="category in categories" 
            :key="category.name"
            :class="{ active: activeCategory === category.name }"
            @click="activeCategory = category.name"
          >
            {{ category.name }}
          </button>
        </div>

        <div class="dishes-grid">
          <div v-for="dish in currentCategoryItems" :key="dish.id" class="dish-card">
            <img :src="dish.image" :alt="dish.name" />
            <h3>{{ dish.name }}</h3>
            <p class="price">{{ dish.price }}</p>
            <div class="dish-actions">
              <button @click="selectedDish = dish" class="view-btn">View Details</button>
              <button @click="addToCart(dish)" class="add-btn">Add to Cart</button>
              <button @click="addToFavorites(dish)" class="fav-btn">â™¥</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Section -->
      <div v-if="activeSection === 'cart'" class="cart-section">
        <h2>Your Cart</h2>
        <div class="table-number">
          <label>Table Number:</label>
          <input v-model="tableNumber" type="text" placeholder="Enter table number" />
        </div>
        
        <div v-if="cartItems.length === 0" class="empty-cart">
          Your cart is empty
        </div>
        
        <div v-else>
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <img :src="item.image" :alt="item.name" />
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p>{{ item.price }} x {{ item.quantity }}</p>
            </div>
            <button @click="removeFromCart(index)" class="remove-btn">Remove</button>
          </div>
          
          <div class="cart-total">
            <h3>Total: â‚±{{ cartTotal.toFixed(2) }}</h3>
            <button @click="placeOrder" class="order-btn">Place Order</button>
          </div>
        </div>
      </div>

      <!-- Orders Section -->
      <div v-if="activeSection === 'orders'" class="orders-section">
        <h2>Your Orders</h2>
        <div v-if="orders.length === 0" class="no-orders">
          No orders yet
        </div>
        <div v-else>
          <div v-for="order in orders" :key="order.id" class="order-card">
            <h3>Order #{{ order.id }}</h3>
            <p>Table: {{ order.tableNumber }}</p>
            <p>Date: {{ order.date }}</p>
            <p>Status: {{ order.status }}</p>
            <p class="order-total">Total: â‚±{{ order.total.toFixed(2) }}</p>
            <button @click="viewReceipt(order)" class="receipt-btn">View Receipt</button>
          </div>
        </div>
      </div>

      <!-- Favorites Section -->
      <div v-if="activeSection === 'favorites'" class="favorites-section">
        <h2>Your Favorites</h2>
        <div v-if="favorites.length === 0" class="no-favorites">
          No favorites yet
        </div>
        <div v-else class="dishes-grid">
          <div v-for="(dish, index) in favorites" :key="dish.id" class="dish-card">
            <img :src="dish.image" :alt="dish.name" />
            <h3>{{ dish.name }}</h3>
            <p class="price">{{ dish.price }}</p>
            <div class="dish-actions">
              <button @click="addToCart(dish)" class="add-btn">Add to Cart</button>
              <button @click="removeFromFavorites(index)" class="remove-btn">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Dish Details Modal -->
    <div v-if="selectedDish" class="modal-overlay" @click="selectedDish = null">
      <div class="dish-details-modal" @click.stop>
        <button @click="selectedDish = null" class="btn-close-modal">âœ•</button>
        
        <div class="details-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            :class="['tab-button', { active: activeTab === tab }]"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="details-content">
          <div class="content-with-image">
            <div class="dish-image">
              <img :src="selectedDish.image" :alt="selectedDish.name" />
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 'Preparation'" class="tab-panel">
                <h3>{{ selectedDish.name }}</h3>
                <p class="price-tag">{{ selectedDish.price }}</p>
                <p>{{ selectedDish.preparation }}</p>
                <button @click="addToCart(selectedDish)" class="add-to-cart-btn">Add to Cart</button>
              </div>

              <div v-if="activeTab === 'Ingredients'" class="tab-panel">
                <h3>Ingredients</h3>
                <ul>
                  <li v-for="(ingredient, index) in selectedDish.ingredients" :key="index">
                    <span class="item-marker">âœ±</span> {{ ingredient }}
                  </li>
                </ul>
                <button @click="addToCart(selectedDish)" class="add-to-cart-btn">Add to Cart</button>
              </div>

              <div v-if="activeTab === 'Procedure'" class="tab-panel">
                <h3>Cooking Procedure</h3>
                <ol>
                  <li v-for="(step, index) in selectedDish.procedure" :key="index">
                    {{ step }}
                  </li>
                </ol>
                <button @click="addToCart(selectedDish)" class="add-to-cart-btn">Add to Cart</button>
              </div>

              <div v-if="activeTab === 'Demo Video'" class="tab-panel">
                <h3>Video Tutorial</h3>
                <div v-if="selectedDish.videoUrl" class="video-container">
                  <iframe
                    :src="selectedDish.videoUrl"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
                <p v-else>No video available for this dish.</p>
                <button @click="addToCart(selectedDish)" class="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Receipt Modal -->
    <div v-if="showReceipt" class="modal-overlay" @click="showReceipt = false">
      <div class="receipt-modal" @click.stop>
        <button class="btn-close-modal" @click="showReceipt = false">âœ•</button>
        <div class="receipt-header">
          <h2>Receipt</h2>
          <p class="order-id">Order #{{ selectedOrder.id }}</p>
        </div>
        <div class="receipt-info">
          <p><strong>Table:</strong> {{ selectedOrder.tableNumber }}</p>
          <p><strong>Date:</strong> {{ selectedOrder.date }}</p>
          <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
        </div>
        <hr class="receipt-divider" />
        <div class="receipt-items">
          <div v-for="item in selectedOrder.items" :key="item.id" class="receipt-item">
            <span class="item-name">{{ item.name }} <span class="item-qty">x{{ item.quantity }}</span></span>
            <span class="item-price">â‚±{{ (item.priceValue * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <hr class="receipt-divider" />
        <div class="receipt-total">
          <strong>Total:</strong>
          <strong class="total-amount">â‚±{{ selectedOrder.total.toFixed(2) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.dashboard-header {
  background: #2c3e50;
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign-out-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard-nav {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dashboard-nav button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: #ecf0f1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.dashboard-nav button.active {
  background: #3498db;
  color: white;
}

.dashboard-content {
  padding: 2rem;
}

.category-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.category-tabs button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.category-tabs button.active {
  background: #27ae60;
  color: white;
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.dish-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.dish-card:hover {
  transform: translateY(-4px);
}

.dish-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.dish-card h3 {
  padding: 1rem 1rem 0.5rem;
  margin: 0;
}

.dish-card .price {
  padding: 0 1rem;
  color: #27ae60;
  font-weight: bold;
  font-size: 1.2rem;
}

.dish-actions {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.dish-actions button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn {
  background: #3498db;
  color: white;
}

.add-btn {
  background: #27ae60;
  color: white;
}

.fav-btn {
  background: #e74c3c;
  color: white;
  flex: 0 0 40px;
}

.cart-section, .orders-section, .favorites-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.table-number {
  margin-bottom: 2rem;
}

.table-number input {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.cart-total {
  margin-top: 2rem;
  text-align: right;
}

.order-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
}

.order-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.order-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;
  margin-top: 0.5rem;
}

.receipt-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dish-details-modal {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.btn-close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.btn-close-modal:hover {
  background: #ff6b6b;
  color: white;
  transform: rotate(90deg);
}

.details-tabs {
  display: flex;
  background: #f0f0f0;
  border-bottom: 2px solid #333;
}

.tab-button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  border-right: 1px solid #ddd;
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  background: #e0e0e0;
}

.tab-button.active {
  background: #333;
  color: white;
}

.details-content {
  padding: 2rem;
  background: white;
  max-height: calc(90vh - 60px);
  overflow-y: auto;
}

.details-content::-webkit-scrollbar {
  width: 8px;
}

.details-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.details-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.details-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.content-with-image {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
}

.dish-image img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tab-content h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.75rem;
  color: #333;
}

.tab-content p {
  line-height: 1.6;
  color: #555;
  font-size: 1.1rem;
}

.tab-content .price-tag {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.tab-content ul,
.tab-content ol {
  line-height: 1.8;
  color: #555;
  font-size: 1.05rem;
}

.tab-content ul {
  list-style: none;
  padding-left: 0;
}

.tab-content ul li {
  margin-bottom: 0.5rem;
}

.tab-content ol {
  padding-left: 1.5rem;
}

.tab-content ol li {
  margin-bottom: 0.75rem;
}

.tab-content .item-marker {
  color: #ff6b6b;
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.add-to-cart-btn {
  width: 100%;
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  transition: all 0.3s;
}

.add-to-cart-btn:hover {
  background: #229954;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

@media (max-width: 1024px) {
  .content-with-image {
    grid-template-columns: 1fr;
  }

  .dish-image img {
    height: 250px;
  }
}

@media (max-width: 640px) {
  .modal-overlay {
    padding: 1rem;
  }

  .dish-details-modal {
    max-height: 95vh;
  }

  .details-content {
    padding: 1.5rem;
  }

  .content-with-image {
    gap: 1.5rem;
  }

  .tab-button {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}

.receipt {
  max-width: 400px;
}

.receipt-modal {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
  padding: 2rem;
}

.receipt-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.receipt-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #333;
}

.order-id {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.receipt-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.receipt-info p {
  margin: 0.5rem 0;
  color: #555;
}

.receipt-divider {
  border: none;
  border-top: 2px dashed #ddd;
  margin: 1.5rem 0;
}

.receipt-items {
  margin: 1rem 0;
}

.receipt-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.receipt-item:last-child {
  border-bottom: none;
}

.item-name {
  color: #333;
  font-size: 1.05rem;
}

.item-qty {
  color: #666;
  font-weight: 600;
}

.item-price {
  color: #27ae60;
  font-weight: 600;
  font-size: 1.05rem;
}

.receipt-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.total-amount {
  color: #27ae60;
  font-size: 1.5rem;
}

.empty-cart, .no-orders, .no-favorites {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.2rem;
}
</style>
