# SIRET Invader

## Context
The objective is to develop a high-volume mongodb indexer for the government to transition data in csv format to a NoSQL database. I will be in charge of the entire process allowing the transfer of csv data.

IMPORTANT = The use of pm2 "^3.2.5" is mandatory for proper operation.

## Step 1 - Project recovery:
```console
* git clone https://github.com/ArnaudBnd/big_data.git
```

Go to the folder created:
```console
* npm i
```

## Step 2 - Recovery of the csv:
	- Go to the website: https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/
	- Download the csv entitled: 'Sirene : Fichier StockEtablissement du 01 avril 2019'
	- Copy the downloaded CSV entitled 'StockEtablissement_utf8.csv' (or rename it as such) in the 'csv' folder of the cloned project.

## Step 3 - Split the csv into several subfolders:
```console
* node createTask.js
```
A folder name 'task' will be created with all the split data.
As well as an end message will be indicated in the console.

## Setp 4 - Launching processes:
```console
* pm2 start process.js
```
This will allow the addition of all csv data in the database in the most optimized way.

## Lists of the technologies used :
* MongoDb: MongoDB is a NoSQL document database without schema. This means that I can store JSON documents there and that the structure of these documents can vary because they are not applied like SQL databases

* Node.js: Node.js is a free and event-driven JavaScript software platform oriented towards network applications that need to be scalable.

* Mongoose: Mongoose provides a simple, schema-based solution to model the data in my application.

* Pm2: PM2 is a process manager for the JavaScript runtime engine Node.js.