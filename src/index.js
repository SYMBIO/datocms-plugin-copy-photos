import './style.css'
import { SiteClient } from 'datocms-client'

window.DatoCmsPlugin.init(async (plugin) => {
  plugin.startAutoResizer()

  const client = new SiteClient(plugin.parameters.global.datoCmsApiToken)
  const items = await client.items.all({
    'filter[type]': plugin.parameters.instance.sourceTypeId,
  });

  const select = document.createElement('select')
  items.forEach(i => {
    const option = document.createElement('option');
    option.value = i.id;
    option.text = i.title;
    select.appendChild(option);
  });

  const button = document.createElement('button')
  button.classList.add('DatoCMS-button')
  button.classList.add('DatoCMS-button--large')
  button.textContent = 'Zkopírovat fotky'

  button.addEventListener('click', () => {
  })

  const container = document.createElement('div')
  container.classList.add('container')
  container.appendChild(select)
  container.appendChild(button)

  document.body.appendChild(container)
})
