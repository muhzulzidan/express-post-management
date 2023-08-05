require("dotenv").config();
const express = require("express");
const cors = require('cors')
const PORT = process.env.SERVER_PORT || 3000;
const {sequelize} = require('./models')

const productRouter = require('./routes/product.route')
const userRouter = require('./routes/user.route')
const postRouter = require('./routes/post.route'); // Import the new post route


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: true, credentials: true}))
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Internal Server Error');
});


sequelize.authenticate().then(function(error) {
	console.log(`Database Connection has been established successfully`)
}).catch(function(error) {
	console.log('unable connect to database', error)
})

app.use("/api/products", productRouter)
app.use("/api/user", userRouter)
app.use('/api/posts', postRouter); // Add the new post route here



app.get("/home", (req, res) => {
	res.send({ Name: 'myProductApi', version: '1.0.23', author: 'Faizul' })
})


app.listen(PORT, () => {
	console.log('Server is running on ' + PORT)
})