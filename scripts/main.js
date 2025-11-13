/* scripts/main.js */
/* Single source of truth: events array */
const events = [
    // --- Day 1: Nov 20, 2025 ---
    {
        title: "Opening Keynote: The Future of AI",
        type: "Keynote",
        date: "2025-11-20T09:00:00",
        description: "Join industry visionary Dr. Evelyn Reed as she unveils the next decade of AI innovation.",
        image: "images/keynote.jpg"
    },
    {
        title: "Advanced JavaScript Workshop",
        type: "Workshop",
        date: "2025-11-20T10:30:00",
        description: "A 3-hour, hands-on deep-dive into asynchronous JavaScript, Promises, and modern ES6+ features.",
        image: "images/workshop-js.jpg"
    },
    {
        title: "Cybersecurity in the Cloud Era",
        type: "Talk",
        date: "2025-11-20T11:00:00",
        description: "Explore the evolving landscape of cloud security threats and proactive defense strategies.",
        image: "images/cybersecurity.jpeg"
    },
    {
        title: "Introduction to Quantum Computing",
        type: "Talk",
        date: "2025-11-20T14:00:00",
        description: "A beginner-friendly overview of quantum mechanics and its potential to revolutionize computing.",
        image: "images/quantum.jpeg"
    },
    {
        title: "Networking Mixer & Welcome Reception",
        type: "Social",
        date: "2025-11-20T17:00:00",
        description: "Connect with fellow attendees, speakers, and sponsors over drinks and appetizers.",
        image: "images/mixer.jpg"
    },

    // --- Day 2: Nov 21, 2025 ---
    {
        title: "The Ethics of Machine Learning",
        type: "Talk",
        date: "2025-11-21T09:30:00",
        description: "A critical discussion on the societal impact and ethical responsibilities in ML development.",
        image: "images/ethics.jpeg"
    },
    {
        title: "Building Scalable Web Apps with Microservices",
        type: "Talk",
        date: "2025-11-21T10:30:00",
        description: "Learn the principles of microservices from lead engineers at a top tech company.",
        image: "images/scalable.jpeg"
    },
    {
        title: "Mastering React Performance",
        type: "Workshop",
        date: "2025-11-21T13:00:00",
        description: "Optimize your React applications by learning memoization, code splitting, and bundle analysis.",
        image: "images/react.jpeg"
    },
    {
        title: "The Psychology of User Experience (UX)",
        type: "Talk",
        date: "2025-11-21T14:00:00",
        description: "Understand the cognitive biases and psychological principles that drive effective UX design.",
        image: "images/psychology-ux.jpeg"
    },
    {
        title: "Panel: The Future of Remote Work in Tech",
        type: "Panel",
        date: "2025-11-21T16:00:00",
        description: "Industry leaders discuss the challenges, tools, and culture of building successful remote-first teams.",
        image: "images/panel-remote.jpeg"
    },

    // --- Day 3: Nov 22, 2025 ---
    {
        title: "UI/UX Design Fundamentals for Developers",
        type: "Workshop",
        date: "2025-11-22T09:00:00",
        description: "A practical workshop on visual hierarchy, color theory, and typography that every developer should know.",
        image: "images/ui-ux.jpeg"
    },
    {
        title: "From Monolith to Serverless",
        type: "Talk",
        date: "2025-11-22T10:00:00",
        description: "A case study on migrating a large-scale legacy application to a modern serverless architecture.",
        image: "images/serverless.jpeg"
    },
    {
        title: "State of Web Assembly in 2025",
        type: "Talk",
        date: "2025-11-22T11:30:00",
        description: "Discover how WebAssembly is enabling near-native performance for web applications.",
        image: "images/webassembly.jpeg"
    },
    {
        title: "Data Visualization with D3.js",
        type: "Workshop",
        date: "2025-11-22T13:30:00",
        description: "Learn to create stunning, interactive data visualizations for the web from scratch.",
        image: "images/d3.jpeg"
    },
    {
        title: "Closing Panel: Ask Me Anything with Speakers",
        type: "Panel",
        date: "2025-11-22T16:00:00",
        description: "An open Q&A session with a panel of the conference's top speakers. No topic is off-limits!",
        image: "images/panel-ama.jpeg"
    },

    // --- Bonus / Past Events for testing ---
    {
        title: "Pre-Conference Hackathon",
        type: "Social",
        date: "2025-11-19T09:00:00",
        description: "A 24-hour coding challenge with prizes for the most innovative projects. Kicks off before the main event.",
        image: "images/hackathon.jpeg"
    },
    {
        title: "API Design Best Practices",
        type: "Talk",
        date: "2025-11-21T15:00:00",
        description: "Learn how to design, document, and maintain clean, consistent, and easy-to-use RESTful APIs.",
        image: "images/api.jpeg"
    },
    {
        title: "DevOps Culture and Tooling",
        type: "Talk",
        date: "2025-11-20T15:30:00",
        description: "An introduction to the principles of DevOps and the tools that enable continuous integration and deployment.",
        image: "images/devops.jpeg"
    },
    {
        title: "Mobile-First Design in Practice",
        type: "Workshop",
        date: "2025-11-20T13:00:00",
        description: "A hands-on session focusing on practical techniques for designing and building mobile-first responsive websites.",
        image: "images/mobile-first.jpeg"
    },
    {
        title: "Closing Ceremony & Awards",
        type: "Social",
        date: "2025-11-22T17:30:00",
        description: "Join us as we celebrate the best of the conference and announce the hackathon winners.",
        image: "images/awards.jpeg"
    }
];

/* ---------- Utilities ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const container = $('#event-container');
const resultsInfo = $('#results-info');
const filterButtons = () => $$('.filter-btn');
const searchInput = $('#search');
const themeToggle = $('#theme-toggle');

const THEME_KEY = 'tc-theme';
function applyTheme(theme){
    if(theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function initTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved){ applyTheme(saved); }
    else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
}
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
});

let activeFilter = 'All';
let searchTerm = '';

function formatDate(iso){ return new Date(iso).toLocaleString(); }
function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function createICS(event){
    const start = new Date(event.date);
    const end = new Date(start.getTime() + (60*60*1000));
    const pad = n => String(n).padStart(2,'0');
    const toICSDate = dt => `${dt.getUTCFullYear()}${pad(dt.getUTCMonth()+1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}${pad(dt.getUTCSeconds())}Z`;
    const icsLines = [
        'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//TechCon//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',
        `UID:${Date.now()}@techcon.local`,
        `DTSTAMP:${toICSDate(new Date())}`,
        `DTSTART:${toICSDate(start)}`,
        `DTEND:${toICSDate(end)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        'END:VEVENT','END:VCALENDAR'
    ];
    return icsLines.join('\r\n');
}
function downloadICS(event){
    const blob = new Blob([createICS(event)], {type:'text/calendar'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g,'_')}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function getCountdownText(iso){
    const now = new Date();
    const target = new Date(iso);
    const diff = target - now;
    if(diff <= 0) return 'Event has ended';
    const s = Math.floor(diff/1000);
    const days = Math.floor(s / (3600*24));
    const hours = Math.floor((s % (3600*24)) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
}

function createCard(eventObj){
    const card = document.createElement('article');
    card.className = 'event-card fade-in';
    card.setAttribute('tabindex','0');
    card.setAttribute('data-type', eventObj.type);
    const img = document.createElement('img');
    img.src = eventObj.image;
    img.alt = `${eventObj.title} image`;
    card.appendChild(img);

    const body = document.createElement('div'); body.className = 'event-body';
    const meta = document.createElement('div'); meta.className = 'event-meta';
    const type = document.createElement('div'); type.className = 'event-type'; type.textContent = eventObj.type;
    const date = document.createElement('div'); date.className = 'event-date'; date.textContent = new Date(eventObj.date).toLocaleString();
    meta.appendChild(type); meta.appendChild(date);

    const h2 = document.createElement('h2'); h2.className = 'event-title'; h2.innerHTML = highlightText(eventObj.title);
    const p = document.createElement('p'); p.className = 'event-desc'; p.innerHTML = highlightText(eventObj.description);
    const countdown = document.createElement('div'); countdown.className = 'countdown'; countdown.dataset.date = eventObj.date; countdown.textContent = getCountdownText(eventObj.date);

    const footer = document.createElement('div'); footer.className = 'event-footer';
    const left = document.createElement('div');
    const addBtn = document.createElement('button'); addBtn.className = 'btn small'; addBtn.textContent = 'Add to Calendar'; addBtn.addEventListener('click', () => downloadICS(eventObj));
    left.appendChild(addBtn);

    const right = document.createElement('div');
    const detailsBtn = document.createElement('button'); detailsBtn.className = 'btn secondary small'; detailsBtn.textContent = 'Details';
    detailsBtn.addEventListener('click', () => { alert(`${eventObj.title}\n\n${eventObj.description}\n\nWhen: ${formatDate(eventObj.date)}`); });
    right.appendChild(detailsBtn);

    footer.appendChild(left); footer.appendChild(right);
    body.appendChild(meta); body.appendChild(h2); body.appendChild(p); body.appendChild(countdown); body.appendChild(footer);
    card.appendChild(body);
    return card;
}

function highlightText(text){
    if(!searchTerm) return escapeHTML(text);
    const re = new RegExp(`(${escapeRegExp(searchTerm)})`, 'ig');
    return escapeHTML(text).replace(re, '<mark>$1</mark>');
}
function escapeHTML(str){ return String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch]); }

function render(){
    container.innerHTML = '';
    const filtered = events.filter(ev => {
        const matchType = activeFilter === 'All' || ev.type === activeFilter;
        const text = (ev.title + ' ' + ev.description).toLowerCase();
        const matchSearch = !searchTerm || text.includes(searchTerm.toLowerCase());
        return matchType && matchSearch;
    });
    filtered.sort((a,b) => new Date(a.date) - new Date(b.date));
    filtered.forEach(ev => { const card = createCard(ev); container.appendChild(card); });
    resultsInfo.textContent = `Now showing ${filtered.length} event(s).`;
}

function startCountdownTicker(){
    setInterval(() => {
        $$('.countdown').forEach(el => {
            const date = el.dataset.date;
            el.textContent = getCountdownText(date);
        });
    }, 1000);
}

filterButtons().forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons().forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        filterButtons().forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        render();
    });
});

searchInput.addEventListener('input', e => {
    searchTerm = e.target.value.trim();
    render();
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    initTheme();
    render();
    startCountdownTicker();
});
