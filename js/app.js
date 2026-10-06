/**
 * BOOK CAB VARANASI - IN-RIDE SEO REVIEW GENERATOR & ANTI-DUPLICATION ENGINE
 * 
 * SEO Target Keywords Architecture:
 * [Book Cab Varanasi, cab in varanasi, taxi in varanasi, varanasi to ayodhya cab, 
 *  varanasi to prayagraj cab, varanasi airport transfer cab, kashi vishwanath darshan taxi]
 * 
 * Technical Implementation:
 * - Algorithmic Anti-Duplication Engine (Levenshtein Distance + Jaccard Token Overlap)
 * - Persistent Submission Tracking (LocalStorage Hash Pool)
 * - Seamless Clipboard Copying & Redirect Flow (https://g.page/r/CYDWAEFVto6xEBM/review)
 */

document.addEventListener('DOMContentLoaded', () => {
    /* 1. DOM Elements Reference [Book Cab Varanasi UI Components] */
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

    // Step Cards
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    // Toast Notification
    const toast = document.getElementById('toast');

    let currentRating = 5;

    // Direct Google Business Review URL [CYDWAEFVto6xEBM]
    const GOOGLE_MAPS_REVIEW_URL = SEO_DATA.googleReviewUrl || "https://g.page/r/CYDWAEFVto6xEBM/review";

    /* ==========================================================================
       2. ANTI-DUPLICATION ENGINE (Levenshtein Distance & Jaccard Token Overlap)
       Keywords: [Book Cab Varanasi review verification, unique taxi review filter]
       ========================================================================== */

    const HISTORY_STORAGE_KEY = 'bcv_review_history_v2';
    const SIMILARITY_THRESHOLD = 0.65; // 65% similarity cutoff

    /**
     * Calculate Levenshtein Distance between two review strings
     */
    function calculateLevenshteinDistance(a, b) {
        const matrix = [];
        const lenA = a.length;
        const lenB = b.length;

        for (let i = 0; i <= lenB; i++) matrix[i] = [i];
        for (let j = 0; j <= lenA; j++) matrix[0][j] = j;

        for (let i = 1; i <= lenB; i++) {
            for (let j = 1; j <= lenA; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }

        return matrix[lenB][lenA];
    }

    /**
     * Calculate Jaccard Token Similarity (N-gram word overlap ratio)
     */
    function calculateJaccardSimilarity(str1, str2) {
        const tokenize = text => new Set(text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
        const set1 = tokenize(str1);
        const set2 = tokenize(str2);

        if (set1.size === 0 || set2.size === 0) return 0;

        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);

        return intersection.size / union.size;
    }

    /**
     * Calculate combined weighted similarity score between two texts (0.0 to 1.0)
     */
    function calculateCombinedSimilarity(text1, text2) {
        const s1 = text1.trim().toLowerCase();
        const s2 = text2.trim().toLowerCase();

        if (s1 === s2) return 1.0;

        const jaccardScore = calculateJaccardSimilarity(s1, s2);
        const maxLen = Math.max(s1.length, s2.length);
        if (maxLen === 0) return 1.0;

        const levDistance = calculateLevenshteinDistance(s1, s2);
        const levScore = 1.0 - (levDistance / maxLen);

        // Weighted blend: 60% Jaccard word token overlap + 40% Levenshtein edit distance
        return (jaccardScore * 0.6) + (levScore * 0.4);
    }

    /**
     * Retrieve local review submission history
     */
    function getSubmissionHistory() {
        try {
            const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Record new copied review string to local history
     */
    function recordSubmission(text) {
        try {
            const history = getSubmissionHistory();
            history.unshift({ text: text.trim(), timestamp: Date.now() });
            // Keep last 30 entries
            const trimmed = history.slice(0, 30);
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
        } catch (e) {
            console.warn('LocalStorage save skipped:', e);
        }
    }

    /**
     * Algorithmic duplicate check against local history
     */
    function checkDuplicateSimilarity(candidateText) {
        const history = getSubmissionHistory();
        for (const item of history) {
            const score = calculateCombinedSimilarity(candidateText, item.text);
            if (score >= SIMILARITY_THRESHOLD) {
                return { isDuplicate: true, score: score, matchText: item.text };
            }
        }
        return { isDuplicate: false, score: 0 };
    }


    /* ==========================================================================
       3. INPUT INITIALIZATION & EVENT CONTROLLERS
       Keywords: [innova crysta varanasi, tempo traveller varanasi, ertiga cab]
       ========================================================================== */

    function initializeSelects() {
        // Vehicle Select & Pills
        vehicleSelect.innerHTML = '';
        vehiclePillsContainer.innerHTML = '';

        SEO_DATA.vehicles.forEach((veh, index) => {
            const opt = document.createElement('option');
            opt.value = veh.name;
            opt.textContent = `${veh.icon} ${veh.name} (${veh.type})`;
            vehicleSelect.appendChild(opt);

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

        // Route Select & Pills
        routeSelect.innerHTML = '';
        routePillsContainer.innerHTML = '';

        SEO_DATA.routes.forEach((rt, index) => {
            const opt = document.createElement('option');
            opt.value = rt.name;
            opt.textContent = `${rt.icon} ${rt.name} - ${rt.tag}`;
            routeSelect.appendChild(opt);

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
        showToast("✨ Generated fresh review phrase!");
    });

    reviewTextarea.addEventListener('input', updateCharCount);

    // Star Rating Interactivity
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
                star.style.opacity = '0.35';
            }
        });
    }


    /* ==========================================================================
       4. EXECUTION FLOW & STRICT ANTI-DUPLICATION VALIDATOR
       SEO Redirect Target: [https://g.page/r/CYDWAEFVto6xEBM/review]
       ========================================================================== */

    copyGoBtn.addEventListener('click', async () => {
        const textToCopy = reviewTextarea.value.trim();

        if (!textToCopy) {
            showToast("⚠️ Review text cannot be empty!", true);
            return;
        }

        // Anti-Duplication Check
        const dupResult = checkDuplicateSimilarity(textToCopy);

        if (dupResult.isDuplicate) {
            showToast("⚠️ Similar review previously used! Generating 100% unique phrase...", true);
            
            // Auto-Synthesize 100% unique variation
            const vehicle = vehicleSelect.value || SEO_DATA.vehicles[0].name;
            const route = routeSelect.value || SEO_DATA.routes[0].name;
            const uniqueText = generateUniqueVariation(vehicle, route);
            
            reviewTextarea.value = uniqueText;
            templateTag.textContent = "100% Unique Verified";
            updateCharCount();
            return;
        }

        // Record to local anti-duplication history
        recordSubmission(textToCopy);

        // Visual State Pipeline
        copyGoBtn.classList.add('loading');
        copyGoBtn.innerHTML = `<span>📋 Copying Review...</span>`;
        setStepActive(step1);

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                reviewTextarea.select();
                document.execCommand('copy');
            }

            showToast("✅ Unique Review Copied to Clipboard!");

            setTimeout(() => {
                setStepActive(step2);
                copyGoBtn.innerHTML = `<span>🗺️ Opening Google Maps...</span>`;
            }, 600);

            setTimeout(() => {
                setStepActive(step3);
                copyGoBtn.innerHTML = `<span>⭐ Paste Review & Select 5 Stars!</span>`;
                
                // Direct Redirect to Google Review Form
                window.location.href = GOOGLE_MAPS_REVIEW_URL;

                setTimeout(() => {
                    copyGoBtn.classList.remove('loading');
                    copyGoBtn.innerHTML = `<span>Copy & Go to Google Maps</span> 🚀`;
                }, 3000);

            }, 1400);

        } catch (err) {
            console.error('Clipboard copy failed:', err);
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

    function showToast(msg, isWarning = false) {
        toast.querySelector('.toast-msg').textContent = msg;
        if (isWarning) {
            toast.classList.add('warning');
        } else {
            toast.classList.remove('warning');
        }
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // App Initialization
    initializeSelects();
    triggerReviewUpdate(0);
});
