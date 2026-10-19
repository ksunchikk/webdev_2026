import { siteMap } from "./data.js";
import { el } from "./dom.js";
import { createRoute, getTrail, flatten, Router } from "./router.js";
import { views, notFoundView } from "./views.js";

const root = createRoute(siteMap);
const routes = flatten(root);

const nav = document.querySelector("#site-nav");
const app = document.querySelector("#app");
const breadcrumps = document.querySelector(".breadcrumbs");

function renderNav(items, isSublist = false) {
  return el(
    "ul",
    { className: isSublist ? "nav__sublist" : "nav__list" },
    items.map((route) =>
      el(
        "li",
        { className: "nav__item" },
        el(
          "a",
          {
            className: "nav__link",
            href: `#${route.path}`,
            "data-path": route.path,
          },
          route.title
        ),
        route.children.length > 0 && renderNav(route.children, true)
      )
    )
  );
}

function highlight(route) {
  const trailPath = new Set(getTrail(route).map((item) => item.path));
  for (const link of nav.querySelectorAll(".nav__link")) {
    const isCurrent = link.dataset.path === route?.path;
    console.log("aaaaa", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
    link.classList.toggle(
      "is-parent",
      !isCurrent && trailPath.has(link.dataset.path)
    );
  }
}

function renderBreadcrumps(route) {
  const trail = getTrail(route);

  if (trail.length < 2) {
    breadcrumps.replaceChildren();
    return;
  }

  const current = trail.at(-1);
  breadcrumps.replaceChildren(
    el(
      "ol",
      { className: "breadcrumbs__list" },
      trail
        .slice(0, -1)
        .map((item) =>
          el("li", {}, el("a", { href: `#${item.path}` }, item.title))
        ),
      el("li", { "aria-current": "page" }, current.title)
    )
  );
}

function renderPage(route, path) {
  if (route) {
    app.replaceChildren(...views[route.view](route));
  } else {
    app.replaceChildren(...notFoundView(path));
  }
  highlight(route);
  renderBreadcrumps(route);
}

nav.append(renderNav(root.children));

const router = new Router(routes, renderPage);
router.start();

// console.log(root, routes);
// console.log("Модуль подключен!");

// console.log(siteMap);

// document
//   .querySelector("#app")
//   .append(
//     el("h1", {}, "Здравствуйте"),
//     el("p", { classname: "par" }, "<b>Жирный текст</b>")
//   );
