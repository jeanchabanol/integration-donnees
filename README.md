# integration-donnees

Groupe composé de : Lisa Béteille, Etienne Bihel, Matéo Calsacy, Jean Chabanol, Anamé Roumy et Laura Sénécaille. 

Dans un premier temps, nous récupérons des données depuis différentes sources :
- La liste des Communes françaises ainsi que leur code Insee et leur coordonnées GPS, ici le code INSEE est notre clé unique
Source: Datanova (API de la poste)
- Les informations des élections présidentielles 2017 sur les communes avec leur code INSEE, le numéro du bureau de vote, le nom
du département, le nombre d'inscrit ainsi que le nombre de votant par bureau, et le pourcentage de votes des candidats à la présidentielle.
Source: Data.gouv (téléchargement de fichier)->méthode : Parsing
-Le code INSEE et la populations de chaque communes 
Source: pulic.opendatasoft (Scraping)

L'objectif final est de créer une carte grâce aux coordonnées GPS où chaque commune aurait la couleur correspondante au candidat arrivé en tête dans cette commune
et lorsque l'on passerait la souris sur l'une d'elles, le pourcentage de votant s'afficherait (nb votant/nb d'habitant) 

Lien du heroku : 

