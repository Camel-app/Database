const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const fs = require('fs')


var UUID = require('uuid-js');

const url = "link";
const client = new MongoClient(url);
const collections = {};
let data = {}




async function populateUsers(researchers) {
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

    await researchers.insertMany(users);
};

function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

async function populateExperiments(researchers, experiments) {

    const ids = (await researchers.find({}).toArray()).map((elt) => elt._id);

    for (let i = 0; i < 10; i++) {

        let id = ids[Math.floor(Math.random() * ids.length)];

        await experiments.insertOne(
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

async function populateOneExperiment(experiments) {
    const ids = (await experiments.find({}).toArray()).map((elt) => elt._id);

    fs.readFile('./db-init/example_CAMEL.json', 'utf8', async (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`)
        } else {
            // parse JSON string to JSON object
            data = JSON.parse(data);

            for (let i = 0; i < 50; i++) {

                let id = ids[Math.floor(Math.random() * ids.length)];
                var uuid4 = UUID.create();

                const upload = experiments.updateOne(
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
                //console.log(upload);
            }
        }
    })
};

async function main() {

    await client.connect()
    const db = client.db("Camel");
    //await db.collection("researchers").drop();
    //await db.collection("experiments").drop();
    //await db.collection("participants").drop();


    const researchers = db.collection("researchers");
    collections.researchers = researchers;

    const experiments = db.collection("experiments");
    collections.experiments = experiments;

    const participants = db.collection("participants");
    collections.participants = participants;

    await populateUsers(researchers);
    await populateExperiments(researchers, experiments);
    await populateOneExperiment(experiments);

    console.log((await researchers.find().toArray()).length);
    console.log((await experiments.find().toArray()).length);
    //console.log((await participants.find().toArray()).length);
    return;

}
main();



/*




const pwd = "g2NPQrO2kdX5zvlc";


use Camel;
db.dropDatabase();

db.researchers.createIndex({ "email": 1 });



// Create some fake experiments

db.experiments.createIndex({ "name": 1 });

db.experiments.insertMany([
    {
        "name": "A first experiment",
        "creator": ObjectId("6352a07c5c04012e2b796065"),
        "creationDate": "11-11-1111",
        "cam": "{}",
        "status": "active",
        "daughters": []
    }
]);

db.experiments.insertMany([
    {
        "_id": ObjectId("6352a1835c04012e2b796067"),
        "name": "Cogito testum",
        "creator": ObjectId("6352a07c5c04012e2b796066"),
        "creationDate": "11-11-1111",
        "cam": "{}",
        "status": "active",
        "daughters": []
    }
]);

//Adding daughters to experiments
db.experiments.updateOne(
    {
        _id: ObjectId("6352a1835c04012e2b796067")
    },
    {
        $push: {
            daughters: {
                participantID: 2234,
                token: "gerarhaehhnah",
                creationDate: "12-11-1111",
                cam: "{}",
            }
        }
    }
);
db.experiments.updateOne(
    {
        _id: ObjectId("6352a1835c04012e2b796067")
    },
    {
        $push: {
            daughters: {
                participantID: 2235,
                token: "gerarhaweagwaeg",
                creationDate: "12-11-1111",
                cam: "{}",
            }
        }
    }
);

*/