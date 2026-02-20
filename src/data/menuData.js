// Centralized menu data for the restaurant application
// This data can be imported and used across all pages

export const menuCategories = [
{
    name: 'MAIN COURSE',
    items: [
      {
        id: 1,
        name: 'Grilled Salmon',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
        price: '₱1,249.50',
        priceValue: 1249.50,
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
        priceValue: 949.50,
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
        priceValue: 1649.50,
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
        priceValue: 1149.50,
        preparation: 'Succulent shrimp in garlic butter wine sauce over pasta.',
        ingredients: ['Large shrimp', 'Linguine', 'Garlic', 'White wine', 'Butter', 'Parsley', 'Lemon'],
        procedure: [
          'Cook pasta until al dente',
          'Sauté garlic in butter',
          'Add shrimp and cook until pink',
          'Deglaze with wine and toss with pasta'
        ],
        videoUrl: ''
      },
      {
        id: 26,
        name: 'Authentic Hainanese Chicken',
        image: new URL('@/assets/menu/Authentic Hainanese Chicken.jpg', import.meta.url).href,
        price: '₱899.50',
        priceValue: 899.50,
        preparation: 'Tender poached chicken served with fragrant rice cooked in chicken fat and aromatic ginger scallion sauce.',
        ingredients: ['2 Chicken thighs deboned', 'Chicken fat', 'Salt', '1 tbsp Minced garlic', '1 tbsp Minced ginger', '1 cup Rice', '1 cup Chicken stock', '1 stalk Lemongrass', '2 stalks Green onion', '2 tbsp Oil', '1/4 cup Minced scallions', 'Sweet soy sauce', 'Cucumber slices'],
        procedure: [
          'Debone the chicken thighs and save the fat. Sprinkle the chicken with salt',
          'Render out the chicken fat in a pot until liquid, then discard the solid bits',
          'Stir-fry the minced garlic and ginger in the chicken fat until fragrant. Mix in the rice',
          'Pour in the chicken stock and add salt, lemongrass, and green onions. Place the chicken thighs on top',
          'Cover the pot and simmer on low heat for 13 minutes. Turn off heat and let it stay covered for 10 minutes',
          'Heat oil and pour over minced ginger, scallions, and salt to make the sauce',
          'Remove chicken and aromatics from pot. Serve rice and chicken with ginger scallion sauce, sweet soy sauce, and cucumber slices'
        ],
        videoUrl: ''
      },
      {
        id: 27,
        name: 'Italian Baby Back Ribs',
        image: new URL('@/assets/menu/Italian Baby Back Ribs.jpg', import.meta.url).href,
        price: '₱1,349.50',
        priceValue: 1349.50,
        preparation: 'Tender, fall-off-the-bone ribs with a smoky dry rub and caramelized barbecue sauce.',
        ingredients: ['1 rack ribs', '1 Tbsp Smoked Paprika', '1 tsp Salt', '1 tsp Black Pepper', '1 tsp Onion Powder', '1 tsp Garlic Powder', '1 tsp Ground Mustard', '1 cup Barbecue Sauce'],
        procedure: [
          'Preheat oven to 275°F (135°C). Line a baking sheet with aluminum foil',
          'Remove the tough membrane from the back side of the ribs',
          'Combine dry rub ingredients and sprinkle generously over both sides of ribs',
          'Transfer ribs to foil-lined pan meat-side up. Cover tightly with foil',
          'Bake for 3 to 4 hours',
          'Remove from oven and brush with barbecue sauce',
          'Set oven to broil and broil for 3 to 5 minutes until sauce is bubbly and caramelized'
        ],
        videoUrl: ''
      },
      {
        id: 28,
        name: 'Tender Fillet Mignon',
        image: new URL('@/assets/menu/Tender Fillet Mignon.jpg', import.meta.url).href,
        price: '₱1,899.50',
        priceValue: 1899.50,
        preparation: 'Premium center-cut filet mignon, perfectly seared and butter-basted with herbs.',
        ingredients: ['One 6-8 oz filet mignon', '1 tsp Kosher salt', '1/2 tsp Black pepper', '1-2 tbsp Avocado oil', '2-3 tbsp Unsalted butter', '2 sprigs Rosemary', '2-3 sprigs Thyme', '2-3 Garlic cloves smashed'],
        procedure: [
          'Bring steak to room temperature and pat dry with paper towel',
          'Season the filet mignon on all sides with salt and pepper',
          'Heat oil in pan, then sear the steak on all sides to lock in juices',
          'Baste the steak with butter, herbs, and garlic to add flavor',
          'Finish cooking in a 400°F oven',
          'Allow the steak to rest for at least 10 minutes before cutting',
          'Cut the filet mignon against the grain and serve'
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
        priceValue: 449.50,
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
        priceValue: 399.50,
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
        priceValue: 499.50,
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
        image: new URL('@/assets/menu/Honey-Garlic Onion Rings.jpg', import.meta.url).href,
        price: '₱399.50',
        priceValue: 399.50,
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
        image: new URL('@/assets/menu/Fried Calamari.jpg', import.meta.url).href,
        price: '₱549.50',
        priceValue: 549.50,
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
    name: 'SOUP',
    items: [
      {
        id: 29,
        name: 'Cream of Wild Mushroom',
        image: new URL('@/assets/menu/Cream of Wild Mushroom.jpg', import.meta.url).href,
        price: '₱449.50',
        priceValue: 449.50,
        preparation: 'Rich and creamy soup with earthy wild mushrooms, finished with heavy cream.',
        ingredients: ['Fresh mushrooms 1-1.5 lb sliced', '4 tbsp Butter', '2 cups Onion diced', '4 cloves Garlic minced', '4-6 tbsp Flour', '4 cups Stock', '1 cup Heavy cream', 'Olive oil', 'Salt and pepper', 'Thyme and parsley'],
        procedure: [
          'Heat butter and oil in pot. Add onion and cook until softened, then add garlic',
          'Add sliced mushrooms and cook until they release juices and soften',
          'Sprinkle flour over mushroom mixture and stir to create a roux. Cook briefly',
          'Slowly pour in stock while stirring to avoid lumps. Bring to simmer',
          'Add salt, pepper, and herbs. Simmer for 10-15 minutes until thickened',
          'Reduce heat and stir in cream. Heat gently without boiling',
          'Taste and adjust seasoning. Serve hot with crusty bread'
        ],
        videoUrl: ''
      },
      {
        id: 30,
        name: 'Broccoli Cheddar Soup',
        image: new URL('@/assets/menu/Broccoli Cheddar Soup.jpg', import.meta.url).href,
        price: '₱399.50',
        priceValue: 399.50,
        preparation: 'Creamy, cheesy soup loaded with tender broccoli and sharp cheddar.',
        ingredients: ['2 cups Broccoli florets', '1 cup Carrots diced', '1/2 cup Onion chopped', '2-3 tbsp Butter', '3 tbsp Flour', '2 cups Chicken broth', '1.5 cups Milk', '1 cup Heavy cream', '2-3 cups Sharp cheddar shredded', 'Salt and pepper', 'Pinch of nutmeg'],
        procedure: [
          'Wash and chop broccoli. Dice carrots and onion',
          'Melt butter in pot. Add onions and carrots, cook until softened',
          'Sprinkle flour over vegetables and stir for 1-2 minutes',
          'Slowly pour in broth while whisking, then add milk and cream',
          'Add broccoli florets and simmer until tender (8-10 minutes)',
          'Optional: Blend part of soup for smoother texture',
          'Lower heat and gradually stir in cheddar until melted',
          'Add salt, pepper, and nutmeg. Serve hot with crusty bread'
        ],
        videoUrl: ''
      }
    ]
  },
  {
    name: 'SALAD',
    items: [
      {
        id: 31,
        name: 'Classic Caesar Salad',
        image: new URL('@/assets/menu/Classic Caeser Salad.jpg', import.meta.url).href,
        price: '₱599.50',
        priceValue: 599.50,
        preparation: 'Authentic Caesar with homemade croutons and creamy anchovy dressing.',
        ingredients: ['1/2 Baguette cubed', '1 tsp Black pepper', '1 tsp Salt', 'Garlic powder', '2-3 tbsp Olive oil', '2 Garlic cloves', '4 Anchovy fillets', '1 tsp Dijon mustard', '2 Egg yolks', '2 tbsp Lemon juice', '1/2 cup Oil', '2-3 tbsp Parmesan grated', '1 Romaine lettuce', 'Parmesan shavings'],
        procedure: [
          'Preheat oven to 375°F. Toss baguette cubes with pepper, salt, garlic powder, and olive oil. Bake 15-20 minutes until golden',
          'Chop garlic into paste. Combine with anchovy fillets and chop together',
          'Whisk garlic-anchovy paste with mustard, egg yolks, lemon juice, salt, and pepper',
          'While whisking, gradually pour in oil until thick and smooth. Stir in parmesan',
          'Toss romaine with croutons. Add parmesan shavings',
          'Spread dressing around bowl edges and toss to combine'
        ],
        videoUrl: ''
      },
      {
        id: 32,
        name: 'Waldorf Salad',
        image: new URL('@/assets/menu/Waldorf Salad.jpg', import.meta.url).href,
        price: '₱499.50',
        priceValue: 499.50,
        preparation: 'Classic American salad with apples, walnuts, celery, and creamy dressing.',
        ingredients: ['1/4 Cup Mayonnaise', '1/4 Cup Greek Yogurt', '1 tbsp Lemon Juice', '1 tsp Maple Syrup', 'Salt and Pepper', '2 Medium Apples chopped', '1/2 Cup Walnuts sliced', '1/2 Cup Celery', '1/4 Cup Dried Cranberries', '1 Cup Cooked Chicken diced (optional)', '2 Cups Greens (optional)'],
        procedure: [
          'Combine mayonnaise, Greek yogurt, lemon juice, maple syrup, salt, and pepper in a bowl',
          'In separate bowl, combine chopped apples, walnuts, celery, and dried cranberries',
          'Add dressing to salad mixture and toss to combine',
          'For main meal, add cooked chicken and serve over greens'
        ],
        videoUrl: ''
      },
      {
        id: 9,
        name: 'Greek Salad',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
        price: '₱599.50',
        priceValue: 599.50,
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
        priceValue: 649.50,
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
        priceValue: 449.50,
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
        priceValue: 499.50,
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
        priceValue: 549.50,
        preparation: 'Creamy vanilla custard with caramelized sugar crust.',
        ingredients: ['Heavy cream', 'Egg yolks', 'Sugar', 'Vanilla bean', 'Brown sugar'],
        procedure: [
          'Heat cream with vanilla',
          'Whisk egg yolks with sugar',
          'Combine and bake in water bath',
          'Caramelize sugar on top with torch'
        ],
        videoUrl: ''
      },
      {
        id: 33,
        name: 'Panna Cotta',
        image: new URL('@/assets/menu/Panna Cotta.jpg', import.meta.url).href,
        price: '₱449.50',
        priceValue: 449.50,
        preparation: 'Silky Italian dessert with vanilla cream, set with gelatin.',
        ingredients: ['1/3 cup Skim milk', '1 envelope Unflavored gelatin', '2.5 cups Heavy cream', '1/2 cup White sugar', '1.5 tsp Vanilla extract'],
        procedure: [
          'Pour milk into bowl, sprinkle gelatin over it, stir and set aside',
          'Mix heavy cream and sugar in saucepan, heat to boiling',
          'Stir gelatin mixture into boiling cream until dissolved, cook for 1 minute',
          'Remove from heat, add vanilla and stir well',
          'Pour into 6 ramekins, cool uncovered for 20 minutes',
          'Cover with plastic wrap and refrigerate for at least 4 hours or overnight'
        ],
        videoUrl: ''
      },
      {
        id: 34,
        name: 'Classic Cheesecake',
        image: new URL('@/assets/menu/Classic Cheesecake.jpg', import.meta.url).href,
        price: '₱599.50',
        priceValue: 599.50,
        preparation: 'Rich and creamy New York-style cheesecake with graham cracker crust.',
        ingredients: ['1.25 cups Graham cracker crumbs', '5 tbsp Butter melted', '2 tbsp Sugar', '3 packages Cream cheese', '1 cup Sugar', '1/4 cup Heavy cream', '3 Eggs', '2 tsp Lemon juice', '1.5 tsp Vanilla extract'],
        procedure: [
          'Preheat oven to 350°F. Mix crust ingredients, press into 9-inch springform pan. Bake 10 minutes, cool. Reduce oven to 300°F',
          'Beat cream cheese and sugar until smooth (3 minutes). Add cream, then eggs one at a time',
          'Stir in lemon juice and vanilla, pour into crust',
          'Bake 1 to 1.25 hours until edges set but center jiggles. Turn off oven, leave door ajar 20 minutes',
          'Remove, run knife around edge, cool completely',
          'Refrigerate at least 4 hours or overnight before serving'
        ],
        videoUrl: ''
      },
      {
        id: 35,
        name: 'Chocolate Mousse',
        image: new URL('@/assets/menu/Chocolate Mousse.jpg', import.meta.url).href,
        price: '₱499.50',
        priceValue: 499.50,
        preparation: 'Light and airy chocolate dessert with rich, velvety texture.',
        ingredients: ['6 oz Semisweet chocolate chopped', '1 cup Heavy cream cold', '3 Eggs', '2 Egg yolks', '1/4 cup Sugar', 'Pinch of salt', '1 tsp Espresso powder', 'Cocoa powder for dusting'],
        procedure: [
          'Melt chocolate using double boiler or microwave until smooth',
          'Whip cream until soft peaks, refrigerate',
          'Beat eggs, yolks, sugar, and salt until foamy. Place bowl over simmering water and whip until fluffy (2-3 minutes)',
          'Remove from heat and beat on high until thick ribbons form. Fold in espresso mixture',
          'Fold quarter of chocolate into egg mixture, then fold in rest',
          'Gently fold in whipped cream until smooth',
          'Pour into serving dishes, refrigerate at least 1 hour',
          'Dust with cocoa powder before serving'
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
        image: new URL('@/assets/menu/Cabernet Sauvignon.jpg', import.meta.url).href,
        price: '₱700.00',
        priceValue: 700.00,
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
        image: new URL('@/assets/menu/Chardonnay.jpg', import.meta.url).href,
        price: '₱700.00',
        priceValue: 700.00,
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
        id: 36,
        name: 'Sauvignon Blanc',
        image: new URL('@/assets/menu/Sauvignon Blanc.jpg', import.meta.url).href,
        price: '₱700.00',
        priceValue: 700.00,
        preparation: 'Crisp white wine with herbaceous and citrus notes.',
        ingredients: ['Sauvignon Blanc grapes'],
        procedure: [
          'Chill to 45-50°F before serving',
          'Pairs well with seafood, salads, and light dishes',
          'Serve in a white wine glass'
        ],
        videoUrl: ''
      },
      {
        id: 37,
        name: 'Merlot',
        image: new URL('@/assets/menu/Merlot.jpg', import.meta.url).href,
        price: '₱700.00',
        priceValue: 700.00,
        preparation: 'Smooth red wine with plum and chocolate notes.',
        ingredients: ['Merlot grapes'],
        procedure: [
          'Serve at room temperature (60-65°F)',
          'Pairs well with pasta, chicken, and beef',
          'No decanting needed'
        ],
        videoUrl: ''
      },
      {
        id: 16,
        name: 'Pinot Noir',
        image: new URL('@/assets/menu/Pinot Noir.jpg', import.meta.url).href,
        price: '₱2,100.00',
        priceValue: 2100.00,
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
        image: new URL('@/assets/menu/Fresh Lemonade.jpg', import.meta.url).href,
        price: '₱249.50',
        priceValue: 249.50,
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
        id: 38,
        name: 'Kalamansi Four Seasons',
        image: new URL('@/assets/menu/Kalamansi Four Seasons.jpg', import.meta.url).href,
        price: '₱299.50',
        priceValue: 299.50,
        preparation: 'Tropical citrus drink with orange, calamansi, granadilla, and aromatic rosemary.',
        ingredients: ['2 jiggers Orange Juice', '1 jigger Calamansi Juice', '1/2 jigger Sweet Granadilla pulp', '2 jiggers Sprite', 'Ice cubes', 'Sliced calamansi', 'Fresh rosemary sprig'],
        procedure: [
          'Cut granadilla in half and extract 1/2 jigger of juice/pulp',
          'In shaker, combine orange juice, calamansi juice, and granadilla juice',
          'Add ice and shake vigorously for 10-15 seconds',
          'Fill glass with ice and strain juice mixture into it',
          'Slowly pour Sprite over juice. Gently stir once',
          'Clap rosemary sprig to release oils. Add rosemary and calamansi slices as garnish'
        ],
        videoUrl: ''
      },
      {
        id: 39,
        name: 'Lemon Squash',
        image: new URL('@/assets/menu/Lemon Squash.jpg', import.meta.url).href,
        price: '₱199.50',
        priceValue: 199.50,
        preparation: 'Concentrated lemon syrup drink, refreshing and tangy.',
        ingredients: ['1 kg Sugar', '600 ml Water', '1 piece Lemon Peel', '1 tsp Himalayan Pink Salt', '1/4 tsp Lemon Essence', '4-5 drops Yellow Food Color', '1.5 cups Lemon Juice'],
        procedure: [
          'Combine sugar and water in pot. Bring to boil',
          'Cook on medium flame for 8-10 minutes until sugar dissolves',
          'Add lemon peel, salt, lemon essence, and food color. Cook 2 minutes',
          'Remove lemon peel and let syrup cool completely',
          'Stir in lemon juice once cooled',
          'Store in clean bottle. To serve: mix 1/4 cup squash with 3/4 cup water and ice'
        ],
        videoUrl: ''
      },
      {
        id: 40,
        name: 'Butterfly Iced Tea',
        image: new URL('@/assets/menu/Butterfly Iced Tea.jpg', import.meta.url).href,
        price: '₱249.50',
        priceValue: 249.50,
        preparation: 'Magical color-changing tea made from butterfly pea flowers.',
        ingredients: ['1 tbsp Dried Butterfly Pea Flowers', '2 cups Boiling Water', '1-2 tsp Sweetener', 'Ice Cubes', 'Lemon or Lime squeeze'],
        procedure: [
          'Place butterfly pea flowers in teapot. Pour boiling water over them',
          'Let steep for 5-10 minutes until deep blue',
          'Strain tea into pitcher to remove flowers',
          'Stir in sweetener while warm until dissolved',
          'Cool to room temperature, then refrigerate',
          'Fill glass with ice, pour blue tea, add lemon/lime to watch it turn purple'
        ],
        videoUrl: ''
      },
      {
        id: 18,
        name: 'Iced Tea',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
        price: '₱199.50',
        priceValue: 199.50,
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
        priceValue: 349.50,
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
        priceValue: 175.00,
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
        id: 41,
        name: 'Iced Mocha',
        image: new URL('@/assets/menu/Iced Mocha.jpg', import.meta.url).href,
        price: '₱249.50',
        priceValue: 249.50,
        preparation: 'Chilled coffee with chocolate, layered with milk and topped with cocoa.',
        ingredients: ['Ice', '15 ml Condensed Milk', '15 ml Evaporated Milk', '40 ml Fresh Milk', '1 shot Espresso', '5 g Cocoa Powder', 'Frothed milk', 'Extra cocoa for dusting'],
        procedure: [
          'Fill tall glass with ice cubes',
          'Pour in condensed milk and evaporated milk',
          'Add fresh milk over the ice',
          'Mix espresso shot with cocoa powder and pour slowly into glass',
          'Top with frothed milk and dust with cocoa powder',
          'Add straw, stir gently and enjoy'
        ],
        videoUrl: ''
      },
      {
        id: 42,
        name: 'Iced Café Latte',
        image: new URL('@/assets/menu/Iced Café Latte.jpg', import.meta.url).href,
        price: '₱224.50',
        priceValue: 224.50,
        preparation: 'Smooth espresso poured over cold milk and ice.',
        ingredients: ['1-1.5 cups Ice cubes', '6 oz Cold milk', '2 shots Espresso', 'Optional: 1-2 tsp Simple syrup'],
        procedure: [
          'Fill tall glass to brim with large ice cubes',
          'Pour cold milk over ice until glass is 3/4 full',
          'Slowly pour espresso shots over center of ice for layered look',
          'Insert straw and give gentle mix to incorporate espresso',
          'Drink immediately while fresh and cold'
        ],
        videoUrl: ''
      },
      {
        id: 43,
        name: 'Caramel Latte',
        image: new URL('@/assets/menu/Caramel Latte.jpg', import.meta.url).href,
        price: '₱274.50',
        priceValue: 274.50,
        preparation: 'Espresso with steamed milk and sweet caramel syrup, topped with latte art.',
        ingredients: ['18-20g Espresso beans', '1-2 pumps Caramel syrup (15-30ml)', '8 oz Whole milk'],
        procedure: [
          'Grind coffee beans finely and tamp in portafilter',
          'Pump caramel syrup into bottom of latte cup',
          'Pull double shot of espresso into cup with syrup',
          'Steam milk to 65°C (150°F) with micro-foam texture',
          'Pour milk from height, then bring pitcher close for latte art',
          'Tap cup gently and serve immediately'
        ],
        videoUrl: ''
      },
      {
        id: 44,
        name: 'Classic Hot Cappuccino',
        image: new URL('@/assets/menu/Classic Hot Cappuccino.jpg', import.meta.url).href,
        price: '₱249.50',
        priceValue: 249.50,
        preparation: 'Traditional Italian coffee with espresso, steamed milk, and thick foam.',
        ingredients: ['1 shot Espresso (30ml)', '4-6 oz Whole milk', 'Cocoa powder or cinnamon for dusting'],
        procedure: [
          'Extract single shot of espresso into cappuccino cup',
          'Steam milk with enough air to create dense, stable foam',
          'Pour steamed milk into center, holding back thick foam with spoon',
          'Spoon or pour remaining thick foam on top until slightly domed',
          'Add decorative line of cocoa powder across foam',
          'Serve immediately'
        ],
        videoUrl: ''
      }
    ]
  },
];

// Helper function to get all items
export const getAllItems = () => {
  return menuCategories.flatMap(category => category.items);
};

// Helper function to get items by category
export const getItemsByCategory = (categoryName) => {
  const category = menuCategories.find(cat => cat.name === categoryName);
  return category ? category.items : [];
};

// Helper function to get item by ID
export const getItemById = (id) => {
  return getAllItems().find(item => item.id === id);
};

// Helper function to get all category names
export const getCategoryNames = () => {
  return menuCategories.map(category => category.name);
};
