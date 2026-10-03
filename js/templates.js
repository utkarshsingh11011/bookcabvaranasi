/**
 * Book Cab Varanasi - SEO Review Templates Engine
 * Pure Vanilla JS, zero dependencies, edge-optimized.
 */

const SEO_DATA = {
    brandName: "BOOK CAB Varanasi",
    supportPhone: "9838409911",
    supportPhoneFormatted: "+91 98384 09911",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ05yT8r1vDzkR..._BOOK_CAB_VARANASI", // Default Google Review search URL fallback
    
    vehicles: [
        { id: "swift-dzire", name: "Swift Dzire", type: "Sedan (4 Seater)", icon: "🚗" },
        { id: "maruti-ertiga", name: "Maruti Ertiga", type: "MPV (6 Seater)", icon: "🚐" },
        { id: "innova-crysta", name: "Toyota Innova Crysta", type: "Premium SUV (7 Seater)", icon: "🚘" },
        { id: "force-urbania", name: "Force Urbania", type: "Luxury Minibus (12-17 Seater)", icon: "🚌" },
        { id: "tempo-traveller", name: "Tempo Traveller", type: "Group Traveller (12-26 Seater)", icon: "🚐" }
    ],

    routes: [
        { id: "airport-transfer", name: "Varanasi Airport Transfer", tag: "Airport Drop & Pick", icon: "✈️" },
        { id: "ayodhya-tour", name: "Varanasi to Ayodhya", tag: "Outstation Pilgrimage", icon: "🛕" },
        { id: "city-sightseeing", name: "Varanasi Local Sightseeing", tag: "Ghats & City Tour", icon: "🕉️" },
        { id: "prayagraj-trip", name: "Varanasi to Prayagraj", tag: "Triveni Sangam Trip", icon: "🚩" },
        { id: "vishwanath-darshan", name: "Kashi Vishwanath Darshan", tag: "Temple Special", icon: "🔱" }
    ],

    // Approved PRD Dynamic Templates
    templates: [
        {
            id: "template-a",
            tag: "Reliability & Comfort",
            template: "We had an outstanding {route} with BOOK CAB Varanasi. We traveled in a {vehicle} which was spotlessly clean and very comfortable. The driver was highly professional and punctual. Best transport service in the city!"
        },
        {
            id: "template-b",
            tag: "Smooth Booking & AC",
            template: "Booked a {vehicle} from BOOK CAB Varanasi for our {route}. The entire experience from booking to drop-off was incredibly smooth. AC worked perfectly and the pricing was very fair. Highly recommended."
        },
        {
            id: "template-c",
            tag: "Safety & Support",
            template: "Highly recommend BOOK CAB Varanasi! We needed a {vehicle} for our {route}, and the service exceeded expectations. Safe driving, clean interiors, and great customer support at 9838409911. Will definitely ride with them again."
        },
        {
            id: "template-d",
            tag: "Short & Impactful",
            template: "Excellent {route} experience with BOOK CAB Varanasi. Our {vehicle} was well-maintained and the journey was hassle-free. Five stars for the great service and polite driver!"
        },
        {
            id: "template-e",
            tag: "Tourist Experience",
            template: "Visiting the city was made so easy thanks to BOOK CAB Varanasi. We used their {vehicle} for our {route}. Very reliable, transparent pricing, and excellent local knowledge. Great job!"
        }
    ]
};

let lastTemplateIndex = -1;

/**
 * Generate an SEO optimized review text
 * @param {string} vehicleName 
 * @param {string} routeName 
 * @param {number} forceIndex - optional fixed template index
 * @returns {{text: string, templateIndex: number, tag: string}}
 */
function generateSEOReview(vehicleName, routeName, forceIndex = -1) {
    const templates = SEO_DATA.templates;
    let chosenIndex;

    if (forceIndex >= 0 && forceIndex < templates.length) {
        chosenIndex = forceIndex;
    } else {
        // Randomize without repeating the exact same template immediately
        do {
            chosenIndex = Math.floor(Math.random() * templates.length);
        } while (chosenIndex === lastTemplateIndex && templates.length > 1);
    }

    lastTemplateIndex = chosenIndex;
    const selectedObj = templates[chosenIndex];

    const filledText = selectedObj.template
        .replace(/{vehicle}/g, vehicleName)
        .replace(/{route}/g, routeName);

    return {
        text: filledText,
        templateIndex: chosenIndex,
        tag: selectedObj.tag
    };
}
