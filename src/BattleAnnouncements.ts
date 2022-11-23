import Fighter, { SimpleFighter } from './Fighter';

export default class BattleAnnouncements {
  private static formatEnemyTypeString(
    enemies: SimpleFighter[],
    enemyType: string,
  ): string {
    const numberOfEnemies = enemies
      .filter((enemy) => enemy.constructor.name === enemyType)
      .length;
    if (!numberOfEnemies) return '';
    const adjustedType = numberOfEnemies > 1 ? `${enemyType}s` : enemyType;
    return `${numberOfEnemies} ${adjustedType.toLowerCase()}`;
  }

  private static pveStart(
    player: Fighter, 
    enemies: SimpleFighter[],
  ): void {
    const monsters = BattleAnnouncements
      .formatEnemyTypeString(enemies, 'Monster');
    const dragons = BattleAnnouncements
      .formatEnemyTypeString(enemies, 'Dragon');
    const enemiesText = monsters && dragons 
      ? `${monsters} and ${dragons}` 
      : `${monsters}${dragons}`;
    console.log(`
      The battle is about to begin!
      ${player.name} must defeat ${enemiesText}
    `);
  }

  private static pvpStart(player1: Fighter, player2: Fighter): void {
    console.log(`
      ${player1.name} is about to fight ${player2.name}!
    `);
  }
 
  public static announceBattleStart(
    player1: Fighter,
    player2OrEnemies: Fighter | SimpleFighter[],
  ): void {
    if ('name' in player2OrEnemies) {
      BattleAnnouncements.pvpStart(player1, player2OrEnemies);
    } else {
      BattleAnnouncements.pveStart(player1, player2OrEnemies);
    }
  }

  private static pvpResult(
    result: number, 
    player1: Fighter, 
    player2: Fighter,
  ): void {
    console.log(
      result === -1
        ? `With a deadly blow, ${player2.name} defeats ${player1.name}`
        : `${player1.name} wins! ${player2.name}'s body is lying on the ground`,
    );
  }

  private static pveResult(result: number, player: Fighter): void {
    console.log(
      result === -1
        ? `${player.name} has been defeated!`
        : `${player.name} is victorious! All enemies were defeated!`,
    );
  }

  public static announceBattleResults(
    result: number, 
    player1: Fighter, 
    player2: Fighter | undefined = undefined,
  ): void {
    if (player2) {
      BattleAnnouncements.pvpResult(result, player1, player2);
    } else {
      BattleAnnouncements.pveResult(result, player1);     
    }
  }
}