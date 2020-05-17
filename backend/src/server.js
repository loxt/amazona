import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.route';

dotenv.config();

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch(error => console.log(error.reason));

const app = express();

app.use('/api/users', userRoute);

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x.id === productId);

  if (product) res.send(product);
  else res.status(404).send({ msg: 'Product not found.' })

});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.listen(3333, () => {
  console.log('Server started at http://localhost:3333')
});