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
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;

        // Exibe o toast para a adição de uma unidade
        Toastify({
            text: `Uma unidade de "${name}" foi adicionada ao carrinho.`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#4CAF50", // Cor do toast
            },
        }).showToast();

        updateCartModal();
        return;
    }

    cart.push({
        name,
        price,
        quantity: 1,
    });

    // Exibe o toast para a adição do item ao carrinho
    Toastify({
        text: `"${name}" foi adicionado ao carrinho.`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#4CAF50", // Cor do toast
        },
    }).showToast();

    updateCartModal();
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

            // Exibe o toast para a remoção de uma unidade
            Toastify({
                text: `Uma unidade de "${item.name}" foi removida do carrinho.`,
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#f59e0b", // Cor do toast
                },
            }).showToast();

            return;
        }

        // Remove o item completamente do carrinho
        cart.splice(index, 1);
        updateCartModal();

        // Exibe o toast para a remoção total do item
        Toastify({
            text: `"${item.name}" foi removido completamente do carrinho.`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444", // Cor do toast
            },
        }).showToast();
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
    if (!isOpen) {
        Toastify({
            text: "Ops, o restaurante está fechado.",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444", // Cor do toast
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) {
        Toastify({
            text: "Seu carrinho está vazio.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#f59e0b", // Cor do toast
            },
        }).showToast();
        return;
    }

    if (addressInput.value.trim() === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        Toastify({
            text: "Por favor, insira um endereço válido.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#f59e0b", // Cor do toast
            },
        }).showToast();
        return;
    }

    // Montando os itens do carrinho com quebras de linha
    const cartItems = cart.map((item) => {
        return `${item.name} *Quantidade:* (${item.quantity}) *Preço:* R$${item.price.toFixed(2)}%0D%0A`;
    }).join("");

    // Calculando o total do pedido
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const phone = "5584996563819"; // Número de telefone para envio
    const fullMessage = `*Pedido:*%0D%0A${cartItems}%0D%0A*Total:* R$${total.toFixed(2)}%0D%0A*Endereço:* ${encodeURIComponent(addressInput.value.trim())}`;

    // Abrindo o WhatsApp com a mensagem
    window.open(`https://wa.me/${phone}?text=${fullMessage}`, "_blank");

    // Limpando o carrinho após o envio
    cart.length = 0;
    updateCartModal();

    addressInput.value = ""; // Limpa o campo de endereço
    cartModal.style.display = "none";
    

    Toastify({
        text: "Pedido enviado com sucesso!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#4CAF50", // Cor do toast
        },
    }).showToast();
});

function checkRestaurantOpen() {
    const data = new Date;
    const hora = data.getHours();
    return hora >= 10 && hora < 22;
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
