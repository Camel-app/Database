import * as mongoDB from "mongodb";

export const collections: {
	researchers?: mongoDB.Collection;
	experiments?: mongoDB.Collection;
	participants?: mongoDB.Collection;
} = {};
