import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedButton } from '../components/UI/AnimatedButton';
import { Player } from '../services/GameService';

interface TimeUpScreenProps {
  currentWord: string;
  drawer: Player;
  onNextRound: () => void;
  onEndGame: () => void;
}

export const TimeUpScreen: React.FC<TimeUpScreenProps> = ({
  currentWord,
  drawer,
  onNextRound,
  onEndGame,
}) => {
  return (
    <View style={styles.container}>      
      <Text style={styles.title}>
        Time's Up!
      </Text>
      
      <Text style={styles.subtitle}>
        The word was: <Text style={styles.wordReveal}>{currentWord}</Text>
      </Text>
      
      <View style={styles.playerInfo}>
        <Text style={styles.playerText}>
          {drawer.name} was drawing
        </Text>
        <Text style={styles.scoreText}>
          Score: {drawer.score} points
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <AnimatedButton
          title="Next Round"
          onPress={onNextRound}
          variant="success"
          size="large"
          style={styles.nextButton}
        />
        
        <AnimatedButton
          title="End Game"
          onPress={onEndGame}
          variant="secondary"
          size="medium"
          style={styles.endButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FEF2F2',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#374151',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  wordReveal: {
    fontWeight: 'bold',
    color: '#DC2626',
    fontSize: 28,
  },
  playerInfo: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  nextButton: {
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  endButton: {
    opacity: 0.8,
  },
});
