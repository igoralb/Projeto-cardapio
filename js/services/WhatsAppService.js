// S - Single Responsibility Principle
// Esta classe tem apenas a responsabilidade de gerenciar integração com WhatsApp
class WhatsAppService {
    constructor() {
        //coloque seu numero de telefone aqui
        // Exemplo: 558499999999
        // Lembre-se de que o número deve estar no formato internacional, sem espaços ou caracteres especiais
        // e deve incluir o código do país (55 para Brasil) e o código de área   
        this.phoneNumber = "";
    }

    sendOrder(items, address) {
        if (!ValidationService.validateCart(items) || !ValidationService.validateAddress(address)) {
            throw new Error('Dados inválidos para enviar pedido');
        }

        const cartItems = items.map(item => 
            `${item.name} - Quantidade: ${item.quantity} - Preço: R$ ${item.getTotalPrice().toFixed(2)}`
        ).join('%0A');

        const total = items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
        
        const message = `*Pedido Natown Burger*%0A%0A${cartItems}%0A%0A*Total: R$ ${total.toFixed(2)}*%0A*Endereço: ${address}*`;
        
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
}
