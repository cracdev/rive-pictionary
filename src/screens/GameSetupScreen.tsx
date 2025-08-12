import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MascotRive } from '../components/Animations/MascotRive';
import { AnimatedButton } from '../components/UI/AnimatedButton';
import WordService, { WordDifficulty } from '../services/WordService';

interface GameSetupScreenProps {
  onDifficultySelect: (difficulty: WordDifficulty) => void;
  onStartGame: () => void;
  onGoBack: () => void;
  currentWord: string;
  selectedDifficulty: WordDifficulty;
}

export const GameSetupScreen: React.FC<GameSetupScreenProps> = ({
  onDifficultySelect,
  onStartGame,
  onGoBack,
  currentWord,
  selectedDifficulty,
}) => {
  const [mascotState, setMascotState] = useState<'idle' | 'happy' | 'sad'>('idle');
  
  const wordService = WordService.getInstance();
  
  // Get word counts for each difficulty
  const getWordCount = (difficulty: WordDifficulty): number => {
    return wordService.getWordsByDifficulty(difficulty).length;
  };
  

  const handleStartGame = () => {
    setMascotState('happy');
    // Small delay to show celebration animation
    setTimeout(() => {
      onStartGame();
    }, 800);
  };

  const handleDifficultySelect = (difficulty: WordDifficulty) => {
    onDifficultySelect(difficulty);
  };

  const getDifficultyColor = (difficulty: WordDifficulty): string => {
    switch (difficulty) {
      case 'easy': return '#059669';
      case 'medium': return '#D97706';
      case 'hard': return '#DC2626';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MascotRive state={mascotState} size={120} />
        <Text style={styles.title}>Choose Difficulty </Text>
        <Text style={styles.subtitle}>Pick your challenge level and let's start drawing!</Text>
      </View>

      <View style={styles.difficultySection}>
        <View style={styles.difficultyContainer}>
          {(['easy', 'medium', 'hard'] as WordDifficulty[]).map((difficulty) => (
            <AnimatedButton
              key={difficulty}
              title={`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} (${getWordCount(difficulty)} words)`}
              onPress={() => handleDifficultySelect(difficulty)}
              variant={selectedDifficulty === difficulty ? 'primary' : 'secondary'}
              size="large"
              style={[
                styles.difficultyButton,
                ...(selectedDifficulty === difficulty ? [{
                  backgroundColor: getDifficultyColor(difficulty)
                }] : [])
              ]}
            />
          ))}
        </View>
        
        {/* Current Selected Word */}
        {currentWord && (
          <View style={styles.currentWordSection}>
            <Text style={styles.currentWordTitle}>
              Your drawing word will be:
            </Text>
            <View style={styles.currentWordContainer}>
              <Text style={styles.currentWordText}>{currentWord}</Text>
            </View>
            <Text style={styles.currentWordSubtitle}>
              Remember this word - you'll be drawing it!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedButton
          title="← Back"
          onPress={onGoBack}
          variant="secondary"
          size="medium"
          style={styles.backButton}
        />
        
        <AnimatedButton
          title="Let's Draw!"
          onPress={handleStartGame}
          variant="success"
          size="large"
          disabled={!currentWord || !selectedDifficulty}
          style={styles.startButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  difficultySection: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  difficultyContainer: {
    gap: 16,
    paddingHorizontal: 8,
  },
  difficultyButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
    marginBottom: 20,
  },
  backButton: {
    flex: 1,
  },
  startButton: {
    flex: 2,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  wordExamplesSection: {
    marginTop: 32,
    paddingHorizontal: 8,
  },
  wordExamplesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  wordExamplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  wordExample: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  wordExampleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  currentWordSection: {
    marginTop: 24,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  currentWordTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
  },
  currentWordContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  currentWordText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400E',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  currentWordSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
