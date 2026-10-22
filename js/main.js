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
<button class="to-top" aria-label="Back to top">TOP</button>`);

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

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

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
