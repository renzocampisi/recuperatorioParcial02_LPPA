// https://basic-server-one.vercel.app/users
const API_URL = 'https://basic-server-one.vercel.app/users'

function renderUsers(source, domNode) {
  const tableDataFragment = document.createDocumentFragment()
  for (let i = 0; i < source.length; i++) {
    const { name, username, email, phone } = source[i]

    const rowElement = document.createElement('tr')
    const innerRowData = 
    `
      <td>${name}</td>
      <td>${username}</td>
      <td>${email}</td>
      <td>${phone}</td>
    `

    rowElement.innerHTML = innerRowData

    tableDataFragment.appendChild(rowElement)
  }
  domNode.appendChild(tableDataFragment)
}

function renderError(domNode) {
  const errorElement = document.createElement('div')
  const innerErrorHtml = `<h4>Oops! Algo salió mal</h4>`

  errorElement.innerHTML = innerErrorHtml

  domNode.appendChild(errorElement)
}

const usersListContainerElement = document.querySelector('.usersListContainer')
const errorContainer = document.querySelector('.errorContainer')
const cache = JSON.parse(localStorage.getItem('usersCache'))

if (cache) {
  renderUsers(cache, usersListContainerElement)
} else {
  // realizamos la peticion y renderizamos los datos
  fetch(API_URL)
  .then(wrapper => wrapper.json())
  .then(response => {

    if (response.error) {
      renderError(errorContainer)
    } else {
      renderUsers(response.data, usersListContainerElement)
      localStorage.setItem('usersCache', JSON.stringify(response.data))
    }
  })
  .catch(error => {
    renderError(errorContainer)
  })
}
