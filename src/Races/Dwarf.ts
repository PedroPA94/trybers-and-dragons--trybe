import Race from './Race';

export default class Dwarf extends Race {
  private _maxLifePoints: number;
  static _racesInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 80;
    Dwarf.newInstance();
  }

  private static newInstance(): void {
    Dwarf._racesInstances += 1;
  }

  static createdRacesInstances(): number {
    return Dwarf._racesInstances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }
}