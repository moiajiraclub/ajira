// Handle form submission for posting products/services
document.getElementById('postForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitBtn = document.getElementById('postNowBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Show loading state
    submitBtn.disabled = true;
    loadingSpinner.classList.remove('hidden');
    
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Success
            alert('Your product/service has been posted successfully!');
            this.reset();
            window.location.href = 'serv.html';
        } else {
            // Error
            alert('Error: ' + result.error);
        }
    } catch (error) {
        alert('Error posting your product/service. Please try again.');
    } finally {
        submitBtn.disabled = false;
        loadingSpinner.classList.add('hidden');
    }
});

// Preview images before upload
document.querySelector('input[name="images"]').addEventListener('change', function(e) {
    const files = e.target.files;
    const previewContainer = document.getElementById('imagePreview');
    
    previewContainer.innerHTML = '';
    
    if (files.length > 5) {
        alert('Maximum 5 images allowed');
        this.value = '';
        return;
    }
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-20 h-20 object-cover rounded mr-2 mb-2';
            previewContainer.appendChild(img);
        };
        
        reader.readAsDataURL(file);
    }
});

// Dynamic category suggestions based on type
document.querySelector('select[name="type"]').addEventListener('change', function() {
    const type = this.value;
    const categorySelect = document.querySelector('select[name="category"]');
    
    // Clear existing options
    categorySelect.innerHTML = '<option value="">Select category</option>';
    
    const categories = {
        'product': [
            'Digital Products', 'Physical Products', 'E-books', 'Courses', 'Templates',
            'Software', 'Art & Crafts', 'Electronics', 'Fashion', 'Home & Garden'
        ],
        'service': [
            'Web Development', 'Graphic Design', 'Digital Marketing', 'Content Writing',
            'Photography', 'Programming', 'Business Services', 'Consulting', 'Training', 'Other'
        ]
    };
    
    if (type && categories[type]) {
        categories[type].forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
});
