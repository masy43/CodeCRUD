const menuItems = document.querySelectorAll("li");
const pages = document.querySelectorAll(".page");
const logo = document.querySelector(".logo");
const themeToggle = document.getElementById("theme-toggle");
const mainContent = document.querySelector(".main-content");
const sidebar = document.querySelector(".sidebar");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(el => el.classList.remove("active"));
        item.classList.add("active");

        const pageId = item.getAttribute("data-page");
        pages.forEach(page => page.classList.add("hidden"));
        document.getElementById(pageId).classList.remove("hidden");
    });
});

logo.addEventListener("click", () => {
    menuItems.forEach(item => item.classList.remove("active"));
    logo.classList.add("active");
    pages.forEach(page => page.classList.add("hidden"));
    const currentPage = document.querySelector(".page:not(.hidden)");
    if (currentPage.id !== "products") {
        document.getElementById("home").classList.remove("hidden");
    }
});

themeToggle.addEventListener("click", () => {
    if (mainContent.classList.contains("dark-mode")) {
        mainContent.classList.remove("dark-mode");
        mainContent.classList.add("light-mode");
        sidebar.classList.remove("dark-mode");
        sidebar.classList.add("light-mode");
        themeToggle.classList.remove("fa-sun");
        themeToggle.classList.add("fa-moon");
    } else {
        mainContent.classList.remove("light-mode");
        mainContent.classList.add("dark-mode");
        sidebar.classList.remove("light-mode");
        sidebar.classList.add("dark-mode");
        themeToggle.classList.remove("fa-moon");
        themeToggle.classList.add("fa-sun");
    }
});

// Modal-related functionality
const addProductIcon = document.querySelector(".products-operations svg");
const addProductModal = document.getElementById("add-product-modal");
const closeModalButton = document.getElementById("close-modal");
const closeIcon = document.querySelector(".modal-header .fa-xmark");
const modalBackdrop = document.querySelector(".modal-backdrop");

function openModal() {
    addProductModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
}

function closeModal() {
    addProductModal.classList.add("hidden");
    modalBackdrop.classList.add("hidden");
}

addProductIcon.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
closeIcon.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !addProductModal.classList.contains("hidden")) {
        closeModal();
    }
});

// Adding products
const addProductButton = document.querySelector(".save-button");
const productsList = document.querySelector(".products-list");
let productIdCounter = 1;

addProductButton.addEventListener("click", () => {
    const productName = document.querySelector('#product-name + input').value.trim();
    const productPrice = parseFloat(document.querySelector('#product-price + input').value) || 0;
    const productTaxies = parseFloat(document.querySelector('#product-taxies + input').value) || 0;
    const productAds = parseFloat(document.querySelector('#product-ads + input').value) || 0;
    const productQuantity = parseInt(document.querySelector('#product-quantity + input').value) || 1;
    const productCategory = document.querySelector('#product-category + input').value.trim();
    const total = (productPrice + productTaxies + productAds) * productQuantity;

    if (!productName || !productCategory) {
        alert("Please enter both product name and category.");
        return;
    }

    // Clear "NO PRODUCTS YET!" message
    if (productsList.textContent.trim() === "NO PRODUCTS YET!") {
        productsList.innerHTML = "";
    }

    // Create product item
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
        <div><strong>Product ID:</strong> ${productIdCounter}</div>
        <div><strong>Name:</strong> ${productName}</div>
        <div><strong>Price:</strong> $${productPrice.toFixed(2)}</div>
        <div><strong>Taxes:</strong> $${productTaxies.toFixed(2)}</div>
        <div><strong>Ads:</strong> $${productAds.toFixed(2)}</div>
        <div><strong>Quantity:</strong> ${productQuantity}</div>
        <div><strong>Category:</strong> ${productCategory}</div>
        <div><strong>Total:</strong> $${total.toFixed(2)}</div>
    `;
    productsList.appendChild(productElement);

    productIdCounter++;

    // Show the products-list page if hidden
    const productsPage = document.getElementById("products");
    if (productsPage.classList.contains("hidden")) {
        productsPage.classList.remove("hidden");
    }

    // Reset modal inputs
    document.querySelectorAll(".modal-body input").forEach(input => input.value = "");
    document.querySelector(".total").textContent = "Total:"; // Reset total label
    closeModal();
});

// Show products in a table
function showProducts() {
    const tableBody = document.querySelector('.totable');
    tableBody.innerHTML = dataProduct.map((product, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.count}</td>
            <td>${product.category}</td>
            <td>${product.notes}</td>
            <td><button onclick="updateProduct(${index})">Update</button></td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>
    `).join('');
}
