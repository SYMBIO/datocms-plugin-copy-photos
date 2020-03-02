import './style.css'
import { SiteClient } from 'datocms-client'

window.DatoCmsPlugin.init(async (plugin) => {
  plugin.startAutoResizer()

  const titleField = plugin.parameters.instance.titleField
  const allItemsQuery = plugin.parameters.instance.allItemsQuery
  const sourceField = plugin.parameters.instance.sourceField
  const targetField = plugin.parameters.instance.targetField

  fetch('https://graphql.datocms.com/preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${plugin.parameters.global.datoCmsApiToken}`,
    },
    body: JSON.stringify({
      query: `{
            ${allItemsQuery}(orderBy: [${titleField}_ASC]) {
              id
              ${titleField}
              ${sourceField} {
                id
              }
            }
          }
          `,
    }),
  }).then(res => res.json())
    .then((res) => {
      const data = res.data[allItemsQuery]
      const items = {}
      const select = document.createElement('select')

      data.forEach(i => {
        const option = document.createElement('option')
        option.value = i.id
        option.text = i[titleField]
        select.appendChild(option)
        items[i.id] = i
      })

      const button = document.createElement('button')
      button.classList.add('DatoCMS-button')
      button.classList.add('DatoCMS-button--large')
      button.textContent = 'Zkopírovat fotky'

      button.addEventListener('click', () => {
        plugin.setFieldValue(targetField, data[select.selectedIndex][sourceField].map(v => ({
          upload_id: v.id,
          alt: null,
          title: null,
          customData: {},
        })))
      })

      const container = document.createElement('div')
      container.classList.add('container')
      container.appendChild(select)
      container.appendChild(button)

      document.body.appendChild(container)
    })
    .catch((error) => {
      console.log(error)
    })
})
