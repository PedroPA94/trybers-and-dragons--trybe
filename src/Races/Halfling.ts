import Race from './Race';

export default class Halfling extends Race {
  private _maxLifePoints: number;
  static _racesInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 60;
    Halfling.newInstance();
  }

  private static newInstance(): void {
    Halfling._racesInstances += 1;
  }

  static createdRacesInstances(): number {
    return Halfling._racesInstances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }
}