// S - Single Responsibility Principle
// Esta classe tem apenas a responsabilidade de manipular o DOM
class DOMService {
    static updateCartCount(count) {
        const cartCount = document.getElementById("cart-count");
        if (cartCount) {
            cartCount.textContent = count;
        }
    }

    static updateCartModal(items, total) {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        if (!cartItemsContainer || !cartTotal) return;

        cartItemsContainer.innerHTML = "";

        items.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.className = "flex justify-between items-center border-b-2 border-gray-400 py-2";
            
            cartItemElement.innerHTML = `
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium">R$ ${item.getTotalPrice().toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="bg-red-500 text-white px-2 py-1 rounded decrease-btn" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="bg-green-500 text-white px-2 py-1 rounded increase-btn" data-name="${item.name}">+</button>
                    <button class="bg-red-600 text-white px-2 py-1 rounded remove-btn" data-name="${item.name}">Remover</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    static showModal() {
        const modal = document.getElementById("cart-modal");
        if (modal) {
            modal.classList.remove("hidden");
            modal.classList.add("flex");
        }
    }

    static hideModal() {
        const modal = document.getElementById("cart-modal");
        if (modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }
    }

    static showAddressError() {
        const addressWarn = document.getElementById("address-warn");
        if (addressWarn) {
            addressWarn.classList.remove("hidden");
        }
    }

    static hideAddressError() {
        const addressWarn = document.getElementById("address-warn");
        if (addressWarn) {
            addressWarn.classList.add("hidden");
        }
    }

    static getAddressValue() {
        const addressInput = document.getElementById("address");
        return addressInput ? addressInput.value.trim() : "";
    }

    static clearAddressInput() {
        const addressInput = document.getElementById("address");
        if (addressInput) {
            addressInput.value = "";
        }
    }

    static checkRestaurantOpen() {
        const dateSpan = document.getElementById("date-span");
        const now = new Date();
        const hour = now.getHours();
        const isOpen = hour >= 10 && hour < 22;
        
        if (dateSpan) {
            if (isOpen) {
                dateSpan.classList.remove("bg-red-500");
                dateSpan.classList.add("bg-green-600");
            } else {
                dateSpan.classList.remove("bg-green-600");
                dateSpan.classList.add("bg-red-500");
            }
        }
        
        return isOpen;
    }
}
