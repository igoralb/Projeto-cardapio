// S - Single Responsibility Principle
// Esta classe tem apenas a responsabilidade de validar dados
class ValidationService {
    static validateAddress(address) {
        return address && address.trim().length >= 5;
    }

    static validateCart(cart) {
        return cart && cart.length > 0;
    }

    static validatePrice(price) {
        return !isNaN(price) && price > 0;
    }

    static validateName(name) {
        return name && name.trim().length > 0;
    }
}
