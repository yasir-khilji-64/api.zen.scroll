import app from './app';
import { Config } from './utils/config';

const port = Config.GetInstance().env.PORT;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server: http://127.0.0.1:${port}`);
});
