import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(private _char1: Fighter, private _char2: Fighter) {
    super(_char1);
  }

  private shuffleFighters(): Fighter[] {
    return [this._char1, this._char2].sort(() => Math.random() - 0.5);
  }

  private static doAttack(attacker: Fighter, enemy: Fighter): void {
    if (attacker.special && Math.random() > 0.9) {
      attacker.special(enemy);
    } else {
      attacker.attack(enemy);
    } 
  }

  private static battle(fighters: Fighter[]) {
    let [attacker, enemy] = fighters;
    while (attacker.lifePoints > 0 && enemy.lifePoints > 0) {
      PVP.doAttack(attacker, enemy);
      [enemy, attacker] = [attacker, enemy];
    }
  }

  public fight() {
    const fighters = this.shuffleFighters();
    PVP.battle(fighters);
    return super.fight();
  }
}
