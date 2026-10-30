/* ===== EDIT YOUR PROJECTS HERE =====
   image: path to a screenshot, e.g. "images/seo.png" (leave "" for a placeholder)
   link:  report, website or case-study URL (leave "#" until you have one) */
const projects = [
  { title: "SEO & Website Optimization", desc: "On-page and off-page SEO improvements for business websites.", tools: ["Search Console", "Yoast SEO", "WordPress"], image: "", link: "#" },
  { title: "Google Business Profile Optimization", desc: "Profile setup and local SEO to improve local visibility.", tools: ["Google Business Profile", "Local SEO"], image: "", link: "#" },
  { title: "Google Ads Campaigns", desc: "Search campaigns built around keyword research and conversion tracking.", tools: ["Google Ads", "GA4"], image: "", link: "#" },
  { title: "Meta Ads Campaigns", desc: "Lead generation campaigns with audience targeting and A/B tests.", tools: ["Meta Ads Manager", "GA4"], image: "", link: "#" },
  { title: "Social Media Content & Poster Design", desc: "Trend-based posts, copy, and poster designs for social channels.", tools: ["Canva", "Social media"], image: "", link: "#" },
  { title: "Competitor Analysis & Keyword Research", desc: "Competitor benchmarking and keyword opportunity reports.", tools: ["Search Console", "Keyword tools"], image: "", link: "#" }
];

/* ===== CONTACT FORM SETUP =====
   This form does NOT send messages on its own (no backend).
   To make it work, create a free form at formspree.io (or web3forms.com, EmailJS),
   then paste your endpoint below, e.g. "https://formspree.io/f/xxxxxxx".
   Until then, the form opens your email app with the message pre-filled. */
const FORM_ENDPOINT = "";
const LINKEDIN_URL = "https://www.linkedin.com/in/sadam17/";
const EMAIL = "write2sadam@gmail.com";

/* ===== Elegant Magnetic Glow & Professional Ripple Effect ===== */
// Click Ripple Effect
window.addEventListener("click", e => {
  const ripple = document.createElement("div");
  ripple.className = "click-ripple";
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// Subtle ambient glow following cursor
const blob = document.createElement("div");
blob.className = "cursor-blob";
document.body.appendChild(blob);
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let blobX = mouseX, blobY = mouseY;

window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

function animateBlob() {
  blobX += (mouseX - blobX) * 0.08;
  blobY += (mouseY - blobY) * 0.08;
  blob.style.transform = `translate(${blobX}px, ${blobY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateBlob);
}
requestAnimationFrame(animateBlob);

/* ===== Animated Number Counters ===== */
function initCounters() {
  const statNums = document.querySelectorAll(".stat-num");
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute("data-val");
        let start = 0;
        const duration = 1600;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const inc = target / totalSteps;
        const timer = setInterval(() => {
          start += inc;
          if (start >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(start);
          }
        }, stepTime);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(num => countObserver.observe(num));
}
initCounters();

/* ===== 3D Tilt Effect on Cards ===== */
function initTilt() {
  const tiltElements = document.querySelectorAll(".card, .pj, .sk");
  tiltElements.forEach(el => {
    el.addEventListener("mousemove", e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -8;
      const rotY = ((x - midX) / midX) * 8;
      el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}
initTilt();

/* ===== Header shadow on scroll ===== */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
document.getElementById("projectGrid").innerHTML = projects.map(p => `
  <article class="card pj rv">
    <div class="img">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">` : "Add project image"}</div>
    <div class="body">
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <div class="tools">${p.tools.map(t => `<span>${esc(t)}</span>`).join("")}</div>
      <a class="btn btn-g" href="${esc(p.link)}" ${p.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>View Project</a>
    </div>
  </article>`).join("");

/* ===== Mobile menu ===== */
const burger = document.getElementById("burger"), menu = document.getElementById("menu");
const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ===== Active nav link ===== */
const links = [...menu.querySelectorAll("a:not(.btn)")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));

/* ===== Scroll reveal (cards only) ===== */
document.querySelectorAll(".timeline .card, .sk, .hero-card").forEach(el => el.classList.add("rv"));
const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".rv").forEach(el => rv.observe(el));
initTilt();

/* ===== LinkedIn + footer year ===== */
const li = document.getElementById("linkedin");
if (LINKEDIN_URL) { li.href = LINKEDIN_URL; li.textContent = "LinkedIn profile"; li.target = "_blank"; li.rel = "noopener"; }
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Contact form ===== */
const form = document.getElementById("form"), status = document.getElementById("status");
form.addEventListener("submit", async e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form));
  let ok = true;
  form.querySelectorAll("[required]").forEach(i => {
    const bad = !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value));
    i.setAttribute("aria-invalid", bad); if (bad) ok = false;
  });
  if (!ok) { status.textContent = "Please fill in your name, a valid email, and a message."; return; }
  if (!FORM_ENDPOINT) {
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio enquiry from " + f.name)}&body=${encodeURIComponent(f.message + "\n\nReply to: " + f.email)}`;
    status.textContent = "Opening your email app. No form service is connected yet.";
    return;
  }
  try {
    const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(f) });
    if (!r.ok) throw 0;
    form.reset(); status.textContent = "Message sent. I'll reply soon.";
  } catch { status.textContent = "Message not sent. Please email " + EMAIL + " directly."; }
});
