// Firebase services will be initialized in firebase-config.js
let database, auth, storage, menuItemsRef, categoriesRef, ordersRef, usersRef;

// Firebase services will be initialized in the main DOMContentLoaded listener

// DOM Elements - will be initialized when DOM is loaded
let loginForm, registerForm, contactForm, showRegister, showLogin;
let loginModal, registerModal, cartModal, profileModal, orderHistoryModal, toast, toastMessage;
let profileForm, userProfileBtn, userOrdersBtn, logoutBtn;

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Expanded categories data
const categories = [
    { id: 1, name: 'Breakfast', image: 'https://picsum.photos/500/300?random=101', description: 'Start your day right' },
    { id: 2, name: 'Lunch', image: 'https://picsum.photos/500/300?random=102', description: 'Midday delights' },
    { id: 3, name: 'Dinner', image: 'https://picsum.photos/500/300?random=103', description: 'Evening specialties' },
    { id: 4, name: 'Desserts', image: 'https://picsum.photos/500/300?random=104', description: 'Sweet endings' },
    { id: 5, name: 'Beverages', image: 'https://picsum.photos/500/300?random=105', description: 'Refreshing drinks' },
    { id: 6, name: 'Snacks', image: 'https://picsum.photos/500/300?random=106', description: 'Quick bites' },
    { id: 7, name: 'Pizza', image: 'https://picsum.photos/500/300?random=107', description: 'Italian classics' },
    { id: 8, name: 'Asian', image: 'https://picsum.photos/500/300?random=108', description: 'Eastern flavors' }
];

const menuItems = [
    // Breakfast Items
    { 
        id: 1, 
        categoryId: 1, 
        name: 'Pancake Stack', 
        description: 'Fluffy buttermilk pancakes served with maple syrup and butter.', 
        price: 8.99, 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format',
        rating: 4.5,
        tags: ['sweet', 'classic', 'popular']
    },
    { 
        id: 2, 
        categoryId: 1, 
        name: 'Avocado Toast', 
        description: 'Fresh avocado on toasted sourdough with cherry tomatoes and feta.', 
        price: 7.50, 
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&auto=format',
        rating: 4.3,
        tags: ['healthy', 'vegetarian', 'trendy']
    },
    { 
        id: 3, 
        categoryId: 1, 
        name: 'Eggs Benedict', 
        description: 'Poached eggs on English muffins with hollandaise sauce and ham.', 
        price: 12.99, 
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=300&fit=crop&auto=format',
        rating: 4.7,
        tags: ['classic', 'rich', 'brunch']
    },
    { 
        id: 4, 
        categoryId: 1, 
        name: 'Breakfast Burrito', 
        description: 'Scrambled eggs, bacon, cheese, and hash browns wrapped in a flour tortilla.', 
        price: 11.99, 
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&auto=format',
        rating: 4.4,
        tags: ['hearty', 'protein']
    },

    // Lunch Items
    { 
        id: 5, 
        categoryId: 2, 
        name: 'Chicken Caesar Salad', 
        description: 'Crisp romaine lettuce with grilled chicken, parmesan, and Caesar dressing.', 
        price: 12.99, 
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&auto=format',
        rating: 4.6,
        tags: ['healthy', 'protein', 'salad']
    },
    { 
        id: 6, 
        categoryId: 2, 
        name: 'Beef Burger', 
        description: 'Juicy beef patty with cheddar, lettuce, tomato, and special sauce.', 
        price: 11.99, 
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format',
        rating: 4.8,
        tags: ['popular', 'classic', 'hearty']
    },
    { 
        id: 7, 
        categoryId: 2, 
        name: 'Club Sandwich', 
        description: 'Triple-decker sandwich with turkey, bacon, lettuce, and tomato.', 
        price: 10.99, 
        image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&auto=format',
        rating: 4.2,
        tags: ['classic', 'protein']
    },
    { 
        id: 8, 
        categoryId: 2, 
        name: 'Fish Tacos', 
        description: 'Grilled fish with cabbage slaw and chipotle mayo in corn tortillas.', 
        price: 13.99, 
        image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6706?w=400&h=300&fit=crop&auto=format',
        rating: 4.5,
        tags: ['healthy', 'spicy', 'seafood']
    },

    // Dinner Items
    { 
        id: 9, 
        categoryId: 3, 
        name: 'Grilled Salmon', 
        description: 'Fresh Atlantic salmon with roasted vegetables and lemon butter sauce.', 
        price: 18.99, 
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format',
        rating: 4.7,
        tags: ['healthy', 'seafood', 'premium']
    },
    { 
        id: 10, 
        categoryId: 3, 
        name: 'Pasta Carbonara', 
        description: 'Spaghetti with creamy sauce, pancetta, and parmesan cheese.', 
        price: 14.99, 
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&auto=format',
        rating: 4.4,
        tags: ['classic', 'creamy', 'italian']
    },
    { 
        id: 11, 
        categoryId: 3, 
        name: 'Ribeye Steak', 
        description: 'Premium ribeye steak with garlic mashed potatoes and asparagus.', 
        price: 24.99, 
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format',
        rating: 4.9,
        tags: ['premium', 'protein', 'hearty']
    },
    { 
        id: 12, 
        categoryId: 3, 
        name: 'Chicken Parmesan', 
        description: 'Breaded chicken breast with marinara sauce and melted mozzarella.', 
        price: 16.99, 
        image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop&auto=format',
        rating: 4.3,
        tags: ['classic', 'italian', 'comfort']
    },

    // Desserts
    { 
        id: 13, 
        categoryId: 4, 
        name: 'Chocolate Lava Cake', 
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.', 
        price: 7.99, 
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&auto=format',
        rating: 4.8,
        tags: ['sweet', 'chocolate', 'popular']
    },
    { 
        id: 14, 
        categoryId: 4, 
        name: 'Cheesecake', 
        description: 'New York style cheesecake with berry compote.', 
        price: 6.99, 
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&auto=format',
        rating: 4.6,
        tags: ['sweet', 'classic', 'creamy']
    },
    { 
        id: 15, 
        categoryId: 4, 
        name: 'Tiramisu', 
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.', 
        price: 8.99, 
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format',
        rating: 4.5,
        tags: ['sweet', 'coffee', 'italian']
    },

    // Beverages
    { 
        id: 16, 
        categoryId: 5, 
        name: 'Iced Caramel Macchiato', 
        description: 'Espresso with vanilla syrup, milk, and caramel drizzle over ice.', 
        price: 4.99, 
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format',
        rating: 4.4,
        tags: ['coffee', 'sweet', 'cold']
    },
    { 
        id: 17, 
        categoryId: 5, 
        name: 'Fresh Orange Juice', 
        description: 'Freshly squeezed orange juice, no pulp.', 
        price: 3.99, 
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&auto=format',
        rating: 4.2,
        tags: ['healthy', 'fresh', 'vitamin']
    },
    { 
        id: 18, 
        categoryId: 5, 
        name: 'Green Smoothie', 
        description: 'Spinach, banana, apple, and coconut water blend.', 
        price: 5.99, 
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop&auto=format',
        rating: 4.1,
        tags: ['healthy', 'green', 'vitamin']
    },

    // Snacks
    { 
        id: 19, 
        categoryId: 6, 
        name: 'French Fries', 
        description: 'Crispy golden fries served with ketchup.', 
        price: 3.99, 
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&auto=format',
        rating: 4.3,
        tags: ['crispy', 'classic', 'popular']
    },
    { 
        id: 20, 
        categoryId: 6, 
        name: 'Chicken Wings', 
        description: 'Buffalo chicken wings with celery and blue cheese dip.', 
        price: 8.99, 
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop&auto=format',
        rating: 4.6,
        tags: ['spicy', 'protein', 'popular']
    },
    { 
        id: 21, 
        categoryId: 6, 
        name: 'Nachos Supreme', 
        description: 'Tortilla chips with cheese, jalapeños, sour cream, and guacamole.', 
        price: 7.99, 
        image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop&auto=format',
        rating: 4.4,
        tags: ['spicy', 'cheese', 'sharing']
    },

    // Pizza
    { 
        id: 22, 
        categoryId: 7, 
        name: 'Margherita Pizza', 
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil.', 
        price: 12.99, 
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop&auto=format',
        rating: 4.5,
        tags: ['classic', 'vegetarian', 'italian']
    },
    { 
        id: 23, 
        categoryId: 7, 
        name: 'Pepperoni Pizza', 
        description: 'Traditional pizza with pepperoni and mozzarella cheese.', 
        price: 14.99, 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format',
        rating: 4.7,
        tags: ['popular', 'classic', 'meat']
    },
    { 
        id: 24, 
        categoryId: 7, 
        name: 'Supreme Pizza', 
        description: 'Loaded pizza with pepperoni, sausage, peppers, onions, and mushrooms.', 
        price: 17.99, 
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format',
        rating: 4.6,
        tags: ['hearty', 'loaded', 'popular']
    },

    // Asian
    { 
        id: 25, 
        categoryId: 8, 
        name: 'Chicken Teriyaki Bowl', 
        description: 'Grilled chicken with teriyaki sauce over steamed rice and vegetables.', 
        price: 13.99, 
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format',
        rating: 4.4,
        tags: ['healthy', 'protein', 'asian']
    },
    { 
        id: 26, 
        categoryId: 8, 
        name: 'Pad Thai', 
        description: 'Traditional Thai stir-fried noodles with shrimp, tofu, and peanuts.', 
        price: 15.99, 
        image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop&auto=format',
        rating: 4.5,
        tags: ['spicy', 'noodles', 'thai']
    },
    { 
        id: 27, 
        categoryId: 8, 
        name: 'Sushi Combo', 
        description: 'Assorted sushi rolls with wasabi, ginger, and soy sauce.', 
        price: 19.99, 
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format',
        rating: 4.8,
        tags: ['fresh', 'seafood', 'japanese']
    }
];

// Search and filter state
let currentFilters = {
    search: '',
    category: '',
    priceRange: '',
    tags: [],
    sort: 'name'
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    loginForm = document.getElementById('login-form');
    registerForm = document.getElementById('register-form');
    contactForm = document.getElementById('contact-form');
    showRegister = document.getElementById('show-register');
    showLogin = document.getElementById('show-login');
    profileForm = document.getElementById('profile-form');
    userProfileBtn = document.getElementById('user-profile');
    userOrdersBtn = document.getElementById('user-orders');
    logoutBtn = document.getElementById('logout-btn');
    
    loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
    orderHistoryModal = new bootstrap.Modal(document.getElementById('orderHistoryModal'));
    toast = new bootstrap.Toast(document.getElementById('toast'));
    toastMessage = document.getElementById('toast-message');
    
    // Initialize Firebase services
    if (window.firebaseServices) {
        ({ database, auth, storage, menuItemsRef, categoriesRef, ordersRef, usersRef } = window.firebaseServices);
    }
    
    // Load categories
    console.log('About to render categories...');
    renderCategories();
    
    // Load menu items
    console.log('About to render menu items...');
    renderMenuItems();
    
    // Update cart count
    updateCartCount();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize filters
    initializeFilters();
    
    // Set up search and filter functionality
    setupSearchAndFilters();
    
    // Initialize user interface
    updateUserInterface();
});

// Render categories
function renderCategories() {
    console.log('renderCategories function called');
    console.log('Categories data:', categories);
    
    const container = document.getElementById('categories-container');
    console.log('Container element:', container);
    
    if (!container) {
        console.error('Categories container not found');
        return;
    }
    
    container.innerHTML = ''; // Clear existing content
    
    // Add a test element first
    container.innerHTML = '<div class="col-12"><p class="text-center">Loading categories...</p></div>';
    
    setTimeout(() => {
        container.innerHTML = ''; // Clear loading message
        
        categories.forEach((category, index) => {
            console.log(`Rendering category ${index + 1}:`, category.name);
            
            const categoryElement = document.createElement('div');
            categoryElement.className = 'col-md-4 mb-4';
            categoryElement.innerHTML = `
                <div class="card h-100 category-card">
                    <img src="${category.image}" class="card-img-top" alt="${category.name}" 
                         style="height: 200px; object-fit: cover;" 
                         onerror="handleImageError(this)">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${category.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${category.description}</p>
                        <button class="btn btn-sm btn-outline-warning view-category" data-category-id="${category.id}">
                            <i class="fas fa-eye me-1"></i>View Items
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(categoryElement);
        });
        
        console.log('Categories rendered successfully:', categories.length);
    }, 100);
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    return stars;
}

// Render menu items
function renderMenuItems(items = menuItems) {
    const menuContainer = document.getElementById('menu-items');
    
    if (items.length === 0) {
        menuContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No items found</h4>
                <p class="text-muted">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    menuContainer.innerHTML = items.map(item => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card menu-item h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}" 
                     style="height: 200px; object-fit: cover;" 
                     onerror="handleImageError(this)">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text flex-grow-1">${item.description}</p>
                    <div class="mb-2">
                        ${generateStars(item.rating)}
                        <span class="text-muted ms-2">(${item.rating})</span>
                    </div>
                    <div class="mb-2">
                        ${item.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0 text-primary">$${item.price.toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="addToCart(${item.id})">
                            <i class="fas fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star text-warning"></i>';
    }
    
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star text-warning"></i>';
    }
    
    return starsHtml;
}

// Initialize filters
function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const filterTags = document.getElementById('filter-tags');
    
    // Populate category filter
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
    
    // Generate filter tags from all menu items
    const allTags = [...new Set(menuItems.flatMap(item => item.tags))];
    allTags.forEach(tag => {
        const tagElement = document.createElement('button');
        tagElement.className = 'btn btn-outline-secondary btn-sm filter-tag';
        tagElement.setAttribute('data-tag', tag);
        tagElement.innerHTML = `${tag} <i class="fas fa-times ms-1" style="display: none;"></i>`;
        filterTags.appendChild(tagElement);
    });
}

// Set up search and filter functionality
function setupSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        applyFilters();
    });
    
    // Category filter
    categoryFilter.addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        applyFilters();
    });
    
    // Price filter
    priceFilter.addEventListener('change', (e) => {
        currentFilters.priceRange = e.target.value;
        applyFilters();
    });
    
    // Sort filter
    sortFilter.addEventListener('change', (e) => {
        currentFilters.sort = e.target.value;
        applyFilters();
    });
    
    // Tag filters
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag') || e.target.parentElement.classList.contains('filter-tag')) {
            const tagButton = e.target.classList.contains('filter-tag') ? e.target : e.target.parentElement;
            const tag = tagButton.getAttribute('data-tag');
            
            if (currentFilters.tags.includes(tag)) {
                // Remove tag
                currentFilters.tags = currentFilters.tags.filter(t => t !== tag);
                tagButton.classList.remove('active');
                tagButton.querySelector('.fa-times').style.display = 'none';
            } else {
                // Add tag
                currentFilters.tags.push(tag);
                tagButton.classList.add('active');
                tagButton.querySelector('.fa-times').style.display = 'inline';
            }
            
            applyFilters();
        }
    });
}

// Filter categories based on search term
function filterCategories(searchTerm) {
    if (!searchTerm) {
        renderCategories(); // Show all categories
        return;
    }

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderFilteredCategories(filteredCategories);
}

// Render filtered categories
function renderFilteredCategories(filteredCategories) {
    const container = document.getElementById('categories-container');

    if (!container) {
        console.error('Categories container not found');
        return;
    }

    container.innerHTML = '';

    if (filteredCategories.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-4">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No matching categories found</h5>
                <p class="text-muted">Try a different search term</p>
            </div>
        `;
        return;
    }

    filteredCategories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'col-md-4 mb-4';
        categoryElement.innerHTML = `
            <div class="card h-100 category-card">
                <img src="${category.image}" class="card-img-top" alt="${category.name}" 
                     style="height: 200px; object-fit: cover;" 
                     onerror="handleImageError(this)">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${category.name}</h5>
                    <p class="card-text text-muted flex-grow-1">${category.description}</p>
                    <button class="btn btn-sm btn-outline-warning view-category" data-category-id="${category.id}">
                        <i class="fas fa-eye me-1"></i>View Items
                    </button>
                </div>
            </div>
        `;
        container.appendChild(categoryElement);
    });

    console.log('Filtered categories rendered:', filteredCategories.length);
}

// Apply filters to menu items
function applyFilters() {
    let filteredItems = [...menuItems];

    // Also filter categories when searching
    if (currentFilters.search) {
        filterCategories(currentFilters.search);
    } else {
        renderCategories(); // Show all categories when no search
    }

    // Search filter for menu items
    if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Category filter
    if (currentFilters.category) {
        filteredItems = filteredItems.filter(item => item.categoryId == currentFilters.category);
    }

    // Price range filter
    if (currentFilters.priceRange) {
        const [min, max] = currentFilters.priceRange.split('-').map(Number);
        if (max) {
            filteredItems = filteredItems.filter(item => item.price >= min && item.price <= max);
        } else {
            filteredItems = filteredItems.filter(item => item.price >= min);
        }
    }

    // Tag filter
    if (currentFilters.tags.length > 0) {
        filteredItems = filteredItems.filter(item =>
            currentFilters.tags.some(tag => item.tags.includes(tag))
        );
    }

    // Sort
    if (currentFilters.sort === 'price-low') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sort === 'price-high') {
        filteredItems.sort((a, b) => b.price - a.price);
    } else if (currentFilters.sort === 'rating') {
        filteredItems.sort((a, b) => b.rating - a.rating);
    } else {
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderMenuItems(filteredItems);
}

// Set up event listeners
function setupEventListeners() {
    // Show register form
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.hide();
            registerModal.show();
        });
    }
    
    // Show login form
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.hide();
            loginModal.show();
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // User profile button
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showUserProfile();
        });
    }
    
    // User orders button
    if (userOrdersBtn) {
        userOrdersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showOrderHistory();
        });
    }
    
    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
    
    // View category items
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-category')) {
            const categoryId = parseInt(e.target.getAttribute('data-category-id'));
            const category = categories.find(cat => cat.id === categoryId);
            const filteredItems = menuItems.filter(item => item.categoryId === categoryId);
            
            // Update current filter state
            currentFilters.category = categoryId;
            
            // Show loading state
            const menuContainer = document.getElementById('menu-items');
            if (menuContainer) {
                menuContainer.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-warning" role="status"></div></div>';
            }
            
            // Render filtered items with category title
            setTimeout(() => {
                renderMenuItems(filteredItems);
                
                // Add category header to menu section
                const menuSection = document.getElementById('menu');
                const menuTitle = menuSection.querySelector('h2');
                if (menuTitle && category) {
                    menuTitle.innerHTML = `<i class="fas fa-utensils me-2"></i>${category.name} Menu`;
                }
                
                // Show "Show All Items" button
                const showAllBtn = document.getElementById('show-all-items');
                if (showAllBtn) {
                    showAllBtn.style.display = 'inline-block';
                }
                
                // Show toast notification
                showToast(`Showing ${filteredItems.length} items from ${category.name}`, 'success');
                
                // Scroll to menu section
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
        
        // Show all items (reset category filter)
        if (e.target.id === 'show-all-items') {
            // Reset filter state
            currentFilters.category = '';
            
            // Reset menu title
            const menuSection = document.getElementById('menu');
            const menuTitle = menuSection.querySelector('h2');
            if (menuTitle) {
                menuTitle.innerHTML = `<i class="fas fa-utensils me-2"></i>Our Menu`;
            }
            
            // Hide the show all button
            e.target.style.display = 'none';
            
            // Render all menu items
            renderMenuItems(menuItems);
            
            // Show toast notification
            showToast('Showing all menu items', 'info');
        }
        
        // Add to cart
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
            addToCart(itemId);
        }
        
        // Remove from cart
        if (e.target.classList.contains('remove-from-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
            removeFromCart(itemId);
        }
        
        // Update quantity
        if (e.target.classList.contains('update-quantity')) {
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
            const newQuantity = parseInt(e.target.value);
            updateQuantity(itemId, newQuantity);
        }
        
        // Increment quantity
        if (e.target.classList.contains('increment')) {
            const input = e.target.parentElement.querySelector('.quantity-input');
            input.value = parseInt(input.value) + 1;
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
            updateQuantity(itemId, parseInt(input.value));
        }
        
        // Decrement quantity
        if (e.target.classList.contains('decrement')) {
            const input = e.target.parentElement.querySelector('.quantity-input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                const itemId = parseInt(e.target.getAttribute('data-item-id'));
                updateQuantity(itemId, parseInt(input.value));
            }
        }
    });
    
    // Show cart modal
    const cartBtn = document.querySelector('[data-bs-target="#cartModal"]');
    if (cartBtn) {
        cartBtn.addEventListener('click', renderCart);
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Order history button
    const orderHistoryBtn = document.getElementById('order-history');
    if (orderHistoryBtn) {
        orderHistoryBtn.addEventListener('click', showOrderHistory);
    }
}

// User state
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // In a real app, this would authenticate with Firebase
    // For demo purposes, we'll simulate login
    const user = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        phone: '',
        address: '',
        preferences: [],
        orders: []
    };
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    updateUserInterface();
    showToast('Login successful!', 'success');
    loginModal.hide();
    loginForm.reset();
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'danger');
        return;
    }
    
    // In a real app, this would create a new user in Firebase
    const user = {
        id: Date.now(),
        email: email,
        name: name,
        phone: '',
        address: '',
        preferences: [],
        orders: []
    };
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    updateUserInterface();
    showToast('Registration successful!', 'success');
    registerModal.hide();
    registerForm.reset();
}

// Update user interface based on login state
function updateUserInterface() {
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    
    if (currentUser) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'block';
        userName.textContent = currentUser.name;
        loadUserProfile();
    } else {
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showToast('Logged out successfully!', 'info');
}

// Load user profile data
function loadUserProfile() {
    if (!currentUser) return;
    
    document.getElementById('profile-name').value = currentUser.name || '';
    document.getElementById('profile-email').value = currentUser.email || '';
    document.getElementById('profile-phone').value = currentUser.phone || '';
    document.getElementById('profile-address').value = currentUser.address || '';
    
    // Load preferences
    const preferences = currentUser.preferences || [];
    document.getElementById('pref-vegetarian').checked = preferences.includes('vegetarian');
    document.getElementById('pref-vegan').checked = preferences.includes('vegan');
    document.getElementById('pref-glutenfree').checked = preferences.includes('glutenfree');
    document.getElementById('pref-spicy').checked = preferences.includes('spicy');
    document.getElementById('pref-healthy').checked = preferences.includes('healthy');
    document.getElementById('pref-seafood').checked = preferences.includes('seafood');
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    if (!currentUser) return;
    
    // Update user data
    currentUser.name = document.getElementById('profile-name').value;
    currentUser.email = document.getElementById('profile-email').value;
    currentUser.phone = document.getElementById('profile-phone').value;
    currentUser.address = document.getElementById('profile-address').value;
    
    // Update preferences
    const preferences = [];
    if (document.getElementById('pref-vegetarian').checked) preferences.push('vegetarian');
    if (document.getElementById('pref-vegan').checked) preferences.push('vegan');
    if (document.getElementById('pref-glutenfree').checked) preferences.push('glutenfree');
    if (document.getElementById('pref-spicy').checked) preferences.push('spicy');
    if (document.getElementById('pref-healthy').checked) preferences.push('healthy');
    if (document.getElementById('pref-seafood').checked) preferences.push('seafood');
    
    currentUser.preferences = preferences;
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    document.getElementById('user-name').textContent = currentUser.name;
    
    showToast('Profile updated successfully!', 'success');
    document.getElementById('profileModal').querySelector('.btn-close').click();
}

// Show order history
function showOrderHistory() {
    const orderHistoryModal = new bootstrap.Modal(document.getElementById('orderHistoryModal'));
    const orderHistoryContent = document.getElementById('order-history-content');
    
    if (!currentUser || !currentUser.orders || currentUser.orders.length === 0) {
        orderHistoryContent.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-receipt fa-3x mb-3 text-muted"></i>
                <p class="text-muted">No orders found</p>
            </div>
        `;
    } else {
        let ordersHtml = '';
        currentUser.orders.forEach(order => {
            ordersHtml += `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="card-title mb-0">Order #${order.id}</h6>
                            <span class="badge bg-success">${order.status}</span>
                        </div>
                        <p class="text-muted mb-2">${new Date(order.date).toLocaleDateString()}</p>
                        <p class="mb-2"><strong>Total: $${order.total.toFixed(2)}</strong></p>
                        <div class="order-items">
                            ${order.items.map(item => `
                                <small class="d-block">${item.quantity}x ${item.name}</small>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        orderHistoryContent.innerHTML = ordersHtml;
    }
    
    orderHistoryModal.show();
}

// Handle contact form submission
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real app, this would send the message to a server
    // For demo purposes, we'll just show a success message
    showToast('Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
}

// Add item to cart
function addToCart(itemId) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const menuItem = menuItems.find(item => item.id === itemId);
        if (menuItem) {
            cart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                image: menuItem.image,
                quantity: 1
            });
        }
    }
    
    updateCart();
    showToast('Item added to cart!', 'success');
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showToast('Item removed from cart!', 'danger');
}

// Update item quantity in cart
function updateQuantity(itemId, quantity) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        if (quantity < 1) {
            removeFromCart(itemId);
        } else {
            cartItem.quantity = quantity;
            updateCart();
        }
    }
}

// Update cart in local storage and UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // If cart modal is open, update it
    if (document.querySelector('.modal.show') && document.querySelector('.modal.show').id === 'cartModal') {
        renderCart();
    }
}

// Image error handling
function handleImageError(img) {
    img.src = 'https://via.placeholder.com/400x300/f8f9fa/6c757d?text=Food+Image';
    img.onerror = null; // Prevent infinite loop
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Render menu items
function renderMenuItems(items = menuItems) {
    const menuContainer = document.getElementById('menu-items');
    
    if (items.length === 0) {
        menuContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No items found</h4>
                <p class="text-muted">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    menuContainer.innerHTML = items.map(item => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card menu-item h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}" 
                     style="height: 200px; object-fit: cover;" 
                     onerror="handleImageError(this)">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text flex-grow-1">${item.description}</p>
                    <div class="mb-2">
                        ${generateStars(item.rating)}
                        <span class="text-muted ms-2">(${item.rating})</span>
                    </div>
                    <div class="mb-2">
                        ${item.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0 text-primary">$${item.price.toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="addToCart(${item.id})">
                            <i class="fas fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render cart items
function renderCart() {

    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                <p class="text-muted">Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let itemsHtml = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHtml += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="handleImageError(this)">
                <div class="cart-item-details">
                    <h6 class="cart-item-title">${item.name}</h6>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="decrement" data-item-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-item-id="${item.id}" readonly>
                        <button class="increment" data-item-id="${item.id}">+</button>
                        <button class="btn btn-link text-danger remove-from-cart" data-item-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="ms-auto text-end">
                    <div class="fw-bold">$${itemTotal.toFixed(2)}</div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHtml;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }
    
    if (!currentUser) {
        showToast('Please login to place an order!', 'warning');
        cartModal.hide();
        loginModal.show();
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        status: 'Confirmed',
        deliveryAddress: currentUser.address || 'No address provided'
    };
    
    // Add order to user history
    if (!currentUser.orders) {
        currentUser.orders = [];
    }
    currentUser.orders.unshift(order); // Add to beginning of array
    
    // Save updated user data
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // In a real app, this would also save to Firebase
    // if (ordersRef) {
    //     ordersRef.child(currentUser.id).push(order);
    // }
    
    showToast('Order placed successfully! Thank you for your purchase.', 'success');
    cart = [];
    updateCart();
    cartModal.hide();
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showToast('Please login first', 'danger');
        return;
    }
    
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const phone = document.getElementById('profile-phone').value;
    const address = document.getElementById('profile-address').value;
    
    // Get food preferences
    const preferences = [];
    if (document.getElementById('pref-vegetarian').checked) preferences.push('vegetarian');
    if (document.getElementById('pref-vegan').checked) preferences.push('vegan');
    if (document.getElementById('pref-glutenfree').checked) preferences.push('gluten-free');
    if (document.getElementById('pref-spicy').checked) preferences.push('spicy');
    if (document.getElementById('pref-lowcarb').checked) preferences.push('low-carb');
    if (document.getElementById('pref-keto').checked) preferences.push('keto');
    
    // Update user profile
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.address = address;
    currentUser.preferences = preferences;
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showToast('Profile updated successfully!', 'success');
    profileModal.hide();
    updateUserInterface();
}

// Show user profile
function showUserProfile() {
    if (!currentUser) {
        showToast('Please login first', 'danger');
        return;
    }
    
    // Populate form with current user data
    document.getElementById('profile-name').value = currentUser.name || '';
    document.getElementById('profile-email').value = currentUser.email || '';
    document.getElementById('profile-phone').value = currentUser.phone || '';
    document.getElementById('profile-address').value = currentUser.address || '';
    
    // Set preferences
    const preferences = currentUser.preferences || [];
    document.getElementById('pref-vegetarian').checked = preferences.includes('vegetarian');
    document.getElementById('pref-vegan').checked = preferences.includes('vegan');
    document.getElementById('pref-glutenfree').checked = preferences.includes('gluten-free');
    document.getElementById('pref-spicy').checked = preferences.includes('spicy');
    document.getElementById('pref-lowcarb').checked = preferences.includes('low-carb');
    document.getElementById('pref-keto').checked = preferences.includes('keto');
    
    profileModal.show();
}

// Show order history
function showOrderHistory() {
    if (!currentUser) {
        showToast('Please login first', 'danger');
        return;
    }
    
    const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];
    const orderHistoryContainer = document.getElementById('order-history-list');
    
    if (orders.length === 0) {
        orderHistoryContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-receipt fa-3x mb-3 text-muted"></i>
                <h5 class="text-muted">No orders yet</h5>
                <p class="text-muted">Start shopping to see your order history here!</p>
            </div>
        `;
    } else {
        orderHistoryContainer.innerHTML = orders.map(order => `
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">Order #${order.id}</h6>
                    <small class="text-muted">${new Date(order.date).toLocaleDateString()}</small>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <h6>Items:</h6>
                            <ul class="list-unstyled">
                                ${order.items.map(item => `
                                    <li class="d-flex justify-content-between">
                                        <span>${item.name} x${item.quantity}</span>
                                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="col-md-4 text-end">
                            <h5 class="text-primary">Total: $${order.total.toFixed(2)}</h5>
                            <span class="badge bg-success">Delivered</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    orderHistoryModal.show();
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    cart = [];
    localStorage.removeItem('cart');
    updateUserInterface();
    updateCartCount();
    showToast('Logged out successfully', 'success');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Set message and type
    toastMessage.textContent = message;
    
    // Remove existing type classes
    toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
    
    // Add the appropriate type class
    if (type === 'success') {
        toast.classList.add('bg-success');
    } else if (type === 'danger') {
        toast.classList.add('bg-danger');
    } else if (type === 'warning') {
        toast.classList.add('bg-warning');
    } else {
        toast.classList.add('bg-info');
    }
    
    // Show the toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
