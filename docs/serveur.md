# Technologies Serveur
[retour](index)

## Base

Le serveur est en TypeScript (surlangage de JavaScript), lancé par NodeJS.

Il est composé de deux parties :

Une partie __serveur__ qui est chargé de servir des pages au clients et de faire une passerelle entre le client de jeu (qui accède à des données limités) et le serveur de gestion du jeu, qui contient l'intégralité de celui-ci en mémoire.

Le service de page est fait avec le framework [ExpressJS](https://expressjs.com/), et la communication est faite en WebSocket avec [Socket.IO](https://socket.io/).

## Express

Le serveur ExpressJS va servir à distribuer les pages statiques ou extérieur au jeu, ainsi qu'a servir les ressources (images, feuille de styles, etc).

Le routeur est configuré de manière à ne pas générer d'erreur 404, mais de rediriger toutes les URL inconnues sur la page d'accueil, où l'application client s'occupera du routage.

La seule communication avec le jeu est faite pour la gestion du compte utilisateur : la création, la connection et l'édition de ces informations est est geré par ExpressJS.

De même, toute la partie administration du jeu et anti-triche sera managé par Express et pas par le client de jeu

## Socket .IO

Au sein de socket.io, l'architecture est la suivante:

- Un client qui n'est pas connecté établis juste une connection simple, sans lien avec le jeu.
- Un client connecté va être identifié par son n° d'utilisateur, et le serveur Socket.IO va alors :
  - Mettre en cache les données du jeu pour ce client : ses personnages, ses vues, sa messagerie, etc.
  - Créer un "salon" dédié à ce client. De cette manière, il est possible de communiquer de manière spécifique à un client particulier
  - Ajouter un écouteur sur les changements de status du serveur de jeu. Si un changement de status ce produit, le cache de tout les clients connecté est reconstruit, et envoyé aux clients s'il y a eu un changement
  - Ajouter un récépteur d'événements. Le client du jeu pourra ainsi envoyer une commande sous forme d'événement au serveur
- Un client connecté pourra également s'abonner à d'autres flux de données optionnels : listes des événements d'un personnage, GPS, etc.

### Evenements
Les événements envoyé par le clients sont les suivants:
* __action__: Une action simple. Elle sera placé dans une file d'attente avant d'être exécuté. Le client peut attendre en retour un message de réussite / échec de l'action
* __actionBatch__: Une suite d'action. Chaque action ne peut s'exécuter que si la précédente à réussi. Par exemple: une série de déplacements en 5 étapes. Si l'étape 3 échoue car la case est occupé, les déplacements 4 et 5 sont annulés. Le client recoit un message pour chaque étape de l'action
* __update__: Une action simple qui ne demande pas de mise en file d'attente (pas d'incidence sur le gameplay). exemple : mise à jour du Message du jour d'un personnage

Un événement contient généralement :
* le nom de l'action (__obligatoire__)
* le matricule du personnage concerné
* les paramètres de l'action (numéro de direction pour les déplacements, matricule de la cible à attaquer, nouveau message du jour, etc)

Un nom d'action peut être geré par plusieurs type d'événement (par exemple, "_move_" peut une _action_ simple pour une _actionBatch_). Cependant, la résolution est contrôlé (si un client modifié envoie une action "_move_" en temps qu'événement _update_, l'action sera ignorée)

Liste (actuelle) des actions:
* __move__ : Un ou plusieurs déplacements (action, actionBatch)
* __changePosture__ : Changer la posture du personnage (action)
* __attack__ : Attaquer un personnage (action)
* __motd__ : Mettre à jour le message du jour (update)