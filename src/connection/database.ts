import '../setup'
import pg from 'pg';

const { Pool } = pg;

const Data = {
  user: 'postgres',
  password: '88484520',
  port: 5432,
  host: 'localhost',
  database: 'fsoverflow',
};

const connection = new Pool(Data);

export default connection;