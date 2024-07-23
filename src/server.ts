import app from '../src/app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  await mongoose.connect(config.dataBase_url as string);

  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
