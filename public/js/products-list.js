// Display products/services on browse page
async function loadProducts() {
    const productsContainer = document.getElementById('productsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    try {
        loadingSpinner.classList.remove('hidden');
        
        // Get query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const params = new URLSearchParams();
        
        if (urlParams.get('type')) params.append('type', urlParams.get('type'));
        if (urlParams.get('category')) params.append('category', urlParams.get('category'));
        if (urlParams.get('search')) params.append('search', urlParams.get('search'));
        
        const response = await fetch(`/api/products?${params}`);
        const products = await response.json();
        
        loadingSpinner.classList.add('hidden');
        
        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">No products/services found.</p>';
            return;
        }
        
        productsContainer.innerHTML = products.map(product => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                ${product.images && product.images.length > 0 ? 
                    `<img src="/uploads/${product.images[0]}" alt="${product.title}" class="w-full h-48 object-cover">` : 
                    `<div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span class="text-gray-500">No Image</span>
                    </div>`
                }
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full ${product.type === 'product' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                            ${product.type}
                        </span>
                        <span class="text-sm text-gray-500">${product.category}</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${product.title}</h3>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-bold text-green-600">KES ${product.price.toLocaleString()}</span>
                        <span class="text-sm text-gray-500">${product.location}</span>
                    </div>
                    <div class="mt-3 pt-3 border-t">
                        <p class="text-sm text-gray-600">
                            <strong>Contact:</strong> ${product.contactInfo.name}<br>
                            <strong>Email:</strong> ${product.contactInfo.email}
                            ${product.contactInfo.phone ? `<br><strong>Phone:</strong> ${product.contactInfo.phone}` : ''}
                            ${product.contactInfo.whatsapp ? `<br><strong>WhatsApp:</strong> ${product.contactInfo.whatsapp}` : ''}
                        </p>
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading products:', error);
        loadingSpinner.classList.add('hidden');
        productsContainer.innerHTML = '<p class="text-center text-red-500 py-8">Error loading products/services.</p>';
    }
}

// Search functionality
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        window.location.href = `browse-products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Filter functionality
function filterProducts() {
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    const params = new URLSearchParams();
    if (typeFilter) params.append('type', typeFilter);
    if (categoryFilter) params.append('category', categoryFilter);
    
    window.location.href = `browse-products.html?${params.toString()}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('browse-products.html')) {
        loadProducts();
        
        // Set filter values from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const typeFilter = document.getElementById('typeFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        
        if (urlParams.get('type')) {
            typeFilter.value = urlParams.get('type');
        }
        if (urlParams.get('category')) {
            categoryFilter.value = urlParams.get('category');
        }
    }
});
