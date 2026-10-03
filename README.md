# Book Cab Varanasi - In-Ride SEO Review Generator

**Target URL:** `bookcabvaranasi.vercel.app`  
**Brand:** BOOK CAB Varanasi  
**Support Hotline:** `9838409911`

---

## 🌟 Overview
The In-Ride SEO Review Generator is an ultra-fast, mobile-optimized single-page application built to eliminate friction for cab passengers submitting 5-star Google Maps reviews.

By allowing passengers to select their specific **Vehicle** and **Route**, the system dynamically injects high-value local transport keywords into natural, conversational review templates to boost BOOK CAB Varanasi's local search rankings.

---

## 🚀 Key Features

1. **Vehicle Roster**:
   - Swift Dzire
   - Maruti Ertiga
   - Toyota Innova Crysta
   - Force Urbania
   - Tempo Traveller

2. **High-Value SEO Routes**:
   - Varanasi Airport Transfer
   - Varanasi to Ayodhya
   - Varanasi Local Sightseeing
   - Varanasi to Prayagraj
   - Kashi Vishwanath Darshan

3. **SEO Review Engine**:
   - 5 Dynamic Templates (Templates A through E) to bypass Google duplicate review filters.
   - Dynamic parameter substitution (`{vehicle}`, `{route}`, `BOOK CAB Varanasi`, `9838409911`).
   - "Shuffle Phrase" button for generating alternate variations.
   - Live editable text box with character count indicator.

4. **Frictionless Copy & Redirect UX**:
   - 1-Tap "Copy & Go to Google Maps" CTA button.
   - Smooth 3-step visual instruction box (`Step 1: Auto-Copying Text`, `Step 2: Opening Google Maps`, `Step 3: Select 5 Stars & Paste!`).
   - `navigator.clipboard` integration with zero-delay fallback.

5. **In-Cab seatback QR Code Sticker**:
   - Built-in seatback sticker poster preview modal with print functionality.

---

## 💻 Tech Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6)
- **Frameworks/Dependencies:** None (0kb runtime overhead for lightning load on 3G/4G highway networks)
- **Deployment:** Vercel (`vercel.json` included)

---

## 🌐 Deploying to Vercel

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Navigate to project directory
cd bookcabvaranasi-review

# Deploy to Vercel
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Push this folder repository to GitHub/GitLab.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository.
4. Set domain / alias to `bookcabvaranasi.vercel.app`.
5. Click **Deploy**.
