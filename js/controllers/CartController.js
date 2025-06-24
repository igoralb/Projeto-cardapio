// D - Dependency Inversion Principle
// Esta classe depende de abstrações (serviços injetados) e não de implementações concretas
class CartController {
    constructor(cartService, whatsAppService, notificationService) {
        this.cartService = cartService;
        this.whatsAppService = whatsAppService;
        this.notificationService = notificationService;
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.updateCartDisplay();
        DOMService.checkRestaurantOpen();
    }

    setupEventListeners() {
        // Adicionar ao carrinho
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                this.handleAddToCart(e);
            }
        });

        // Botão do carrinho
        const cartBtn = document.getElementById("cart-btn");
        if (cartBtn) {
            cartBtn.addEventListener("click", () => this.openCart());
        }

        // Fechar modal
        const closeModalBtn = document.getElementById("close-modal-btn");
        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", () => this.closeCart());
        }

        // Checkout
        const checkoutBtn = document.getElementById("checkout-btn");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", () => this.checkout());
        }

        // Botões do carrinho (delegação de eventos)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-btn')) {
                this.handleRemoveItem(e);
            } else if (e.target.closest('.increase-btn')) {
                this.handleIncreaseQuantity(e);
            } else if (e.target.closest('.decrease-btn')) {
                this.handleDecreaseQuantity(e);
            }
        });

        // Fechar modal clicando fora
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cart-modal') {
                this.closeCart();
            }
        });
    }

    handleAddToCart(e) {
        const button = e.target.closest('.add-to-cart-btn');
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");

        try {
            this.cartService.addItem(name, price);
            this.updateCartDisplay();
            this.notificationService.showSuccess(`${name} adicionado ao carrinho!`);
        } catch (error) {
            this.notificationService.showError("Erro ao adicionar item ao carrinho");
        }
    }

    handleRemoveItem(e) {
        const name = e.target.closest('.remove-btn').getAttribute("data-name");
        this.cartService.removeItem(name);
        this.updateCartDisplay();
        this.notificationService.showSuccess("Item removido do carrinho!");
    }

    handleIncreaseQuantity(e) {
        const name = e.target.closest('.increase-btn').getAttribute("data-name");
        const items = this.cartService.getItems();
        const item = items.find(item => item.name === name);
        if (item) {
            this.cartService.updateQuantity(name, item.quantity + 1);
            this.updateCartDisplay();
        }
    }

    handleDecreaseQuantity(e) {
        const name = e.target.closest('.decrease-btn').getAttribute("data-name");
        const items = this.cartService.getItems();
        const item = items.find(item => item.name === name);
        if (item && item.quantity > 1) {
            this.cartService.updateQuantity(name, item.quantity - 1);
            this.updateCartDisplay();
        }
    }

    openCart() {
        this.updateCartDisplay();
        DOMService.showModal();
    }

    closeCart() {
        DOMService.hideModal();
    }

    checkout() {
        const address = DOMService.getAddressValue();
        const items = this.cartService.getItems();

        if (!ValidationService.validateCart(items)) {
            this.notificationService.showError("Seu carrinho está vazio!");
            return;
        }

        if (!ValidationService.validateAddress(address)) {
            DOMService.showAddressError();
            return;
        }

        if (!DOMService.checkRestaurantOpen()) {
            this.notificationService.showError("Ops, o restaurante está fechado no momento!");
            return;
        }        try {
            this.whatsAppService.sendOrder(items, address);
            this.cartService.clear();
            this.updateCartDisplay();
            DOMService.clearAddressInput();
            DOMService.hideAddressError();
            this.closeCart();
            this.notificationService.showSuccess("Pedido enviado com sucesso!");
        } catch (error) {
            this.notificationService.showError("Erro ao enviar pedido");
        }
    }

    updateCartDisplay() {
        const items = this.cartService.getItems();
        const total = this.cartService.getTotal();
        const count = this.cartService.getItemsCount();

        DOMService.updateCartCount(count);
        DOMService.updateCartModal(items, total);
    }
}
