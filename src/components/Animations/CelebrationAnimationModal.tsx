import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface CelebrationAnimationProps {
  visible: boolean;
  onAnimationFinish: () => void;
}

export const CelebrationAnimationModal: React.FC<CelebrationAnimationProps> = ({
  visible,
  onAnimationFinish,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onAnimationFinish();
      }, 600); // Show Congrats for 0.6 seconds
      
      return () => clearTimeout(timer);
    }
  }, [visible, onAnimationFinish]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>
            Congrats!!!!
          </Text>
          <Text style={styles.subtitle}>
            Correct guess! Well done!
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#059669',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
});
