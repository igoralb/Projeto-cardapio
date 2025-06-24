// S - Single Responsibility Principle
// Esta classe tem apenas a responsabilidade de exibir notificações
class NotificationService {
    static showSuccess(message) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#4CAF50",
            },
        }).showToast();
    }

    static showError(message) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
        }).showToast();
    }

    static showWarning(message) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#f59e0b",
            },
        }).showToast();
    }
}
