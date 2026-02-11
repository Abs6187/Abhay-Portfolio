// Enhanced CounterAPI Integration
// Documentation: https://docs.counterapi.dev/javascript

// CounterAPI Configuration
const COUNTER_CONFIG = {
    workspace: 'abhay-gupta',
    accessToken: 'ut_L18IdBbauLMV0Pta9GYTDzgK2UB2Z7A7W3Tkmv63',
    debug: false,
    timeout: 8000
};

// Unique Counter Names for Accurate Tracking
const COUNTER_NAMES = {
    MAIN_COUNTER: 'abhay-gupta', 
    TOTAL_VISITS: 'abhay-gupta-visits',
    PAGE_VIEWS: 'abhay-gupta-views',
    PROJECT_CLICKS: 'abhay-gupta-projects',
    CONTACT_CLICKS: 'abhay-gupta-contacts',
    RESUME_DOWNLOADS: 'abhay-gupta-resume'
};

class PortfolioCounter {
    constructor() {
        this.counters = {};
        this.apiAvailable = false;
        // Default values if API fails
        this.fallbackValues = {
            [COUNTER_NAMES.MAIN_COUNTER]: 1000,
            [COUNTER_NAMES.TOTAL_VISITS]: 1500,
            [COUNTER_NAMES.PAGE_VIEWS]: 3000,
            [COUNTER_NAMES.PROJECT_CLICKS]: 500,
            [COUNTER_NAMES.CONTACT_CLICKS]: 200,
            [COUNTER_NAMES.RESUME_DOWNLOADS]: 100
        };
        this.init();
    }

    async init() {
        // Load the CounterAPI script dynamically if not present
        if (typeof Counter === 'undefined') {
            await this.loadScript('https://cdn.jsdelivr.net/npm/counterapi/dist/counter.browser.min.js');
        }

        try {
            if (typeof Counter !== 'undefined') {
                this.counter = new Counter({
                    workspace: COUNTER_CONFIG.workspace,
                    accessToken: COUNTER_CONFIG.accessToken,
                    debug: COUNTER_CONFIG.debug,
                    timeout: COUNTER_CONFIG.timeout
                });
                this.apiAvailable = true;
                
                // Load all counter values on startup
                await this.loadAllCounters();
                
                // Increment Page Views immediately
                this.incrementCounter(COUNTER_NAMES.PAGE_VIEWS);
                
                // Increment Visit (Session) - using localStorage to dedup sessions
                if (!sessionStorage.getItem('visit_tracked')) {
                    this.incrementCounter(COUNTER_NAMES.TOTAL_VISITS);
                    sessionStorage.setItem('visit_tracked', 'true');
                }

                console.log('Portfolio Counter initialized.');
            }
        } catch (error) {
            console.warn('CounterAPI init failed, using fallback.', error);
            this.apiAvailable = false;
            this.useFallback();
        }
        
        this.updateCounterDisplay();
        this.setupEventTracking();
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async loadAllCounters() {
        if (!this.apiAvailable) return;
        
        for (const key of Object.keys(COUNTER_NAMES)) {
            const name = COUNTER_NAMES[key];
            try {
                const res = await this.counter.get(name);
                this.counters[name] = res.value;
            } catch (e) {
                // If counter doesn't exist, it might be 0 or network error
                this.counters[name] = this.counters[name] || 0; 
            }
        }
    }

    async incrementCounter(counterName) {
        // Optimistic UI update
        this.counters[counterName] = (this.counters[counterName] || 0) + 1;
        this.updateCounterDisplay();

        if (this.apiAvailable) {
            try {
                const res = await this.counter.up(counterName);
                this.counters[counterName] = res.value;
                this.updateCounterDisplay(); // Update with server value
            } catch (e) {
                console.error(`Failed to increment ${counterName}`, e);
            }
        }
    }

    useFallback() {
        this.counters = { ...this.fallbackValues };
    }

    getCounterValue(counterName) {
        return this.counters[counterName] || 0;
    }

    updateCounterDisplay() {
        // Map internal counter names to DOM IDs
        const mapping = {
            'total-visits': COUNTER_NAMES.TOTAL_VISITS,
            'page-views': COUNTER_NAMES.PAGE_VIEWS,
            'project-clicks': COUNTER_NAMES.PROJECT_CLICKS,
            'contact-clicks': COUNTER_NAMES.CONTACT_CLICKS
        };

        for (const [id, name] of Object.entries(mapping)) {
            const el = document.getElementById(id);
            if (el) {
                el.innerText = this.getCounterValue(name);
            }
        }
    }

    // Public tracking methods
    trackProjectClick() {
        this.incrementCounter(COUNTER_NAMES.PROJECT_CLICKS);
    }

    trackContactClick() {
        this.incrementCounter(COUNTER_NAMES.CONTACT_CLICKS);
    }
    
    // Setup Event Listeners
    setupEventTracking() {
        // Projects
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest('a[href*="project-"], button[onclick*="openProjectPage"]');
            if (target) {
                this.trackProjectClick();
            }
        });

        // Contacts
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest('a[href^="mailto:"], a[href^="tel:"], #contact a');
            if (target) {
                this.trackContactClick();
            }
        });
    }
}

// Initialize
window.portfolioCounter = new PortfolioCounter();