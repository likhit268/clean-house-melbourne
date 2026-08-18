/* ==========================================================================
   Clean House Melbourne — Premium Website Redesign Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initServiceModals();
    initBeforeAfterSlider();
    initReviewsCarousel();
    initPricingCalculator();
    initSuburbChecker();
    initFaqAccordion();
    initQuoteForm();
    initScrollToForm();
});

/* --------------------------------------------------------------------------
   1. Header Scroll Effect
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.querySelector('header.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.nav-mobile');
    const overlay = document.querySelector('.nav-mobile-overlay');
    const links = document.querySelectorAll('.nav-mobile .nav-links a, .nav-mobile .btn');

    if (!toggle || !drawer || !overlay) return;

    function openMenu() {
        toggle.classList.add('open');
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        if (drawer.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* --------------------------------------------------------------------------
   3. Service Detail Modals Database & Logic
   -------------------------------------------------------------------------- */
const SERVICES_DATA = {
    'regular-cleaning': {
        title: 'Regular House Cleaning',
        description: 'Reliable and consistent ongoing cleaning designed around your home’s priorities. Keep your space pristine week after week without lifting a finger.',
        image: 'assets/images/cleaner_detail.jpg',
        inclusions: [
            'Kitchen cleaning (counters, stove, sink, appliance exteriors)',
            'Bathroom scrubbing and sanitization (shower, tub, toilet, vanity)',
            'Dusting all accessible surfaces and furniture',
            'Vacuuming carpets and mopping hard floors',
            'Emptying bins and replacing liners',
            'Polishing mirrors and chrome fixtures'
        ]
    },
    'housekeeping': {
        title: 'Housekeeping Services',
        description: 'Go beyond basic cleaning. Our premium housekeeping service helps keep your entire household organized, tidy, and running smoothly.',
        image: 'assets/images/hero_melbourne_home.jpg',
        inclusions: [
            'All regular cleaning tasks included',
            'Laundry washing, folding, and ironing',
            'Tidying up rooms and organizing wardrobes',
            'Changing bed linens and making beds',
            'Dishwasher loading and unloading',
            'Custom light organizing projects'
        ]
    },
    'deep-cleaning': {
        title: 'Deep / Spring Cleaning',
        description: 'A detailed, comprehensive reset for homes that need extra attention. Perfect for seasonal cleaning or preparing a home for a special event.',
        image: 'assets/images/cleaner_detail.jpg',
        inclusions: [
            'Thorough dusting of skirting boards, door frames, and cornices',
            'Detailed cleaning of rangehoods and stovetop burners',
            'Wiping down tile grouting and splashbacks',
            'Cleaning behind and under light furniture where possible',
            'Inside window glass and window tracks',
            'Cobweb removal and high dusting'
        ]
    },
    'end-of-lease': {
        title: 'End of Lease Cleaning',
        description: 'Professional, move-out cleaning designed to meet strict agency inspection checklists. Secure your bond refund with confidence.',
        image: 'assets/images/before_kitchen.jpg',
        inclusions: [
            'All cupboards and drawers cleaned inside and out',
            'Oven, grill, rangehood, and stovetop detailing',
            'Bathrooms, showers, toilets, and tiles deep cleaned',
            'All windows cleaned internally (external ground floor only)',
            'Skirting boards, architraves, doors, and walls spot cleaned',
            'Full vacuuming and mopping'
        ]
    },
    'after-renovation': {
        title: 'After Renovation Cleaning',
        description: 'Specialist dust and residue removal following construction or home remodeling. We make your newly renovated space immediately livable.',
        image: 'assets/images/before_kitchen.jpg',
        inclusions: [
            'Eradication of fine drywall, plaster, and construction dust',
            'Detailed cleaning of all fixtures, switches, and fittings',
            'Removing labels and paint splatters from glass and surfaces',
            'Inside and outside of all new cabinets and joinery',
            'Polishing metal surfaces and glass backsplashes',
            'HEPA filtration vacuuming and damp mopping'
        ]
    },
    'carpet-cleaning': {
        title: 'Professional Carpet Cleaning',
        description: 'Deep steam carpet extraction to remove embedded dirt, stains, allergens, and odors. Restores fiber texture and brightens rooms.',
        image: 'assets/images/cleaner_detail.jpg',
        inclusions: [
            'Industrial steam extraction / hot water extraction',
            'Pre-treatment of traffic lanes and heavy soil areas',
            'Targeted spot treatment for stubborn stains',
            'Deodorizing and sanitizing carpet fibers',
            'Suitable for wool, nylon, and synthetic carpets',
            'Fast drying times with professional equipment'
        ]
    },
    'window-cleaning': {
        title: 'Professional Window Cleaning',
        description: 'Streak-free window washing for residential properties. Let the Melbourne sun shine through crystal clear glass.',
        image: 'assets/images/hero_melbourne_home.jpg',
        inclusions: [
            'Internal and external window pane washing',
            'Detailed cleaning of window tracks and sills',
            'Wiping down screens and window frames',
            'Removal of stubborn dirt, cobwebs, and bird residue',
            'Ground-floor and ladder-accessible window reaches',
            'Streak-free squeeze finish'
        ]
    },
    'decluttering': {
        title: 'Home Organising & Decluttering',
        description: 'Compassionate, practical support to reclaim your space. We work with you to categorize, declutter, and establish organizing systems.',
        image: 'assets/images/hero_melbourne_home.jpg',
        inclusions: [
            'Pantry and kitchen cupboard organization',
            'Wardrobe sorting, decluttering, and seasonal rotations',
            'Creating custom storage solutions for children’s playrooms',
            'Assisting with downsizing or packing/unpacking for moves',
            'Establishing maintainable household systems',
            'Sorting and categorizing items for donation or disposal'
        ]
    },
    'rubbish-removal': {
        title: 'Convenient Rubbish Removal',
        description: 'Hassle-free clearance of unwanted household clutter, green waste, or cardboard boxes. Fast local service.',
        image: 'assets/images/before_kitchen.jpg',
        inclusions: [
            'Loading and hauling unwanted items',
            'Eco-friendly disposal (sorting recycling vs landfill)',
            'Disposing of old furniture and small whitegoods',
            'Cardboard box flat-packing and removal',
            'De deceased estate clear-out assistance',
            'Post-cleanup sweep of the loading area'
        ]
    },
    'after-party': {
        title: 'After Party Cleaning',
        description: 'Get your home back to normal after celebrations, events, or dinner parties. Fast response and complete cleanup.',
        image: 'assets/images/cleaner_detail.jpg',
        inclusions: [
            'Collecting and sorting bottles, cans, and recycling',
            'Washing glasses, dishes, and kitchen surfaces',
            'Sanitizing bathrooms and toilets',
            'Spot-treating carpet spills and floor mopping',
            'Emptying all rubbish bins and removing trash bags',
            'Tidying and resetting the living areas'
        ]
    },
    'pressure-cleaning': {
        title: 'Outdoor Pressure Cleaning',
        description: 'High-pressure washing for driveways, patios, decks, and outdoor tiled surfaces to blast away grime, moss, and weather stains.',
        image: 'assets/images/before_kitchen.jpg',
        inclusions: [
            'Driveway pressure cleaning (concrete or pavers)',
            'Patio, veranda, and courtyard washing',
            'Removal of oil stains, dirt, and algae buildup',
            'Outdoor tiled area scrub and grout cleaning',
            'Timber deck preparation wash',
            'Fascia, eaves, and exterior wall soft washing'
        ]
    },
    'ndis-cleaning': {
        title: 'NDIS / Specialist Cleaning',
        description: 'Trusted, verified NDIS service provider. We tailor cleaning and housekeeping schedules to support individual client needs and maintain safe home environments.',
        image: 'assets/images/cleaner_detail.jpg',
        inclusions: [
            'NDIS-aligned invoicing and service agreements',
            'Consistent cleaner assigned for comfort and stability',
            'Customized chore checklist based on planner goals',
            'Specialist decluttering and hoarder cleaning support',
            'Flexible scheduling and clear communication lines',
            'Safe, respectful, and fully vetted team members'
        ]
    }
};

function initServiceModals() {
    const modalOverlay = document.getElementById('service-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalInclusions = document.getElementById('modal-inclusions');
    const modalCtaBtn = document.getElementById('modal-cta');
    const learnMoreButtons = document.querySelectorAll('.learn-more-trigger');

    if (!modalOverlay) return;

    function openModal(serviceId) {
        const data = SERVICES_DATA[serviceId];
        if (!data) return;

        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        // Populate Inclusions list
        modalInclusions.innerHTML = '';
        data.inclusions.forEach(inc => {
            const li = document.createElement('li');
            li.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${inc}</span>
            `;
            modalInclusions.appendChild(li);
        });

        // Set CTA tracking service
        modalCtaBtn.setAttribute('data-prefill', data.title);
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    learnMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = btn.getAttribute('data-service');
            openModal(serviceId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Handle quote prefill from modal click
    modalCtaBtn.addEventListener('click', () => {
        closeModal();
        const serviceName = modalCtaBtn.getAttribute('data-prefill');
        const serviceSelect = document.getElementById('service-required');
        if (serviceSelect) {
            // Find option matching title
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].text.includes(serviceName) || serviceSelect.options[i].value === serviceName) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
        }
        // Scroll to form
        const formSec = document.getElementById('quote-form-section');
        if (formSec) {
            formSec.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* --------------------------------------------------------------------------
   4. Before / After Interactive Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
    const container = document.querySelector('.ba-slider');
    const handle = document.querySelector('.ba-handle');
    const beforeImg = document.querySelector('.ba-image-before');

    if (!container || !handle || !beforeImg) return;

    let active = false;

    function adjustSlider(xPos) {
        const rect = container.getBoundingClientRect();
        let percentage = ((xPos - rect.left) / rect.width) * 100;
        
        // Clamp boundaries
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        handle.style.left = `${percentage}%`;
        beforeImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    }

    // Pointer events (handles mouse and touch)
    function onStart(e) {
        active = true;
        document.body.style.cursor = 'ew-resize';
    }

    function onEnd() {
        active = false;
        document.body.style.cursor = '';
    }

    function onMove(e) {
        if (!active) return;
        let x = e.clientX;
        if (e.touches) {
            x = e.touches[0].clientX;
        }
        adjustSlider(x);
    }

    // Attach listeners
    handle.addEventListener('mousedown', onStart);
    handle.addEventListener('touchstart', onStart, { passive: true });

    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    // Handle resizing window to preserve ratios
    window.addEventListener('resize', () => {
        const leftPct = parseFloat(handle.style.left) || 50;
        beforeImg.style.clipPath = `polygon(0 0, ${leftPct}% 0, ${leftPct}% 100%, 0 100%)`;
    });
}

/* --------------------------------------------------------------------------
   5. Reviews Slider (Carousel)
   -------------------------------------------------------------------------- */
function initReviewsCarousel() {
    const track = document.querySelector('.reviews-track');
    const slides = document.querySelectorAll('.review-slide');
    const nextBtn = document.getElementById('rev-next');
    const prevBtn = document.getElementById('rev-prev');
    const dotsContainer = document.getElementById('rev-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('review-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.review-dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Autoplay reviews every 8 seconds
    let autoplayInterval = setInterval(nextSlide, 8000);

    const stopAutoplay = () => clearInterval(autoplayInterval);
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('touchstart', stopAutoplay);
}

/* --------------------------------------------------------------------------
   6. Pricing Calculator
   -------------------------------------------------------------------------- */
function initPricingCalculator() {
    const serviceSelect = document.getElementById('calc-service-type');
    const cleanersValue = document.getElementById('calc-cleaners-val');
    const cleanersMinus = document.getElementById('calc-cleaners-minus');
    const cleanersPlus = document.getElementById('calc-cleaners-plus');
    
    const hoursValue = document.getElementById('calc-hours-val');
    const hoursMinus = document.getElementById('calc-hours-minus');
    const hoursPlus = document.getElementById('calc-hours-plus');

    const resHoursText = document.getElementById('calc-res-hours');
    const resRateText = document.getElementById('calc-res-rate');
    const resTotalText = document.getElementById('calc-res-total');
    const calcBookBtn = document.getElementById('calc-book-btn');

    if (!serviceSelect || !cleanersValue || !hoursValue) return;

    let currentCleaners = 1;
    let currentHours = 6; // default minimum for regular

    function updateCalculator() {
        const isRenovation = serviceSelect.value === 'renovation';
        const hourlyRate = 70; // $70 per cleaner per hour
        const minHours = isRenovation ? 10 : 6;

        // Enforce boundaries based on service selection
        if (currentHours < minHours) {
            currentHours = minHours;
        }

        hoursValue.textContent = currentHours;
        cleanersValue.textContent = currentCleaners;

        // Disable buttons if at boundaries
        cleanersMinus.disabled = currentCleaners <= 1;
        cleanersPlus.disabled = currentCleaners >= 4;
        
        hoursMinus.disabled = currentHours <= minHours;
        hoursPlus.disabled = currentHours >= 16;

        // Calculate rates
        const totalPersonHours = currentCleaners * currentHours;
        let subtotal = totalPersonHours * hourlyRate;
        let rateString = `$${hourlyRate}/hour`;

        if (isRenovation) {
            subtotal = subtotal * 1.1; // Add 10% GST
            rateString = `$${hourlyRate}/hour + GST`;
        }

        // Render values
        resHoursText.textContent = `${totalPersonHours} person-hours`;
        resRateText.textContent = rateString;
        resTotalText.textContent = `$${Math.round(subtotal)}`;
    }

    // Event listeners
    serviceSelect.addEventListener('change', () => {
        const isRenovation = serviceSelect.value === 'renovation';
        currentHours = isRenovation ? 10 : 6;
        updateCalculator();
    });

    cleanersMinus.addEventListener('click', () => {
        if (currentCleaners > 1) {
            currentCleaners--;
            updateCalculator();
        }
    });

    cleanersPlus.addEventListener('click', () => {
        if (currentCleaners < 4) {
            currentCleaners++;
            updateCalculator();
        }
    });

    hoursMinus.addEventListener('click', () => {
        const isRenovation = serviceSelect.value === 'renovation';
        const minHours = isRenovation ? 10 : 6;
        if (currentHours > minHours) {
            currentHours--;
            updateCalculator();
        }
    });

    hoursPlus.addEventListener('click', () => {
        if (currentHours < 16) {
            currentHours++;
            updateCalculator();
        }
    });

    // Populate Quote Form when clicking Calculator CTA
    calcBookBtn.addEventListener('click', () => {
        const serviceRequired = document.getElementById('service-required');
        const messageBox = document.getElementById('cleaning-requirements');
        
        if (serviceRequired) {
            if (serviceSelect.value === 'regular') {
                serviceRequired.value = 'Regular House Cleaning';
            } else {
                serviceRequired.value = 'After Renovation Cleaning';
            }
        }

        if (messageBox) {
            messageBox.value = `Hi Mimmo & Nancy, I would like to enquire based on the pricing calculator estimate: ${currentCleaners} cleaner(s) for ${currentHours} hours (${currentCleaners * currentHours} total person-hours).`;
        }

        // Scroll to form
        const formSec = document.getElementById('quote-form-section');
        if (formSec) {
            formSec.scrollIntoView({ behavior: 'smooth' });
        }
        showToast('Calculator preferences saved to quote form below!', 'success');
    });

    // Initial setup
    updateCalculator();
}

/* --------------------------------------------------------------------------
   7. Suburb Checker
   -------------------------------------------------------------------------- */
const SERVED_SUBURBS = [
    'melbourne', 'cbd', 'southbank', 'docklands', 'st kilda', 'richmond', 'toorak', 
    'fitzroy', 'carlton', 'south yarra', 'port melbourne', 'brunswick', 'hawthorn', 
    'collingwood', 'prahran', 'albert park', 'windsor', 'east melbourne', 'west melbourne', 
    'north melbourne', 'kensington', 'abbotsford', 'cremorne', 'middle park', 'yarraville',
    'footscray', 'elwood', 'clifton hill', 'northcote', 'thornbury', 'preston', 'coburg',
    'kew', 'camberwell', 'malvern', 'armadale', 'prahran', 'caulfield', 'brighton'
];

function initSuburbChecker() {
    const input = document.getElementById('suburb-search-input');
    const button = document.getElementById('suburb-search-btn');
    const resultDiv = document.getElementById('suburb-search-result');

    if (!input || !button || !resultDiv) return;

    function checkSuburb() {
        const val = input.value.trim().toLowerCase();
        if (!val) {
            resultDiv.className = 'lookup-result error';
            resultDiv.innerHTML = 'Please enter a suburb name.';
            return;
        }

        const isServed = SERVED_SUBURBS.some(sub => val.includes(sub) || sub.includes(val));

        if (isServed) {
            resultDiv.className = 'lookup-result success';
            resultDiv.innerHTML = `✓ Yes! We clean in ${input.value}. We regularly operate in this area. Complete the quote form to book a cleaner.`;
            // Also update the suburb input in the quote forms if empty
            const heroSuburb = document.getElementById('suburb-hero');
            const mainSuburb = document.getElementById('suburb-main');
            if (heroSuburb && !heroSuburb.value) heroSuburb.value = input.value;
            if (mainSuburb && !mainSuburb.value) mainSuburb.value = input.value;
        } else {
            resultDiv.className = 'lookup-result error';
            resultDiv.innerHTML = `We primarily serve within 15 km of Melbourne CBD. We might still cover "${input.value}"! Please submit a quote request below so Mimmo or Nancy can verify availability.`;
        }
    }

    button.addEventListener('click', checkSuburb);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkSuburb();
        }
    });
}

/* --------------------------------------------------------------------------
   8. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const headers = document.querySelectorAll('.faq-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.faq-body');
            const isActive = item.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-body').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}

/* --------------------------------------------------------------------------
   9. Quote Forms validation & Toast feedback
   -------------------------------------------------------------------------- */
function initQuoteForm() {
    const heroForm = document.getElementById('hero-quote-form');
    const mainForm = document.getElementById('main-quote-form');

    function handleSubmit(e, formType) {
        e.preventDefault();
        const form = e.target;
        const nameField = form.querySelector('[name="name"]');
        const phoneField = form.querySelector('[name="phone"]');
        const emailField = form.querySelector('[name="email"]');
        const suburbField = form.querySelector('[name="suburb"]');
        
        if (!nameField.value.trim() || !phoneField.value.trim() || !emailField.value.trim() || !suburbField.value.trim()) {
            showToast('Please fill out all required fields.', 'error');
            return;
        }

        const nameVal = nameField.value.trim();

        // Successful submission mock (shows feedback, clears form)
        showToast(`Thank you, ${nameVal}! Your quote request has been sent. Mimmo & Nancy will call/SMS you shortly.`, 'success');
        form.reset();
    }

    if (heroForm) {
        heroForm.addEventListener('submit', (e) => handleSubmit(e, 'Hero Form'));
    }
    if (mainForm) {
        mainForm.addEventListener('submit', (e) => handleSubmit(e, 'Main Contact Form'));
    }
}

/* --------------------------------------------------------------------------
   10. Scroll to Form prefill mapping
   -------------------------------------------------------------------------- */
function initScrollToForm() {
    const ctaLinks = document.querySelectorAll('[href="#quote-form-section"], [href="#contact"]');
    ctaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSec = document.getElementById('quote-form-section');
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth' });
                
                // Prefill logic based on what CTA was clicked
                const prefillService = link.getAttribute('data-prefill-service');
                const serviceSelect = document.getElementById('service-required');
                if (prefillService && serviceSelect) {
                    for (let i = 0; i < serviceSelect.options.length; i++) {
                        if (serviceSelect.options[i].text.includes(prefillService) || serviceSelect.options[i].value === prefillService) {
                            serviceSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Utility: Custom Toast System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
    // Check if toast already exists
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.className = `toast-notification toast-${type} show`;
    
    // Icon SVG based on type
    const checkIcon = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    `;
    const errIcon = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
    `;

    toast.innerHTML = `
        ${type === 'success' ? checkIcon : errIcon}
        <span>${message}</span>
    `;

    // Clear after 6 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 6000);
}
