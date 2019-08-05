# Concepts
[retour](index)

Un joueur dirige 1 ou plusieurs personnages. Un personnage est définis par :
* Un n° de matricule
* Un pseudo
* Une race (appartenant à une des quatres familles de races :  _Ange_, _Démon_, _Humain_ ou _Autres_)
* Une classe
* Un grade (composé du n° de grade de 1 à 5, et d'un galon de 0 à 4)

Chaque personnage évolue sur une grille de jeu sous forme de damier. Il peut se déplacer et interragir avec les autres joueurs ou certains éléments du décors.

Un personnage à un certain nombre de caractéristiques.

## Caractéristiques

### Charactéristiques _dépensables_
Ces caractéristiques peuvent être dépensé (ou forcé à être dépensé). Elles se régènèrent automatiquement au fil du temps.


* __Agilité__ : Les points d'actions du personnage. Chaque action demande de dépenser un certain nombre de points (exception sur les mouvements, voir ci-dessous)
* __Vitesse__ : La quantité de mouvement __gratuits__ que peut effectuer le personnage. Une fois ce nombre épuisé, le joueur peut soit attendre d'en régénérer, soit dépenser des points d'actions pour acheter un "lot" de déplacement en plus.
* __Points de vie__ : Si ils tombent à 0, le personnage est désincarné

### Caractéristiques fixes
Ces caractéristiques sont fixes. elles peuvent cependant varier suivant les bonus/malus reçu

* __Dextérité__ : La capacité du personnage à se défendre ou à passer les défenses adverses. Le score sert à indiquer un nombre de dés qui seront lancé par les deux parties. Ce score est influencé également par la __posture__
  * __Posture__ : La posture de combat permet d'anticiper ce qui attends le personnage. Par défaut, le personnage est en posture neutre, ce qui signifie qu'il attaque et se défends en même temps. Il peut passer en posture __full attaque__ pour augmenter son score d'attaque, mais aura alors un malus en défense. La posture __full défense__ est l'exacte contraire. Un personnage peut changer de posture gratuitement dans certaines conditions. Sinon, il s'agit d'un coût en points d'actions qui dépends du temps depuis le dernier changement. A noter qu'il existe également d'autres postures _automatiques_, comme par exemple quand un personnage lance un sort continue.
* __Expérience__ : L'expérience corresponds à la puissance du personnage, et à son niveau. Il est utilisé pour les calculs de gain d'expérience. Un personnage qui meurt pourra perdre de l'expérience.
  * __Amélioration__ : A chaque point d'expérience aquis, le personnage reçoit également un point d'amélioration, qu'il peut dépenser de plusieurs manières. Si le nombre de point d'amélioration passe en négatif (après une mort), un malus permanent pourra être appliqué, en fonction de la somme négative
* __Force__ : La force du personnage, c'est à dire la quantité de dommage qu'il fera (sauf avec l'utilisation d'armes spécifiques). Une force élevé va également infliger d'avantages de malus à une cible qui se défends.
* __Magie__ : Le niveau de magie du personnage. Indique les talents qu'il peut lancer, et la puissance de ceux-ci. Avoir un niveau 0 de magie n'empêche pas de lancer des talents non-magiques, ou faiblement magiques.
* __Vision__ : La capacité du vue du personnage. Le premier effet de cette caractéristiques est la taille du damier. Cette taille est cependant plafonnées. Une bonne vision augmente également la distance du brouillard de guerre, et participe à des _jets de vision_ qui pourront être fait via certains objets

### Autres charactéristiques
Ces autres charactéristiques ne peuvent pas être augmenté directement par le joueur, mais peuvent être alteré via des buffs, des objets ou des talents passifs
* __Regain de Points de vie__
* __Regain de Points de vitesse__
* __Regain de Points d'action__
* __Résistance physique__
* __Résistance magique__
* __Allonge__
* __Perception__
* __Bonus d'agilité max__
* __Bonus de vitesse max__
* __Bonus de points de vie max__
* __Bonus de défense__
* __Bonus d'attaque__
* __Bonus de force__
* __Bonus de vision__

### Tours de jeu
Les tours de jeu servent à calculer la régénération des statistiques. Un tour de jeu corresponds à 1h. Les statistiques de bases sont calculés de manière à régénérer la totalité des points d'action et des mouvements sur une période de 48h.

Le déclenchement des tours de jeu est automatique, le personnage n'as pas besoin de se connecter pour en profiter.

Quand un personnage à toutes ses caractéristiques à fonds et aucun bonus / malus temporaires, il est considéré comme étant reposé. Le prochain tour de jeu du personnage commencera 1h après la prochaine action ou interraction

### Buffs
Un buff (bonus / malus) est une alteration de caractéristique. Un buff peut être associé à n'importe quelle caractéristique, ou à la formule de régénération d'une caractéristique.

Un buff peut être consommable (sa puissance est diminué par une regen), temporaire (va durer X tours), ou permanent (va durer jusqu'a dissipation). Un buff pourra également évoluer (Au moment ou un buff se termine, un nouveau buff est généré).

## Actions
Les actions en jeu sont regroupé en trois catégories : les actions universelles (tout le monde peut les utiliser), les actions contextuelles (on ne peut les utiliser que si on rempli les conditions) et les talents (il faut débloquer le talent pour l'utiliser, il peut y avoir des pré-requis)

## Cartes

Le terrain de jeu est composé de plusieurs cartes, ou plan. Chacun pourra appartenir à une famille de plan (Althian / Terre, Célestia / Paradis, Ciféris / Enfer, etc).

Chaque cartes aura (normalement...) des portails d'accès. Certains portails peuvent être à sense unique, ou réservé à une race ou à un grade.

Un personnage pourra avoir une vue radar de tout les plans couverts par son camps (un __Ange__ n'aura pas le GPA de Ciféris, par exemple). La vue radar indique uniquement la présence d'une créature sur la map. Pour avoir plus d'informations, il faudra tenir compte du brouillard de guerre.

Celui-ci corresponds à la totalité des champs de vision des personnages de la carte d'un personnage. La zone couverte par le brouillard de guerre indique non-seulement la présence de créatures, mais leur race et groupe de grade (1 à 3, 4 ou 5)
