import { addOneUser } from "./src/addUser";
import { setupDBEnv } from "./src/initDB";
import { MongoClient } from "mongodb";

const url = "link";
const client = new MongoClient(url);

setupDBEnv(client);
addOneUser(client, {
	email: "string",
	password: "string",
	role: "",
	paid: true,
});
