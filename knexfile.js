const config = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'take_home_db'
    },
    migrations: {
      directory: './src/config/database/migrations'
    },
  },
};

module.exports = config;

