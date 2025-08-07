import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRoute from './routes/generate.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

app.use('/generate', generateRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
