import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Backend: Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

