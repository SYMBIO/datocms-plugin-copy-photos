import './style.css';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  const select = document.createElement('select');
  select.options = [];

  const button = document.createElement('button');
  button.classList.add('DatoCMS-button');
  button.classList.add('DatoCMS-button--large');
  button.textContent = 'Zkopírovat fotky';

  button.addEventListener('click', () => {
  });

  const container = document.createElement('div');
  container.classList.add('container');
  container.appendChild(select);
  container.appendChild(button);

  document.body.appendChild(container);
});
