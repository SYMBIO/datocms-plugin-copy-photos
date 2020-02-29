import './style.css';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  const container = document.createElement('button');
  container.classList.add('DatoCMS-button');
  container.classList.add('DatoCMS-button--large');
  container.textContent = 'Zkopírovat fotky';

  container.addEventListener('click', () => {
  });

  document.body.appendChild(container);
});
