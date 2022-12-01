import Archetype, { ArchetypeFactory } from './Archetypes';
import { ArchetypeName } from './Archetypes/ArchetypeFactory';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race from './Races';
import RaceFactory, { RaceName } from './Races/RaceFactory';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  public name: string;

  constructor(
    name: string,
    raceName: RaceName,
    archetypeName: ArchetypeName,
  ) {
    this.name = name;
    this._dexterity = getRandomInt(1, 10);
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._race = RaceFactory.create(raceName, name, this._dexterity);
    this._archetype = ArchetypeFactory.create(archetypeName, name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race() { return this._race; }
  get archetype() { return this._archetype; }
  get lifePoints() { return this._lifePoints; }
  get strength() { return this._strength; }
  get defense() { return this._defense; }
  get dexterity() { return this._dexterity; }
  get energy() { return { ...this._energy }; }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    this._lifePoints = damage > 0
      ? this._lifePoints - damage
      : this._lifePoints - 1;
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  public attack(enemy: SimpleFighter): void {
    const enemyName = enemy instanceof Character 
      ? enemy.name 
      : `a ${enemy.constructor.name.toLowerCase()}`;
    console.log(`${this.name} is attacking ${enemyName}!`);
    enemy.receiveDamage(this._strength);
  }

  public levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  public special(enemy: SimpleFighter): void {
    console.log(`A critical roll! ${this.name} uses the special attack!`);
    const superAttack = this._strength * 1.5;
    enemy.receiveDamage(superAttack);
  }
}