import { SimpleFighter } from './Fighter';
import Monster from './Monster';

type DragonAttack = {
  name: string
  modifier: number,
  alert: string,
  requiredRoll: number
};

export default class Dragon extends Monster {
  private attacks: DragonAttack[] = [
    {
      name: 'stomp',
      modifier: 1,
      alert: 'The dragon stomps the player!',
      requiredRoll: 0,
    },
    {
      name: 'tail whip',
      modifier: 1.2,
      alert: 'The dragon whips its tail against the player!',
      requiredRoll: 0.2,
    },
    {
      name: 'claw',
      modifier: 1.4,
      alert: 'The dragon attacks the player with its sharp claws!',
      requiredRoll: 0.4,
    },
    {
      name: 'spit fire',
      modifier: 2,
      alert: 'With a thundering roar, the dragon spits fire at the player!',
      requiredRoll: 0.9,
    },
  ];

  private orderedAttacks = this.attacks
    .sort((a, b) => b.requiredRoll - a.requiredRoll);

  constructor(protected _lifePoints = 999) {
    super(_lifePoints);
  }

  private getDragonAttack(): DragonAttack {
    const attackRoll = Math.random();
    const dragonAttack = this.orderedAttacks
      .find((attackOption) => attackRoll >= attackOption.requiredRoll)
      || this.attacks[0];
    return dragonAttack;
  }

  public attack(enemy: SimpleFighter): void {
    const dragonAttack = this.getDragonAttack();
    const attackValue = super.strength * dragonAttack.modifier;
    console.log(dragonAttack.alert);
    enemy.receiveDamage(attackValue);
  }
}