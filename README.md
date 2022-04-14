# integration-donnees

PROJET INTÉGRATION DES DONNÉES M1 MIASHS 2022

Groupe composé de : 
Lisa Béteille lisa.beteille@etu.univ-montp3.fr,
Etienne Bihel etienne.bihel@etu.univ-montp3.fr,
Matéo Calsacy mateo.calsacy@etu.univ-montp3.fr, 
Jean Chabanol jean.chabanol@etu.univ-montp3.fr, 
Anamé Roumy aname.roumy@etu.univ-montp3.fr, 
Laura Sénécaille laura.senecaille@etu.univ-montp3.fr. 

Dans un premier temps, nous récupérons des données depuis différentes sources :
- La liste des Communes françaises ainsi que leur code Insee et leur coordonnées GPS, ici le code INSEE est notre clé unique
    Source: https://datanova.laposte.fr/explore/dataset/laposte_hexasmal/api/?disjunctive.code_commune_insee&disjunctive.nom_de_la_commune&disjunctive.code_postal&disjunctive.ligne_5&lang=FR 
    (API de la poste)

- Les informations des élections présidentielles 2017 sur les communes avec leur code INSEE, le numéro du bureau de vote, le nom
du département, le nombre d'inscrit ainsi que le nombre de votant par bureau, et le pourcentage de votes des candidats à la présidentielle.
    Source: https://www.data.gouv.fr/fr/datasets/election-presidentielle-des-23-avril-et-7-mai-2017-resultats-definitifs-du-1er-tour-par-bureaux-de-vote/ 
    (téléchargement de fichier)->méthode : Parsing

-Le code INSEE et la populations de chaque communes 
    Source: https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table/?flg=fr 
    (Scraping)

Méthode de travail : 
Nous nous sommes organisés par groupe de 2 personnes : 
- Matéo et Jean : Travail sur le Scraping, 
    Permet de récupérer le code Insee ainsi que la population qui lui correspond en parcourant chaque lignes et chaque colonnes. 
    C'est dans les colonnes qu'on récupére l'information. La population est converti en float et multiplié par 1000 car la population est affiché en millier.
- Anamé et Etienne : Travail sur l'API, 
    Permet de créer un tableau Json avec le lien de l'API où est stocké chaqye élément qu'on souhaite garder. 
- Laura et Lisa : Travail sur téléchargement de fichier, 
    Téléchargement d'un fichier, le but est de partir d'un tableau vide et de parcourir chaque ligne du fichier pour récupérer dans le tableau les informations qu'on souhaite.
    La méthode utilisée est le Parsing. On retourne un tableau de données Json en fonction de chaque code Insee. 


L'objectif final en perspective est de créer une carte grâce aux coordonnées GPS où chaque commune aurait la couleur correspondante au candidat arrivé en tête dans cette commune
et lorsque l'on passerait la souris sur l'une d'elles, le pourcentage de votant s'afficherait (nb votant/nb d'habitant) 

Lien du heroku : https://intergationdonnees.herokuapp.com/

Outils utilisés 
- Discord
- Visual Studio Code
- GitHub
- Heroku

Bibliographie : 
- https://github.com/SheetJS/sheetjs/issues/249
- https://www.geeksforgeeks.org/how-to-read-and-write-excel-file-in-node-js/
- https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
- https://stackoverflow.com/questions/21450060/how-to-join-two-javascript-objects-without-using-jquery
- https://www.youtube.com/watch?v=Y_NlDyUfVJ8
- StackOverflow


