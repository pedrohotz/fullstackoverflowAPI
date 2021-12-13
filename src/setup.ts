import dotenv from 'dotenv';

let envFile = '.env';

const setup = dotenv.config({
  path: envFile,
});

export default setup;