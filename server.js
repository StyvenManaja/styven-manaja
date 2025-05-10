const app = require('./app');
const db = require('./src/config/db');

db.connectToDB();

app.listen(process.env.PORT, () => {
    console.log(`Server launced at port ${process.env.PORT}`);
})