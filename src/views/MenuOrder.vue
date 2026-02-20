<template>
  <div class="menu-order">
    <div class="menu-header">
      <h1>Menu List</h1>
      <div class="date-display">DATE: {{ currentDate }}</div>
    </div>

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

    <div class="menu-items-section">
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
    </div>

    <div v-if="selectedDish" class="dish-details">
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
                  <span class="item-marker">✱</span> {{ ingredient }}
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

    <div v-else class="click-instruction">
      <p>👆 Click on a dish to view details</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const selectedDish = ref(null);
const activeTab = ref('Preparation');
const activeCategory = ref('MAIN COURSE');
const tabs = ['Preparation', 'Ingredients', 'Procedure', 'Demo Video'];

const categories = ref([
  {
    name: 'MAIN COURSE',
    items: [
      {
        id: 1,
        name: 'Grilled Salmon',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
        price: '₱1,249.50',
        preparation: 'Fresh Atlantic salmon grilled to perfection with herbs and lemon.',
        ingredients: ['Salmon fillet', 'Lemon', 'Dill', 'Olive oil', 'Salt', 'Pepper'],
        procedure: [
          'Season salmon with salt and pepper',
          'Brush with olive oil',
          'Grill for 4-5 minutes each side',
          'Garnish with dill and lemon'
        ],
        videoUrl: ''
      },
      {
        id: 2,
        name: 'Chicken Alfredo',
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400',
        price: '₱949.50',
        preparation: 'Creamy pasta with grilled chicken in rich Alfredo sauce.',
        ingredients: ['Fettuccine', 'Chicken breast', 'Heavy cream', 'Parmesan', 'Garlic', 'Butter'],
        procedure: [
          'Cook pasta according to package',
          'Grill seasoned chicken and slice',
          'Make Alfredo sauce with cream and cheese',
          'Toss pasta with sauce and top with chicken'
        ],
        videoUrl: ''
      },
      {
        id: 3,
        name: 'Beef Steak',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
        price: '₱1,649.50',
        preparation: 'Juicy ribeye steak cooked to your preference with garlic butter.',
        ingredients: ['Ribeye steak', 'Garlic', 'Butter', 'Rosemary', 'Salt', 'Black pepper'],
        procedure: [
          'Bring steak to room temperature',
          'Season generously with salt and pepper',
          'Sear in hot pan for 3-4 minutes each side',
          'Top with garlic butter and rest for 5 minutes'
        ],
        videoUrl: ''
      },
      {
        id: 4,
        name: 'Shrimp Scampi',
        image: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400',
        price: '₱1,149.50',
        preparation: 'Succulent shrimp in garlic butter wine sauce over pasta.',
        ingredients: ['Large shrimp', 'Linguine', 'Garlic', 'White wine', 'Butter', 'Parsley', 'Lemon'],
        procedure: [
          'Cook pasta until al dente',
          'Sauté garlic in butter',
          'Add shrimp and cook until pink',
          'Deglaze with wine and toss with pasta'
        ],
        videoUrl: ''
      }
    ]
  },
  {
    name: 'APPETIZER',
    items: [
      {
        id: 5,
        name: 'Spring Rolls',
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400',
        price: '₱449.50',
        preparation: 'Crispy vegetable spring rolls served with sweet chili sauce.',
        ingredients: ['Rice paper', 'Cabbage', 'Carrots', 'Bean sprouts', 'Soy sauce'],
        procedure: [
          'Soak rice paper in warm water',
          'Add vegetables in the center',
          'Roll tightly and seal edges',
          'Deep fry until golden brown'
        ],
        videoUrl: ''
      },
      {
        id: 6,
        name: 'Bruschetta',
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
        price: '₱399.50',
        preparation: 'Toasted bread topped with fresh tomatoes, basil, and garlic.',
        ingredients: ['Baguette', 'Tomatoes', 'Fresh basil', 'Garlic', 'Olive oil'],
        procedure: [
          'Slice and toast bread',
          'Dice tomatoes and mix with basil',
          'Rub garlic on toast',
          'Top with tomato mixture'
        ],
        videoUrl: ''
      },
      {
        id: 7,
        name: 'Stuffed Mushrooms',
        image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=400',
        price: '₱499.50',
        preparation: 'Button mushrooms stuffed with cheese and herbs.',
        ingredients: ['Button mushrooms', 'Cream cheese', 'Parmesan', 'Garlic', 'Breadcrumbs', 'Parsley'],
        procedure: [
          'Remove mushroom stems',
          'Mix cheese with herbs and garlic',
          'Stuff mushroom caps',
          'Bake at 375°F for 20 minutes'
        ],
        videoUrl: ''
      },
      {
        id: 24,
        name: 'Honey-Garlic Onion Rings',
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400',
        price: '₱399.50',
        preparation: 'Crispy onion rings with sweet and savory honey-garlic sauce.',
        ingredients: ['Large onions', 'All-purpose flour', 'Baking powder', 'Salt', 'Garlic powder', 'Paprika', 'Black pepper', 'Buttermilk', 'Egg', 'Panko breadcrumbs', 'Oil', 'Butter', 'Honey', 'Tomato ketchup', 'Soy sauce'],
        procedure: [
          'Slice onions into 1/2-inch rings and prepare coating mixture',
          'Dip onion rings in buttermilk-egg mixture, then coat with flour and breadcrumbs',
          'Deep fry until golden brown and crispy',
          'Make honey-garlic sauce by sautéing garlic in oil and butter',
          'Add honey, ketchup, and soy sauce; cook until thick and glossy',
          'Serve hot onion rings with honey-garlic sauce'
        ],
        videoUrl: ''
      },
      {
        id: 25,
        name: 'Fried Calamari',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
        price: '₱549.50',
        preparation: 'Tender squid rings lightly battered and fried to golden perfection.',
        ingredients: ['Squid tubes and tentacles', 'Buttermilk', 'All-purpose flour', 'Cornstarch', 'Salt', 'Black pepper', 'Paprika', 'Oil for frying', 'Lemon wedges', 'Fresh parsley', 'Marinara or aioli sauce'],
        procedure: [
          'Clean squid and cut into 1/2-inch rings',
          'Soak squid in buttermilk for 20-30 minutes to tenderize',
          'Mix flour, cornstarch, salt, pepper, and paprika for coating',
          'Heat oil to 350-375°F',
          'Coat squid pieces in flour mixture and fry in batches for 2-4 minutes',
          'Drain on paper towels and serve hot with lemon wedges and dipping sauce'
        ],
        videoUrl: ''
      }
    ]
  },
  {
    name: 'SALAD',
    items: [
      {
        id: 8,
        name: 'Caesar Salad',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        price: '₱549.50',
        preparation: 'Classic Caesar with romaine, parmesan, and croutons.',
        ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing', 'Lemon'],
        procedure: [
          'Wash and chop romaine',
          'Toss with Caesar dressing',
          'Add croutons and parmesan',
          'Garnish with lemon wedge'
        ],
        videoUrl: ''
      },
      {
        id: 9,
        name: 'Greek Salad',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
        price: '₱599.50',
        preparation: 'Fresh Mediterranean salad with feta and olives.',
        ingredients: ['Cucumber', 'Tomatoes', 'Red onion', 'Feta cheese', 'Kalamata olives', 'Olive oil'],
        procedure: [
          'Chop vegetables into chunks',
          'Add olives and feta',
          'Drizzle with olive oil',
          'Season with oregano and lemon'
        ],
        videoUrl: ''
      },
      {
        id: 10,
        name: 'Caprese Salad',
        image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400',
        price: '₱649.50',
        preparation: 'Simple Italian salad with tomatoes, mozzarella, and basil.',
        ingredients: ['Tomatoes', 'Fresh mozzarella', 'Fresh basil', 'Olive oil', 'Balsamic glaze'],
        procedure: [
          'Slice tomatoes and mozzarella',
          'Arrange alternating on plate',
          'Add basil leaves',
          'Drizzle with oil and balsamic'
        ],
        videoUrl: ''
      }
    ]
  },
  {
    name: 'DESSERT',
    items: [
      {
        id: 11,
        name: 'Chocolate Cake',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        price: '₱449.50',
        preparation: 'Rich, moist chocolate cake with chocolate ganache frosting.',
        ingredients: ['Flour', 'Cocoa powder', 'Sugar', 'Eggs', 'Butter', 'Chocolate'],
        procedure: [
          'Mix dry ingredients',
          'Add wet ingredients and combine',
          'Bake at 350°F for 30 minutes',
          'Cool and frost with ganache'
        ],
        videoUrl: ''
      },
      {
        id: 12,
        name: 'Tiramisu',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        price: '₱499.50',
        preparation: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.',
        ingredients: ['Ladyfingers', 'Mascarpone', 'Espresso', 'Eggs', 'Sugar', 'Cocoa powder'],
        procedure: [
          'Brew strong espresso and cool',
          'Whip mascarpone with egg yolks and sugar',
          'Dip ladyfingers in espresso',
          'Layer with mascarpone and dust with cocoa'
        ],
        videoUrl: ''
      },
      {
        id: 13,
        name: 'Crème Brûlée',
        image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400',
        price: '₱549.50',
        preparation: 'Creamy vanilla custard with caramelized sugar crust.',
        ingredients: ['Heavy cream', 'Egg yolks', 'Sugar', 'Vanilla bean', 'Brown sugar'],
        procedure: [
          'Heat cream with vanilla',
          'Whisk egg yolks with sugar',
          'Combine and bake in water bath',
          'Caramelize sugar on top with torch'
        ],
        videoUrl: ''
      }
    ]
  },
  {
    name: 'WINES',
    items: [
      {
        id: 14,
        name: 'Cabernet Sauvignon',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
        price: '₱2,250.00',
        preparation: 'Full-bodied red wine with notes of black cherry and oak.',
        ingredients: ['Cabernet Sauvignon grapes'],
        procedure: [
          'Serve at room temperature (60-65°F)',
          'Decant for 30 minutes before serving',
          'Pairs well with red meats and aged cheeses'
        ],
        videoUrl: ''
      },
      {
        id: 15,
        name: 'Chardonnay',
        image: 'https://images.unsplash.com/photo-1474722883778-ab3ea8f8b858?w=400',
        price: '₱1,900.00',
        preparation: 'Crisp white wine with buttery notes and citrus flavors.',
        ingredients: ['Chardonnay grapes'],
        procedure: [
          'Chill to 45-50°F before serving',
          'Pairs excellently with seafood and poultry',
          'Serve in a white wine glass'
        ],
        videoUrl: ''
      },
      {
        id: 16,
        name: 'Pinot Noir',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400',
        price: '₱2,100.00',
        preparation: 'Light to medium-bodied red with cherry and earthy notes.',
        ingredients: ['Pinot Noir grapes'],
        procedure: [
          'Serve slightly chilled (55-60°F)',
          'Pairs with salmon, duck, and mushroom dishes',
          'No decanting needed'
        ],
        videoUrl: ''
      }
    ]
  },
  {
    name: 'BEVERAGES',
    items: [
      {
        id: 17,
        name: 'Fresh Lemonade',
        image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=400',
        price: '₱249.50',
        preparation: 'Refreshing homemade lemonade with fresh lemons and mint.',
        ingredients: ['Lemons', 'Sugar', 'Water', 'Fresh mint', 'Ice'],
        procedure: [
          'Squeeze fresh lemons',
          'Mix with sugar and water',
          'Add ice and mint leaves',
          'Stir well and serve chilled'
        ],
        videoUrl: ''
      },
      {
        id: 18,
        name: 'Iced Tea',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
        price: '₱199.50',
        preparation: 'Cold brewed tea with lemon and sweetener.',
        ingredients: ['Tea bags', 'Water', 'Lemon', 'Sugar', 'Ice'],
        procedure: [
          'Brew tea and let cool',
          'Add ice and lemon',
          'Sweeten to taste',
          'Serve with lemon wedge'
        ],
        videoUrl: ''
      },
      {
        id: 19,
        name: 'Fruit Smoothie',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
        price: '₱349.50',
        preparation: 'Healthy blend of fresh fruits and yogurt.',
        ingredients: ['Mixed berries', 'Banana', 'Yogurt', 'Honey', 'Ice'],
        procedure: [
          'Add all ingredients to blender',
          'Blend until smooth',
          'Adjust sweetness with honey',
          'Serve immediately'
        ],
        videoUrl: ''
      }
    ]
  },
  {
    name: 'COFFEE',
    items: [
      {
        id: 20,
        name: 'Espresso',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
        price: '₱175.00',
        preparation: 'Strong, concentrated coffee shot.',
        ingredients: ['Espresso beans', 'Hot water'],
        procedure: [
          'Grind beans finely',
          'Tamp grounds in portafilter',
          'Extract for 25-30 seconds',
          'Serve immediately'
        ],
        videoUrl: ''
      },
      {
        id: 21,
        name: 'Cappuccino',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
        price: '₱249.50',
        preparation: 'Espresso with steamed milk and foam.',
        ingredients: ['Espresso', 'Milk', 'Milk foam'],
        procedure: [
          'Pull espresso shot',
          'Steam milk to 150°F',
          'Pour steamed milk over espresso',
          'Top with foam and dust with cocoa'
        ],
        videoUrl: ''
      },
      {
        id: 22,
        name: 'Latte',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
        price: '₱274.50',
        preparation: 'Smooth espresso with steamed milk.',
        ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
        procedure: [
          'Pull double espresso shot',
          'Steam milk until silky',
          'Pour milk creating latte art',
          'Serve hot'
        ],
        videoUrl: ''
      },
      {
        id: 23,
        name: 'Iced Coffee',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
        price: '₱224.50',
        preparation: 'Cold brew coffee served over ice with milk.',
        ingredients: ['Coffee beans', 'Cold water', 'Milk', 'Ice', 'Sugar (optional)'],
        procedure: [
          'Brew strong coffee',
          'Let it cool completely',
          'Pour over ice',
          'Add milk and sugar to taste'
        ],
        videoUrl: ''
      }
    ]
  }
]);

const currentCategoryItems = computed(() => {
  const category = categories.value.find(cat => cat.name === activeCategory.value);
  return category ? category.items : [];
});

function selectDish(dish) {
  selectedDish.value = dish;
  activeTab.value = 'Preparation';
}
</script>

<style lang="scss" scoped>
.menu-order {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.menu-header {
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

  .date-display {
    font-size: 1rem;
    color: #666;
  }
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

.menu-items-section {
  margin-bottom: 3rem;
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

.click-instruction {
  text-align: center;
  padding: 3rem;
  font-size: 1.5rem;
  color: #999;
  border: 2px dashed #ddd;
  border-radius: 8px;
}

.dish-details {
  margin-top: 3rem;
  border: 2px solid #333;
  border-radius: 8px;
  overflow: hidden;
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
}

.content-with-image {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.dish-image {
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.tab-content {
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    line-height: 1.6;
    color: #555;
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

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 1024px) {
  .content-with-image {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .menu-header {
    flex-direction: column;
    gap: 1rem;
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
}
</style>
