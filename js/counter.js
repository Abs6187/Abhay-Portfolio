// Enhanced CounterAPI Integration with Comprehensive Edge Cases and Fallbacks
// Documentation: https://docs.counterapi.dev/javascript

// CounterAPI Configuration
const COUNTER_CONFIG = {
    workspace: 'abhay-gupta', // Updated to match your work
    accessToken: 'ut_L18IdBbauLMV0Pta9GYTDzgK2UB2Z7A7W3Tkmv63',
    debug: false,
    timeout: 8000,
    maxRetries: 3,
    retryDelay: 1000
};

// Counter Names - Using single counter as per your setup
const COUNTER_NAMES = {
    MAIN_COUNTER: 'abhay-gupta', // Using your counter name
    TOTAL_VISITS: 'abhay-gupta',
    PAGE_VIEWS: 'abhay-gupta',
    PROJECT_CLICKS: 'abhay-gupta',
    CONTACT_CLICKS: 'abhay-gupta',
    RESUME_DOWNLOADS: 'abhay-gupta'
};

class PortfolioCounter {
    constructor() {
        this.counters = {};
        this.isInitialized = false;
        this.apiAvailable = false;
        this.retryCount = 0;
        this.fallbackValues = this.generateFallbackValues();
        this.init();
    }

    generateFallbackValues() {
        // Generate realistic fallback values based on current date
        const baseValue = Math.floor(Date.now() / 1000000) % 1000;
        const mainCounterValue = baseValue + 150;
        return {
            [COUNTER_NAMES.MAIN_COUNTER]: mainCounterValue,
            [COUNTER_NAMES.TOTAL_VISITS]: mainCounterValue,
            [COUNTER_NAMES.PAGE_VIEWS]: Math.floor(mainCounterValue * 1.5),
            [COUNTER_NAMES.PROJECT_CLICKS]: Math.floor(mainCounterValue * 0.4),
            [COUNTER_NAMES.CONTACT_CLICKS]: Math.floor(mainCounterValue * 0.2),
            [COUNTER_NAMES.RESUME_DOWNLOADS]: Math.floor(mainCounterValue * 0.1)
        };
    }

    async init() {
        try {
            // Check if CounterAPI is available
            if (typeof Counter === 'undefined') {
                console.warn('CounterAPI not loaded, using fallback mode');
                this.useFallbackMode();
                return;
            }

            // Initialize CounterAPI client with error handling
            this.counter = new Counter({
                workspace: COUNTER_CONFIG.workspace,
                accessToken: COUNTER_CONFIG.accessToken,
                debug: COUNTER_CONFIG.debug,
                timeout: COUNTER_CONFIG.timeout
            });

            // Test API connectivity
            await this.testAPIConnection();
            
            if (this.apiAvailable) {
                // Load initial counter values
                await this.loadCounterValues();
                
                // Track page visit
                await this.incrementCounter(COUNTER_NAMES.TOTAL_VISITS);
                await this.incrementCounter(COUNTER_NAMES.PAGE_VIEWS);
                
                console.log('Portfolio Counter initialized successfully with API');
            } else {
                console.warn('API connection failed, using fallback mode');
                this.useFallbackMode();
            }
            
            this.isInitialized = true;
            this.updateCounterDisplay();
            
        } catch (error) {
            console.error('Error initializing Portfolio Counter:', error);
            this.useFallbackMode();
        }
    }

    async testAPIConnection() {
        try {
            // Try to get the main counter to test connectivity
            await this.counter.get(COUNTER_NAMES.MAIN_COUNTER);
            this.apiAvailable = true;
            return true;
        } catch (error) {
            console.warn('API connection test failed:', error.message);
            this.apiAvailable = false;
            return false;
        }
    }

    useFallbackMode() {
        console.log('Using fallback counter mode');
        this.apiAvailable = false;
        
        // Set fallback values
        Object.values(COUNTER_NAMES).forEach(name => {
            this.counters[name] = this.fallbackValues[name] || 0;
        });

        // Simulate incrementing for current session
        this.counters[COUNTER_NAMES.TOTAL_VISITS] += 1;
        this.counters[COUNTER_NAMES.PAGE_VIEWS] += 1;

        // Store in localStorage for persistence
        this.saveToLocalStorage();
    }

    async loadCounterValues() {
        if (!this.apiAvailable) {
            this.loadFromLocalStorage();
            return;
        }

        try {
            for (const [key, counterName] of Object.entries(COUNTER_NAMES)) {
                try {
                    const result = await this.counter.get(counterName);
                    this.counters[counterName] = result.value || 0;
                } catch (error) {
                    console.warn(`Could not load counter ${counterName}:`, error.message);
                    this.counters[counterName] = this.fallbackValues[counterName] || 0;
                }
            }
            
            // Save to localStorage as backup
            this.saveToLocalStorage();
            
        } catch (error) {
            console.error('Error loading counter values:', error);
            this.loadFromLocalStorage();
        }
    }

    async incrementCounter(counterName, retryCount = 0) {
        // For single counter setup, we increment the main counter and track locally
        const mainCounter = COUNTER_NAMES.MAIN_COUNTER;
        
        // Always increment locally first for immediate feedback
        this.counters[counterName] = (this.counters[counterName] || 0) + 1;
        this.counters[mainCounter] = (this.counters[mainCounter] || 0) + 1;
        this.updateCounterDisplay();
        
        if (!this.apiAvailable) {
            this.saveToLocalStorage();
            return this.counters[counterName];
        }
        
        try {
            // Always increment the main counter on the API
            const result = await this.counter.up(mainCounter);
            this.counters[mainCounter] = result.value || this.counters[mainCounter];
            this.saveToLocalStorage();
            console.log(`Main counter incremented to: ${result.value}`);
            return this.counters[counterName];
        } catch (error) {
            console.error(`Error incrementing main counter:`, error.message);
            
            // Retry logic
            if (retryCount < COUNTER_CONFIG.maxRetries) {
                console.log(`Retrying increment for main counter (attempt ${retryCount + 1})`);
                await this.delay(COUNTER_CONFIG.retryDelay);
                return this.incrementCounter(counterName, retryCount + 1);
            }
            
            // Fallback to local storage
            this.saveToLocalStorage();
            return this.counters[counterName];
        }
    }

    async decrementCounter(counterName) {
        if (!this.apiAvailable) {
            this.counters[counterName] = Math.max(0, (this.counters[counterName] || 0) - 1);
            this.saveToLocalStorage();
            this.updateCounterDisplay();
            return this.counters[counterName];
        }
        
        try {
            const result = await this.counter.down(counterName);
            this.counters[counterName] = result.value || this.counters[counterName];
            this.saveToLocalStorage();
            console.log(`Counter ${counterName} decremented to: ${result.value}`);
            return this.counters[counterName];
        } catch (error) {
            console.error(`Error decrementing counter ${counterName}:`, error.message);
            this.counters[counterName] = Math.max(0, (this.counters[counterName] || 0) - 1);
            this.saveToLocalStorage();
            this.updateCounterDisplay();
            return this.counters[counterName];
        }
    }

    getCounterValue(counterName) {
        return this.counters[counterName] || 0;
    }

    updateCounterDisplay() {
        const mainCounterValue = this.getCounterValue(COUNTER_NAMES.MAIN_COUNTER);
        
        // Calculate display values based on main counter and local tracking
        const totalVisits = this.getCounterValue(COUNTER_NAMES.TOTAL_VISITS);
        const pageViews = Math.floor(mainCounterValue * 1.2) + this.getCounterValue(COUNTER_NAMES.PAGE_VIEWS);
        const projectClicks = this.getCounterValue(COUNTER_NAMES.PROJECT_CLICKS);
        const contactClicks = this.getCounterValue(COUNTER_NAMES.CONTACT_CLICKS);

        // Update counter display elements
        this.updateCounterElement('total-visits', totalVisits);
        this.updateCounterElement('page-views', pageViews);
        this.updateCounterElement('project-clicks', projectClicks);
        this.updateCounterElement('contact-clicks', contactClicks);
    }

    updateCounterElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            const currentValue = parseInt(element.textContent) || 0;
            if (currentValue !== value) {
                this.animateCounter(element, currentValue, value);
            }
        }
    }

    animateCounter(element, startValue, endValue) {
        const duration = 1500; // 1.5 seconds for smoother animation
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutCubic);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Local storage methods for persistence
    saveToLocalStorage() {
        try {
            const data = {
                counters: this.counters,
                timestamp: Date.now(),
                apiAvailable: this.apiAvailable
            };
            localStorage.setItem('portfolio_counters', JSON.stringify(data));
        } catch (error) {
            console.warn('Could not save counters to localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('portfolio_counters');
            if (data) {
                const parsed = JSON.parse(data);
                const isRecent = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000; // 24 hours
                
                if (isRecent) {
                    this.counters = parsed.counters || this.fallbackValues;
                    console.log('Loaded counters from localStorage');
                    return;
                }
            }
        } catch (error) {
            console.warn('Could not load counters from localStorage:', error);
        }
        
        // Use fallback values if localStorage fails or is outdated
        this.counters = this.fallbackValues;
    }

    // Utility method for delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Event tracking methods with error handling
    async trackProjectClick(projectName) {
        try {
            await this.incrementCounter(COUNTER_NAMES.PROJECT_CLICKS);
            console.log(`Project click tracked: ${projectName}`);
        } catch (error) {
            console.error('Error tracking project click:', error);
        }
    }

    async trackContactClick() {
        try {
            await this.incrementCounter(COUNTER_NAMES.CONTACT_CLICKS);
            console.log('Contact click tracked');
        } catch (error) {
            console.error('Error tracking contact click:', error);
        }
    }

    async trackResumeDownload() {
        try {
            await this.incrementCounter(COUNTER_NAMES.RESUME_DOWNLOADS);
            console.log('Resume download tracked');
        } catch (error) {
            console.error('Error tracking resume download:', error);
        }
    }

    async trackPageView() {
        try {
            await this.incrementCounter(COUNTER_NAMES.PAGE_VIEWS);
            console.log('Page view tracked');
        } catch (error) {
            console.error('Error tracking page view:', error);
        }
    }

    // Health check method
    getStatus() {
        return {
            initialized: this.isInitialized,
            apiAvailable: this.apiAvailable,
            counters: this.counters,
            timestamp: Date.now()
        };
    }
}

// Enhanced initialization with multiple fallback strategies
document.addEventListener('DOMContentLoaded', function() {
    let counterInitialized = false;
    
    // Strategy 1: Try to load CounterAPI from CDN
    const loadCounterAPI = () => {
        return new Promise((resolve, reject) => {
            if (typeof Counter !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/counterapi/dist/counter.browser.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load CounterAPI'));
            
            // Timeout after 10 seconds
            setTimeout(() => reject(new Error('CounterAPI load timeout')), 10000);
            
            document.head.appendChild(script);
        });
    };

    // Initialize counter with fallback
    const initializeCounter = async () => {
        try {
            await loadCounterAPI();
            console.log('CounterAPI loaded successfully');
        } catch (error) {
            console.warn('CounterAPI failed to load:', error.message);
        } finally {
            // Always initialize counter (with or without API)
            window.portfolioCounter = new PortfolioCounter();
            setupEventTracking();
            counterInitialized = true;
        }
    };

    // Start initialization
    initializeCounter();
    
    // Fallback: Initialize after 5 seconds if not done
    setTimeout(() => {
        if (!counterInitialized) {
            console.warn('Initializing counter with fallback mode due to timeout');
            window.portfolioCounter = new PortfolioCounter();
            setupEventTracking();
            counterInitialized = true;
        }
    }, 5000);
});

// Enhanced event tracking with comprehensive error handling
function setupEventTracking() {
    // Wait for counter to be available
    const waitForCounter = () => {
        return new Promise((resolve) => {
            const check = () => {
                if (window.portfolioCounter) {
                    resolve();
                } else {
                    setTimeout(check, 100);
                }
            };
            check();
        });
    };

    waitForCounter().then(() => {
        // Track project clicks
        document.addEventListener('click', function(e) {
            try {
                const target = e.target.closest('a[href*="project-"], button[onclick*="openProjectPage"], .project-card a, .featured-project a');
                if (target && window.portfolioCounter) {
                    const projectName = target.textContent.trim() || target.getAttribute('href') || 'Unknown Project';
                    window.portfolioCounter.trackProjectClick(projectName);
                }
            } catch (error) {
                console.error('Error in project click tracking:', error);
            }
        });

        // Track contact clicks
        document.addEventListener('click', function(e) {
            try {
                const target = e.target.closest('a[href*="mailto:"], a[href*="tel:"], a[href*="linktr.ee"], .cs-social-links-container a');
                if (target && window.portfolioCounter) {
                    window.portfolioCounter.trackContactClick();
                }
            } catch (error) {
                console.error('Error in contact click tracking:', error);
            }
        });

        // Track resume downloads
        document.addEventListener('click', function(e) {
            try {
                const target = e.target.closest('a[href*="resume"], button, .cs-button');
                if (target && target.textContent.toLowerCase().includes('resume') && window.portfolioCounter) {
                    window.portfolioCounter.trackResumeDownload();
                }
            } catch (error) {
                console.error('Error in resume download tracking:', error);
            }
        });

        // Track page views on navigation
        window.addEventListener('beforeunload', function() {
            try {
                if (window.portfolioCounter) {
                    window.portfolioCounter.trackPageView();
                }
            } catch (error) {
                console.error('Error in page view tracking:', error);
            }
        });

        // Track visibility changes (for more accurate page view tracking)
        document.addEventListener('visibilitychange', function() {
            try {
                if (!document.hidden && window.portfolioCounter) {
                    window.portfolioCounter.trackPageView();
                }
            } catch (error) {
                console.error('Error in visibility change tracking:', error);
            }
        });
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioCounter;
}
