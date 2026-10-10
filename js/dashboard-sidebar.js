(() => {
  const sidebar = document.querySelector(".dashboard-sidebar");
  const main = document.querySelector(".dashboard-main");
  const header = main?.firstElementChild;

  if (!sidebar || !main || !header) {
    throw new Error("Dashboard sidebar, main content, or header is missing.");
  }

  let title = header.querySelector(":scope > div");
  if (!title || !title.querySelector("h2")) {
    title = document.createElement("div");
    const heading = header.querySelector(":scope > h2");
    const description = header.querySelector(":scope > p");

    if (heading) title.append(heading);
    if (description) title.append(description);
    header.prepend(title);
  }

  header.classList.add("portal-page-header");
  title.classList.add("portal-page-title");

  const sidebarId = sidebar.id || "portal-dashboard-sidebar";
  sidebar.id = sidebarId;
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  sidebar.setAttribute("aria-hidden", String(isMobile()));
  sidebar.inert = isMobile();

  const toggle = document.createElement("button");
  toggle.className = "portal-sidebar-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open navigation menu");
  toggle.setAttribute("aria-controls", sidebarId);
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  header.prepend(toggle);

  const backdrop = document.createElement("button");
  backdrop.className = "portal-sidebar-backdrop";
  backdrop.type = "button";
  backdrop.setAttribute("aria-label", "Close navigation menu");
  backdrop.tabIndex = -1;
  sidebar.after(backdrop);

  const closeSidebar = (restoreFocus = false) => {
    sidebar.classList.remove("portal-sidebar-open");
    backdrop.classList.remove("is-visible");
    sidebar.setAttribute("aria-hidden", String(isMobile()));
    sidebar.inert = isMobile();
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");

    if (restoreFocus && isMobile()) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("portal-sidebar-open");
    backdrop.classList.toggle("is-visible", isOpen);
    sidebar.setAttribute("aria-hidden", String(!isOpen && isMobile()));
    sidebar.inert = !isOpen && isMobile();
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    if (isOpen) sidebar.querySelector(".nav-item")?.focus();
  });

  backdrop.addEventListener("click", () => closeSidebar(true));
  sidebar.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", () => closeSidebar());
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSidebar(true);
  });
  window.addEventListener("resize", () => closeSidebar());
})();
