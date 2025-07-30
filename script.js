// Add interactive functionality to the Ez Recorder clone

document.addEventListener('DOMContentLoaded', function() {
    // Handle mode card clicks
    const modeCards = document.querySelectorAll('.mode-card');
    const modeButtons = document.querySelectorAll('.mode-button');
    
    modeCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            modeCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Get the mode type
            const modeTitle = this.querySelector('.mode-title').textContent;
            console.log(`Selected mode: ${modeTitle}`);
            
            // Update button text to show selection
            const button = this.querySelector('.mode-button');
            const originalText = button.textContent;
            button.textContent = 'Selected';
            button.style.background = 'rgba(102, 126, 234, 0.2)';
            button.style.color = '#667eea';
            button.style.borderColor = '#667eea';
            
            // Reset other buttons
            modeButtons.forEach((btn, btnIndex) => {
                if (btnIndex !== index) {
                    btn.textContent = 'Click to start preview';
                    btn.style.background = 'transparent';
                    btn.style.color = '#a0a0a0';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
            });
        });
    });
    
    // Handle mode button clicks (prevent event bubbling)
    modeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const modeTitle = this.closest('.mode-card').querySelector('.mode-title').textContent;
            
            // Simulate preview start
            this.textContent = 'Starting preview...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Preview active';
                this.style.background = 'rgba(74, 222, 128, 0.2)';
                this.style.color = '#4ade80';
                this.style.borderColor = '#4ade80';
                this.disabled = false;
            }, 1500);
            
            console.log(`Starting preview for: ${modeTitle}`);
        });
    });
    
    // Handle audio toggle
    const audioToggle = document.querySelector('.toggle-switch input');
    const audioLabel = document.querySelector('.audio-label');
    
    audioToggle.addEventListener('change', function() {
        if (this.checked) {
            console.log('Microphone audio enabled');
            audioLabel.textContent = 'Include microphone audio';
        } else {
            console.log('Microphone audio disabled');
            audioLabel.textContent = 'Microphone audio disabled';
        }
    });
    
    // Add hover effects for better interactivity
    modeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add keyboard navigation support
    modeCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Select ${card.querySelector('.mode-title').textContent} recording mode`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add accessibility attributes
    const toggleSwitch = document.querySelector('.toggle-switch');
    toggleSwitch.setAttribute('role', 'switch');
    toggleSwitch.setAttribute('aria-label', 'Toggle microphone audio recording');
    
    audioToggle.addEventListener('change', function() {
        toggleSwitch.setAttribute('aria-checked', this.checked);
    });
    
    // Initialize aria-checked
    toggleSwitch.setAttribute('aria-checked', audioToggle.checked);
});

// Add some CSS for active state
const style = document.createElement('style');
style.textContent = `
    .mode-card.active {
        background: rgba(102, 126, 234, 0.15) !important;
        border-color: rgba(102, 126, 234, 0.4) !important;
        transform: translateY(-4px) !important;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2) !important;
    }
    
    .mode-card:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    
    .toggle-switch:focus-within {
        outline: 2px solid #667eea;
        outline-offset: 2px;
        border-radius: 34px;
    }
`;
document.head.appendChild(style);
