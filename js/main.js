const accordionTriggers = document.querySelectorAll('.accordion-trigger');

accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const accordion = trigger.parentElement;
        const isOpen = accordion.classList.contains('open');

        if (isOpen) {
            accordion.classList.remove('open');
        } else {
            accordion.classList.add('open');
        }
    });
});

async function fetchProfileData() {
    try {
        const url = 'https://raw.githubusercontent.com/otaviosenra/js-developer-portfolio/main/data/profile.json';
        const response = await fetch(url);
        const profileData = await response.json();
        return profileData;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null;
    }
}

function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo');
    photo.src = profileData.photo;
    photo.alt = profileData.name;

    const name = document.getElementById('profile.name');
    name.innerText = profileData.name;

    const job = document.getElementById('profile.job');
    job.innerText = profileData.job;

    const location = document.getElementById('profile.location');
    location.innerText = profileData.location;

    const phone = document.getElementById('profile.phone');
    phone.innerText = profileData.phone;
    const phoneLink = document.getElementById('profile.phone.link');
    phoneLink.href = `tel:${profileData.phone}`;

    const email = document.getElementById('profile.email');
    email.innerText = profileData.email;
    const emailLink = document.getElementById('profile.email.link');
    emailLink.href = `mailto:${profileData.email}`;
}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softSkills');
    softSkills.innerHTML = profileData.skills.softSkills.map(skill =>
        `<span class="soft-skill">${skill}</span>`
    ).join('');
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardSkills');
    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill =>
        `<div class="skill-item">
                    <img src="${skill.logo}" alt="${skill.name}" title="${skill.name}">
                </div>`
    ).join('');
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages');
    languages.innerHTML = profileData.languages.map(language =>
        `<div class="language-item">
                    <svg class="language-check" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>${language}</span>
                </div>`
    ).join('');
}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profile.professionalExperience');
    professionalExperience.innerHTML = profileData.professionalExperience.map(experience =>
        `<div class="experience-item">
                    <h3 class="experience-title">${experience.name}</h3>
                    <p class="experience-period">
                        <svg class="calendar-icon" viewBox="0 0 24 24">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                        ${experience.period}
                    </p>
                    <p class="experience-description">${experience.description}</p>
                </div>`
    ).join('');
}

(async () => {
    const profileData = await fetchProfileData();
    if (profileData) {
        updateProfileInfo(profileData);
        updateSoftSkills(profileData);
        updateHardSkills(profileData);
        updateLanguages(profileData);
        updateProfessionalExperience(profileData);
    }
})();