import { appendMessage } from './dom'

/** @param {MessageEvent} event */
function handleWSMessage(event) {
  const data = JSON.parse(event.data)

  if(data?.type === 'ERROR') {
    alert(data.payload)
  }

  console.log(data)
  if (data?.type === 'NEW_MESSAGE') {
    appendMessage(data.payload)
  }
}

const ws = new WebSocket('ws://127.0.0.1:5000/chat')
ws.onopen = function open() {
  console.log('ws connected')
}
ws.onmessage = handleWSMessage

export function initChat() {
  /** @type {HTMLFormElement | null} */
  const messageForm = document.querySelector('#new-message')
  if (!messageForm) throw new Error('missing form')

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const pseudo = messageForm.pseudo.value
    const body = messageForm.body.value

    if (!pseudo || !body) return
    localStorage.setItem('myPseudo', pseudo)
    ws.send(JSON.stringify({ pseudo, body }))
    messageForm.body.value = null
  })
}
