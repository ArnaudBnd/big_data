# SIRET Invader

## Contexte
L'objectif est de réaliser un indexeur mongodb à haute volumétrie pour le compte du gouvernement pour transitionner des données au format csv vers une base de données NoSQL. Je serez en charge de la totalité du processus permettant le transfére des données csv.


## Comment l'utiliser :
```console
* git clone url
* npm i
* npm start
```

## Etape 1 - Récupération du csv:
	- Aller sur le site: https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/
	- Télécharger le csv intitulé: 'Sirene : Fichier StockEtablissement du 01 avril 2019'

## Etapes 2 - Split le csv en plusieurs dossiers:
```console
* node createTask.js
```

## Etapes 3 - Lancement des processus:
```console
* pm2 start process.js
```

## Lists des technos utilisés :
* MongoDb: MongoDB est une base de données de documents NoSQL sans schéma. Cela signifie que je peux y stocker des documents JSON et que la structure de ces documents peut varier car ils ne sont pas appliqués comme les bases de données SQL

* Node.js: Node.js est une plateforme logicielle libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge.

* Mongoose: Mongoose fournit une solution simple, basée sur un schéma, pour modéliser les données de mon application.

* Pm2: PM2 est un gestionnaire de processus pour le moteur d’exécution JavaScript Node.js.
