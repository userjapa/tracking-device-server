const http       = require('http'),
      socketIo   = require('socket.io'),
      express    = require('express'),
      bodyParser = require('body-parser'),
      cors       = require('cors')

const PORT = process.env.PORT || 3000

const app        = express(),
      httpServer = http.createServer(app),
      io         = socketIo(httpServer, { path: '/socket' })

app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type']
}))

app.get('/', (req, res) => {
  res.send('Tracking Device Server')
})

app.post('/tracking', (req, res) => {
  const [ lat, lng ] = req.body.split(';')

  io.emit('tracking', {
    lat,
    lng
  })

  res.send()
})

app.use('*', (req, res) => {
  res.status(404).send('Not found')
})

httpServer.listen(PORT, () => console.log(`Running at port ${PORT}`))
