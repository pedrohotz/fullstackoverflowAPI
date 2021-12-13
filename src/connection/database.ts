import '../setup'
import pg from 'pg';

const { Pool } = pg;

const Data = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const connection = new Pool(Data);

export default connection;