const express = require('express');
const app = express();

const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

db.sync()
.catch(err => console.log(err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);

app.listen(process.env.APP_PORT, function() {
    console.log(`App is listening on ${process.env.APP_PORT}`);
})