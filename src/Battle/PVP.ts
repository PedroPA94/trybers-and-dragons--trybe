import BattleAnnouncements from '../BattleAnnouncements';
import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(readonly char1: Fighter, readonly char2: Fighter) {
    super(char1);
  }

  private shuffleFighters(): Fighter[] {
    return [this.char1, this.char2].sort(() => Math.random() - 0.5);
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
    BattleAnnouncements.announceBattleStart(this.char1, this.char2);
    const fighters = this.shuffleFighters();
    PVP.battle(fighters);
    BattleAnnouncements
      .announceBattleResults(super.fight(), this.char1, this.char2);
    return super.fight();
  }
}
