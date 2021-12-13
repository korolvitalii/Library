const renderItems = (data, domElement) => {
  let html;
  if (Array.isArray(data)) {
    html = data.reduce((acc, item) => {
      acc += `<li class="table-row">
      <div class="col col-1" data-label="title">${item.title}</div>
      <div class="col col-2" data-label="author">${item.author}</div>
      <div class="col col-3" data-label="priority">${item.priority}</div>
      <div class="col col-4" data-label="Kategoria">${item.select}</div>
      </li>
    `;
      return acc;
    }, '');
  } else {
    html = data;
  }
  domElement.innerHTML = html;
};

export { renderItems };
