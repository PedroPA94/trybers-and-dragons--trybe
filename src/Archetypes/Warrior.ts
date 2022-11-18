import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Warrior extends Archetype {
  private _energyType: EnergyType;
  private static _createdInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
    Warrior.addNewInstance();
  }

  private static addNewInstance() {
    Warrior._createdInstances += 1;
  }

  static createdArchetypeInstances(): number {
    return Warrior._createdInstances;
  }

  get energyType() { return this._energyType; }
}