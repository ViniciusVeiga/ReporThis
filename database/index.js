const { Client } = require('pg');

module.exports = async credentials => {
    const client = new Client({
        connectionString: credentials.connectionString,
    });

    await client.connect();

    return client;
}