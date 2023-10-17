import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { router } from './routes/router';

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello' });
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
