# PROJET M4103c
Projet réalisé dans le cadre du module M4103c concernant la programmation web.
Le projet réalisé est une plateforme de visionnage de vidéos en ligne.
## Comptes de test
### Utilisateur
**USERNAME** : bobby  
**PASSWORD** : Bobbyjoe9+
### Administrateur
**USERNAME** : ***  
**PASSWORD** : ***


## Utilisateur
### Inscription
Pour créer un compte il faut s'incrire en appuyant sur le bouton *SIGN IN*.
Le formulaire d'inscription comporte 3 champs :
#### USERNAME
Le nom d'utilisateur du compte à créer qui est une chaîne de caractères de 3 à 20 caractères.
#### PASSWORD
Le mot de passe du compte à créer qui est une chaîne de caractères satisfaisant les critères suivants : 
- Le mot de passe est composé d'au moins 8 caractères.
- Le mot de passe est composé d'au moins une lettre majuscule.
- Le mot de passe est composé d'au moins un caractère spécial parmis : (){}!@#$€£&*+-;,:. .

Le mot de passe est chiffré avant d'être inscrit dans la base de données.
#### MAIL
Une adresse e-mail de format valide, c'est-à-dire :
- Qui commence par des caractères alphanumériques, incluant des points, underscores et tirets.
- Suivit d'un arobase.
- Puis d'au moins deux caractère alphanumériques, incluant des points, underscores et tirets.
- Qui se finit par 2 à 5 lettres minuscules.
### Connexion
Un utilisateur peut se connecter en cliquant sur le bouton *SIGN-IN* et en entrant
les indentifiants décrivant son compte (nom d'utilisateur et mot de passe).  
Les champs sont sensibles à la casse.
### Droits
Les utilisateurs disposent des droits ~~C~~RU~~D~~ par rapport à la banque de vidéos.
#### R(ead)
Les utilisateurs peuvent visionner les vidéos existantes dans la base de données. Ils disposent d'un outil de
recherche qui parcourt la base de données et selectionne les élements contennant la phrase de recherche.
#### U(pdate)
Les utilisateurs peuvent noter les contenus proposés sur la plateforme et ainsi mettre à jour la note moyenne.


## ADMINISTRATEUR
L'administrateur du site est un utilisateur avec des fonctionnalités supplémentaires.
### ADMIN PANEL
Il existe un moyen d'accéder au panneau administrateur sans être administrateur mais effectuer une action
sur celui-ci sans en avoir les droits déclenche un système envoyant un mail au propriétaire du site indiquant
les informations du compte ayant effectué l'action et le contenu de ce l'opération qu'il a souhaité faire.
![Unauthorized action img](http://m4103c.cruiz.fr/example.png "Unauthorized action")
### DROITS
L'administrateur dispose des droits CRUD.  
#### R(ead) & U(pdate)
L'administrateur peut se comporter comme un utilisateur normal.
#### C(reate)
L'administrateur peut ajouter du contenu vidéos à la banque de vidéos.
#### D(elete)
L'administrateur peut supprimer des vidéos (et des utilisateurs).


## VIDEOS
Pour lancer une vidéo, il suffit de cliquer sur sa pochette.
#### NOTES
Les vidéos disposent d'une note qui est la moyenne des notes émises par les utilisateurs.  
Une vidéo venant d'être publiée a une note de 0/5.  
Chaque utilisateur peut donner une seule note par vidéo.  
### FILMS
Les films sont des vidéos indépendantes, qui ne sont liées à aucune autre vidéo.
### SERIES
Les séries sont une liste ordonnée de vidéos. À partir d'une vidéo de la liste, on peut accéder aux autres.



## Alertes
Les alertes sont des messages apapraissant sur la page de manière fixe (suivant le scroll de l'utilisateur).
Chaque alerte a une durée de vie de 5 secondes qui peut être écourtée en cliquant sur le bouton *close* associé.
