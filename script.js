const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

//abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
})

//fechar o modal

cartModal.addEventListener("click", function (event) {
    // console.log(event)
    if (event.target === cartModal || event.target === closeModalBtn) {
        cartModal.style.display = "none"
    }
})

menu.addEventListener("click", function (event) {
    //console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)
        //adicionar no carrinho
    }
})

//funcao para adicionar no carrinho

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name == name)

    if (existingItem) {

        existingItem.quantity += 1;

        return;
    }



    cart.push({
        name,
        price,
        quantity: 1,
    })

    updateCartModal()

}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = ` 
        <div class="flex items-center justify-between"> 
            <div> 
                <p class="font-bold">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
            
        </div>
        `
        total += item.price * item.quantity;


        cartItemsContainer.appendChild(cartItemElement);
    })
    // não esta errado fazer o uso dessa forma, porem, favorece perda de desempenho e fragilidades
    //cartTotal.innerHTML = `R$ ${total.toFixed(2)}` 

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }


})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }

}

addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

//finalizar pedido 
checkoutBtn.addEventListener("click", function () {

       const isOpen = checkRestaurantOpen();
       if(!isOpen){
        Toastify({
            text: "Ops o restaurante está fechado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
            onClick: function(){} // Callback after click
          }).showToast();

          return;
    }

    if (cart.length === 0) return;

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return; // adicionado para evitar continuar sem endereço
    }

    // Montando os itens do carrinho com quebras de linha
    const cartItems = cart.map((item) => {
        return `${item.name} *quantidade:* (${item.quantity}) *Preço:* R$${item.price}%0D%0A`;
    }).join("");

    //const message = encodeURIComponent(cartItems);

    const phone = "";
    const fullMessage = `${cartItems}%0D%0A *Endereço:* ${encodeURIComponent(addressInput.value)}`;

    window.open(`https://wa.me/${phone}?text=${fullMessage}`, "_blank");

    cart.length = [];
    updateCartModal();
});

function checkRestaurantOpen() {
    const data = new Date;
    const hora = data.getHours;
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.add("bg-red-500");
    spanItem.classList.remove("bg-green-600");
}
