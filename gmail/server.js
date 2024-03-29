const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendfile('./index.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})