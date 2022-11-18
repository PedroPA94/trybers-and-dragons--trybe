import Race from './Race';

export default class Elf extends Race {
  private _maxLifePoints: number;
  private static _racesInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 99;
    Elf.newInstance();
  }

  private static newInstance(): void {
    Elf._racesInstances += 1;
  }

  static createdRacesInstances(): number {
    return Elf._racesInstances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }
}