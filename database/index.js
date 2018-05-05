const { Client } = require('pg');

module.exports = async credentials => {
    const client = new Client({
        connectionString: credentials.connectionString,
    });
    
    try {
        await client.connect();
    } catch(error) {
        console.log(error);
    }

    return client;
}