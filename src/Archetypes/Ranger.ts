import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Ranger extends Archetype {
  private _energyType: EnergyType;
  private static _createdInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
    Ranger.addNewInstance();
  }

  private static addNewInstance() {
    Ranger._createdInstances += 1;
  }

  static createdArchetypeInstances(): number {
    return Ranger._createdInstances;
  }

  get energyType() { return this._energyType; }
}