import { SimpleFighter } from './Fighter';

export default class Monster implements SimpleFighter {
  constructor(protected _lifePoints = 85, private _strength = 63) {}

  get lifePoints() { return this._lifePoints; }
  get strength() { return this._strength; }

  public attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints;
    this._lifePoints = damage > 0
      ? this._lifePoints - damage
      : this._lifePoints - 1;
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }
}