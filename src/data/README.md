# Menu Data

This folder contains centralized data for the restaurant application.

## menuData.js

Contains all menu items organized by categories. This file is the single source of truth for all menu data across the application.

### Usage

```javascript
import { menuCategories, getAllItems, getItemsByCategory, getItemById, getCategoryNames } from '@/data/menuData';

// Get all categories with items
const categories = menuCategories;

// Get all items as a flat array
const allItems = getAllItems();

// Get items from a specific category
const mainCourses = getItemsByCategory('MAIN COURSE');

// Get a specific item by ID
const item = getItemById(1);

// Get all category names
const categoryNames = getCategoryNames();
```

### Data Structure

Each category contains:
- `name`: Category name (e.g., 'MAIN COURSE', 'DESSERT')
- `items`: Array of menu items

Each item contains:
- `id`: Unique identifier
- `name`: Dish name
- `image`: Image URL
- `price`: Formatted price string (e.g., '₱1,249.50')
- `priceValue`: Numeric price value for calculations
- `preparation`: Description of the dish
- `ingredients`: Array of ingredients
- `procedure`: Array of cooking steps
- `videoUrl`: Optional video tutorial URL

### Categories

- MAIN COURSE
- APPETIZER
- SOUP
- SALAD
- DESSERT
- WINES
- BEVERAGES
- COFFEE

## Benefits

1. **Single Source of Truth**: All menu data is in one place
2. **Easy Maintenance**: Update menu items in one file
3. **Consistency**: Same data across all pages
4. **Reusability**: Import and use anywhere in the app
5. **Type Safety**: Can add TypeScript types if needed
6. **Helper Functions**: Utility functions for common operations
