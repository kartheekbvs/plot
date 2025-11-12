// DataViz Academy - Main JavaScript File

// Initialize animations and interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeProgressRings();
    initializeGalleryFilters();
    initializeQuickStartChart();
    initializeScrollAnimations();
});

// Animation initialization
function initializeAnimations() {
    // Animate learning nodes on hover
    const learningNodes = document.querySelectorAll('.learning-node');
    learningNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            anime({
                targets: node,
                scale: 1.05,
                translateY: -8,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        node.addEventListener('mouseleave', () => {
            anime({
                targets: node,
                scale: 1,
                translateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });

    // Animate visualization cards
    const vizCards = document.querySelectorAll('.visualization-card');
    vizCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -12,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Progress ring animations
function initializeProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    
    progressRings.forEach((ring, index) => {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = [75, 60, 30][index]; // Different progress for each ring
                    const offset = circumference - (progress / 100) * circumference;
                    
                    anime({
                        targets: ring,
                        strokeDashoffset: offset,
                        duration: 1500,
                        delay: index * 200,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
        
        observer.observe(ring);
    });
}

// Gallery filter functionality
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.visualization-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update button styles
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('bg-blue-600', 'text-white');
            
            // Filter cards
            galleryCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        easing: 'easeOutCubic'
                    });
                    card.style.display = 'block';
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        scale: 0.8,
                        duration: 300,
                        easing: 'easeInCubic',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Quick start chart using ECharts
function initializeQuickStartChart() {
    const chartContainer = document.getElementById('quick-start-chart');
    if (!chartContainer) return;
    
    const chart = echarts.init(chartContainer);
    
    // Generate sample data for sine wave
    const data = [];
    for (let i = 0; i <= 100; i++) {
        const x = (i / 100) * 10;
        const y = Math.sin(x);
        data.push([x, y]);
    }
    
    const option = {
        grid: {
            left: '10%',
            right: '10%',
            top: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'value',
            name: 'x',
            nameLocation: 'middle',
            nameGap: 25,
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' }
        },
        yAxis: {
            type: 'value',
            name: 'y',
            nameLocation: 'middle',
            nameGap: 30,
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' }
        },
        series: [{
            name: 'sin(x)',
            type: 'line',
            data: data,
            smooth: true,
            lineStyle: {
                color: '#3b82f6',
                width: 2
            },
            symbol: 'none',
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }],
        title: {
            text: 'Sine Wave Example',
            left: 'center',
            top: 10,
            textStyle: {
                color: '#374151',
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                return `x: ${params[0].value[0].toFixed(2)}<br/>y: ${params[0].value[1].toFixed(3)}`;
            }
        }
    };
    
    chart.setOption(option);
    
    // Animate chart on load
    setTimeout(() => {
        chart.resize();
    }, 100);
    
    // Responsive resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [24, 0],
                    duration: 600,
                    easing: 'easeOutCubic',
                    delay: anime.stagger(100)
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animation
    const animatedElements = document.querySelectorAll('.glass-card, .visualization-card, .learning-node');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Utility functions for interactive features

// Learning progress tracker
const LearningProgress = {
    data: {
        matplotlib: 75,
        seaborn: 60,
        practice: 30
    },
    
    updateProgress(library, percentage) {
        this.data[library] = percentage;
        this.saveProgress();
        this.updateUI();
    },
    
    saveProgress() {
        localStorage.setItem('dataviz-progress', JSON.stringify(this.data));
    },
    
    loadProgress() {
        const saved = localStorage.getItem('dataviz-progress');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    },
    
    updateUI() {
        // Update progress rings
        const rings = document.querySelectorAll('.progress-ring-circle');
        rings.forEach((ring, index) => {
            const libraries = ['matplotlib', 'seaborn', 'practice'];
            const progress = this.data[libraries[index]];
            const radius = 40;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progress / 100) * circumference;
            
            anime({
                targets: ring,
                strokeDashoffset: offset,
                duration: 1000,
                easing: 'easeOutCubic'
            });
        });
    }
};

// Code example manager
const CodeExamples = {
    examples: {
        basicPlot: `import matplotlib.pyplot as plt
import numpy as np

# Create data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create plot
plt.figure(figsize=(8, 6))
plt.plot(x, y, label='sin(x)', color='blue', linewidth=2)
plt.title('Sine Wave Example')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()`,

        seabornPlot: `import seaborn as sns
import matplotlib.pyplot as plt

# Load sample data
tips = sns.load_dataset('tips')

# Create scatter plot
plt.figure(figsize=(10, 6))
sns.scatterplot(data=tips, x='total_bill', y='tip', hue='time', style='smoker')
plt.title('Tips vs Total Bill')
plt.show()`,

        advancedPlot: `import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

# Create 3D plot
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Generate data
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

# Plot surface
surf = ax.plot_surface(X, Y, Z, cmap='viridis')
ax.set_title('3D Surface Plot')
plt.show()`
    },
    
    copyToClipboard(code) {
        navigator.clipboard.writeText(code).then(() => {
            this.showNotification('Code copied to clipboard!');
        });
    },
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: 300,
                opacity: 0,
                duration: 300,
                easing: 'easeInCubic',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 2000);
    }
};

// Search functionality
const SearchManager = {
    initialize() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }
    },
    
    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        const searchableElements = document.querySelectorAll('[data-searchable]');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (query === '' || text.includes(query)) {
                element.style.display = 'block';
                anime({
                    targets: element,
                    opacity: 1,
                    duration: 300
                });
            } else {
                anime({
                    targets: element,
                    opacity: 0,
                    duration: 300,
                    complete: () => {
                        element.style.display = 'none';
                    }
                });
            }
        });
    }
};

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', () => {
    SearchManager.initialize();
    LearningProgress.loadProgress();
});

// Export functions for global access
window.DataVizAcademy = {
    LearningProgress,
    CodeExamples,
    SearchManager
};