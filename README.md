#### E.W.O. :  Next

E.W.O était un projet francophone de jeu multijoueur online en PHP. 
Le sujet du jeu est la bataille entre les anges, les démons et les humains, dans un futur alternatif. 

EWO Next est le nom de code d'une reprise à zéro du projet (redéfinition du gameplay et des technologies) 

### Installation

1: Installez les packages

```bash
npm install
```

ou 

```bash
yarn install
```

2: Générez l'application React frontend

```bash
webpack
```

3: Lancez le serveur de dev

```bash
npm run watch
```

Vous pouvez maintenant vous rendre sur http://localhost:3000 pour accéder à l'application. 

Vous pourrez directement vous connecter avec le compte admin/admin

__Architecture :__

Coté Backend, il y a:
* Un serveur de jeu, utilisant Redux + ImmutableJS
* Un service de résolution de commande (Reçoit une commande, la dispatch dans une queue mono-thread ou multi-thread)
* Un serveur ExpressJS qui va servir les pages annexes au jeu
* Un serveur Socket.IO qui sert à faire communiquer le jeu entre le Client et le Serveur de jeu
  
 Coté Frontend, il y a:
 * Une application React + Redux + React-Router dédié au jeu
 * l'utilisation des interfaces et ressources du serveur de jeu (pas besoin de réecrire les routines)
 * Une UI managé par Storybook
 
 __Développement :__
 
 Le développement est découpé en 4 phases:
 * __pre-alpha (phase actuelle)__
 * alpha
 * beta
 * release
 
 la phase __pre-alpha__ corresponds à une version non-fonctionnelle du jeu, il manque encore des éléments majeurs. Il n'y a pas de version de test, chaque développeur s'occupant de son code et ses données. Il n'y a pas de CI intégré pour le moment au développement.
 
 la phase __alpha__ indique qu'un nombre minimal de fonctionnalité existe, mais qu'il est possible de commencer des phases de test. La structure et les règles de jeu peuvent encore changer. Un serveur de test avec des stress-test pourra être mis en place. 
 
 la phase __beta__ indique que la totalité des règles ont été figé en vue de la release, et que l'ajout des fonctionnalité manquantes est en train d'être fait. Le branching du dépos de source est mis en place (il n'y a plus de commit en master mais uniquement dans des branches dédiés avec pull-request, la pull-request doit compiler sans erreur, les tests unitaires doivent passer et couvrir 80% du code au moins). Un serveur de test sera mis en place avec des données persistantes. Si une fonctionnalité mise en place pose de gros problèmes de gameplay, le développement pourra repasser en __alpha__. Si possible, ce passage en __alpha__ devra garder les données de jeu __beta__ afin de ne pas relancer depuis 0 l'évolution des personnages.
 
 la phase __pre-release__ indique que toutes les fonctionnalités sont en place. Il s'agit donc des tests utilisateurs. Les seuls modifications de code pendant cette phase sont les correction de code.
 
 la phase __release__ indique que le code est prêt à être déployé en version 1.0. A partir de cette phase, une nouvelle branche __beta__ sera ouverte pour commencer le travail sur la prochaine version. 
