const navbar = document.createElement('nav');

const homeHeader = document.createElement('h2');
homeHeader.textContent = '🐈‍⬛Katter & Zombies🧟';
homeHeader.addEventListener('click', () => {
    window.location.href = 'index.html';
});
navbar.appendChild(homeHeader);

const linksContainer = document.createElement('div');
linksContainer.style.display = 'flex';

const links = [
    { text: 'Katter', href: 'katter.html' },
    { text: 'Zombies', href: 'zombies.html' },
    { text: 'Spela spel', href: 'spel.html' },
    { text: 'Kontakt', href: 'kontakt.html' },
];

links.forEach(link => {
    const anchor = document.createElement('a');
    anchor.textContent = link.text;
    anchor.href = link.href;
    linksContainer.appendChild(anchor);
});

navbar.appendChild(linksContainer);

document.body.prepend(navbar);