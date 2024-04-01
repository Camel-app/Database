import { collections } from './collections';
import { iUser, iExperiment } from './interface';
import { MongoClient } from 'mongodb';

export async function addOneUser(client: MongoClient, user: iUser) {
    await client.connect()
    const db = client.db("Camel");
    const researchers = db.collection("researchers");

    collections.researchers = researchers;
    await researchers.insertOne(user);
};