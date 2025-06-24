// I - Interface Segregation Principle
// D - Dependency Inversion Principle
// Arquivo principal que inicializa a aplicação com injeção de dependências

// Inicialização com Dependency Injection
document.addEventListener('DOMContentLoaded', () => {
    // Instanciar serviços (baixo acoplamento)
    const cartService = new CartService();
    const whatsAppService = new WhatsAppService();
    const notificationService = NotificationService;
    
    // Injetar dependências no controlador
    new CartController(cartService, whatsAppService, notificationService);
});
