const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  // <div class="message"></div>

  const myPseudo = localStorage.getItem('myPseudo')
  if(myPseudo === data.pseudo)
  {
    msgEl.classList.add('myMessage')
  }

  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo + ' 👨‍💻 -'
  msgEl.append(pseudoSpan)

  const dateSpan = document.createElement('span')
  dateSpan.classList.add('dateText')
  dateSpan.textContent = new Date(data.dateText).toLocaleString()
  msgEl.append(dateSpan)

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  msgEl.append(bodyP)

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}
