(function () {
  "use strict";

  /* ---------------- Nav: scroll state + mobile toggle ---------------- */
  var nav = document.querySelector(".site-nav");
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Services anchor nav: active state ---------------- */
  var anchorLinks = document.querySelectorAll(".anchor-nav a");
  var blocks = document.querySelectorAll(".service-block[id]");
  if (anchorLinks.length && blocks.length && "IntersectionObserver" in window) {
    var activeIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            anchorLinks.forEach(function (a) {
              a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    blocks.forEach(function (b) { activeIO.observe(b); });
  }

  /* ---------------- Intro sequence (Home only, once per session) ---------------- */
  var overlay = document.getElementById("intro-overlay");
  if (overlay) {
    var seen = false;
    try { seen = sessionStorage.getItem("noremoIntroSeen") === "1"; } catch (e) { seen = false; }
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function dismiss() {
      overlay.classList.add("intro-hidden");
      document.body.style.overflow = "";
      try { sessionStorage.setItem("noremoIntroSeen", "1"); } catch (e) {}
    }

    if (seen || reduced) {
      overlay.classList.add("intro-hidden");
      overlay.style.display = "none";
    } else {
      document.body.style.overflow = "hidden";
      var glow = overlay.querySelector(".intro-glow");
      var mark = overlay.querySelector(".intro-mark");

      requestAnimationFrame(function () {
        setTimeout(function () {
          if (glow) glow.style.transform = "translate(-50%, -46%)";
        }, 60);
        setTimeout(function () {
          if (mark) mark.classList.add("is-in");
        }, 900);
        setTimeout(dismiss, 2300);
      });

      overlay.addEventListener("click", dismiss);
    }
  }
})();
