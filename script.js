// ByteDance Seed - Combined Projects Page
// Horizontal Scroll Navigation

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    let currentProject = 'seedfold';

    // Tab click handler
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const project = btn.dataset.project;
            switchProject(project);
        });
    });

    function switchProject(project) {
        if (project === currentProject) return;
        
        currentProject = project;
        
        // Update tabs
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.project === project);
        });
        
        // Slide to project
        if (project === 'seedfold') {
            projectsContainer.style.transform = 'translateX(0)';
        } else {
            projectsContainer.style.transform = 'translateX(-100vw)';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentProject === 'seedproteo') {
            switchProject('seedfold');
        } else if (e.key === 'ArrowRight' && currentProject === 'seedfold') {
            switchProject('seedproteo');
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentProject === 'seedfold') {
                // Swipe left - go to SeedProteo
                switchProject('seedproteo');
            } else if (diff < 0 && currentProject === 'seedproteo') {
                // Swipe right - go to SeedFold
                switchProject('seedfold');
            }
        }
    }

    // Navigation background on scroll
    const nav = document.querySelector('.top-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    // Add animation to elements
    const animatedElements = document.querySelectorAll(
        '.contribution-card, .highlight-item, .results-table-wrapper, ' +
        '.method-architecture, .method-scaling, .method-attention, ' +
        '.result-figure, .team-grid, .citation-box'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.03}s, transform 0.5s ease ${index * 0.03}s`;
        scrollObserver.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Project indicator
    const indicator = document.createElement('div');
    indicator.className = 'project-indicator';
    indicator.innerHTML = `
        <div class="indicator-dot active" data-project="seedfold"></div>
        <div class="indicator-dot" data-project="seedproteo"></div>
    `;
    document.body.appendChild(indicator);

    // Indicator styles
    const indicatorStyle = document.createElement('style');
    indicatorStyle.textContent = `
        .project-indicator {
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 100px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        
        .indicator-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #e2e8f0;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .indicator-dot:hover {
            background: #94a3b8;
        }
        
        .indicator-dot.active {
            background: #2563eb;
            width: 32px;
            border-radius: 6px;
        }
        
        .indicator-dot.active[data-project="seedproteo"] {
            background: #7c3aed;
        }
        
        @media (max-width: 768px) {
            .project-indicator {
                bottom: 16px;
                padding: 10px 16px;
            }
        }
    `;
    document.head.appendChild(indicatorStyle);

    // Indicator click handler
    document.querySelectorAll('.indicator-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            switchProject(dot.dataset.project);
        });
    });

    // Update indicator on project switch
    const originalSwitchProject = switchProject;
    switchProject = function(project) {
        originalSwitchProject(project);
        document.querySelectorAll('.indicator-dot').forEach(dot => {
            dot.classList.toggle('active', dot.dataset.project === project);
        });
    };

    console.log('🧬 ByteDance Seed - Combined Page Loaded');
    console.log('Use ← → arrow keys or swipe to switch projects');
});

// WeChat Modal Functions
function openWeChatModal(project) {
    const modal = document.getElementById('wechat-modal');
    const qrImg = document.getElementById('wechat-qr');
    
    // Set QR code image based on project
    if (project === 'seedfold') {
        qrImg.src = 'figures/wechat-qr-seedfold.png';
        qrImg.alt = 'SeedFold WeChat QR Code';
    } else if (project === 'seedproteo') {
        qrImg.src = 'figures/wechat-qr-seedproteo.png';
        qrImg.alt = 'SeedProteo WeChat QR Code';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWeChatModal(event) {
    const modal = document.getElementById('wechat-modal');
    
    // Close if clicking outside modal content or on close button
    if (!event || event.target.id === 'wechat-modal' || event.target.classList.contains('modal-close')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWeChatModal();
    }
});

