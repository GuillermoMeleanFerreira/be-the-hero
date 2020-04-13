const knex = require('knex');
const configuration = require('../../knexfile');

const configt = process.env.Node_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(configt);

module.exports = connection;