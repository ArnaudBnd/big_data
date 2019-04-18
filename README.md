# SIRET Invader

## Contexte
L'objectif est de réaliser un indexeur mongodb à haute volumétrie pour le compte du gouvernement pour transitionner des données au format csv vers une base de données NoSQL. Je serez en charge de la totalité du processus permettant le transfére des données csv.


## Etape 1 - Récupération du projet:
```console
* git clone https://github.com/ArnaudBnd/big_data.git
* npm i
```

## Etape 2 - Récupération du csv:
	- Aller sur le site: https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/
	- Télécharger le csv intitulé: 'Sirene : Fichier StockEtablissement du 01 avril 2019'
	- Copier le CSV téléchargé intitulé 'StockEtablissement_utf8.csv' (ou le renommer ainsi) dans le dossier csv du projet cloné.

## Etapes 3 - Split le csv en plusieurs sous dossiers:
```console
* node createTask.js
```
Un dossier 'task' va etre crée avec l'ensemble des données split.

## Etapes 4 - Lancement des process:
```console
* pm2 start process.js
```

## Lists des technos utilisés :
* MongoDb: MongoDB est une base de données de documents NoSQL sans schéma. Cela signifie que je peux y stocker des documents JSON et que la structure de ces documents peut varier car ils ne sont pas appliqués comme les bases de données SQL

* Node.js: Node.js est une plateforme logicielle libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge.

* Mongoose: Mongoose fournit une solution simple, basée sur un schéma, pour modéliser les données de mon application.

* Pm2: PM2 est un gestionnaire de processus pour le moteur d’exécution JavaScript Node.js.
