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
    <div class="mega" aria-hidden="true"><span>LUXE SURFACES</span></div>
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
document.body.insertAdjacentHTML("afterbegin", `<div class="curtain" aria-hidden="true">${curtainLogo}</div>`);
const reveal = () => document.documentElement.classList.add("loaded");
// Lift the curtain once fonts are ready (or after 600ms at most), without waiting for every image.
// On the first page the logo gets ~1.3s to finish writing itself before the curtain goes.
Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))])
  .then(() => setTimeout(reveal, firstVisit ? 1300 : 150));

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
const driftImgs = [...document.querySelectorAll(".split .media img, .split .media video, .gallery figure img, .img-card img")];
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
    document.querySelectorAll(".card:not(.person), .brand, .img-card").forEach((el) => {
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

    // Cursor follower
    const dot = document.createElement("div");
    dot.className = "cursor";
    document.body.append(dot);
    let cx = 0, cy = 0, tx = 0, ty = 0;
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; dot.classList.add("on"); });
    document.addEventListener("pointerleave", () => dot.classList.remove("on"));
    const follow = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      dot.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(follow);
    };
    follow();
    document.querySelectorAll("a, button, .btn, input, textarea").forEach((el) => {
      el.addEventListener("pointerenter", () => dot.classList.add("big"));
      el.addEventListener("pointerleave", () => dot.classList.remove("big"));
    });
  }

  // Page transitions: the curtain closes before leaving, and opens again if the page is restored from cache
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    document.documentElement.classList.add("leaving");
    setTimeout(() => { location.href = a.href; }, 420);
  });
  addEventListener("pageshow", (e) => { if (e.persisted) document.documentElement.classList.remove("leaving"); });
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
  const mega = document.querySelector(".mega span");
  const strip = document.querySelectorAll(".brand-nav, .section-head");
  let lastScroll = scrollY, frame2 = false;

  const update = () => {
    frame2 = false;
    const vh = innerHeight;

    // Scrubbed word fill: starts when the paragraph's top reaches 88% of the viewport, ends at 32%.
    scrubs.forEach(({ p, words }) => {
      const r = p.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const start = vh * 0.88, end = vh * 0.32;
      const t = Math.min(Math.max((start - r.top) / (start - end), 0), 1);
      const lit = t * (words.length + 5);
      for (let i = 0; i < words.length; i++) {
        words[i].style.opacity = (0.2 + 0.8 * Math.min(Math.max(lit - i, 0), 1)).toFixed(2);
      }
    });

    // Header hides on the way down, returns on the way up (stays when the mobile menu is open).
    const y = scrollY, dy = y - lastScroll;
    if (Math.abs(dy) > 6) {
      const menuOpen = navEl && navEl.classList.contains("open");
      header.classList.toggle("hide", dy > 0 && y > 320 && !menuOpen);
      lastScroll = y;
    }
    if (y < 120) header.classList.remove("hide");

    // Footer wordmark glides in from the right and settles as the footer enters view
    if (mega) {
      const r = mega.parentElement.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        const t = Math.min(Math.max(1 - (r.top - vh * 0.1) / (vh * 0.8), 0), 1); // 0 as it enters, 1 when settled
        mega.style.transform = `translateX(${((1 - t) * 32).toFixed(2)}%)`;
      }
    }
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

    // Cursor labels
    const dot = document.querySelector(".cursor");
    if (dot) {
      const text = document.createElement("span");
      dot.append(text);
      const labels = [[".img-card", "View"], [".brand", "Open"], [".person", "Meet"], [".split .media", "Look"], [".episode", "Play"], [".gallery figure", "Zoom"], [".clients img", "Client"]];
      document.addEventListener("pointerover", (e) => {
        const hit = labels.find(([sel]) => e.target.closest(sel));
        dot.classList.toggle("label", !!hit);
        if (hit) { text.textContent = hit[1]; dot.classList.remove("big"); }
      });
    }
  }
}
