document.addEventListener('DOMContentLoaded', function() {
    // Cookie Banner
    const cookieBanner = document.querySelector('.cookie-banner');
    const btnAccept = document.querySelector('.btn-accept');
    const btnDecline = document.querySelector('.btn-decline');
    const btnCustomize = document.querySelector('.btn-customize');

    if (!localStorage.getItem('cookieChoice')) {
        cookieBanner.style.display = 'block';
    } else {
        cookieBanner.style.display = 'none';
    }

    btnAccept.addEventListener('click', function() {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieBanner.style.opacity = '0';
        cookieBanner.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 300);
        showNotification('Cookie preferences saved. Thank you!', 'success');
    });

    btnDecline.addEventListener('click', function() {
        localStorage.setItem('cookieChoice', 'declined');
        cookieBanner.style.opacity = '0';
        cookieBanner.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 300);
        showNotification('Optional cookies declined.', 'info');
    });

    btnCustomize.addEventListener('click', function() {
        showCookieModal();
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current).toLocaleString();
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));

    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.btn-search-main');
    const trendingTags = document.querySelectorAll('.trending-tag');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    trendingTags.forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.textContent;
            performSearch();
        });
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`Searching for: "${query}"`, 'info');
            searchInput.value = '';
            // Add search animation
            searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching';
            searchButton.disabled = true;
            
            setTimeout(() => {
                searchButton.innerHTML = '<i class="fas fa-search"></i> Search';
                searchButton.disabled = false;
            }, 1500);
        }
    }

    // View All Buttons
    const viewAllButtons = document.querySelectorAll('.view-all-btn');
    viewAllButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('.section-header').querySelector('.section-title').textContent;
            showNotification(`Loading all ${section}...`, 'info');
            
            // Add loading animation
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });

    // Mann Baat Button
    const mannBaatBtn = document.querySelector('.btn-mannbaat');
    if (mannBaatBtn) {
        mannBaatBtn.addEventListener('click', function() {
            showNotification('Redirecting to Mann Baat portal...', 'info');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            this.disabled = true;
            
            setTimeout(() => {
                window.open('https://www.mygov.in/', '_blank');
                this.innerHTML = 'Submit Your Idea';
                this.disabled = false;
            }, 2000);
        });
    }

    // Quick Links Hover Effect
    const quickLinks = document.querySelectorAll('.quicklink-card');
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(3deg) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.animation = 'fadeInUp 0.3s';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Floating Chatbot
    const chatbot = document.querySelector('.floating-chatbot');
    chatbot.addEventListener('click', () => {
        showChatbot();
    });

    // Language Selector
    const languageSelect = document.querySelector('.language-selector select');
    languageSelect.addEventListener('change', function() {
        showNotification(`Language changed to: ${this.value}`, 'info');
    });

    // News Items Click
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.news-title').textContent;
            showNotification(`Opening: ${title}`, 'info');
        });
    });

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#2e7d32' : type === 'error' ? '#d32f2f' : '#1976d2'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            min-width: 300px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto remove
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            opacity: 0.7;
            transition: opacity 0.3s;
            padding: 5px;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Cookie Modal
    function showCookieModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-cookie-bite"></i> Cookie Settings</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <p>Choose your cookie preferences:</p>
                    <div class="cookie-options">
                        <label class="cookie-option">
                            <input type="checkbox" checked>
                            <span>Essential Cookies</span>
                            <small>Required for website functionality</small>
                        </label>
                        <label class="cookie-option">
                            <input type="checkbox">
                            <span>Analytics Cookies</span>
                            <small>Help us improve our website</small>
                        </label>
                        <label class="cookie-option">
                            <input type="checkbox">
                            <span>Marketing Cookies</span>
                            <small>Personalized content and ads</small>
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-save-cookies">Save Preferences</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s;
            backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        const saveBtn = modal.querySelector('.btn-save-cookies');
        
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        saveBtn.addEventListener('click', () => {
            localStorage.setItem('cookieChoice', 'custom');
            modal.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                document.body.removeChild(modal);
                cookieBanner.style.opacity = '0';
                cookieBanner.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 300);
                showNotification('Cookie preferences saved successfully!', 'success');
            }, 300);
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                animation: slideInUp 0.3s;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            
            @keyframes slideInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                border-bottom: 2px solid #f0f0f0;
                padding-bottom: 15px;
            }
            
            .modal-header h3 {
                color: var(--primary-blue);
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
            }
            
            .modal-close {
                background: transparent;
                border: none;
                font-size: 1.2rem;
                color: #666;
                cursor: pointer;
                transition: color 0.3s;
                padding: 5px;
            }
            
            .modal-close:hover {
                color: var(--primary-blue);
            }
            
            .modal-body {
                margin-bottom: 25px;
            }
            
            .cookie-options {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 20px;
            }
            
            .cookie-option {
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border: 2px solid #e0e0e0;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .cookie-option:hover {
                border-color: var(--primary-blue);
                background: #f0f7ff;
            }
            
            .cookie-option input {
                margin-right: 10px;
            }
            
            .cookie-option span {
                font-weight: 600;
                color: #333;
            }
            
            .cookie-option small {
                color: #666;
                font-size: 0.9rem;
            }
            
            .modal-footer {
                text-align: right;
            }
            
            .btn-save-cookies {
                background: var(--primary-blue);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .btn-save-cookies:hover {
                background: var(--secondary-blue);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(10, 61, 142, 0.3);
            }
        `;
        document.head.appendChild(modalStyle);
    }

    // Chatbot
    function showChatbot() {
        showNotification('Chatbot feature would open here in a full implementation.', 'info');
    }

    // Initialize animations on scroll
    const animatedElements = document.querySelectorAll('.animate__animated');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.classList[1];
                element.classList.add('animate__animated', animation);
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotate(20deg) scale(1.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotate(15deg) scale(1.2)';
        });
    });
});