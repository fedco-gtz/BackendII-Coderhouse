const renderProducts = (data) => {
    const containerProducts = document.getElementById("containerProducts");
    containerProducts.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `  
        
            <h4 class="product-id">ID: ${item._id}</h4>
            <h4 class="product-id">Código: ${item.code}</h4>
            <h1 class="product-title">${item.title}</h1>
            <h2 class="product-description">${item.description}</h2>
            <h2 class="product-stock">Stock disponible: ${item.stock} | Categoría: ${item.category}</h2>
            <p class="product-price">Precio: $${item.price}</p>
            <button class="trash">ELIMINAR</button>
        `;
        containerProducts.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            removeProduct(item._id);
        });
    });
};

document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct();
    cleanForm();
});

function cleanForm() {
    const form = document.getElementById("formAddProduct");
    form.reset();
}