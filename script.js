// بيانات التطبيق
let products = JSON.parse(localStorage.getItem('products')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const ADMIN_PASS = "nadi2023";

// وظائف العرض
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    if(sectionId === 'products') renderProducts();
    if(sectionId === 'cart') renderCart();
    if(sectionId === 'admin') document.querySelector('.admin-content').style.display = 'none';
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.background = type === 'error' ? '#ff4757' : '#2ed573';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// إدارة المنتجات
function renderProducts() {
    const container = document.querySelector('.products-grid');
    container.innerHTML = products.map((product, index) => `
        <div class="product-card animate__animated animate__fadeIn">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price} دينار</p>
            <button class="add-to-cart-btn" onclick="addToCart(${index})">
                <i class="fas fa-cart-plus"></i> إضافة للسلة
            </button>
        </div>
    `).join('');
}

// إدارة السلة
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.querySelector('.total-price span').textContent = total;
}

function renderCart() {
    const container = document.querySelector('.cart-items');
    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item animate__animated animate__fadeIn">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.price} دينار</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    updateTotal();
}

function addToCart(index) {
    cart.push(products[index]);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    showNotification('تمت إضافة المنتج إلى السلة');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    showNotification('تم حذف المنتج من السلة', 'error');
}

function checkout() {
    if(cart.length === 0) return showNotification('السلة فارغة!', 'error');
    
    const payment = prompt('اختر طريقة الدفع (نقدي / بطاقة / رصيد مدار جديد ليبيا):');
    if(payment) {
        if (payment === "رصيد مدار جديد ليبيا") {
            const phoneNumber = prompt("يرجى إدخال رقم الهاتف المرتبط برصيد مدار جديد ليبيا:");
            if (phoneNumber) {
                cart = [];
                localStorage.removeItem('cart');
                renderCart();
                showNotification(`تم الدفع باستخدام رصيد مدار جديد ليبيا للرقم ${phoneNumber} بنجاح!`);
            } else {
                showNotification('لم يتم إدخال رقم الهاتف', 'error');
            }
        } else {
            cart = [];
            localStorage.removeItem('cart');
            renderCart();
            showNotification(`تم الدفع باستخدام ${payment} بنجاح!`);
        }
    }
}

// لوحة التحكم
function loginAdmin() {
    const password = document.getElementById('admin-pass').value;
    if(password === ADMIN_PASS) {
        document.querySelector('.admin-content').style.display = 'block';
        document.querySelector('.auth-box').style.display = 'none';
        renderAdminProducts();
        showNotification('مرحبا بك في لوحة التحكم');
    } else {
        showNotification('كلمة المرور خاطئة!', 'error');
    }
}

function addProduct() {
    const newProduct = {
        name: document.getElementById('product-name').value,
        price: Number(document.getElementById('product-price').value),
        img: document.getElementById('product-img').value
    };
    
    if(!newProduct.name || !newProduct.price || !newProduct.img) {
        return showNotification('يرجى ملء جميع الحقول', 'error');
    }
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
    renderAdminProducts();
    showNotification('تمت إضافة المنتج بنجاح');
}

function renderAdminProducts() {
    const container = document.querySelector('.admin-products-grid');
    container.innerHTML = products.map((product, index) => `
        <div class="product-card admin-product">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} دينار</p>
            <button class="delete-btn" onclick="deleteProduct(${index})">
                <i class="fas fa-trash"></i> حذف
            </button>
        </div>
    `).join('');
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
    renderAdminProducts();
    showNotification('تم حذف المنتج', 'error');
}

// التهيئة الأولية
showSection('home');