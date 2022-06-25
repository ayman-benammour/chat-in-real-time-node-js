import { fetchAPI } from './api.js'
import { initChat } from './chat.js'
import  { appendMessage } from './dom.js'

async function main() {
  // fetch API simple demo
  const res = await fetchAPI('/')
  const history = await fetchAPI('/chat/history')

  history.messages.forEach(element => {
    appendMessage(element)
  });
  console.log(res)
}
main()

initChat()
