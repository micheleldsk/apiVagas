import 'dotenv/config';
import { createServer } from './config/express.config';

export const runServer = () => {
  const port = process.env.PORT;
  const app = createServer();

  app.listen(
    port,
    () => console.log(`API running at http://localhost:${port}`),
  )
}