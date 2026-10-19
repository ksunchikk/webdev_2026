export const siteMap = {
  slug: "",
  title: "Главная",
  view: "home",
  children: [
    {
      slug: "menu",
      title: "Меню",
      view: "menu",
      children: [
        {
          slug: "coffee",
          title: "Кофе",
          view: "category",
        },
        {
          slug: "tea",
          title: "Чай",
          view: "category",
        },
        {
          slug: "desserts",
          title: "Десерты",
          view: "category",
        },
      ],
    },
    {
      slug: "about",
      title: "О нас",
      view: "about",
    },
    {
      slug: "contacts",
      title: "Контакты",
      view: "contacts",
    },
  ],
};

export const products = [
  { id: 1, name: "Эспрессо", category: "coffee", price: 150 },
  { id: 2, name: "Капучино", category: "coffee", price: 260 },
  { id: 3, name: "Флэт уайт", category: "coffee", price: 240 },
  { id: 4, name: "Сенча", category: "tea", price: 180 },
  { id: 5, name: "Пуэр", category: "tea", price: 250 },
  { id: 6, name: "Круассан", category: "desserts", price: 160 },
  { id: 7, name: "Чизкейк", category: "desserts", price: 290 },
  { id: 8, name: "Раф", category: "coffee", price: 280 },
  { id: 9, name: "Масала", category: "tea", price: 230 },
  { id: 10, name: "Брауни", category: "desserts", price: 210 },
];
