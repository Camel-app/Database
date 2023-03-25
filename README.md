# Database

## Introduction

The Camel bundle works on a NoSql database, MongoDB, as such an mongo instance has to be available for the application to run.

## Possibilities

The location of the database does not matter - it only has to be accessible from the API. Idealy, the database is stored on a private server to ensure the data security and privacy. Otherwise, Mongo Atlas can be used.

## Configuration

The configuration of the database is let to the mongo admin. Ideally, the admin creates several roles to mange the db (admin, dropUser, simpleUser, readerUser...) as well as configure the different elements for the sharding.

## Dataset

The Camel database is made of three collections:
- experiments: storing the experiments and all CAMs belonging to each
- researchers: storing the information of researchers such as their id, status...
- participants: storing the id of participants to ensure that one does not submit several times the same data for one given experiment.

