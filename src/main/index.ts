import { CacheConnection } from "./cache";
import { DatabaseConnection } from "./database";
import { runServer } from "./server";

Promise.all([DatabaseConnection.connect(), CacheConnection.connect()])
  .then(() => runServer())
  .catch((error) => {
    console.log('Erro ao inicializar o servidor', error);
  });
