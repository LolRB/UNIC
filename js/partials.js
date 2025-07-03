/**
 * Carga un partial vía fetch y lo inyecta en el elemento
 * @param {string} id   – id del placeholder donde inyectar
 * @param {string} url  – ruta al archivo partial
 * @returns {Promise<void>}
 */
function includeHTML(id, url) {
  return fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${url}`);
      return r.text();
    })
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
}

/** Añade .active al nav-link cuyo href coincide con la ruta actual */
function highlightActiveNav() {
  const path = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href").replace(/\/$/, "");
    if (href === path || (href === "" && path === "/")) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.replace(/\/$/, "");

  // 1) Navbar
  includeHTML("navbar-placeholder", "/partials/navbar.html")
    .then(highlightActiveNav)
    .catch(console.error);

  // 2) Banner dinámico según la ruta
  const bannerMap = {
    "/": "/partials/banners/home.html",
    "/index.html": "/partials/banners/home.html",
    "/pages/ofertasacad.html": "/partials/banners/ofertasacad.html",
    "/pages/capacdocente.html": "/partials/banners/capacdocente.html",
    "/pages/diplomados.html": "/partials/banners/diplomados.html",
    "/pages/cursos-IA.html": "/partials/banners/cursos-IA.html",
    "/pages/callcenter.html": "/partials/banners/callcenter.html",
    "/pages/catalogos.html": "/partials/banners/catalogos.html",
    "/pages/instalaciones.php": "/partials/banners/instalaciones.html",
  };
  const bannerPartial = bannerMap[path] || bannerMap["/"];
  includeHTML("banner-placeholder", bannerPartial).catch(console.error);

  // 3) Contenido específico (cards) según la ruta
  const contentMap = {
    "/": "/partials/cards/home.html",
    "/index.html": "/partials/cards/home.html",
    "/pages/ofertasacad.html": "/partials/cards/ofertasacad.html",
    "/pages/capacdocente.html": "/partials/cards/capacdocente.html",
    "/pages/diplomados.html": "/partials/cards/diplomados.html",
    "/pages/cursos-IA.html": "/partials/cards/cursos-IA.html",
    "/pages/callcenter.html": "/partials/cards/callcenter.html",
    "/pages/catalogos.html": "/partials/cards/catalogos.html",
    "/pages/instalaciones.php": "/partials/cards/instalaciones.html",
  };
  const contentPartial = contentMap[path] || contentMap["/"];
  includeHTML("homeCards-placeholder", contentPartial).catch(console.error);

  // 4) Footer
  includeHTML("footer-placeholder", "/partials/footer.html").catch(
    console.error
  );
});
