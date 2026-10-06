/**
 * BOOK CAB VARANASI - SEO REVIEW TEMPLATES & DATA ENGINE
 * 
 * SEO Target Keywords Engine:
 * [Book Cab Varanasi, cab in varanasi, taxi in varanasi, varanasi to ayodhya cab, 
 *  varanasi to prayagraj cab, varanasi airport transfer cab, kashi vishwanath darshan taxi, 
 *  innova crysta varanasi, tempo traveller varanasi, ertiga cab varanasi, swift dzire taxi varanasi]
 * 
 * Technical Architecture: Vanilla JS (ES6+), Zero External Framework Dependencies
 */

const SEO_DATA = {
    brandName: "BOOK CAB Varanasi",
    supportPhone: "9838409911",
    supportPhoneFormatted: "+91 98384 09911",
    googleReviewUrl: "https://g.page/r/CYDWAEFVto6xEBM/review",
    
    /* SEO Vehicle Roster: [innova crysta varanasi, tempo traveller varanasi, ertiga cab varanasi, swift dzire taxi varanasi, force urbania varanasi] */
    vehicles: [
        { id: "swift-dzire", name: "Swift Dzire", type: "Sedan (4 Seater)", icon: "🚗" },
        { id: "maruti-ertiga", name: "Maruti Ertiga", type: "MPV (6 Seater)", icon: "🚐" },
        { id: "innova-crysta", name: "Toyota Innova Crysta", type: "Premium SUV (7 Seater)", icon: "🚘" },
        { id: "force-urbania", name: "Force Urbania", type: "Luxury Minibus (12-17 Seater)", icon: "🚌" },
        { id: "tempo-traveller", name: "Tempo Traveller", type: "Group Traveller (12-26 Seater)", icon: "🚐" }
    ],

    /* SEO High-Value Routes: [varanasi airport transfer cab, varanasi to ayodhya cab, varanasi local sightseeing taxi, varanasi to prayagraj cab, kashi vishwanath darshan taxi] */
    routes: [
        { id: "airport-transfer", name: "Varanasi Airport Transfer", tag: "Airport Pickup & Drop", icon: "✈️" },
        { id: "ayodhya-tour", name: "Varanasi to Ayodhya", tag: "Outstation Pilgrimage", icon: "🛕" },
        { id: "city-sightseeing", name: "Varanasi Local Sightseeing", tag: "Ghats & City Tour", icon: "🕉️" },
        { id: "prayagraj-trip", name: "Varanasi to Prayagraj", tag: "Triveni Sangam Trip", icon: "🚩" },
        { id: "vishwanath-darshan", name: "Kashi Vishwanath Darshan", tag: "Temple Special", icon: "🔱" }
    ],

    /* SEO Dynamic Review Templates A-E: Algorithmic Natural Permutations for Google Maps Ranking */
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
    ],

    /* Synonyms & Variation Lexicon for Anti-Duplication Synthesizer */
    variationLexicon: {
        openers: [
            "We had an outstanding",
            "Had a fantastic experience on our",
            "Truly enjoyed our journey during the",
            "An exceptional ride for our",
            "Highly satisfied with our"
        ],
        vehicleDescriptors: [
            "was spotlessly clean and very comfortable",
            "was extremely well-maintained and spacious",
            "was sanitized, fresh, and super comfortable",
            "had working AC, neat seat covers, and smooth ride",
            "was super clean and equipped with good AC"
        ],
        closers: [
            "Best transport service in the city!",
            "Will definitely book with them again.",
            "Five stars for their top-notch cab service!",
            "Highly recommended taxi operator in Varanasi.",
            "Truly 5-star experience from start to finish."
        ]
    }
};

let lastTemplateIndex = -1;

/**
 * Generate an SEO optimized review text with natural variation logic
 * SEO Keywords: [cab in varanasi, taxi in varanasi, Book Cab Varanasi]
 * @param {string} vehicleName 
 * @param {string} routeName 
 * @param {number} forceIndex 
 * @returns {{text: string, templateIndex: number, tag: string}}
 */
function generateSEOReview(vehicleName, routeName, forceIndex = -1) {
    const templates = SEO_DATA.templates;
    let chosenIndex;

    if (forceIndex >= 0 && forceIndex < templates.length) {
        chosenIndex = forceIndex;
    } else {
        do {
            chosenIndex = Math.floor(Math.random() * templates.length);
        } while (chosenIndex === lastTemplateIndex && templates.length > 1);
    }

    lastTemplateIndex = chosenIndex;
    const selectedObj = templates[chosenIndex];

    let filledText = selectedObj.template
        .replace(/{vehicle}/g, vehicleName)
        .replace(/{route}/g, routeName);

    return {
        text: filledText,
        templateIndex: chosenIndex,
        tag: selectedObj.tag
    };
}

/**
 * Generate a guaranteed unique variation when anti-duplication filter triggers
 * SEO Keywords: [varanasi to ayodhya cab, varanasi airport transfer cab, kashi vishwanath darshan taxi]
 */
function generateUniqueVariation(vehicleName, routeName) {
    const lex = SEO_DATA.variationLexicon;
    const randomOpener = lex.openers[Math.floor(Math.random() * lex.openers.length)];
    const randomDesc = lex.vehicleDescriptors[Math.floor(Math.random() * lex.vehicleDescriptors.length)];
    const randomCloser = lex.closers[Math.floor(Math.random() * lex.closers.length)];

    return `${randomOpener} ${routeName} with BOOK CAB Varanasi. Our ${vehicleName} ${randomDesc}. The driver was polite, punctual, and drove safely. ${randomCloser}`;
}
