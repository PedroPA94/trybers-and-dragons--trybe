import Archetype from './Archetype';
import Mage from './Mage';
import Necromancer from './Necromancer';
import Ranger from './Ranger';
import Warrior from './Warrior';

export type ArchetypeName = 'Mage' | 'Necromancer' | 'Ranger' | 'Warrior';

export default class ArchetypeFactory {
  public static create(
    archetypeName: ArchetypeName,
    name: string,
  ): Archetype {
    switch (archetypeName) {
      case 'Mage':
        return new Mage(name);
        break;
      case 'Necromancer':
        return new Necromancer(name);
        break;
      case 'Ranger':
        return new Ranger(name);
        break;  
      default:
        return new Warrior(name);
        break;
    }
  }
}