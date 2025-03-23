/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const {MongoClient} = require('mongodb');
require('dotenv').config({path: './config.env'});

async function main() {
    const DB = process.env.ATLAS_URI;
    const client = new MongoClient(DB);
    try {
        console.log('Connecting to the database...');
        await client.connect();
        console.log('Connected to the database');
        console.log('Collections:');
        const collections = await client.db('MPP-DB').collections();
        collections.forEach((collection) => {
            console.log(collection.s.namespace.collection);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();
