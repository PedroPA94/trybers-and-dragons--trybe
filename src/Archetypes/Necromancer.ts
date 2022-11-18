import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  private _energyType: EnergyType;
  private static _createdInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Necromancer.addNewInstance();
  }

  private static addNewInstance() {
    Necromancer._createdInstances += 1;
  }

  static createdArchetypeInstances(): number {
    return Necromancer._createdInstances;
  }

  get energyType() { return this._energyType; }
}