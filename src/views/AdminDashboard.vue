<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <button @click="signOut" class="btn-signout">Sign Out</button>
    </div>

    <div class="dashboard-tabs">
      <button
        :class="['tab', { active: activeSection === 'overview' }]"
        @click="activeSection = 'overview'"
      >
        Overview
      </button>
      <button
        :class="['tab', { active: activeSection === 'orders' }]"
        @click="activeSection = 'orders'"
      >
        Orders ({{ orders.length }})
      </button>
      <button
        :class="['tab', { active: activeSection === 'menu' }]"
        @click="activeSection = 'menu'"
      >
        Manage Menu
      </button>
    </div>

    <!-- Overview Section with Charts -->
    <div v-if="activeSection === 'overview'" class="section-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Orders</h3>
          <p class="stat-value">{{ orders.length }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Revenue</h3>
          <p class="stat-value">{{ totalRevenue }}</p>
        </div>
        <div class="stat-card">
          <h3>Menu Items</h3>
          <p class="stat-value">{{ menuItems.length }}</p>
        </div>
        <div class="stat-card">
          <h3>Pending Orders</h3>
          <p class="stat-value">{{ pendingOrders }}</p>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-card">
          <h3>Orders by Category</h3>
          <div class="bar-chart">
            <div
              v-for="cat in categoryStats"
              :key="cat.name"
              class="bar-item"
            >
              <div class="bar-label">{{ cat.name }}</div>
              <div class="bar-container">
                <div
                  class="bar-fill"
                  :style="{ width: cat.percentage + '%' }"
                ></div>
                <span class="bar-value">{{ cat.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h3>Revenue by Category</h3>
          <div class="pie-chart">
            <div
              v-for="(cat, index) in revenueStats"
              :key="cat.name"
              class="pie-item"
            >
              <div
                class="pie-color"
                :style="{ background: pieColors[index] }"
              ></div>
              <span>{{ cat.name }}: {{ cat.revenue }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <span class="activity-icon">{{ activity.icon }}</span>
            <span class="activity-text">{{ activity.text }}</span>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Management Section -->
    <div v-if="activeSection === 'orders'" class="section-content">
      <h2>Manage Orders</h2>
      
      <div v-if="orders.length === 0" class="empty-state">
        <p>No orders yet</p>
      </div>

      <div v-else class="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Table</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>#{{ order.orderNumber }}</td>
              <td>{{ order.tableNumber }}</td>
              <td>{{ order.items.length }} items</td>
              <td>{{ order.total }}</td>
              <td>{{ order.date }}</td>
              <td>
                <select v-model="order.status" @change="updateOrderStatus(order)">
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button @click="viewOrderDetails(order)" class="btn-view">View</button>
                <button @click="deleteOrder(order)" class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Menu Management Section -->
    <div v-if="activeSection === 'menu'" class="section-content">
      <div class="menu-header">
        <h2>Manage Menu Items</h2>
        <button @click="showAddModal = true" class="btn-add-item">+ Add New Item</button>
      </div>

      <div class="menu-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in menuItems" :key="item.id">
              <td><img :src="item.image" :alt="item.name" class="item-thumb" /></td>
              <td>{{ item.name }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.price }}</td>
              <td>
                <button @click="editItem(item)" class="btn-edit">Edit</button>
                <button @click="deleteItem(item)" class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Item Modal -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <h2>{{ showEditModal ? 'Edit Item' : 'Add New Item' }}</h2>
        <form @submit.prevent="saveItem">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="currentItem.name" required />
          </div>
          <div class="form-group">
            <label>Category:</label>
            <select v-model="currentItem.category" required>
              <option value="MAIN COURSE">Main Course</option>
              <option value="APPETIZER">Appetizer</option>
              <option value="SALAD">Salad</option>
              <option value="DESSERT">Dessert</option>
              <option value="WINES">Wines</option>
              <option value="BEVERAGES">Beverages</option>
              <option value="COFFEE">Coffee</option>
            </select>
          </div>
          <div class="form-group">
            <label>Price:</label>
            <input v-model="currentItem.price" required placeholder="₱0.00" />
          </div>
          <div class="form-group">
            <label>Image URL:</label>
            <input v-model="currentItem.image" required />
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn-save">Save</button>
            <button type="button" @click="closeModals" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="showOrderModal" class="modal-overlay" @click="showOrderModal = false">
      <div class="modal-content" @click.stop>
        <h2>Order Details</h2>
        <div class="order-details">
          <p><strong>Order Number:</strong> #{{ selectedOrder.orderNumber }}</p>
          <p><strong>Table Number:</strong> {{ selectedOrder.tableNumber }}</p>
          <p><strong>Date:</strong> {{ selectedOrder.date }}</p>
          <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
          <h3>Items:</h3>
          <div v-for="item in selectedOrder.items" :key="item.id" class="order-item">
            <span>{{ item.name }} x{{ item.quantity }}</span>
            <span>{{ item.price }}</span>
          </div>
          <div class="order-total">
            <strong>Total: {{ selectedOrder.total }}</strong>
          </div>
        </div>
        <button @click="showOrderModal = false" class="btn-close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';

const router = useRouter();
const auth = getAuth();

const activeSection = ref('overview');
const showAddModal = ref(false);
const showEditModal = ref(false);
const showOrderModal = ref(false);
const selectedOrder = ref(null);
const currentItem = ref({
  name: '',
  category: 'MAIN COURSE',
  price: '',
  image: ''
});

const pieColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

const orders = ref([
  {
    id: 1,
    orderNumber: 123456,
    tableNumber: 5,
    date: '2024-02-20 14:30',
    items: [
      { id: 1, name: 'Grilled Salmon', quantity: 2, price: '₱1,249.50' },
      { id: 2, name: 'Caesar Salad', quantity: 1, price: '₱549.50' }
    ],
    total: '₱3,048.50',
    status: 'pending'
  },
  {
    id: 2,
    orderNumber: 123457,
    tableNumber: 3,
    date: '2024-02-20 15:00',
    items: [
      { id: 3, name: 'Beef Steak', quantity: 1, price: '₱1,649.50' }
    ],
    total: '₱1,649.50',
    status: 'preparing'
  }
]);

const menuItems = ref([
  {
    id: 1,
    name: 'Grilled Salmon',
    category: 'MAIN COURSE',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    price: '₱1,249.50',
    priceValue: 1249.50
  },
  {
    id: 2,
    name: 'Chicken Alfredo',
    category: 'MAIN COURSE',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400',
    price: '₱949.50',
    priceValue: 949.50
  },
  {
    id: 3,
    name: 'Beef Steak',
    category: 'MAIN COURSE',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
    price: '₱1,649.50',
    priceValue: 1649.50
  },
  {
    id: 5,
    name: 'Spring Rolls',
    category: 'APPETIZER',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400',
    price: '₱449.50',
    priceValue: 449.50
  },
  {
    id: 8,
    name: 'Caesar Salad',
    category: 'SALAD',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    price: '₱549.50',
    priceValue: 549.50
  },
  {
    id: 11,
    name: 'Chocolate Cake',
    category: 'DESSERT',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    price: '₱449.50',
    priceValue: 449.50
  },
  {
    id: 24,
    name: 'Honey-Garlic Onion Rings',
    category: 'APPETIZER',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400',
    price: '₱399.50',
    priceValue: 399.50
  },
  {
    id: 25,
    name: 'Fried Calamari',
    category: 'APPETIZER',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
    price: '₱549.50',
    priceValue: 549.50
  }
]);

const recentActivity = ref([
  { id: 1, icon: '🛒', text: 'New order #123456 from Table 5', time: '5 min ago' },
  { id: 2, icon: '✅', text: 'Order #123455 completed', time: '15 min ago' },
  { id: 3, icon: '🍕', text: 'New menu item added: Margherita Pizza', time: '1 hour ago' },
  { id: 4, icon: '📊', text: 'Daily report generated', time: '2 hours ago' }
]);

const totalRevenue = computed(() => {
  const total = orders.value.reduce((sum, order) => {
    const value = parseFloat(order.total.replace(/[₱,]/g, ''));
    return sum + value;
  }, 0);
  return `₱${total.toFixed(2)}`;
});

const pendingOrders = computed(() => {
  return orders.value.filter(o => o.status === 'pending').length;
});

const categoryStats = computed(() => {
  const stats = {};
  menuItems.value.forEach(item => {
    stats[item.category] = (stats[item.category] || 0) + 1;
  });
  
  const maxCount = Math.max(...Object.values(stats));
  return Object.entries(stats).map(([name, count]) => ({
    name,
    count,
    percentage: (count / maxCount) * 100
  }));
});

const revenueStats = computed(() => {
  const stats = {};
  orders.value.forEach(order => {
    order.items.forEach(item => {
      const category = menuItems.value.find(m => m.name === item.name)?.category || 'Other';
      const price = parseFloat(item.price.replace(/[₱,]/g, '')) * item.quantity;
      stats[category] = (stats[category] || 0) + price;
    });
  });
  
  return Object.entries(stats).map(([name, revenue]) => ({
    name,
    revenue: `₱${revenue.toFixed(2)}`
  }));
});

function updateOrderStatus(order) {
  console.log('Order status updated:', order);
}

function viewOrderDetails(order) {
  selectedOrder.value = order;
  showOrderModal.value = true;
}

function deleteOrder(order) {
  if (confirm(`Delete order #${order.orderNumber}?`)) {
    const index = orders.value.findIndex(o => o.id === order.id);
    if (index > -1) {
      orders.value.splice(index, 1);
    }
  }
}

function editItem(item) {
  currentItem.value = { ...item };
  showEditModal.value = true;
}

function deleteItem(item) {
  if (confirm(`Delete ${item.name}?`)) {
    const index = menuItems.value.findIndex(i => i.id === item.id);
    if (index > -1) {
      menuItems.value.splice(index, 1);
    }
  }
}

function saveItem() {
  if (showEditModal.value) {
    const index = menuItems.value.findIndex(i => i.id === currentItem.value.id);
    if (index > -1) {
      menuItems.value[index] = { ...currentItem.value };
    }
  } else {
    const newItem = {
      ...currentItem.value,
      id: Date.now(),
      priceValue: parseFloat(currentItem.value.price.replace(/[₱,]/g, ''))
    };
    menuItems.value.push(newItem);
  }
  closeModals();
}

function closeModals() {
  showAddModal.value = false;
  showEditModal.value = false;
  currentItem.value = {
    name: '',
    category: 'MAIN COURSE',
    price: '',
    image: ''
  };
}

async function signOut() {
  try {
    await firebaseSignOut(auth);
    router.push('/signin');
  } catch (error) {
    console.error('Sign out error:', error);
  }
}
</script>

<style lang="scss" scoped>
.admin-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #333;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
}

.btn-signout {
  padding: 0.75rem 1.5rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #ff5252;
  }
}

.dashboard-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab {
  padding: 1rem 2rem;
  background: #f0f0f0;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background: #e0e0e0;
  }

  &.active {
    background: #333;
    color: white;
    border-color: #333;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 1rem;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin: 0;
  }
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 1.5rem 0;
  }
}

.bar-chart {
  .bar-item {
    margin-bottom: 1rem;

    .bar-label {
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .bar-container {
      position: relative;
      background: #f0f0f0;
      height: 30px;
      border-radius: 6px;
      overflow: hidden;

      .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #4ECDC4, #45B7D1);
        transition: width 0.3s;
      }

      .bar-value {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 600;
        font-size: 0.9rem;
      }
    }
  }
}

.pie-chart {
  .pie-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;

    .pie-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
  }
}

.activity-list {
  .activity-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .activity-icon {
      font-size: 1.5rem;
    }

    .activity-text {
      flex: 1;
    }

    .activity-time {
      color: #999;
      font-size: 0.85rem;
    }
  }
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
  }
}

.btn-add-item {
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #45a049;
  }
}

.orders-table,
.menu-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background: #f8f9fa;

      th {
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid #dee2e6;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #dee2e6;

        &:hover {
          background: #f8f9fa;
        }

        td {
          padding: 1rem;

          .item-thumb {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
          }

          select {
            padding: 0.5rem;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

.btn-view,
.btn-edit {
  padding: 0.5rem 1rem;
  background: #4ECDC4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background: #45B7D1;
  }
}

.btn-delete {
  padding: 0.5rem 1rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #ff5252;
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
  font-size: 1.25rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;

  h2 {
    margin-top: 0;
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    input,
    select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
    }
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn-save {
    flex: 1;
    padding: 0.75rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background: #45a049;
    }
  }

  .btn-cancel,
  .btn-close {
    flex: 1;
    padding: 0.75rem;
    background: #f0f0f0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background: #e0e0e0;
    }
  }

  .order-details {
    margin: 1.5rem 0;

    p {
      margin: 0.5rem 0;
    }

    h3 {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: #f9f9f9;
      border-radius: 6px;
      margin-bottom: 0.5rem;
    }

    .order-total {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid #ddd;
      font-size: 1.25rem;
    }
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
  }

  .stats-grid,
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .orders-table,
  .menu-table {
    overflow-x: auto;
  }
}
</style>
