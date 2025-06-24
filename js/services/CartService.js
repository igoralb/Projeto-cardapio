// S - Single Responsibility Principle
// Esta classe tem apenas a responsabilidade de gerenciar o estado do carrinho
class CartService {
    constructor() {
        this.items = [];
    }

    addItem(name, price) {
        if (!ValidationService.validateName(name) || !ValidationService.validatePrice(price)) {
            throw new Error('Dados inválidos para adicionar ao carrinho');
        }

        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.incrementQuantity();
        } else {
            this.items.push(new CartItem(name, price));
        }

        return this.items;
    }

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        return this.items;
    }

    updateQuantity(name, quantity) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            item.quantity = Math.max(1, quantity);
        }
        return this.items;
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    getItemsCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        return this.items;
    }

    getItems() {
        return [...this.items];
    }
}
