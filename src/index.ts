import Battle, { PVE, PVP } from './Battle';
import Character from './Character';
import Dragon from './Dragon';
import Monster from './Monster';

const player1 = new Character('Bilbo Baggins', 'Halfling', 'Ranger');
const player2 = new Character('Goku', 'Elf', 'Warrior');
const player3 = new Character('Vegeta', 'Orc', 'Necromancer');

const player1LevelUps = 15;

for (let i = 1; i <= player1LevelUps; i += 1) {
  player1.levelUp();
}

const monster1 = new Monster();
const monster2 = new Dragon();

const pvp = new PVP(player2, player3);

const pve = new PVE(player1, [monster1, monster2]);

const runBattles = (battles: Battle[]) => {
  battles.forEach((battle) => {
    battle.fight();
  });
};

runBattles([pvp, pve]);

export {
  player1,
  player2,
  player3,
  monster1,
  monster2,
  pvp,
  pve,
  runBattles,
};
