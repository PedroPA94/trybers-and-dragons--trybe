import Race from './Race';

export default class Orc extends Race {
  private _maxLifePoints: number;
  private static _racesInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 74;
    Orc.newInstance();
  }

  private static newInstance(): void {
    Orc._racesInstances += 1;
  }

  static createdRacesInstances(): number {
    return Orc._racesInstances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }
}