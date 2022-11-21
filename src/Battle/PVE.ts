import Character from '../Character';
import Fighter, { SimpleFighter } from '../Fighter';
import getRandomInt from '../utils';
import Battle from './Battle';

export default class PVE extends Battle {
  private _fighters: SimpleFighter[];

  constructor(private _player: Fighter, private _enemies: SimpleFighter[]) {
    super(_player);
    this._fighters = [this._player, ...this._enemies];
  }
  
  private static doAttack(attacker: SimpleFighter, enemy: SimpleFighter): void {
    if (attacker instanceof Character && Math.random() > 0.9) {
      attacker.special(enemy);
    } else {
      attacker.attack(enemy);
    } 
  }

  private generateTurnOrder(): number[] {
    const rangeFromZeroToLength = [...Array(this._fighters.length).keys()];
    return rangeFromZeroToLength.sort(() => Math.random() - 0.5);
  }

  private checkEnemy(attacker: SimpleFighter): SimpleFighter {
    if (attacker === this._player) {
      const avaliableEnemies = this._enemies
        .filter((enemy) => enemy.lifePoints > 0);
      return avaliableEnemies[getRandomInt(0, avaliableEnemies.length - 1)];
    } 
    return this._player;
  }

  private setAttackerAndEnemy(
    turnOrder: number[], 
    round: number, 
  ): SimpleFighter[] {     
    const currentAttackerPosition = turnOrder[round];
    const attacker = this._fighters[currentAttackerPosition];
    const enemy = this.checkEnemy(attacker);
    return [attacker, enemy];
  }

  private fightATurn(): void {
    const turnOrder = this.generateTurnOrder();
    turnOrder.forEach((round) => {
      const [attacker, enemy] = this.setAttackerAndEnemy(turnOrder, round);
      PVE.doAttack(attacker, enemy);
    });
  }

  private battle(): void {
    while (
      this._player.lifePoints > 0
      && this._enemies.some((enemy) => enemy.lifePoints > 0)
    ) {
      this.fightATurn();
    }
  }

  public fight() {
    this.battle();
    return super.fight();
  }
}