const express = require('express')
const app = express()
const port = 3001

app.get('/working', (req, res) => {
    res.send({ working: true })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})