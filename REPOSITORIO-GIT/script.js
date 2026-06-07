// ================================================
// MOA ACCESORIOS - JavaScript Funcional
// ================================================

// Array para almacenar productos (persiste en sessionStorage)
let products = [];

// Función para cargar productos del almacenamiento
function loadProducts() {
    const stored = localStorage.getItem('moaProducts');
    if (stored) {
        products = JSON.parse(stored);
        renderProducts();
    } else {
        // Productos de demostración iniciales
        products = [
            {
                id: 1,
                name: 'Collar de Perlas Elegante',
                category: 'Collares',
                price: 89.99,
                description: 'Collar de perlas auténticas con cierre de oro. Perfecto para ocasiones especiales.',
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop'
            },
            {
                id: 2,
                name: 'Pulsera de Diamantes',
                category: 'Pulseras',
                price: 149.99,
                description: 'Pulsera de lujo con cristales Swarovski. Brilla con elegancia.',
                image: 'https://images.unsplash.com/photo-1599643478519-b61eaf0b7b90?w=500&h=500&fit=crop'
            },
            {
                id: 3,
                name: 'Anillo de Oro Rosado',
                category: 'Anillos',
                price: 79.99,
                description: 'Anillo minimalista con acabado en oro rosado. Diseño moderno y atemporal.',
                image: 'https://images.unsplash.com/photo-1599643478520-c3b0d4c9b9f0?w=500&h=500&fit=crop'
            },
            {
                id: 4,
                name: 'Aretes de Gota',
                category: 'Aretes',
                price: 59.99,
                description: 'Aretes en forma de gota con detalles plateados. Elegantes y sofisticados.',
                image: 'https://images.unsplash.com/photo-1599643478521-b3d0a8b0c0f0?w=500&h=500&fit=crop'
            }
        ];
        saveProducts();
        renderProducts();
    }
}

// Función para guardar productos
function saveProducts() {
    localStorage.setItem('moaProducts', JSON.stringify(products));
}

// Función para renderizar productos en la galería
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #999;">No hay artículos aún. ¡Agrega el tuyo!</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Función para agregar producto
function addProduct(event) {
    event.preventDefault();

    const form = event.target;
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDesc').value.trim();
    const image = document.getElementById('productImage').value.trim();

    // Validación
    if (!name || !category || !price || !description || !image) {
        showMessage('Por favor, completa todos los campos.', 'error');
        return;
    }

    if (price <= 0) {
        showMessage('El precio debe ser mayor a 0.', 'error');
        return;
    }

    // Crear nuevo producto
    const newProduct = {
        id: Date.now(),
        name,
        category,
        price,
        description,
        image
    };

    // Agregar al array
    products.unshift(newProduct);
    saveProducts();
    renderProducts();

    // Limpiar formulario
    form.reset();
    showMessage('¡Artículo agregado exitosamente! 🎉', 'success');

    // Scroll a la galería
    setTimeout(() => {
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// Función para eliminar producto
function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProducts();
        showMessage('Artículo eliminado. 🗑️', 'success');
    }
}

// Función para mostrar mensajes
function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 90vw;
    `;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const form = document.getElementById('productForm');
    if (form) {
        form.addEventListener('submit', addProduct);
    }

    // Animación suave al hacer scroll
    observerIntersection();
});

// Observador de intersección para animaciones
function observerIntersection() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Función para buscar/filtrar productos (opcional)
function searchProducts(query) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );

    const grid = document.getElementById('productsGrid');
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #999;">No se encontraron artículos.</p>';
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Función para exportar datos
function exportData() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'moa-accesorios-articulos.json';
    link.click();
}

// Función para limpiar todos los productos
function clearAllProducts() {
    if (confirm('¿Estás SEGURO de que quieres eliminar TODOS los artículos? Esta acción no se puede deshacer.')) {
        products = [];
        saveProducts();
        renderProducts();
        showMessage('Todos los artículos han sido eliminados. 🗑️', 'success');
    }
}

// Función para añadir estilo dinámico
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .success-message {
            animation: slideIn 0.3s ease;
        }

        .error-message {
            animation: slideIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

addDynamicStyles();

// ================================================
// Funciones de utilidad adicionales
// ================================================

// Obtener productos por categoría
function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

// Obtener producto por ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Ordenar productos por precio
function sortByPrice(order = 'asc') {
    return [...products].sort((a, b) => 
        order === 'asc' ? a.price - b.price : b.price - a.price
    );
}

// Obtener promedio de precios
function getAveragePrice() {
    if (products.length === 0) return 0;
    return (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2);
}

// Consola de utilidades
console.log('%c MOA ACCESORIOS - Bisutería Premium 💎', 'color: #d4af37; font-size: 16px; font-weight: bold;');
console.log('%c Funciones disponibles:', 'color: #c084dc; font-weight: bold;');
console.log('getProductsByCategory("Collares")');
console.log('getProductById(productId)');
console.log('sortByPrice("asc" o "desc")');
console.log('getAveragePrice()');
console.log('exportData()');
console.log('clearAllProducts()');
