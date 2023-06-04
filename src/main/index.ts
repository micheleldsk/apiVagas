import { DatabaseConnection } from "./database";
import { runServer } from "./server";

DatabaseConnection.connect()
  .then(() => runServer())
  .catch((error) => {
    console.log('Erro ao inicializar o servidor', error);
  });
