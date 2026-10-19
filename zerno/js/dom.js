// Фабрика для элементов
// <a href.. classname..>......</a>
// el('a', { href: ..., classname: .... , 'title')

export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (key in node) {
      node[key] = value; // все свойства узла
    } else {
      node.setAttribute(key, value); // aria и data свойства
    }
  }

  node.append(
    ...children.flat().filter((child) => child != null && child !== false)
  );
  return node;
}
