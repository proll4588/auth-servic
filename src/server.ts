import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes/router';

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
