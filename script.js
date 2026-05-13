const dot = document.getElementById("dot"), ring = document.getElementById("ring");
let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + "px"; dot.style.top = my + "px"; });
(function loop() { rx += (mx - rx) * .1; ry += (my - ry) * .1; ring.style.left = rx + "px"; ring.style.top = ry + "px"; requestAnimationFrame(loop); })();
document.querySelectorAll("a,button,.pjc,.tlc,.skc,.crt,.cl,.kpi").forEach(el => {
  el.addEventListener("mouseenter", () => { dot.classList.add("h"); ring.classList.add("h"); });
  el.addEventListener("mouseleave", () => { dot.classList.remove("h"); ring.classList.remove("h"); });
});

const intro = document.getElementById("intro"), flyname = document.getElementById("flyname"), isub = document.getElementById("isub"), sbEl = document.getElementById("sb"), snp = document.getElementById("snp");
const fn1 = flyname.querySelector(".fn1"), fn2 = flyname.querySelector(".fn2");

// Phase 0: Set initial big state - centered, scaled down ready to pop
flyname.style.cssText = "position:fixed;z-index:9510;text-align:center;left:50%;top:50%;transform:translate(-50%,-50%) scale(0.3);opacity:0;font-family:'Bebas Neue',sans-serif;line-height:.92;pointer-events:none;";
fn1.style.cssText = "display:block;font-size:clamp(3rem,7vw,5.5rem);letter-spacing:8px;color:#fff;text-shadow:0 0 30px rgba(232,0,42,.5);white-space:nowrap;";
fn2.style.cssText = "display:block;font-size:clamp(6rem,13vw,10rem);letter-spacing:4px;color:#E8002A;text-shadow:0 0 55px rgba(232,0,42,1),0 0 110px rgba(232,0,42,.6),0 0 180px rgba(232,0,42,.25);white-space:nowrap;";
isub.style.cssText = "position:absolute;z-index:2;font-family:'JetBrains Mono',monospace;font-size:.8rem;letter-spacing:3px;color:#555;top:calc(50% + 95px);left:50%;transform:translateX(-50%);opacity:0;transition:opacity .5s ease;white-space:nowrap;";

// Phase 1: Pop in big
setTimeout(() => {
  flyname.style.transition = "transform .9s cubic-bezier(.34,1.56,.64,1),opacity .65s ease";
  flyname.style.transform = "translate(-50%,-50%) scale(1)";
  flyname.style.opacity = "1";
  isub.style.opacity = "1";
}, 180);

// Phase 2: Peak glow on SINAN
setTimeout(() => {
  fn2.style.textShadow = "0 0 80px rgba(232,0,42,1),0 0 160px rgba(232,0,42,.9),0 0 300px rgba(232,0,42,.5)";
}, 1100);

// Phase 3: Sub fades, glow settles
setTimeout(() => {
  isub.style.opacity = "0";
  fn2.style.textShadow = "0 0 55px rgba(232,0,42,1),0 0 110px rgba(232,0,42,.6)";
}, 2000);

// Phase 4: Sidebar slides in
setTimeout(() => { sbEl.classList.add("in"); }, 2450);

// Phase 5: Seamless fly — morph font to match nameplate exactly, then fly
setTimeout(() => {
  // First: get nameplate position (sidebar is now visible)
  const nr = snp.getBoundingClientRect();
  const targetCX = nr.left + nr.width / 2;
  const targetCY = nr.top + nr.height / 2;

  // Get current flyname bounding box (big, centered)
  const fr = flyname.getBoundingClientRect();
  const startCX = fr.left + fr.width / 2;
  const startCY = fr.top + fr.height / 2;

  // Step A: instantly shrink font to match nameplate font size (no transition on font yet)
  // Nameplate is 1.05rem Bebas Neue, letter-spacing 3px
  // We morph: fn1 shrinks away, fn2 becomes the nameplate text size
  // Use a cross-fade: flyname transitions font+position simultaneously

  // Calculate translation needed when flyname is at nameplate font size
  // We do this via a 2-step: first transition font-size+letter-spacing, then translate
  flyname.style.transition = "none";

  // Capture current pixel position
  const curLeft = startCX;
  const curTop = startCY;

  // Switch to absolute pixel positioning for precision
  flyname.style.left = curLeft + "px";
  flyname.style.top = curTop + "px";
  flyname.style.transform = "translate(-50%,-50%) scale(1)";

  // Force reflow
  flyname.offsetHeight;

  // Now animate: font shrinks AND element flies to nameplate position simultaneously
  // Fade out fn1 (MUHAMMED), keep fn2 (SINAN) but shrink to nameplate size
  fn1.style.transition = "opacity .35s ease, font-size .9s cubic-bezier(.76,0,.24,1), letter-spacing .9s cubic-bezier(.76,0,.24,1)";
  fn1.style.opacity = "0";
  fn1.style.fontSize = "1.05rem";
  fn1.style.letterSpacing = "3px";

  fn2.style.transition = "font-size .9s cubic-bezier(.76,0,.24,1), letter-spacing .9s cubic-bezier(.76,0,.24,1), text-shadow .4s ease";
  fn2.style.fontSize = "1.05rem";
  fn2.style.letterSpacing = "3px";
  fn2.style.textShadow = "0 0 20px rgba(232,0,42,.7)";
  fn2.style.color = "#E8002A";

  // Fly to nameplate position
  flyname.style.transition = "left 1s cubic-bezier(.76,0,.24,1), top 1s cubic-bezier(.76,0,.24,1), opacity .3s ease .8s";
  flyname.style.left = targetCX + "px";
  flyname.style.top = targetCY + "px";
  flyname.style.opacity = "0";

}, 3050);

// Phase 6: Nameplate glows exactly when flyname arrives & fades
setTimeout(() => {
  snp.classList.add("glow");
}, 4000);

// Phase 7: Fade out intro, reveal page
setTimeout(() => {
  intro.style.transition = "opacity .65s ease";
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    document.querySelectorAll("#hero .rev").forEach((el, i) => setTimeout(() => el.classList.add("show"), i * 110));
  }, 650);
}, 4200);

const obs = new IntersectionObserver(en => { en.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); }); }, { threshold: .1 });
document.querySelectorAll(".rev").forEach(el => obs.observe(el));
const sObs = new IntersectionObserver(en => { en.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }); }, { threshold: .04 });
document.querySelectorAll("section").forEach(s => sObs.observe(s));

const bObs = new IntersectionObserver(en => { en.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll(".sf").forEach(f => { const p = parseFloat(f.dataset.p || ".8"); setTimeout(() => f.style.transform = "scaleX(" + p + ")", 80); }); }); }, { threshold: .2 });
document.querySelectorAll(".sbrs").forEach(el => bObs.observe(el));

function tlTab(id, btn) {
  document.querySelectorAll(".tlp").forEach(p => p.classList.remove("on"));
  document.querySelectorAll(".tltb").forEach(t => t.classList.remove("on"));
  btn.classList.add("on");
  const panel = document.getElementById("tl" + id);
  panel.classList.add("on");
  panel.querySelectorAll(".tli").forEach((item, i) => { item.style.opacity = "0"; item.style.transform = "translateX(-14px)"; item.style.transition = "none"; setTimeout(() => { item.style.transition = "opacity .32s ease,transform .32s cubic-bezier(.16,1,.3,1)"; item.style.opacity = "1"; item.style.transform = ""; }, i * 80 + 20); });
}

const navLinks = document.querySelectorAll("nav a");
const secObs2 = new IntersectionObserver(en => { en.forEach(e => { if (e.isIntersecting) { navLinks.forEach(l => l.classList.remove("act")); const l = document.querySelector("nav a[href='#" + e.target.id + "']"); if (l) l.classList.add("act"); } }); }, { threshold: .35 });
document.querySelectorAll("section").forEach(s => secObs2.observe(s));

const roles = ["Software Developer", "Flutter Developer", "Mobile App Developer", "IT Engineer"];
let ri = 0, ci = 0, del = false;
const roleEl = document.querySelector(".hrl");
if (roleEl) { setInterval(() => { const cur = roles[ri]; if (!del) { if (ci < cur.length) { ci++; roleEl.innerHTML = cur.slice(0, ci) + ' <span class="bl">_</span>'; } else { setTimeout(() => { del = true; }, 1500); return; } } else { if (ci > 0) { ci--; roleEl.innerHTML = cur.slice(0, ci) + ' <span class="bl">_</span>'; } else { del = false; ri = (ri + 1) % roles.length; } } }, 75); }

// ── EmailJS Contact Form ──
// REPLACE these with your actual EmailJS credentials:
// 1. Go to https://www.emailjs.com/ and sign up (free)
// 2. Add an email service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Copy your Public Key from Account → General
const EMAILJS_PUBLIC_KEY = "2IxypZ9sK4zCy_Xmf";
const EMAILJS_SERVICE_ID = "service_jpar6tv";
const EMAILJS_TEMPLATE_ID = "template_kzbp726";

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const toastIcon = toast.querySelector(".toast-icon");
const toastMsg = toast.querySelector(".toast-msg");

function showToast(msg, isError) {
  toastMsg.textContent = msg;
  toast.classList.remove("error");
  if (isError) {
    toast.classList.add("error");
    toastIcon.innerHTML = "&#10007;";
  } else {
    toastIcon.innerHTML = "&#10003;";
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4500);
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type='submit']");
    const origText = btn.innerHTML;
    btn.innerHTML = "Sending&hellip;";
    btn.disabled = true;

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        showToast("Message sent successfully! We'll get back to you soon.", false);
        contactForm.reset();
        btn.innerHTML = origText;
        btn.disabled = false;
      })
      .catch((err) => {
        showToast("Oops! Something went wrong. Please try again.", true);
        console.error("EmailJS error:", err);
        btn.innerHTML = origText;
        btn.disabled = false;
      });
  });
}