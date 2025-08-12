import React, { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MascotRive } from '../components/Animations/MascotRive';
import { CanvasControls } from '../components/Canvas/CanvasControls';
import { DrawingCanvas, DrawingCanvasRef } from '../components/Canvas/DrawingCanvas';
import { AnimatedButton } from '../components/UI/AnimatedButton';
import { GameTimer } from '../components/UI/GameTimer';
import { Player } from '../services/GameService';

interface DrawingScreenProps {
  currentWord: string;
  drawer: Player;
  timeRemaining: number;
  isTimerActive: boolean;
  onTimeUp: () => void;
  onEndRound: () => void;
  onGuessCorrect: () => void;
  onSkipWord: () => void;
  onQuitGame: () => void;
}

export const DrawingScreen: React.FC<DrawingScreenProps> = ({
  currentWord,
  drawer,
  timeRemaining,
  isTimerActive,
  onTimeUp,
  onEndRound,
  onGuessCorrect,
  onSkipWord,
  onQuitGame,
}) => {
  const canvasRef = useRef<DrawingCanvasRef>(null);
  const [mascotState, setMascotState] = useState<'idle' | 'happy' | 'sad'>('idle');
  const [showQuitModal, setShowQuitModal] = useState<boolean>(false);

  useEffect(() => {
    // Update mascot state based on time remaining (adjusted for 20s rounds)
    if (timeRemaining <= 2 && isTimerActive) {
      setMascotState('sad');
    }
  }, [timeRemaining]);

  const handleClearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleQuitGame = () => {
    setShowQuitModal(true);
  };

  const handleConfirmQuit = () => {
    setShowQuitModal(false);
    onQuitGame();
  };

  const handleCancelQuit = () => {
    setShowQuitModal(false);
  };

  const handleEndRound = () => {
    onEndRound();
  };

  const handleGuessCorrect = () => {
    onGuessCorrect();
  };

  const handleSkipWord = () => {
    onSkipWord();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>Draw: ???</Text>
          <Text style={styles.playerScore}>Score: {drawer.score}</Text>
        </View>
        
        <GameTimer
          duration={timeRemaining}
          isActive={isTimerActive}
          onTimeUp={handleEndRound}
        />
      </View>

      {/* Drawing area */}
      <View style={styles.drawingArea}>
        <DrawingCanvas ref={canvasRef} />
        
        <CanvasControls
          onClear={handleClearCanvas}
          disabled={!isTimerActive}
        />
      </View>

      {/* Mascot and instructions */}
      <View style={styles.bottomSection}>
        <View style={styles.mascotContainer}>
          <MascotRive state={mascotState} size={80} />
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>
            Draw the word above!
          </Text>
          
          <Text style={styles.hint}>
            💡 Make it clear and simple
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <AnimatedButton
          title="Got It!"
          onPress={handleGuessCorrect}
          variant="success"
          size="small"
          style={styles.guessedButton}
        />
        
        <AnimatedButton
          title="Skip Word"
          onPress={() => {
            handleSkipWord();
          }}
          variant="warning"
          size="small"
          style={styles.skipButton}
        />
        
        <AnimatedButton
          title="Quit"
          onPress={handleQuitGame}
          variant="danger"
          size="small"
          style={styles.quitButton}
        />
      </View>
      
      {/* Quit Confirmation Modal */}
      <Modal
        visible={showQuitModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelQuit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to quit?</Text>
            <Text style={styles.modalSubtitle}>Your current progress will be lost.</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelQuit}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmQuit}
              >
                <Text style={styles.confirmButtonText}>Quit Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  playerScore: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  wordContainer: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  wordLabel: {
    fontSize: 16,
    color: '#92400E',
    marginBottom: 4,
    fontWeight: '600',
  },
  word: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#78350F',
    letterSpacing: 2,
  },
  hiddenWordContainer: {
    alignItems: 'center',
  },
  hiddenWordText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 4,
  },
  hiddenWordHint: {
    fontSize: 14,
    color: '#D97706',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  drawingArea: {
    flex: 1,
    marginBottom: 16,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  mascotContainer: {
    marginRight: 16,
  },
  instructionsContainer: {
    flex: 1,
  },
  instructions: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 4,
  },
  hint: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 8,
  },
  guessedButton: {
    flex: 2,
  },
  skipButton: {
    flex: 1,
  },
  quitButton: {
    flex: 1,
  },
  debugText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    fontStyle: 'italic',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  confirmButton: {
    backgroundColor: '#EF4444',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
