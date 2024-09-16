const renderProducts = (data) => {
    const containerProducts = document.getElementById("containerProducts");
    containerProducts.innerHTML = "";
};

document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct();
    cleanForm();
});

function cleanForm() {
    const form = document.getElementById("formAddProduct");
    form.reset();
}

document.getElementById('sortPrice').addEventListener('change', function () {
    const sortOrder = this.value;
    const currentUrl = new URL(window.location.href);
    const page = currentUrl.searchParams.get('page') || 1;
    currentUrl.searchParams.set('sort', sortOrder);
    currentUrl.searchParams.set('page', page);
    window.location.href = currentUrl.toString();
});

window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get('sort');
    if (sortParam) {
        document.getElementById('sortPrice').value = sortParam;
    }
});
