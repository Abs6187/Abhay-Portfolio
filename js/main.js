// Main JavaScript file for portfolio functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeSkills();
    initializeProjects();
    initializeAnimations();
    initializeSmoothScrolling();
    initializeBrokenLinkHandler();
    initializeContactTracking();
});

// Initialize skills section
function initializeSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    const skillsData = {
        'Frontend Languages': [
            { name: 'HTML', icon: './assets/skills/Frontend/html.png' },
            { name: 'CSS', icon: './assets/skills/Frontend/css.png' },
            { name: 'JavaScript', icon: './assets/skills/Frontend/js.png' },
            { name: 'TypeScript', icon: './assets/skills/Frontend/typescript.png' },
            { name: 'jQuery', icon: './assets/skills/Frontend/jquery.png' }
        ],
        'Frontend Frameworks/Libraries': [
            { name: 'Angular', icon: './assets/skills/Frontend/angular.png' },
            { name: 'React Js', icon: './assets/skills/Frontend/react.png' },
            { name: 'Next Js', icon: './assets/skills/Frontend/nextjs.png' }
        ],
        'Mobile Development': [
            { name: 'Flutter', icon: './assets/skills/Mobile/flutter.png' },
            { name: 'React Native', icon: './assets/skills/Mobile/react.png' },
            { name: 'Ionic', icon: './assets/skills/Mobile/ionic.png' }
        ],
        'DevOps & Tools': [
            { name: 'Docker', icon: './assets/skills/Devops/docker.png' },
            { name: 'Postman', icon: './assets/skills/Devops/postman.png' },
            { name: 'GitHub', icon: './assets/skills/Devops/github.png' }
        ],
        'Backend Languages': [
            { name: 'PHP', icon: './assets/skills/Backend/php.png' },
            { name: 'C++', icon: './assets/skills/Backend/c-.png' },
            { name: 'Python', icon: './assets/python.png' },
            { name: 'Java', icon: './assets/java-script.png' }
        ],
        'Backend Technologies': [
            { name: 'Firebase', icon: './assets/skills/Backend/firebase.png' },
            { name: 'Node Js', icon: './assets/skills/Backend/node.png' },
            { name: 'Flask', icon: './assets/skills/Backend/flask.png' },
            { name: 'Django', icon: './assets/skills/Backend/firebase.png' }
        ],
        'Data Science & ML': [
            { name: 'Machine Learning', icon: './assets/Machine Learning.jpg' },
            { name: 'Computer Vision', icon: './assets/Computer Vision.png' },
            { name: 'NLP', icon: './assets/NLP.png' },
            { name: 'Data Analysis', icon: './assets/python.png' }
        ],
        'Databases': [
            { name: 'MongoDB', icon: './assets/skills/Database/mongo.png' },
            { name: 'MySQL', icon: './assets/skills/Database/mysql.png' }
        ],
        'Collaboration & Design': [
            { name: 'Jira', icon: './assets/skills/collaboration/jira.png' },
            { name: 'Slack', icon: './assets/skills/collaboration/slack.png' },
            { name: 'Skype', icon: './assets/skills/collaboration/skype.png' },
            { name: 'Notion', icon: './assets/skills/collaboration/notion.png' },
            { name: 'Figma', icon: './assets/skills/collaboration/figma.png' }
        ]
    };

    Object.entries(skillsData).forEach(([category, skills]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <h3 style="color:white">${category}</h3>
            <ul style="list-style-type: none;">
                ${skills.map(skill => `
                    <li>
                        <div class="m2">
                            <div class="logo">
                                <div class="logo-wrapper">
                                    <img src="${skill.icon}" alt="${skill.name}-icon" />
                                </div>
                                <div style="display: flex; justify-content: center; align-items: center;">
                                    <p class="skills-p">${skill.name}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
        skillsContainer.appendChild(categoryDiv);
    });
}

// Initialize projects section
function initializeProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    const projectsData = [
        {
            name: 'ReelsPro - AI Video Platform',
            image: './assets/projects/extension.png',
            description: 'HackSRIT\'25 Winner - AI-powered short video platform with content moderation',
            featured: true,
            hackathon: 'HackSRIT\'25 - 1st Prize Winner (15,000 INR)',
            team: 'TechMatrix Solvers'
        },
        {
            name: 'AgentX Travel India',
            image: './assets/projects/Agent-X Travel agent.png',
            description: 'HackByte 3.0 - AI-powered travel assistant with multi-agent system'
        },
        {
            name: 'Helmet Detection - YOLOv11',
            image: './assets/projects/Helmet-Detection-YOLO.png',
            description: 'Computer vision helmet detection using YOLOv11 with 95% accuracy'
        },
        {
            name: 'EduPath Explorer',
            image: './assets/projects/Edu-Path-Explorer.png',
            description: 'AI-powered course recommendation system with personalized learning paths'
        },
        {
            name: 'JARVIS AI Assistant',
            image: './assets/projects/extension.png',
            description: 'Just A Rather Very Intelligent System - Voice-controlled AI assistant with multiple capabilities'
        },
        {
            name: 'Machine Learning Projects',
            image: './assets/projects/vr.png',
            description: 'Various ML applications and Hugging Face deployments'
        }
    ];

    const projectsList = document.createElement('ul');
    projectsList.style.listStyleType = 'none';

    projectsData.forEach(project => {
        // Skip featured project as it has its own section
        if (project.featured) return;
        
        const projectItem = document.createElement('li');
        projectItem.innerHTML = `
            <div class="card">
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <div style="width: 200px; height: 125px;" class="card">
                                <div class="content">
                                    <div class="back">
                                        <div style="border-radius: 5px; width:98%; height:98%; overflow: hidden;" class="back-content">
                                            <img src="${project.image}" alt="${project.name}" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <p style="background-color: transparent; font-weight: bold; margin-bottom: 10px;">
                                    ${project.name}
                                </p>
                                <div style="display: flex; justify-content: center; background-color: transparent;">
                                    <button onclick="openProjectPage('${project.name}')">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectsList.appendChild(projectItem);
    });

    projectsContainer.appendChild(projectsList);
}

// Initialize animations
function initializeAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.skills, .projects, .about').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section function for navigation buttons
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Track navigation clicks
        if (window.portfolioCounter) {
            if (sectionId === 'featured-project') {
                window.portfolioCounter.trackProjectClick();
            } else if (sectionId === 'contact') {
                window.portfolioCounter.trackContactClick();
            }
        }
    }
}

// Open project detail pages
function openProjectPage(projectName) {
    const projectPages = {
        'ReelsPro - AI Video Platform': 'project-reelspro.html',
        'AgentX Travel India': 'project-agentx.html',
        'Helmet Detection - YOLOv11': 'project-helmet-detection.html',
        'EduPath Explorer': 'project-edupath.html',
        'JARVIS AI Assistant': 'project-jarvis.html',
        'Machine Learning Projects': 'project-ml.html'
    };
    
    const pagePath = projectPages[projectName];
    if (pagePath) {
        window.open(pagePath, '_blank');
    } else {
        // Fallback to modal for projects without dedicated pages
        showProjectDetails(projectName);
    }
}

// Project details modal (fallback)
function showProjectDetails(projectName) {
    const projectDetails = {
        'ReelsPro - AI Video Platform': {
            description: 'HACKSRIT\'25 WINNER (1st Prize - 15,000 INR)\n\nReelsPro is an AI-powered platform for short videos that revolutionizes content creation and moderation. Built by TechMatrix Solvers team, it features:\n\n• AI Chatbot powered by Groq and Vercel AI SDK for creative assistance\n• Automatic content moderation using conceptual AI (Gemini and Groq)\n• Chrome Extension for seamless content sharing from anywhere on the web\n• Video upload and rendering using ImageKit with optimized performance\n• Mobile-responsive design with modern UI (Tailwind CSS, Shadcn, MagicUI)\n• Secure API interactions and serverless deployment\n\nWhat makes ReelsPro different:\n• WITHOUT Fear of Shame daily Vlog Upload - No Explicit Content\n• Deep AI integration with automatic tagging, moderation, and feed personalization\n• Platform-agnostic backend for developers to build custom video apps\n• Focus on actionable analytics and monetization support for creators',
            technologies: 'Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI, MagicUI, Groq API, Vercel AI SDK, Gemini AI, ImageKit.io, MongoDB, NextAuth.js, JWT, Chrome Extension API, nsfwjs',
            team: 'TechMatrix Solvers:\n• Kripanshu Gupta (MERN Stack Developer)\n• Abhay Gupta (ML & Full-Stack Developer)\n• Jay Kumar (ML & Front-end Developer)\n• Simran Koshta (Full Stack Developer)',
            links: {
                'Live Demo': 'https://reelspro-phi.vercel.app/',
                'GitHub Repository': 'https://github.com/Abs6187/ReelsPro',
                'Documentation': 'https://abs6187.github.io/ReelsPro/',
                'Part 1 Presentation': 'https://www.youtube.com/watch?v=V4u56VDxRTY',
                'Part 2 Prototype Demo': 'https://www.youtube.com/watch?v=b4--EaAh6wA',
                'LinkedIn Post': 'https://www.linkedin.com/posts/abhay-gupta-197b17264_id8devhub-microsoft-hacksrit-activity-7327716169660989440-rhot'
            },
            achievements: '1st Prize Winner - HackSRIT\'25 Hackathon\nPrize Money: 15,000 INR\nTeam: TechMatrix Solvers\nJanuary 2025'
        },
        'AgentX Travel India': {
            description: 'HACKBYTE 3.0 PROJECT - AI-powered travel assistant application tailored for the Indian market. Built by TechMatrix Solvers team, it features:\n\n• Multi-Agent System: Specialized AI agents for research, accommodation, transportation, activities, dining, and itinerary integration\n• AI-Powered Itinerary Generation: Create detailed day-by-day travel plans customized to user preferences\n• Interactive Maps: Visualize travel destinations with integrated mapping using Pydeck\n• Geo-based Attraction Search: Find nearby attractions using MongoDB\'s geospatial and vector search capabilities\n• Chatbot Assistant: Conversational AI for travel questions and recommendations\n• Optional Enhanced Recommendations: Integration with Tailvy API and MongoDB for improved suggestions\n• Downloadable Itineraries: Save travel plans offline for easy access\n\nArchitecture Evolution: The project showcases multiple architecture versions from initial design to advanced implementation with optimized workflows and expanded capabilities.',
            technologies: 'Python, Streamlit 1.32.2, LangChain, Google Generative AI (Gemini) 0.3.2, Geopy 2.4.1, Pydeck 0.8.0, Pandas 2.1.4, MongoDB Atlas, OpenAI API, Tailvy API, Hugging Face',
            team: 'TechMatrix Solvers:\n• Abhay Gupta (Team Leader)\n• Jay Kumar\n• Kripanshu Gupta\n• Aditi Soni',
            links: {
                'Live Demo': 'https://huggingface.co/spaces/Abs6187/AgentX-Travel-India_v01',
                'GitHub Repository': 'https://github.com/Abs6187/AgentX-Travel-India',
                'Video Explanation': 'https://www.youtube.com/watch?v=1l1WXob-diM'
            },
            achievements: 'HackByte 3.0 Project - IIITDMJ Hackathon\nTop 100 Teams Achievement\nMulti-Agent AI Architecture Implementation'
        },
        'Helmet Detection - YOLOv11': {
            description: 'COMPUTER VISION PROJECT - Advanced helmet detection system using YOLOv11 object detection algorithm for workplace safety monitoring.\n\nKey Features:\n• High Accuracy Detection: Achieves 95% accuracy in helmet detection across various scenarios\n• Real-time Processing: Fast detection and processing capabilities for live video streams\n• Comprehensive Analytics: Detailed metrics visualization including confusion matrices and accuracy graphs\n• Image & Video Support: Process both static images and dynamic video content\n• Performance Metrics: Advanced evaluation with confidence scores and statistical analysis\n• Easy Integration: Streamlit web interface for easy deployment and user interaction\n\nProject Workflow:\n1. Load pre-trained YOLOv11 model for helmet detection\n2. Resize and preprocess input images or video frames\n3. Pass frames through YOLOv11 model to detect helmets\n4. Generate annotated images with bounding boxes and confidence scores\n5. Store results in CSV format with detection labels and metrics\n6. Generate confusion matrices and accuracy graphs for evaluation',
            technologies: 'Python, YOLOv11, OpenCV, Ultralytics, Supervision, Jupyter Notebook, Streamlit, NumPy, Pandas, Matplotlib, Seaborn, Hugging Face Spaces, GitHub',
            team: 'Solo Project - Abhay Gupta\nComputer Vision & Machine Learning Engineer',
            links: {
                'Live Demo': 'https://huggingface.co/spaces/Abs6187/Helmet-Detect-model',
                'GitHub Repository': 'https://github.com/Abs6187/Helmet-Detection',
                'Extended Demo': 'https://huggingface.co/spaces/Abs6187/Helmet-License-Plate-Detection'
            },
            achievements: 'Computer Vision Project - YOLOv11 Implementation\n95% Detection Accuracy Achievement\nReal-time Safety Monitoring System\nHugging Face Spaces Deployment'
        },
        'ReelsPRO Content Moderation': {
            description: 'Built at HackSRIT\'25 to limit explicit content across the web and won 1st Prize with 15,000 INR. Deep AI integration with automatic tagging, moderation, and personalized feeds.',
            technologies: 'Next.js 15, React 19, TypeScript, Tailwind CSS, Daisy UI, nsfwjs, MongoDB, NextAuth.JS, JWT, ImageKit.io',
            links: {
                'Demo Part 1': 'https://youtu.be/V4u56VDxRTY?si=J6-sYgl_rch84l6B',
                'Demo Part 2': 'https://www.youtube.com/watch?v=b4--EaAh6wA'
            }
        },
        'EduPath Explorer': {
            description: 'SMART LEARNING PATHFINDER - AI-powered course recommendation system that unlocks learning potential with personalized course recommendations tailored for individual users.\n\nKey Features:\n• AI-Powered Recommendations: Advanced recommendation engine using vector embeddings and similarity matching\n• Personalized Learning Paths: Custom course suggestions based on user interests and learning goals\n• Match Score System: Intelligent scoring algorithm (51-57% match scores) to rank course relevance\n• Comprehensive Course Database: Integration with Analytics Vidhya courses covering AI, NLP, Machine Learning, and Data Science\n• Vector Database Integration: Efficient storage and retrieval of course embeddings using OpenAI text-embedding-ada-002\n• RAG System Implementation: Retrieval-Augmented Generation for enhanced recommendation accuracy\n• User-Friendly Interface: Clean, modern design with intuitive course discovery experience\n\nCourse Categories:\n• Natural Language Processing (NLP) fundamentals and advanced techniques\n• Machine Learning and Deep Learning applications\n• AI Model Development (ChatGPT-style language models)\n• Text Classification and Sentiment Analysis\n• PyTorch and Neural Network implementations\n• Data Science and Analytics courses',
            technologies: 'Python, OpenAI text-embedding-ada-002, Vector Database, RAG System, Gradio, Hugging Face Spaces, Analytics Vidhya Platform, Machine Learning, NLP',
            team: 'Solo Project - Abhay Gupta\nAI/ML Engineer & Data Scientist',
            links: {
                'Live Demo': 'https://huggingface.co/spaces/Abs6187/EduPath_Explorer',
                'Hugging Face Space': 'https://huggingface.co/spaces/Abs6187/EduPath_Explorer'
            },
            achievements: 'AI-Powered Learning Platform\nVector Database Implementation\nRAG System Integration\nPersonalized Recommendation Engine\nHugging Face Spaces Deployment'
        },
        'JARVIS AI Assistant': {
            description: 'JARVIS - Just A Rather Very Intelligent System is a comprehensive voice-controlled AI assistant designed to streamline daily tasks and enhance productivity.\n\nKey Features:\n• Voice Recognition & Speech Processing: Advanced speech-to-text conversion with natural language understanding\n• Web Search Capabilities: Intelligent web searches with contextual results and information retrieval\n• Personalized News Updates: Custom news delivery based on user preferences and interests\n• Smart Alarm System: Voice-controlled alarm setting with custom messages and scheduling\n• Weather Information: Real-time weather updates and forecasts for any location\n• Application Management: Voice commands to open and manage desktop applications\n• Mathematical Calculations: Advanced calculator with voice input and spoken results\n• Focus Mode Integration: Productivity enhancement with distraction-free work environment\n• File Management: Voice-controlled file operations and organization\n• Game Integration: Interactive gaming features for entertainment and engagement\n• Dictionary Functionality: Quick word definitions and language assistance\n• Greeting System: Personalized welcome messages and user recognition\n\nTechnical Implementation:\n• Modular Architecture: Separate Python modules for different functionalities (Cal.py, alarm.py, file.py, etc.)\n• Speech Recognition: Advanced voice processing with multiple language support\n• Natural Language Processing: Understanding complex voice commands and queries\n• Cross-Platform Compatibility: Works on Windows, macOS, and Linux systems\n• Real-time Processing: Instant response to voice commands and queries',
            technologies: 'Python, SpeechRecognition, PyAudio, OpenAI GPT models, Natural Language Processing, Voice Processing, Cross-Platform Development, Modular Architecture',
            team: 'Solo Project - Abhay Gupta\nAI/ML Engineer & Voice Assistant Developer',
            links: {
                'GitHub Repository': 'https://github.com/Abs6187/JARVIS',
                'LinkedIn Post': 'https://www.linkedin.com/posts/abhay-gupta-197b17264_python-programming-virtualassistant-activity-7176592439070121985-7Tbe'
            },
            achievements: 'Voice-Controlled AI Assistant\nMulti-Modal User Interface\nCross-Platform Compatibility\nModular Architecture Implementation\nAdvanced Speech Recognition\nProductivity Enhancement System'
        },
        'Machine Learning Projects': {
            description: 'COMPREHENSIVE ML PORTFOLIO - A collection of advanced machine learning applications and AI projects deployed on Hugging Face Spaces.\n\nKey Projects:\n• Fake News Detector: Analyzes text and images to detect deceptive content using advanced NLP techniques\n• BuildTheFuture: AI-Powered Completion of Unfinished Constructions using computer vision and generative AI\n• Medical Report Analyzer: Analyze medical images for disease detection and diagnosis assistance\n• MediVerse: AI-Powered Disease Prediction system with comprehensive health analysis\n• Helmet License Plate Detection: Advanced computer vision system for traffic safety monitoring\n• AI Health v2: Generate personalized health and wellness plans using machine learning\n\nHugging Face Profile: Passionate about leveraging AI & ML to solve real-world problems, with focus on NLP, computer vision, and generative AI. Active contributor to open-source projects and exploring latest innovations in machine learning frameworks.\n\nTechnical Expertise:\n• 19+ Active Hugging Face Spaces\n• 3+ Currently Running Deployments\n• Advanced NLP and Computer Vision Applications\n• Generative AI and Deep Learning Models\n• Real-world Problem Solving with AI',
            technologies: 'Python, Hugging Face Transformers, TensorFlow, PyTorch, Computer Vision, NLP, Generative AI, Deep Learning, Scikit-learn, Pandas, NumPy, OpenCV, Streamlit, Gradio',
            team: 'Solo Projects - Abhay Gupta\nAI/ML Engineer & Open Source Contributor',
            links: {
                'Hugging Face Profile': 'https://huggingface.co/Abs6187',
                'Fake News Detector': 'https://huggingface.co/spaces/Abs6187/Fake-News-Detector-updated',
                'BuildTheFuture AI': 'https://huggingface.co/spaces/Abs6187/BuildTheFuture',
                'Medical Report Analyzer': 'https://huggingface.co/spaces/Abs6187/Medical-Report-Analyzer',
                'MediVerse': 'https://huggingface.co/spaces/404Solvers/MediVerse',
                'Helmet Detection': 'https://huggingface.co/spaces/Abs6187/Helmet-License-Plate-Detection',
                'AI Health v2': 'https://huggingface.co/spaces/Abs6187/AI_Health_v2'
            },
            achievements: '19+ Hugging Face Spaces Deployed\n3+ Active Running Applications\nAdvanced AI/ML Applications\nOpen Source Contributions\nReal-world Problem Solving\nCommunity Building & Knowledge Sharing'
        }
    };

    const project = projectDetails[projectName];
    if (project) {
        let linksHtml = '';
        Object.entries(project.links).forEach(([label, url]) => {
            linksHtml += `<a href="${url}" target="_blank" style="color: #FF4500; text-decoration: none; margin-right: 15px; display: block; margin-bottom: 8px;">${label}</a>`;
        });

        let detailsText = `${projectName}\n\n${project.description}\n\nTechnologies: ${project.technologies}`;
        
        if (project.team) {
            detailsText += `\n\nTeam: ${project.team}`;
        }
        
        if (project.achievements) {
            detailsText += `\n\nAchievements: ${project.achievements}`;
        }
        
        detailsText += `\n\nLinks:\n${linksHtml}`;

        alert(detailsText);
    } else {
        alert(`${projectName}\n\nProject details coming soon!`);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate layouts if needed
    console.log('Window resized');
}, 250));

// Initialize broken link handler
function initializeBrokenLinkHandler() {
    // Create modal for broken links
    createBrokenLinkModal();
    
    // Add event listeners to all external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="github.com"]):not([href*="linkedin.com"]):not([href*="linktr.ee"]):not([href*="huggingface.co"]):not([href*="vercel.app"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if link might be broken (you can customize this logic)
            const href = this.getAttribute('href');
            
            // Show under construction for broken or placeholder links
            if (href.includes('placeholder') || href.includes('coming-soon') || href.includes('under-construction') || href.includes('broken-link')) {
                e.preventDefault();
                showBrokenLinkModal();
            }
        });
    });
}

// Create broken link modal
function createBrokenLinkModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="broken-link-modal" class="broken-link-modal" style="display: none;">
            <div class="broken-link-overlay"></div>
            <div class="broken-link-content">
                <div class="broken-link-animation">
                    <img src="./assets/Under_Construction.gif" alt="Under Construction" class="construction-gif" />
                </div>
                <h2>🚧 Under Construction</h2>
                <p>This link is currently being worked on. Please check back later!</p>
                <div class="broken-link-actions">
                    <button class="broken-link-btn primary" onclick="closeBrokenLinkModal()">Got it!</button>
                    <a href="https://linktr.ee/Abhay_Gupta_6187" target="_blank" class="broken-link-btn secondary">Visit My Links</a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add CSS styles
    addBrokenLinkStyles();
}

// Add CSS styles for broken link modal
function addBrokenLinkStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .broken-link-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .broken-link-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .broken-link-content {
            position: relative;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 2px solid #333;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .broken-link-animation {
            margin-bottom: 30px;
        }
        
        .construction-gif {
            max-width: 200px;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(255, 69, 0, 0.3);
        }
        
        .broken-link-content h2 {
            color: #FF4500;
            font-size: 2rem;
            margin-bottom: 15px;
            font-weight: 700;
        }
        
        .broken-link-content p {
            color: #ccc;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .broken-link-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .broken-link-btn {
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            font-size: 1rem;
        }
        
        .broken-link-btn.primary {
            background: linear-gradient(45deg, #FF4500, #FF6347);
            color: white;
        }
        
        .broken-link-btn.secondary {
            background: linear-gradient(45deg, #2196F3, #21CBF3);
            color: white;
        }
        
        .broken-link-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 69, 0, 0.4);
        }
        
        .broken-link-btn.secondary:hover {
            box-shadow: 0 5px 15px rgba(33, 150, 243, 0.4);
        }
        
        @media (max-width: 768px) {
            .broken-link-content {
                padding: 30px 20px;
                margin: 20px;
            }
            
            .broken-link-content h2 {
                font-size: 1.5rem;
            }
            
            .broken-link-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .broken-link-btn {
                width: 100%;
                max-width: 200px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Show broken link modal
function showBrokenLinkModal() {
    const modal = document.getElementById('broken-link-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close broken link modal
function closeBrokenLinkModal() {
    const modal = document.getElementById('broken-link-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('broken-link-overlay')) {
        closeBrokenLinkModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBrokenLinkModal();
    }
});

// Initialize contact tracking
function initializeContactTracking() {
    // Track contact button clicks
    const contactButtons = document.querySelectorAll('.cs-button, .cs-social-links-container a');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (window.portfolioCounter) {
                window.portfolioCounter.trackContactClick();
            }
        });
    });
    
    // Track project detail clicks
    const projectButtons = document.querySelectorAll('button[onclick*="openProjectPage"], .demo-btn, .github-btn, .video-btn, .docs-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (window.portfolioCounter) {
                window.portfolioCounter.trackProjectClick();
            }
        });
    });
}
