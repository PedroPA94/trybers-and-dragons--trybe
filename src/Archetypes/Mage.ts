import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Mage extends Archetype {
  private _energyType: EnergyType;
  private static _createdInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Mage.addNewInstance();
  }

  private static addNewInstance() {
    Mage._createdInstances += 1;
  }

  static createdArchetypeInstances(): number {
    return Mage._createdInstances;
  }

  get energyType() { return this._energyType; }
}