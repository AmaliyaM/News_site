const dbhost = process.env.DB_HOST;
const dbname = process.env.DB_NAME;
const dbusername = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;

module.exports = {
  development: {
    host: dbhost,
    database: dbname,
    username: dbusername,
    password: dbpassword,
    dialect: 'postgresql',
  },
};
