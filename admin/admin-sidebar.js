(() => {
  const sidebar = document.querySelector(".admin-sidebar");
  const main = document.querySelector(".main-content");

  if (!sidebar || !main) {
    throw new Error("Admin sidebar or main content is missing.");
  }

  const header = main.firstElementChild;
  if (!header) {
    throw new Error("Admin page header is missing.");
  }

  let title = header.querySelector(":scope > div");
  if (!title || !title.querySelector("h2")) {
    title = document.createElement("div");
    title.className = "admin-page-title";
    const heading = header.querySelector(":scope > h2");
    const description = header.querySelector(":scope > p");

    if (heading) title.append(heading);
    if (description) title.append(description);
    header.prepend(title);
  } else {
    title.classList.add("admin-page-title");
  }
  header.classList.add("admin-page-header");

  const sidebarId = sidebar.id || "admin-sidebar";
  sidebar.id = sidebarId;
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  sidebar.setAttribute("aria-hidden", String(isMobile()));
  sidebar.inert = isMobile();

  const toggle = document.createElement("button");
  toggle.className = "sidebar-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open navigation menu");
  toggle.setAttribute("aria-controls", sidebarId);
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  header.prepend(toggle);

  const backdrop = document.createElement("button");
  backdrop.className = "sidebar-backdrop";
  backdrop.type = "button";
  backdrop.setAttribute("aria-label", "Close navigation menu");
  backdrop.tabIndex = -1;
  sidebar.after(backdrop);

  const closeSidebar = () => {
    sidebar.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    sidebar.setAttribute("aria-hidden", String(isMobile()));
    sidebar.inert = isMobile();
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    backdrop.classList.toggle("is-visible", isOpen);
    sidebar.setAttribute("aria-hidden", String(!isOpen));
    sidebar.inert = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  backdrop.addEventListener("click", closeSidebar);
  sidebar.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSidebar();
  });
  window.addEventListener("resize", () => {
    closeSidebar();
  });
})();
