import './style.css';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  const {
    titleField,
    allItemsQuery,
    sourceField,
    targetField,
  } = plugin.parameters.instance;

  fetch('https://graphql.datocms.com/preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${plugin.parameters.global.datoCmsApiToken}`,
    },
    body: JSON.stringify({
      query: `{
  ${allItemsQuery}(orderBy: [${titleField}_ASC], first: 100, skip: 0, filter: { photos: { exists: true }}) {
    id
    ${titleField}
    ${sourceField} {
      id
      alt
      title
      customData
    }
  }
}
`,
    }),
  }).then(res => res.json())
    .then((res) => {
      console.log(res);
      const data = res.data[allItemsQuery];
      const items = [];
      const select = document.createElement('select');

      data.forEach((i) => {
        const option = document.createElement('option');
        option.value = i.id;
        option.text = i[titleField];
        select.appendChild(option);
        items.push(i);
      });

      fetch('https://graphql.datocms.com/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${plugin.parameters.global.datoCmsApiToken}`,
        },
        body: JSON.stringify({
          query: `{
  ${allItemsQuery}(orderBy: [${titleField}_ASC], first: 100, skip: 100, filter: { photos: { exists: true }}) {
    id
    ${titleField}
    ${sourceField} {
      id
      alt
      title
      customData
    }
  }
}
`,
        }),
      }).then(res2 => res2.json())
        .then((res2) => {
          console.log(res);
          const data2 = res2.data[allItemsQuery];

          data2.forEach((i) => {
            const option = document.createElement('option');
            option.value = i.id;
            option.text = i[titleField];
            select.appendChild(option);
            items.push(i);
          });

          const button = document.createElement('button');
          button.classList.add('DatoCMS-button');
          button.classList.add('DatoCMS-button--small');
          button.textContent = 'Zkopírovat fotky';

          button.addEventListener('click', () => {
            plugin.setFieldValue(targetField, items[select.selectedIndex][sourceField]);
          });

          const container = document.createElement('div');
          container.classList.add('container');
          container.appendChild(select);
          container.appendChild(button);

          document.body.appendChild(container);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
