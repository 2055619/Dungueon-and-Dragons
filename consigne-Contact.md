# Contact

Pour cet exercice nous allons créer une application permettant d'interfacer avec un serveur pour récupérer des messages ou commentaires de nous utilisateur. Nous allons donc mettre en place un formulaire permettant de recevoir des messages. Et aussi créer un page nous permettant vois les messages reçus. 

Cet exercice permet de consolider les éléments vus en classe pour intégrer une partie serveur à l'intérieur d'une application simple. Donc plusieurs éléments vus jusqu'à présent seront requis pour permettre de compléter cet exercice:
* Création d'application avec composant
* Routage
* Création de service
* Utilisation d'API

Pour vous aider, cet exercice est décomposé par étapes

## Étape 1: Base de l'application

Crée un nouveau projet angular appelé contactme incluant le module de route. Dans cette application, créer deux composantes et mettre en place un système de barre de navigation pour permettre d’accéder à chaque composant. 
* Un des composants devra avoir une page permettant de recevoir le nom, prénom, courriel, téléphone et commentaire de notre utilisateur dans un formulaire.
* L'autre composant devra afficher les commentaires que vous avez reçus. 

## Étape 2: Capture de commentaire

Créez le composant pour recevoir les commentaires ou messages de votre usager et afficher les commentaires reçus dans votre console.

## Étape 3: Créer un service

Créez un service permettant de recevoir les commentaires reçus et les envoyer sur le serveur pour votre compte. Ici vous devez donc transmettre le commentaire au bon endroit pour être en mesure de le récupérer par la suite.

## Étape 4: Page d'authentification.

Il est possible que vous ayez à bien anticipé l'étape 5, mais pour le moment vous pouvez ajouter dans votre service une méthode `isSessionValid()` retournant un booléen. Pour le moment, mettez la valeur `false` pour le retour de cette fonction.

Dans votre module de commentaires. Effectuez un test sur `isSessionValid()` et si cette méthode retourne `false` afficher une interface (vous pouvez utiliser une fenêtre modale) pour capture le nom d'usager et mot de passe. Pour le moment vous pouvez simplement utiliser la console pour vérifier que vous capturez les informations.

## Étape 5: Authentification

Ici dans votre service vous devez maintenir un état permettant de savoir si votre usagé possède une session ou non. Vous devez créer un service pour créer une session qui doit aller sur le serveur avec le nom d'usager et mot de passe pour récupérer un token de session et le sauvegarder dans le service. Lorsque vous avez récupéré un token. Vous devez mettre l'état retourné par la fonction `isSessionValid()` à vrai.

## Étape 6: Affichage des messages

Maintenant, ajouter un service permettant de récupérer les messages pour votre usager avec le token de session créer à l'étape 5. Ensuite, modifier le module de commentaires. Pour afficher les commentaires reçus par vos usagers.

**Il est possible de mettre en place des fonctionnalités dans le routage permettant de gérer les cas ou vous avez une session ou non. Mais ici l'approche proposée permet de mieux voir la mécanique requise pour l'implémentation.**