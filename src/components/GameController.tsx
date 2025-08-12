import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DrawingScreen } from '../screens/DrawingScreen';
import { GameSetupScreen } from '../screens/GameSetupScreen';
import { TimeUpScreen } from '../screens/TimeUpScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import GameService, { GameState } from '../services/GameService';
import WordService, { WordDifficulty } from '../services/WordService';
import { CelebrationAnimationModal } from './Animations/CelebrationAnimationModal';

// Game configuration constants
const ROUND_DURATION = 20; // Round duration in seconds

export const GameController: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [timeRemaining, setTimeRemaining] = useState(ROUND_DURATION);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<WordDifficulty>('medium');
  const [showCelebration, setShowCelebration] = useState(false);
  
  const gameService = GameService.getInstance();
  const wordService = WordService.getInstance();
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, timeRemaining]);

  const handleStartWelcome = () => {
    setGameState('setup');
  };

  const handleDifficultySelect = (difficulty: WordDifficulty) => {
    setSelectedDifficulty(difficulty);
    
    // Generate word immediately when difficulty is selected
    const wordObj = wordService.getRandomWordByDifficulty(difficulty);
    const word = wordObj ? wordObj.text : wordService.getRandomWord().text;
    setCurrentWord(word);
  };

  const handleStartGame = () => {
    // Create game session for single player
    gameService.createSession('You', {
      roundDuration: ROUND_DURATION,
      pointsPerDrawing: 5,
    });
    
    // Update local game state to match GameService
    const session = gameService.getCurrentSession();
    if (session) {
      setGameState(session.currentState);
    }
    
    // If no word was selected, generate one as fallback
    const wordToUse = currentWord || (() => {
      const wordObj = wordService.getRandomWordByDifficulty(selectedDifficulty);
      return wordObj ? wordObj.text : wordService.getRandomWord().text;
    })();
    
    const round = gameService.startNewRound(wordToUse);
    
    if (round) {
      setCurrentWord(wordToUse);
      setTimeRemaining(ROUND_DURATION);
      setIsTimerActive(true);
      setGameState('drawing');
    } else {
      console.error('GameController: Failed to start new round');
    }
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    gameService.endCurrentRound(false);
    setGameState('timeup');
  };

  const handleGuessCorrect = () => {
    setIsTimerActive(false);
    gameService.endCurrentRound(true);
    setGameState('celebration');
    setShowCelebration(true);
  };

  const handleEndRound = () => {
    setIsTimerActive(false);
    gameService.endCurrentRound(false);
    setGameState('timeup');
  };

  const handleSkipWord = () => {
    handleNextRound();
  };

  const handleNextRound = () => {
    const session = gameService.getCurrentSession();
  
    if (session) {
      const wordObj = wordService.getRandomWordByDifficulty('medium'); // Could make this configurable
      const word = wordObj ? wordObj.text : wordService.getRandomWord().text;
      const round = gameService.startNewRound(word);
      
      if (round) {
        setCurrentWord(word);
        setTimeRemaining(ROUND_DURATION);
        setIsTimerActive(true);
        setGameState('setup');
        setShowCelebration(false);
      } else {
        console.error('GameController: Failed to start next round');
      }
    }
  };

  const handleBackToWelcome = () => {
    gameService.resetGame();
    setGameState('welcome');
    setTimeRemaining(ROUND_DURATION);
    setIsTimerActive(false);
    setCurrentWord('');
    setShowCelebration(false);
  };

  const handleCelebrationFinish = () => {
    setShowCelebration(false);
    // Transition from celebration to timeup screen
    setGameState('timeup');
  };
  
  const getCurrentDrawer = () => gameService.getCurrentDrawer();
  
  const renderCurrentScreen = () => {
    const drawer = getCurrentDrawer();

    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStartGame={handleStartWelcome} />;
        
      case 'setup':
        return (
          <GameSetupScreen 
            onDifficultySelect={handleDifficultySelect}
            onStartGame={handleStartGame}
            onGoBack={handleBackToWelcome}
            currentWord={currentWord}
            selectedDifficulty={selectedDifficulty}
          />
        );
        
      case 'drawing':
        if (!drawer) return null;
        return (
          <DrawingScreen
            currentWord={currentWord}
            drawer={drawer}
            timeRemaining={timeRemaining}
            isTimerActive={isTimerActive}
            onTimeUp={handleTimeUp}
            onEndRound={handleEndRound}
            onGuessCorrect={handleGuessCorrect}
            onSkipWord={handleSkipWord}
            onQuitGame={handleBackToWelcome}
          />
        );
        
      case 'timeup':
        if (!drawer) return null;
        return (
          <TimeUpScreen
            currentWord={currentWord}
            drawer={drawer}
            onNextRound={handleNextRound}
            onEndGame={handleBackToWelcome}
          />
        );
        
      case 'celebration':
        // Show the drawing screen with celebration
        if (!drawer) return null;
        return (
          <DrawingScreen
            currentWord={currentWord}
            drawer={drawer}
            timeRemaining={0}
            isTimerActive={false}
            onTimeUp={handleTimeUp}
            onEndRound={handleNextRound}
            onGuessCorrect={handleGuessCorrect}
            onSkipWord={handleSkipWord}
            onQuitGame={handleBackToWelcome}
          />
        );
        
      default:
        return <WelcomeScreen onStartGame={handleStartWelcome} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderCurrentScreen()}
      
      <CelebrationAnimationModal
        visible={showCelebration}
        onAnimationFinish={handleCelebrationFinish}
      />
    </View>
  );
};
