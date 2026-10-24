// Shared header, footer and interactions for every page.

const NAV = [
  ["index.html", "Home"],
  ["about.html", "About Us"],
  ["brands.html", "Brands"],
  ["projects.html", "Projects"],
  ["podcast.html", "KYAD PodCast"],
  ["contact.html", "Contact Us"],
];

const SOCIAL = [
  ["https://wa.me/918657030761", "WhatsApp", "whatsapp"],
  ["https://www.instagram.com/luxe.surfaces/", "Instagram", "instagram"],
  ["https://www.facebook.com/people/Luxe-Surfaces/61552494302374/", "Facebook", "facebook"],
  ["https://x.com/LlpLuxe14735", "X", "x"],
  ["https://www.linkedin.com/company/luxesurfaces/", "LinkedIn", "linkedin"],
  ["https://www.youtube.com/@luxe.surfaces", "YouTube", "youtube"],
];

const CLIENT_LOGOS = [
  "assets/clients/wadhwa.png",
  "assets/clients/adani.png",
  "assets/clients/ferrari.png",
  "assets/clients/ashwin-sheth.png",
  "assets/clients/balaji-world.png",
  "assets/clients/dy-patil.png",
  "assets/clients/porsche.png",
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
  // Snap near-white (JPEG off-whites, baked-in checkerboards) to pure white so the multiply blend leaves nothing but the page colour
  const tv = Array.from({ length: 21 }, (_, k) => (k >= 19 ? 1 : k / 20)).join(" ");
  document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="lx-white" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="table" tableValues="${tv}"/><feFuncG type="table" tableValues="${tv}"/><feFuncB type="table" tableValues="${tv}"/></feComponentTransfer></filter></svg>`);
  const imgs = CLIENT_LOGOS.map((f) => `<img src="${f}?v=83" alt="Client logo" loading="lazy">`).join("");
  el.innerHTML = `<div class="marquee-track">${imgs}${imgs}</div>`;
});

document.body.insertAdjacentHTML("beforeend", `
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-orig">
      <div class="foot-left">
        <img class="venture" src="assets/brand/venture-logos.png?v=83" alt="Luxe Surfaces, a venture by C. Bhogilal West-End and Arihant Granites" loading="lazy">
        <span class="logo">LUXE SURFACES</span>
        <div class="foot-contact">
          <a href="tel:+918657030761">+91 86570 30761</a>
          <a href="mailto:info@luxesurfaces.in">info@luxesurfaces.in</a>
        </div>
      </div>
      <div class="foot-right">
        <p>LUXE SURFACES LLP<br>First Floor, Haji Moosa Patrawala Ind. Estate, Kishav Ravkhadhi Rd 20, Dr E Moses Road, Kishav Ravkhadhi Rd, opposite VFS, Mahalakshmi, Mumbai, Maharashtra 400011</p>
        <div class="socials">${SOCIAL.map(([h, t, ic]) => `<a href="${h}" target="_blank" rel="noopener" aria-label="${t}" class="soc soc-${ic}"></a>`).join("")}</div>
      </div>
    </div>
  </div>
  <div class="wrap">
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
// The first page of a visit opens with the logo spelling itself out; later pages just fade up.
let firstVisit = false;
try {
  firstVisit = !sessionStorage.getItem("luxe-intro") && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  sessionStorage.setItem("luxe-intro", "1");
} catch (_) { /* storage blocked: skip the intro */ }
const curtainLogo = firstVisit
  ? `<div class="curtain-logo">${[..."LUXE SURFACES"].map((c, i) => `<span style="--i:${i}">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>`
  : "";
if (firstVisit) {
  document.body.insertAdjacentHTML("afterbegin", `<div class="curtain" aria-hidden="true">${curtainLogo}</div>`);
}
const reveal = () => document.documentElement.classList.add("loaded");
if (firstVisit) {
  // The logo gets ~1.3s to finish writing itself before the curtain lifts.
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]).then(() => setTimeout(reveal, 1300));
} else {
  // Moving between pages: no dark screen; the hero copy starts rising as the page wipe reaches the top.
  setTimeout(reveal, 320);
}

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
const driftImgs = [...document.querySelectorAll(".split .media img, .split .media video, .gallery figure img, .img-card:not(.logo-card) img")];
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

// ===== Extra motion =====
if (!reduceMotion) {
  // Headings: split into words that rise from behind a mask.
  const splitNode = (node, counter) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(" "); return; }
          const w = document.createElement("span");
          w.className = "w";
          const inner = document.createElement("span");
          inner.textContent = part;
          inner.style.setProperty("--i", counter.n++);
          w.append(inner);
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== "BR") {
        splitNode(child, counter);
      }
    });
  };
  const headings = document.querySelectorAll("h1, h2, .copy h3, .brand-body h2");
  headings.forEach((h) => {
    const label = h.innerText.replace(/\s+/g, " ").trim();
    splitNode(h, { n: 0 });
    h.classList.add("split-words");
    h.setAttribute("aria-label", label);
    h.querySelectorAll(".w").forEach((w) => w.setAttribute("aria-hidden", "true"));
  });
  const wordIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); wordIO.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  headings.forEach((h) => {
    if (h.closest(".hero")) {
      const start = () => setTimeout(() => h.classList.add("in"), 450);
      if (document.documentElement.classList.contains("loaded")) start();
      else new MutationObserver((_, obs) => { if (document.documentElement.classList.contains("loaded")) { start(); obs.disconnect(); } })
        .observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    } else {
      wordIO.observe(h);
    }
  });

  // Stagger the episode list and make sure grouped children get their own delays.
  document.querySelectorAll("#ep-list").forEach((list) => {
    [...list.children].forEach((c, i) => { c.style.transitionDelay = `${i * 90}ms`; });
  });
  document.querySelectorAll(".legacy-cols, .copy.reveal").forEach((box) => {
    [...box.children].forEach((c, i) => { c.style.transitionDelay = `${150 + i * 110}ms`; });
  });

  // Scroll progress bar
  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.append(bar);
  const setBar = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
  };
  addEventListener("scroll", setBar, { passive: true });
  setBar();

  // Marquees speed up with scroll speed, then ease back
  const strips = document.querySelectorAll(".marquee-track");
  let lastY = scrollY, boost = 0;
  const tickMarquee = () => {
    const dy = Math.abs(scrollY - lastY);
    lastY = scrollY;
    boost += (Math.min(dy / 12, 5) - boost) * 0.12;
    strips.forEach((t) => t.getAnimations().forEach((a) => { a.playbackRate = 1 + boost; }));
    requestAnimationFrame(tickMarquee);
  };
  if (strips.length) requestAnimationFrame(tickMarquee);

  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer) {
    // Tilt on cards, tiles and project cards
    document.querySelectorAll(".brand, .img-card").forEach((el) => {
      el.classList.add("tilt");
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.classList.add("tilting");
        el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.classList.remove("tilting");
        el.style.transform = "";
      });
    });

    // Magnetic buttons
    document.querySelectorAll(".btn, .to-top, .wa").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        b.style.translate = `${x}px ${y}px`;
      });
      b.addEventListener("pointerleave", () => { b.style.translate = ""; });
    });
  }
}

// ===== More motion, round two =====
if (!reduceMotion) {
  // Words light up as you read: paragraphs split into words whose opacity follows scroll position.
  const wrapWords = (node, out) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(" "); return; }
          const w = document.createElement("span");
          w.className = "sw";
          w.textContent = part;
          out.push(w);
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== "BR") {
        wrapWords(child, out);
      }
    });
  };
  const scrubs = [...document.querySelectorAll(".lead p, .brand-body p, .legacy-cols p, .page-hero p, .section-head p, .split .copy p, .brand-hero p, .brand-intro p")]
    .filter((p) => !p.closest(".hero, form"))
    .map((p) => {
      const label = p.innerText.replace(/\s+/g, " ").trim();
      const words = [];
      wrapWords(p, words);
      p.setAttribute("aria-label", label);
      words.forEach((w) => w.setAttribute("aria-hidden", "true"));
      return { p, words };
    });

  const header = document.querySelector(".site-header");
  const navEl = document.querySelector(".nav");
  const strip = document.querySelectorAll(".brand-nav, .section-head");
  let frame2 = false;

  const update = () => {
    frame2 = false;
    const vh = innerHeight;

    // Scrubbed word fill: starts when the paragraph's top reaches 88% of the viewport, ends at 32%.
    scrubs.forEach(({ p, words }) => {
      const r = p.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const start = vh * 0.88, end = vh * 0.32;
      const t = Math.min(Math.max((start - r.top) / (start - end), 0), 1);
      // One-way: words that have lit up stay lit when scrolling back up
      const lit = Math.max(t * (words.length + 5), p._lit || 0);
      p._lit = lit;
      for (let i = 0; i < words.length; i++) {
        words[i].style.opacity = (0.2 + 0.8 * Math.min(Math.max(lit - i, 0), 1)).toFixed(2);
      }
    });

    // The header is sticky: it always stays visible at the top while scrolling.
  };
  const queue = () => { if (!frame2) { frame2 = true; requestAnimationFrame(update); } };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  update();

  // Rules draw when their section arrives
  const ruleIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); ruleIO.unobserve(e.target); } });
  }, { threshold: 0.4 });
  strip.forEach((el) => ruleIO.observe(el));

  // Click ripple on buttons and brand tiles
  document.addEventListener("pointerdown", (e) => {
    const host = e.target.closest(".btn, .brand");
    if (!host) return;
    const r = host.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    host.append(dot);
    setTimeout(() => dot.remove(), 750);
  });

  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    // Hero floats against the mouse (independent `translate`, so scroll drift is untouched)
    const heroEl = document.querySelector(".hero");
    const layer = heroEl && heroEl.querySelector("video, img");
    const copy = heroEl && heroEl.querySelector(".hero-inner");
    if (heroEl && layer) {
      Object.assign(layer.style, { top: "-3%", left: "-3%", width: "106%", height: "106%" });
      let mx = 0, my = 0, sx = 0, sy = 0;
      heroEl.addEventListener("pointermove", (e) => {
        const r = heroEl.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5;
        my = (e.clientY - r.top) / r.height - 0.5;
      });
      heroEl.addEventListener("pointerleave", () => { mx = 0; my = 0; });
      const float = () => {
        sx += (mx - sx) * 0.06;
        sy += (my - sy) * 0.06;
        layer.style.translate = `${(-sx * 36).toFixed(1)}px ${(-sy * 24).toFixed(1)}px`;
        copy.style.translate = `${(sx * 20).toFixed(1)}px ${(sy * 14).toFixed(1)}px`;
        requestAnimationFrame(float);
      };
      float();
    }
  }
}


// Cards with data-slides cycle through extra photos with a crossfade (Adani lobby views).
document.querySelectorAll("[data-slides]").forEach((card) => {
  const first = card.querySelector("img");
  const srcs = [first.getAttribute("src"), ...card.dataset.slides.split(",")];
  const layers = srcs.map((src, i) => {
    if (i === 0) return first;
    const img = first.cloneNode();
    img.src = src;
    img.alt = "";
    img.className = "slide";
    img.loading = "lazy";
    first.after(img);
    return img;
  });
  first.classList.add("slide", "on");
  let i = 0;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(() => {
    layers[i].classList.remove("on");
    i = (i + 1) % layers.length;
    layers[i].classList.add("on");
  }, 3200);
});
