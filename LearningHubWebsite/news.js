function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);

    // Toggle the 'visible' class to control visibility with smooth transition
    if (section.classList.contains('visible')) {
        section.classList.remove('visible');
    } else {
        section.classList.add('visible');
    }
}

// Dynamic promotion text changing every 5 seconds
const promoTexts = [
    "Check out our new AI-powered development tools! <a href='https://www.example.com' target='_blank'>Learn More</a>",
    "Get a 20% discount on all our web development courses! <a href='https://www.example.com' target='_blank'>Sign Up Now</a>",
    "Join our Full-Stack Developer Bootcamp! <a href='https://www.example.com' target='_blank'>Apply Today</a>",
];

let promoIndex = 0;

setInterval(() => {
    promoIndex = (promoIndex + 1) % promoTexts.length;
    document.getElementById("promo-text").innerHTML = promoTexts[promoIndex];
}, 5000); // Change every 5 seconds