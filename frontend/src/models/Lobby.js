export default class Lobby {
  id = null;
  connected = false;
  players = []; // array of players in this lobby

  disconnect() {
    if (this.connected) {
      this.connected = false;
      this.id = null;
    }
  }

  connect(lobbyId) {
    this.disconnect();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.id = lobbyId;

        // fake
        this.setPlayers([
          new Player({
            id: 1,
            isCurrentPlayer: true,
            name: 'Current player',
          }),
        ]);
        resolve();
      }, 1500);
    });
  }

  setPlayers(playersBundle) {
    this.players = playersBundle;
  }

  /**
   * Effectively stands for 'player connected' event
   */
  addPlayer(playerInstance) {
    this.players.push(playerInstance);
  }

  removePlayer(playerId) {
    const existingIndex = this.players.findIndex((player) => {
      if (player.id === playerId) {
        return true;
      }
    });
    if (existingIndex) {
      this.players.splice(existingIndex, 1);
    }
  }
}

export default new Lobby();
