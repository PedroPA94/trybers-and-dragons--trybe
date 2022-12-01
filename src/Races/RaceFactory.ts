import Dwarf from './Dwarf';
import Elf from './Elf';
import Halfling from './Halfling';
import Orc from './Orc';
import Race from './Race';

export type RaceName = 'Dwarf' | 'Elf' | 'Halfling' | 'Orc';

export default class RaceFactory {
  public static create(
    raceName: RaceName, 
    name: string, 
    dexterity: number,
  ): Race {
    switch (raceName) {
      case 'Dwarf':
        return new Dwarf(name, dexterity);
        break;
      case 'Halfling':
        return new Halfling(name, dexterity);
        break;
      case 'Orc':
        return new Orc(name, dexterity);
        break;
    
      default:
        return new Elf(name, dexterity);
        break;
    }
  }
}