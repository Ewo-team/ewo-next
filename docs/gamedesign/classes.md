# Classes et talents
## Classes
Il existe 9 classes possibles par race (sauf le Paria qui n'en possède qu'une seule). La classe sert à la fois pour le roleplay et pour le gameplay.

Une classe défini le character du personnage, et influence donc le gameplay. La classe d'un personnage de son camps est affiché sur sa fiche de jeu.

Le choix d'une classe est aussi déterminant pour les talents. Chaque classe propose l'accès à 3 arbres de talents parmis les 9

## Talents
Il existe 9 arbres de talents (identiques pour les 3 races, le Paria n'a accès qu'a un arbre spécifique). Chaque arbre contient des talents passifs et des talents actifs.

Un arbre de talent comprends 15 talents, qui s'étalent sur 10 niveau. Il y a toujours un talent de début et un talent final, avec 10 talents "à choix". Voici un exemple d'arbre de talent :

```
Niveau 10:  x
Niveau 9:  x x
Niveau 8:   x
Niveau 7:  x x
Niveau 6:  x x
Niveau 5:   x
Niveau 4:   x
Niveau 3:  x x
Niveau 2:  x x
Niveau 1:   x
```

Chaque arbre de talent correspond à un archétype de jeu :

* Offensif corps-à-corps
* Offensif distant
* Offensif avec familier
* Tank
* Soigneur
* Spécialiste en soutiens
* Spécialiste en débuff
* Spécialiste en information
* Furtif

Les 3 premiers talents sont particulièrement offensif, ce qui ne signifie pas que les autres sont inefficace en combat.

Le joueur doit choisir au niveau 5 son arbre principal dans lequel il dépensera son premier point de talent

Tout les 5 niveaux, un personnage va gagner un point de talent, qu'il pourra dépenser dans l'arbre de talent choisi. Une fois au niveau max, le joueur pourra dépenser des XP pour acheter d'autres talents (de son arbre principal, ou des deux autres).

De ce fait, un personnage n'investissant pas d'xp pour acheter des talents supplémentaires pourra atteindre le talent le plus élevé de l'arbre.

### Talents des archétypes
__Offensif corps-à-corps__
* Charge (actif) : Se déplace vers la cible et consomme les mouvements restant. Si l'attaque passe, inflige un bonus de dégats en fonction des mouvements au moment de la charge

__Offensif distant__
* Boule de feu (actif) : Lance une boule de feu à distance sur un personnage
* Explosion (actif) : La zone explose, ce qui inflige des dégats à tout les personnages (dégats initiaux + dégats à chaque tour passé dans la zone)
* Combustion (actif) : Le personnage ciblé brûle. Il reçoit un débuff qui va infliger des dégats pendant X tours (dépendant du test de magie). Les déplacements diminuent la durée du dot

__Offensif avec familier__
* Invocation du familier X (actif) : Invoque un familier de type X. Les stats du familers dépendent de celle du lanceur. Un malus permanent est appliqué au lanceur tant que le familier est vivant.
* Familier (passif) : Permet d'avoir un familier mineur
* Meute (passif) : Permet d'avoir deux familiers mineurs en même temps
* Ménagerie (passif) : Permet d'avoir 3 familiers mineurs en même temps
* Gardien (passif) : Permet d'avoir un familier majeur (mais aucun familier mineur en même temps)

__Tank__
* Harpon (actif) : Rapproche la cible au CaC
* Bouclier (actif) : Réduit tout les dégats autour du lanceur. Canalisé
* Trompe la mort (passif) : Si les PV du personnage passent à 0, le personnage regagne 5% de ses PV, 50% de ses mouvements, et un débuff permanent de 480 tours. Tant que le débuff est actif, le talent ne peut pas s'activer à nouveau
  * En cas de mort, le personnage perd ce débuff mais reçoit le double de pénalité de mort

__Soigneur__
* Dissipation (actif) : Dissipe un ou plusieurs effets néfastes de la cible
* Soin (actif) : Soigne la cible pour un montant de PV
* Cercle de vie (actif) : Soigne tout les cibles autour du lanceur. Canalisé
* Arbre de vie (passif) : le Cercle de vie devient un Arbre de vie, et peut être lancé à n'importe quel emplacement.

__Spécialiste en soutiens__
* Sceau et Portail (actif)
  * Sceau : Place une marque, dont les stats sont un % de celle du lanceur. Un seul sceau peut être actif à la fois
  * Portail : le lanceur ouvre un portail à portée cac. Tout les personnages qui passent à travers sont téléportés vers le Sceau. Dès que le lanceur se déplace ou passe dans le portail, celui-ci disparait
* Saut temporel : le lanceur reviens X heures en arrière : sa position et ses statistiques sont modifiés en conséquences.
__Spécialiste en débuff__
* Frayeur (actif) : Tout les persos font un test de resistance, ceux qui échouent vont fuir la zone (sans perte de mouvements)

__Spécialiste en information__
* Détection de vie (actif) : Indique visuellement l'état de santé d'une cible
* Détection de vie améliorée (actif) : Même chose que la version basique, mais en sort de zone

__Furtif__
* Invisibilité (actif) : Deviens invisible. Les cibles au CaC peuvent nous détecter.
* Leurre : Place un copie du lanceur qui disparaitra à la première attaque reçu. Il est impossible de discerner le leurre du lanceur
* Piège : Piège une case
  * Piège à ours : Le personnage qui passe sur le piège reçoit des dégats et perd un certain nombre de déplacements
  * Mine : Le personnage qui marche sur la mine va la faire exploser, ce qui inflige des dégats de zone
