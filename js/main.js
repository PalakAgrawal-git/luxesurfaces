// Shared header, footer and interactions for every page.
const W = "https://static.wixstatic.com/media/";

const NAV = [
  ["index.html", "Home"],
  ["about.html", "About Us"],
  ["brands.html", "Brands"],
  ["projects.html", "Projects"],
  ["podcast.html", "KYAD PodCast"],
  ["contact.html", "Contact Us"],
];

const SOCIAL = [
  ["https://www.instagram.com/luxe.surfaces/", "Instagram"],
  ["https://www.facebook.com/people/Luxe-Surfaces/61552494302374/", "Facebook"],
  ["https://x.com/LlpLuxe14735", "X"],
  ["https://www.linkedin.com/company/luxesurfaces/", "LinkedIn"],
  ["https://www.youtube.com/@luxe.surfaces", "YouTube"],
];

const CLIENT_LOGOS = [
  "027a73_aaa569d231ae40ee9d564ccc8384f855~mv2.png",
  "027a73_542f34439838447daf7dd7c11232be0d~mv2.png",
  "027a73_ee212b745671443a9eef6b9db26e8833~mv2.png",
  "027a73_af751057e72845e4896e0cba1489c016~mv2.png",
  "027a73_91f3c2e9d73e4202bf9bdf78d1770a13~mv2.png",
  "027a73_046d95492b494aec98351aa624269061~mv2.png",
  "027a73_43b45379a1874d11b4d5c3dbb1109f57~mv2.png",
];

const here = location.pathname.split("/").pop() || "index.html";

document.body.insertAdjacentHTML("afterbegin", `
<header class="site-header">
  <div class="wrap">
    <a class="logo" href="index.html">LUXE SURFACES</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav">
      ${NAV.map(([h, t]) => `<a href="${h}"${h === here ? ' class="active"' : ""}>${t}</a>`).join("")}
    </nav>
  </div>
</header>`);

document.querySelectorAll("[data-clients]").forEach((el) => {
  const imgs = CLIENT_LOGOS.map((f) => `<img src="${W + f}" alt="Client logo" loading="lazy">`).join("");
  el.innerHTML = `<div class="marquee-track">${imgs}${imgs}</div>`;
});

document.body.insertAdjacentHTML("beforeend", `
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <span class="logo">LUXE SURFACES</span>
        <p>LUXE SURFACES LLP<br>First Floor, Haji Moosa Patrawala Ind. Estate, Kishav Ravkhadhi Rd 20, Dr E Moses Road, Kishav Ravkhadhi Rd, opposite VFS, Mahalakshmi, Mumbai, Maharashtra 400011</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="tel:+918657030761">+91 86570 30761</a></li>
          <li><a href="mailto:info@luxesurfaces.in">info@luxesurfaces.in</a></li>
          ${SOCIAL.map(([h, t]) => `<li><a href="${h}" target="_blank" rel="noopener">${t}</a></li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="copy-line">© ${new Date().getFullYear()} Luxe Surfaces LLP</div>
  </div>
</footer>
<a class="wa" href="https://wa.me/918657030761" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.6 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.8-.1 1.5Z"/></svg>
</a>
<button class="to-top" aria-label="Back to top">↑</button>`);

const header = document.querySelector(".site-header");
const toTop = document.querySelector(".to-top");
const onScroll = () => {
  header.classList.toggle("solid", scrollY > 60);
  toTop.classList.toggle("show", scrollY > 600);
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0 }));

const btn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "Close" : "Menu";
  if (open) header.classList.add("solid");
});

// Opening: the page fades up from dark, then the hero copy rises into place.
document.body.insertAdjacentHTML("afterbegin", '<div class="curtain" aria-hidden="true"></div>');
const reveal = () => document.documentElement.classList.add("loaded");
// Lift the curtain once fonts are ready (or after 600ms at most), without waiting for every image.
Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]).then(() => setTimeout(reveal, 150));

// Image panels unveil from a slight zoom; cards in a grid arrive one after another.
document.querySelectorAll(".split .media, .img-card, .gallery figure, .legacy-img").forEach((el) => {
  if (el.tagName === "IMG") {
    el.classList.remove("reveal");
    el.outerHTML = `<div class="unveil">${el.outerHTML}</div>`;
  } else {
    el.classList.add("unveil");
  }
});
document.querySelectorAll(".grid.reveal").forEach((grid) => {
  [...grid.children].forEach((child, i) => { child.style.transitionDelay = `${Math.min(i, 8) * 90}ms`; });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal, .unveil").forEach((el) => io.observe(el));

// Scroll-linked drift: the hero sinks and fades as you leave it, panel images move slower than the page.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroMedia = hero && hero.querySelector("video, img");
const heroCopy = hero && hero.querySelector(".hero-inner");
const driftImgs = [...document.querySelectorAll(".split .media img, .split .media video")];
driftImgs.forEach((m) => { m.dataset.drift = ""; m.style.height = "115%"; });

let ticking = false;
const drift = () => {
  ticking = false;
  const vh = innerHeight;
  if (hero) {
    const p = Math.min(Math.max(scrollY / hero.offsetHeight, 0), 1);
    heroMedia.style.transform = `translateY(${p * 30}%) scale(${1 + p * 0.08})`;
    if (document.documentElement.classList.contains("loaded")) {
      heroCopy.style.transform = `translateY(${p * -80}px)`;
      heroCopy.style.opacity = String(1 - p * 1.4);
    }
  }
  driftImgs.forEach((m) => {
    const r = m.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1 across the viewport
    m.style.translate = `0 ${(-6.5 + p * 6.5).toFixed(2)}%`;
  });
};
if (!reduceMotion) {
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
  addEventListener("resize", drift);
  drift();
}

// The site has no backend; the contact form opens the visitor's mail app with the message filled in.
const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const body = `${d.get("message")}\n\n${d.get("first")} ${d.get("last")}\n${d.get("email")}`;
    location.href = `mailto:info@luxesurfaces.in?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
  });
}
