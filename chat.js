class TechoraChatApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.scrollToBottom();
    }

    initializeElements() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatItems = document.querySelectorAll('.chat-item');
    }

    bindEvents() {
        // Send message
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Chat selection
        this.chatItems.forEach(item => {
            item.addEventListener('click', () => this.selectChat(item));
        });
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.messageInput.value = '';
        
        // Simulate admin response
        setTimeout(() => {
            this.simulateResponse();
        }, 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        const isUser = sender === 'user';
        
        messageDiv.className = `message-wrapper ${sender}-message mb-3`;
        
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        messageDiv.innerHTML = `
            <div class="message-bubble ${isUser ? 'user-bubble' : ''}">
                <p class="mb-1">${this.escapeHtml(text)}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    simulateResponse() {
        const responses = [
            "Thank you for your message. I'm looking into that for you.",
            "I understand your concern. Let me check your account details.",
            "That's a great question! I'll get you the information you need.",
            "I can help you with that. Please give me a moment to review.",
            "Thanks for reaching out. I'm processing your request now."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(randomResponse, 'admin');
    }

    selectChat(selectedItem) {
        // Remove active from all
        this.chatItems.forEach(item => item.classList.remove('active'));
        
        // Add active to selected
        selectedItem.classList.add('active');
        
        // Update chat content
        this.updateChatContent(selectedItem);
    }

    updateChatContent(selectedItem) {
        const chatType = selectedItem.dataset.chat;
        const chatName = selectedItem.querySelector('.chat-name').textContent;
        const avatarClass = selectedItem.querySelector('.chat-avatar').className;
        
        // Update header
        const headerAvatar = document.querySelector('.chat-avatar-large');
        const headerTitle = document.querySelector('.chat-header h5');
        const headerStatus = document.querySelector('.status-text');
        
        headerAvatar.className = avatarClass.replace('chat-avatar', 'chat-avatar-large');
        headerAvatar.textContent = selectedItem.querySelector('.chat-avatar').textContent;
        
        if (chatType === 'admin') {
            headerTitle.innerHTML = 'Admin Support <span class="admin-badge ms-2">ADMIN</span>';
            headerStatus.textContent = 'Online';
        } else {
            headerTitle.textContent = chatName;
            headerStatus.textContent = 'Last seen recently';
        }
        
        this.loadChatMessages(chatType);
    }

    loadChatMessages(chatType) {
        this.chatMessages.innerHTML = '';
        
        if (chatType === 'admin') {
            this.addMessage("Hello! How can we help you today?", 'admin');
            this.addMessage("Hi, I have a question about my recent payout", 'user');
            this.addMessage("Sure! Let me check your account details. What specific information do you need?", 'admin');
            this.addMessage("I want to know when the next payout will be processed", 'user');
            this.addMessage("Your payout has been processed successfully", 'admin');
        } else {
            this.addMessage(`Hello! This is your conversation with ${chatType}.`, 'admin');
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.techoraChat = new TechoraChatApp();
});