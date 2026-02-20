<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { menuCategories } from '@/data/menuData';

const router = useRouter();
const activeCategory = ref('MAIN COURSE');
const selectedDish = ref(null);
const activeTab = ref('Preparation');
const tabs = ['Preparation', 'Ingredients', 'Procedure', 'Demo Video'];

// Use imported menu data
const categories = ref(menuCategories);

const currentCategoryItems = computed(() => {
  const category = categories.value.find(cat => cat.name === activeCategory.value);
  return category ? category.items : [];
});

function selectDish(dish) {
  selectedDish.value = dish;
  activeTab.value = 'Preparation';
}

</script>

<template>
  <div class="home">
    <div class="showcase">
      <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
      <div class="showcase-content">
        <h1 class="showcase-title">Welcome to Our Restaurant</h1>
        <p class="showcase-subtitle">Discover delicious meals crafted with passion</p>
      </div>
    </div>

    <section class="menu-section container">
      <h2 class="section-heading">Our Menu</h2>
      
      <div class="category-tabs">
        <button
          v-for="category in categories"
          :key="category.name"
          :class="['category-tab', { active: activeCategory === category.name }]"
          @click="activeCategory = category.name"
        >
          {{ category.name }}
        </button>
      </div>

      <div class="menu-items-grid">
        <div
          v-for="item in currentCategoryItems"
          :key="item.id"
          class="menu-card"
          @click="selectDish(item)"
        >
          <div class="menu-card-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="menu-card-content">
            <h3 class="menu-card-title">{{ item.name }}</h3>
            <p class="menu-card-price">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </section>

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
              </div>

              <div v-if="activeTab === 'Ingredients'" class="tab-panel">
                <h3>Ingredients</h3>
                <ul>
                  <li v-for="(ingredient, index) in selectedDish.ingredients" :key="index">
                    <span class="item-marker">âœ±</span> {{ ingredient }}
                  </li>
                </ul>
              </div>

              <div v-if="activeTab === 'Procedure'" class="tab-panel">
                <h3>Cooking Procedure</h3>
                <ol>
                  <li v-for="(step, index) in selectedDish.procedure" :key="index">
                    {{ step }}
                  </li>
                </ol>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}

.showcase {
  position: relative;
  height: 500px;
  overflow: hidden;

  &-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 2;
  }

  &-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }

  &-subtitle {
    font-size: 1.5rem;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
}

.menu-section {
  padding: 3rem 2rem;
}

.section-heading {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-tab {
  padding: 1rem 2rem;
  border: 2px solid #333;
  background: #f9f9f9;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  border-radius: 8px;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }

  &.active {
    background: #333;
    color: white;
  }
}

.menu-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.menu-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &-image {
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
  }

  &:hover &-image img {
    transform: scale(1.1);
  }

  &-content {
    padding: 1.5rem;
  }

  &-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  &-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ff6b6b;
  }
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

  &:hover {
    background: #ff6b6b;
    color: white;
    transform: rotate(90deg);
  }
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

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: #e0e0e0;
  }

  &.active {
    background: #333;
    color: white;
  }
}

.details-content {
  padding: 2rem;
  background: white;
  max-height: calc(90vh - 60px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;

    &:hover {
      background: #555;
    }
  }
}

.content-with-image {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
}

.dish-image {
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.tab-content {
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.75rem;
    color: #333;
  }

  p {
    line-height: 1.6;
    color: #555;
    font-size: 1.1rem;
  }

  .price-tag {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff6b6b;
    margin-bottom: 1rem;
  }

  ul, ol {
    line-height: 1.8;
    color: #555;
    font-size: 1.05rem;
  }

  ul {
    list-style: none;
    padding-left: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }

  ol {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.75rem;
    }
  }

  .item-marker {
    color: #ff6b6b;
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}

@media (max-width: 1024px) {
  .content-with-image {
    grid-template-columns: 1fr;
  }

  .dish-image img {
    height: 250px;
  }

  .showcase-title {
    font-size: 2.5rem;
  }

  .showcase-subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 640px) {
  .showcase {
    height: 350px;
  }

  .showcase-title {
    font-size: 2rem;
  }

  .showcase-subtitle {
    font-size: 1rem;
  }

  .category-tabs {
    flex-direction: column;
  }

  .category-tab {
    width: 100%;
  }

  .menu-items-grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    font-size: 2rem;
  }

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
</style>
