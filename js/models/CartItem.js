// S - Single Responsibility Principle
// Esta classe tem apenas a responsabilidade de representar um item do carrinho
class CartItem {
    constructor(name, price, quantity = 1) {
        this.name = name;
        this.price = parseFloat(price);
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
