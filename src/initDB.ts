import { iUser, iExperiment } from './interface';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { collections } from './collections';


var UUID = require('uuid-js');

async function populateUsers(collections) {
    const users = [
        {
            "email": "zmatevushev0@yahoo.com",
            "password": bcrypt.hashSync("8Uj2fPR", 10),
            "role": "Editor",
            "paid": true
        }, {
            "email": "cdymock1@bbb.org",
            "password": bcrypt.hashSync("ZNbJ5YEQ", 10),
            "role": "Senior Quality Engineer",
            "paid": false
        }, {
            "email": "cricks2@usda.gov",
            "password": bcrypt.hashSync("1f9NLi", 10),
            "role": "Social Worker",
            "paid": true
        }, {
            "email": "htwitty3@symantec.com",
            "password": bcrypt.hashSync("iuqJFC", 10),
            "role": "Nurse Practicioner",
            "paid": false
        }, {
            "email": "hgeibel4@alibaba.com",
            "password": bcrypt.hashSync("ZMssuLRiKD", 10),
            "role": "Professor",
            "paid": true
        }];

    await collections.researchers.insertMany(users);
};

async function populateExperiments(collections) {

    const ids = (await collections.researchers.find({}).toArray()).map((elt) => elt._id);

    for (let i = 0; i < 10; i++) {

        let id = ids[Math.floor(Math.random() * ids.length)];

        await collections.experiments.insertOne(
            {
                "name": UUID.create().toString(),
                "creationDate": randomDate(new Date(2020, 0, 1), new Date(), 0, 24),
                "researcherID": id,
                "cam": "{}",
                "config": "{}",
                "status": "active",
                "link": "www.ggogle.com",
                "daughters": []
            }
        );
    }
};

async function populateOneExperiment(collections) {
    const ids = (await collections.experiments.find({}).toArray()).map((elt) => elt._id) as string[];

    fs.readFile('./data/example_CAMEL.json', 'utf8', async (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            data = JSON.parse(data);

            for (let i = 0; i < 50; i++) {

                let id = ids[Math.floor(Math.random() * ids.length)];
                var uuid4 = UUID.create();

                const upload = collections.experiments.updateOne(
                    {
                        _id: id
                    },
                    {
                        $push: {
                            daughters: {
                                participantID: uuid4.toString(),
                                jwt: UUID.create().toString(),
                                creationDate: randomDate(new Date(2020, 0, 1), new Date(), 0, 24),
                                cam: data[Math.floor(Math.random() * data.length)],
                            }
                        }
                    }
                );
            }
        }
    })
};

export async function setupDBEnv(client, rewrite=false) {
    const db = client.db("Camel");

    if (rewrite){
        await db.collection("researchers").drop();
        await db.collection("experiments").drop();
        await db.collection("participants").drop();
    }

    const researchers = db.collection("researchers");
    collections.researchers = researchers;

    const experiments = db.collection("experiments");
    collections.experiments = experiments;

    const participants = db.collection("participants");
    collections.participants = participants;

    await populateUsers(collections);
    await populateExperiments(collections);
    await populateOneExperiment(collections);

}