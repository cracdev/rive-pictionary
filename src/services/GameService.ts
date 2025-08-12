export type GameState = 'welcome' | 'setup' | 'drawing' | 'timeup' | 'celebration';

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface GameRound {
  id: string;
  word: string;
  startTime: number;
  endTime?: number;
  completed: boolean;
}

export interface GameSession {
  id: string;
  player: Player;
  rounds: GameRound[];
  currentRoundId: string | null;
  currentState: GameState;
  settings: {
    roundDuration: number;
    pointsPerDrawing: number;
  };
}

class GameService {
  private static instance: GameService;
  private currentSession: GameSession | null = null;

  static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  // Create a new game session
  createSession(playerName: string = 'Player', settings?: Partial<GameSession['settings']>): GameSession {
    const player: Player = {
      id: 'player_main',
      name: playerName,
      score: 0,
    };

    this.currentSession = {
      id: `session_${Date.now()}`,
      player,
      rounds: [],
      currentRoundId: null,
      currentState: 'setup',
      settings: {
        roundDuration: 20,
        pointsPerDrawing: 5,
        ...settings,
      },
    };
    return this.currentSession;
  }

  // Get current session
  getCurrentSession(): GameSession | null {
    return this.currentSession;
  }

  // Start a new round
  startNewRound(word: string): GameRound | null {
    if (!this.currentSession) return null;

    const newRound: GameRound = {
      id: `round_${Date.now()}`,
      word,
      startTime: Date.now(),
      completed: false,
    };

    this.currentSession.rounds.push(newRound);
    this.currentSession.currentRoundId = newRound.id;
    this.currentSession.currentState = 'drawing';

    return newRound;
  }

  // End current round
  endCurrentRound(completed: boolean = true): GameRound | null {
    if (!this.currentSession || !this.currentSession.currentRoundId) return null;

    const currentRound = this.currentSession.rounds.find(
      r => r.id === this.currentSession!.currentRoundId
    );

    if (!currentRound) return null;

    currentRound.endTime = Date.now();
    currentRound.completed = completed;

    // Award points for completed rounds
    if (completed) {
      this.currentSession.player.score += this.currentSession.settings.pointsPerDrawing;
    }

    this.currentSession.currentState = 'timeup';
    return currentRound;
  }

  // Get current drawer (player)
  getCurrentDrawer(): Player | null {
    return this.currentSession?.player || null;
  }

  // Reset game
  resetGame(): void {
    this.currentSession = null;
  }
}

export default GameService;
