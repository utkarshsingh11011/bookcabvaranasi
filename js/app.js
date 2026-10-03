/**
 * Book Cab Varanasi - In-Ride SEO Review Generator
 * Application Logic (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const vehicleSelect = document.getElementById('vehicle-select');
    const routeSelect = document.getElementById('route-select');
    const vehiclePillsContainer = document.getElementById('vehicle-pills');
    const routePillsContainer = document.getElementById('route-pills');
    const reviewTextarea = document.getElementById('review-textarea');
    const charCounter = document.getElementById('char-counter');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const copyGoBtn = document.getElementById('copy-go-btn');
    const templateTag = document.getElementById('template-tag');
    const starRatingContainer = document.getElementById('star-rating');

    // Steps
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    // Toast & Modal
    const toast = document.getElementById('toast');
    const qrModal = document.getElementById('qr-modal');
    const viewQrBtn = document.getElementById('view-qr-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    let currentRating = 5;

    // Google Maps Review URL fallback (points to search / review for BOOK CAB Varanasi)
    // Business owners can change this URL or configure custom place ID link.
    const GOOGLE_MAPS_REVIEW_URL = "https://www.google.com/maps/search/BOOK+CAB+Varanasi+9838409911";

    // 1. Populate Dropdowns & Quick Pills
    function initializeSelects() {
        // Vehicles Dropdown & Pills
        vehicleSelect.innerHTML = '';
        vehiclePillsContainer.innerHTML = '';

        SEO_DATA.vehicles.forEach((veh, index) => {
            // Select Option
            const opt = document.createElement('option');
            opt.value = veh.name;
            opt.textContent = `${veh.icon} ${veh.name} (${veh.type})`;
            vehicleSelect.appendChild(opt);

            // Quick Pill
            const pill = document.createElement('button');
            pill.className = `pill-option ${index === 0 ? 'active' : ''}`;
            pill.textContent = `${veh.icon} ${veh.name}`;
            pill.dataset.value = veh.name;
            pill.type = 'button';
            pill.addEventListener('click', () => {
                vehicleSelect.value = veh.name;
                updateActivePills(vehiclePillsContainer, pill);
                triggerReviewUpdate();
            });
            vehiclePillsContainer.appendChild(pill);
        });

        // Routes Dropdown & Pills
        routeSelect.innerHTML = '';
        routePillsContainer.innerHTML = '';

        SEO_DATA.routes.forEach((rt, index) => {
            // Select Option
            const opt = document.createElement('option');
            opt.value = rt.name;
            opt.textContent = `${rt.icon} ${rt.name} - ${rt.tag}`;
            routeSelect.appendChild(opt);

            // Quick Pill
            const pill = document.createElement('button');
            pill.className = `pill-option ${index === 0 ? 'active' : ''}`;
            pill.textContent = `${rt.icon} ${rt.name}`;
            pill.dataset.value = rt.name;
            pill.type = 'button';
            pill.addEventListener('click', () => {
                routeSelect.value = rt.name;
                updateActivePills(routePillsContainer, pill);
                triggerReviewUpdate();
            });
            routePillsContainer.appendChild(pill);
        });
    }

    function updateActivePills(container, activePill) {
        container.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
        activePill.classList.add('active');
    }

    function syncPillsWithSelect(container, selectValue) {
        container.querySelectorAll('.pill-option').forEach(p => {
            if (p.dataset.value === selectValue) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });
    }

    // 2. Review Engine Generator & Sync
    function triggerReviewUpdate(forceIndex = -1) {
        const vehicle = vehicleSelect.value || SEO_DATA.vehicles[0].name;
        const route = routeSelect.value || SEO_DATA.routes[0].name;

        const result = generateSEOReview(vehicle, route, forceIndex);
        reviewTextarea.value = result.text;
        templateTag.textContent = result.tag;
        updateCharCount();
    }

    function updateCharCount() {
        const len = reviewTextarea.value.length;
        charCounter.textContent = `${len} characters`;
    }

    // 3. Event Listeners for Controls
    vehicleSelect.addEventListener('change', () => {
        syncPillsWithSelect(vehiclePillsContainer, vehicleSelect.value);
        triggerReviewUpdate();
    });

    routeSelect.addEventListener('change', () => {
        syncPillsWithSelect(routePillsContainer, routeSelect.value);
        triggerReviewUpdate();
    });

    shuffleBtn.addEventListener('click', () => {
        triggerReviewUpdate();
        showToast("✨ Generated fresh review template!");
    });

    reviewTextarea.addEventListener('input', updateCharCount);

    // Star Rating Toggle
    starRatingContainer.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.dataset.value, 10);
            currentRating = val;
            updateStarDisplay(val);
        });
    });

    function updateStarDisplay(rating) {
        starRatingContainer.querySelectorAll('.star').forEach((star, index) => {
            if (index < rating) {
                star.textContent = '★';
                star.style.opacity = '1';
            } else {
                star.textContent = '☆';
                star.style.opacity = '0.4';
            }
        });
    }

    // 4. Execution: Copy & Redirect Flow
    copyGoBtn.addEventListener('click', async () => {
        const textToCopy = reviewTextarea.value.trim();

        if (!textToCopy) {
            showToast("⚠️ Review text cannot be empty!");
            return;
        }

        // Disable button during execution animation
        copyGoBtn.classList.add('loading');
        copyGoBtn.innerHTML = `<span>📋 Copying Review...</span>`;

        // Step 1 Active
        setStepActive(step1);

        try {
            // Write to Clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Fallback for older browsers
                reviewTextarea.select();
                document.execCommand('copy');
            }

            showToast("✅ Review Copied to Clipboard!");

            // Step 2 Active
            setTimeout(() => {
                setStepActive(step2);
                copyGoBtn.innerHTML = `<span>🗺️ Opening Google Maps...</span>`;
            }, 600);

            // Step 3 Active & Redirect
            setTimeout(() => {
                setStepActive(step3);
                copyGoBtn.innerHTML = `<span>⭐ Paste Review & Tap 5 Stars!</span>`;
                
                // Fire window location redirect
                window.location.href = GOOGLE_MAPS_REVIEW_URL;

                // Reset button state after a delay
                setTimeout(() => {
                    copyGoBtn.classList.remove('loading');
                    copyGoBtn.innerHTML = `<span>Copy & Go to Google Maps</span> 🚀`;
                }, 3000);

            }, 1400);

        } catch (err) {
            console.error('Clipboard failed:', err);
            // Fallback manual prompt if clip fails
            reviewTextarea.select();
            showToast("📋 Text selected! Long-press to Copy.");
            
            setTimeout(() => {
                window.location.href = GOOGLE_MAPS_REVIEW_URL;
                copyGoBtn.classList.remove('loading');
                copyGoBtn.innerHTML = `<span>Copy & Go to Google Maps</span> 🚀`;
            }, 2000);
        }
    });

    function setStepActive(targetStep) {
        [step1, step2, step3].forEach(s => s.classList.remove('active'));
        targetStep.classList.add('active');
    }

    // Toast Utility
    function showToast(msg) {
        toast.querySelector('.toast-msg').textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Modal Control
    viewQrBtn.addEventListener('click', () => {
        qrModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        qrModal.classList.remove('active');
    });

    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.remove('active');
        }
    });

    // Initialize App
    initializeSelects();
    triggerReviewUpdate(0); // Initial Template A
});
