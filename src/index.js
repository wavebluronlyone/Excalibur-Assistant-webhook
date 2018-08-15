import 'babel-polyfill';
import cors from 'cors';
import ReplyToken from './utils/ReplyToken';
// import { MongoClient } from 'mongodb';

const fastify = require('fastify')();

const port = process.env.PORT || 3003 ;


// MongoClient.connect('mongodb://127.0.0.1:27017/SimpleOrders', { useNewUrlParser: true })
//   .then((client) => {
    

    fastify.use(cors());

    fastify
    // .register(require('fastify-mongodb'), { client })
    .register(require('./routes/BasicAsk'));

    fastify.get('/api/healthcheck', async (req, reply) => {
      reply.send({ status: 'ok' });
    });

    fastify.post('/webhook', (req, reply) => {
      const reply_token = req.body.events[0].replyToken
      ReplyToken(reply_token);
      reply.status(200).send({ status:'200'});
    });

    fastify.get('/', (req, reply) => {
      reply.send('Excalibur Bot');
    });

    fastify.listen(port, '0.0.0.0', (err) => {
      if (err) throw err;
      console.log(`Server Running on ${port}`);
    });
  // })
  // .catch((err) => {
  //   throw err
  // })
