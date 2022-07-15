// https://basic-server-one.vercel.app/users

/* 
  {
    key: valores
    key: valores
    key: valores
    key: valores
    key: valores
    key: valores
    key: valores
  }
*/

const API_URL = 'https://basic-server-one.vercel.app/users'

const usersListContainerElement = document.querySelector('.usersListContainer')

fetch(API_URL)
  .then(wrapper => wrapper.json())
  .then(response => {
    const tableDataFragment = document.createDocumentFragment()

    for (let i = 0; i < response.data.length; i++) {
      const { name, username, email, phone } = response.data[i]

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

    usersListContainerElement.appendChild(tableDataFragment)
  })