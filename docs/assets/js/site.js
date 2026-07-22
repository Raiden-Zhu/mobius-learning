(function () {
  "use strict";

  const dialog = document.getElementById("figure-dialog");
  const dialogImage = document.getElementById("dialog-image");
  const dialogOriginal = document.getElementById("dialog-original");
  const dialogClose = document.getElementById("dialog-close");
  const dialogViewport = document.getElementById("dialog-viewport");
  const zoomOut = document.getElementById("zoom-out");
  const zoomReset = document.getElementById("zoom-reset");
  const zoomIn = document.getElementById("zoom-in");
  const zoomLevels = [1, 1.5, 2, 3];
  let zoomIndex = 0;
  let dialogTrigger = null;

  function applyZoom() {
    if (!dialogImage) return;
    dialogImage.style.width = `${zoomLevels[zoomIndex] * 100}%`;
    if (zoomOut) zoomOut.disabled = zoomIndex === 0;
    if (zoomIn) zoomIn.disabled = zoomIndex === zoomLevels.length - 1;
  }

  function resetDialogViewport() {
    zoomIndex = 0;
    applyZoom();
    if (dialogViewport) {
      dialogViewport.scrollTop = 0;
      dialogViewport.scrollLeft = 0;
    }
  }

  if (dialog && typeof dialog.showModal === "function") {
    document.querySelectorAll("[data-figure-open]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        dialogTrigger = link;
        dialogImage.src = link.dataset.dialogSrc;
        dialogImage.alt = link.dataset.dialogAlt || "";
        dialogOriginal.href = link.dataset.dialogOriginal || link.href;
        resetDialogViewport();
        dialog.showModal();
        dialogClose.focus();
      });
    });

    dialogClose.addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", function () {
      if (dialogTrigger) dialogTrigger.focus();
    });

    zoomOut.addEventListener("click", function () {
      if (zoomIndex > 0) zoomIndex -= 1;
      applyZoom();
    });

    zoomReset.addEventListener("click", resetDialogViewport);

    zoomIn.addEventListener("click", function () {
      if (zoomIndex < zoomLevels.length - 1) zoomIndex += 1;
      applyZoom();
    });

    applyZoom();
  }

  const copyButton = document.getElementById("copy-bibtex");
  const bibtexCode = document.getElementById("bibtex-code");
  const copyStatus = document.getElementById("copy-status");
  let statusTimer;

  function legacyCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) throw new Error("Copy command failed");
  }

  function setCopyStatus(message) {
    window.clearTimeout(statusTimer);
    copyStatus.textContent = message;
    statusTimer = window.setTimeout(function () {
      copyStatus.textContent = "";
    }, 2400);
  }

  if (copyButton && bibtexCode && copyStatus) {
    copyButton.addEventListener("click", async function () {
      const text = bibtexCode.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          legacyCopy(text);
        }
        setCopyStatus("Copied");
      } catch (error) {
        setCopyStatus("Copy failed");
      }
    });
  }

  const narrowFigures = window.matchMedia("(max-width: 900px)");

  const mastheadCarousel = document.querySelector(".masthead-figures");

  if (mastheadCarousel && "IntersectionObserver" in window) {
    const carouselCards = Array.from(mastheadCarousel.querySelectorAll(".masthead-result"));
    mastheadCarousel.classList.add("masthead-figures--enhanced");
    if (carouselCards[0]) carouselCards[0].classList.add("is-active");

    const carouselObserver = new IntersectionObserver(function (entries) {
      if (!narrowFigures.matches) return;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.55) return;
        carouselCards.forEach(function (card) {
          card.classList.toggle("is-active", card === entry.target);
        });
      });
    }, {
      root: mastheadCarousel,
      threshold: [0.55, 0.75]
    });

    carouselCards.forEach(function (card) {
      carouselObserver.observe(card);
    });

    narrowFigures.addEventListener("change", function (event) {
      if (!event.matches) return;
      carouselCards.forEach(function (card, index) {
        card.classList.toggle("is-active", index === 0);
      });
    });
  }

  function revealMobiusPanels() {
    if (!narrowFigures.matches) return;
    document.querySelectorAll(".paper-figure--dense .figure-viewport").forEach(function (viewport) {
      if (viewport.dataset.userScrolled === "true") return;
      const focus = Number.parseFloat(viewport.dataset.scrollFocus || "0.5");
      const target = viewport.scrollWidth * focus - viewport.clientWidth * 0.28;
      const maximum = viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollLeft = Math.max(0, Math.min(target, maximum));
    });
  }

  document.querySelectorAll(".paper-figure--dense .figure-viewport").forEach(function (viewport) {
    viewport.addEventListener("pointerdown", function () {
      viewport.dataset.userScrolled = "true";
    }, { once: true });
    viewport.addEventListener("keydown", function () {
      viewport.dataset.userScrolled = "true";
    }, { once: true });
  });

  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(revealMobiusPanels);
  });
  narrowFigures.addEventListener("change", revealMobiusPanels);
})();
