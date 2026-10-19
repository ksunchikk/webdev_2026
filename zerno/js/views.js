import { el } from "./dom.js";
import { products } from "./data.js";

const price = Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

function productCard(product, isNew = false) {
  return el(
    "li",
    { className: "card" },
    el("h1", { className: "card__title" }, product.name),
    isNew && el("span", { className: "badge" }, "Новинка"),
    el("p", { className: "card__price" }, price.format(product.price))
  );
}

function homeView() {
  return [
    el("h1", {}, 'Кофейня "Зерно"'),
    el(
      "p",
      { className: "lead" },
      "Сами обжариваем и варим кофе так, как мы любим"
    ),
    el("a", { className: "button", href: "#/menu" }, "Смотреть меню"),
  ];
}

function aboutView(route) {
  return [
    el("h1", {}, route.title),
    el("p", {}, "Открылись в 2026"),
    el("p", {}, "Работаем с фермерами из Эфиопии"),
  ];
}

function contactsView(route) {
  const info = [
    ["Адрес", "hshshsh"],
    ["Часы работы", "hshshsh"],
    ["Номер телефона", "hshshsh"],
  ];
  return [
    el("h1", {}, route.title),
    el(
      "dl",
      { className: "info" },
      info.flatMap(([key, value]) => [el("dt", {}, key), el("dd", {}, value)])
    ),
  ];
}

function placeholderView(route) {
  return [el("h1", {}, route.title), el("p", {}, "Раздел в разработке")];
}

export function notFoundView(path) {
  return [
    el("h1", {}, "Страница не найдена"),
    el("p", {}, `Раздела ${path} нет`),
    el("a", { href: "#/" }, "Вернуться на главную"),
  ];
}

function menuView(route) {
  const groups = Object.groupBy(products, (product) => product.category);
  console.log(groups, route.children);
  return [
    el("h1", {}, route.title),
    ...route.children.map((category) =>
      el(
        "section",
        { className: "menu-group" },
        el("h2", {}, el("a", { href: `#${category.path}` }, category.title)),
        el(
          "ul",
          { className: "products" },
          (groups[category.slug] ?? []).map((product) => productCard(product))
        )
      )
    ),
  ];
}

const sorter = {
  default: (list) => list,
  cheap: (list) => list.toSorted((a, b) => a.price - b.price),
  expensive: (list) => list.toSorted((a, b) => b.price - a.price),
  title: (list) => list.toSorted((a, b) => a.name.localeCompare(b.name, "ru")),
};

function categoryView(route) {
  const category = route.segments.at(-1);
  const items = products.filter((product) => product.category === category);
  const newItem = products.findLast((product) => product.category === category);

  const list = el("ul", { className: "products" });

  const select = el(
    "select",
    { id: "sort", className: "select" },
    el("option", { value: "default" }, "по умолчанию"),
    el("option", { value: "cheap" }, "сначала дешевые"),
    el("option", { value: "expensive" }, "сначала дорогие"),
    el("option", { value: "title" }, "по названию")
  );

  function renderList() {
    const sorted = sorter[select.value](items);
    return list.replaceChildren(
      ...sorted.map((product) => productCard(product, product === newItem))
    );
  }

  select.addEventListener("change", renderList);
  renderList();

  return [
    el("h1", {}, route.title),
    el(
      "div",
      { className: "toolbar" },
      el("label", { htmlFor: "sort" }, "Сортировка"),
      select
    ),
    list,
  ];
}

export const views = {
  home: homeView,
  menu: menuView,
  category: categoryView,
  about: aboutView,
  contacts: contactsView,
};
