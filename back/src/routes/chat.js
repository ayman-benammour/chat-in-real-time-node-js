import { randomUUID } from 'crypto'

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 * @property {string} dateText - date of the message
 */

/** @type { Message[] } */
const messages = []
console.log(messages)

/**
 * @param {string} pseudo
 * @param {string} body
 * @param {string} dateText
 */


function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    pseudo,
    body,
    dateText: new Date(),
  }
  messages.push(message)
  return message
}

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    app.websocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  }

  // /chat/
  app.get('/', { websocket: true }, (connection, reply) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))

      if (data.pseudo.length > 10) {
        connection.socket.send(
          JSON.stringify({
            type: 'ERROR',
            payload: 'Pseudo too long ❌',
        }))
        return
      }

      if(data.body.length > 100) {
        connection.socket.send(
          JSON.stringify({
            type: 'ERROR',
            payload: 'Message must be 100 characters ❌',
        }));
        return
      }

      const newMessage = handleNewMessage(data.pseudo, data.body)

      broadcast({
        type: 'NEW_MESSAGE',
        payload: newMessage,
      })
    })
  })

  // /history/
  app.get('/history', (request, reply) => {
    reply.send({ messages })
  })
}
