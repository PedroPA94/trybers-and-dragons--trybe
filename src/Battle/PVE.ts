import BattleAnnouncements from '../BattleAnnouncements';
import Character from '../Character';
import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

export default class PVE extends Battle {
  private _fighters: SimpleFighter[];
  private _availableFighters: SimpleFighter[] = [];
  private _availableEnemies: SimpleFighter[] = [];  

  constructor(readonly player: Fighter, readonly enemies: SimpleFighter[]) {
    super(player);
    this._fighters = [this.player, ...this.enemies];
  }
  
  private updateFighters() {
    this._availableEnemies = this.enemies
      .filter((enemy) => enemy.lifePoints > 0);
    this._availableFighters = [this.player, ...this._availableEnemies];
  }

  private static doAttack(attacker: SimpleFighter, enemy: SimpleFighter): void {
    if (attacker instanceof Character && Math.random() > 0.9) {
      attacker.special(enemy);
    } else {
      attacker.attack(enemy);
    } 
  }

  private generateTurnOrder(): number[] {
    const rangeFromZeroToLength = [
      ...Array(this._availableFighters.length).keys(),
    ];
    return rangeFromZeroToLength.sort(() => Math.random() - 0.5);
  }

  private checkEnemy(attacker: SimpleFighter): SimpleFighter {
    if (attacker === this.player) {
      const weakestEnemy = this._availableEnemies.reduce((acc, cur) => (
        cur.lifePoints < acc.lifePoints ? cur : acc
      ));
      return weakestEnemy;
    } 
    return this.player;
  }

  private setAttackerAndEnemy(attackerPosition: number): SimpleFighter[] {     
    const attacker = this._availableFighters[attackerPosition];
    const enemy = this.checkEnemy(attacker);
    return [attacker, enemy];
  }

  private fightATurn(): void {
    const turnOrder = this.generateTurnOrder();
    turnOrder.forEach((attackerPosition) => {
      const [attacker, enemy] = this.setAttackerAndEnemy(attackerPosition);
      PVE.doAttack(attacker, enemy);
    });
  }

  private battle(): void {
    while (
      this.player.lifePoints > 0
      && this.enemies.some((enemy) => enemy.lifePoints > 0)
    ) {
      this.updateFighters();
      this.fightATurn();
    }
  }

  public fight() {
    BattleAnnouncements.announceBattleStart(this.player, this.enemies);
    this.battle();
    BattleAnnouncements.announceBattleResults(super.fight(), this.player);
    return super.fight();
  }
}