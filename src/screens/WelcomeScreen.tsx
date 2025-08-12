import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MascotRive } from '../components/Animations/MascotRive';
import { AnimatedButton } from '../components/UI/AnimatedButton';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MascotRive state="idle" size={150} />
        
        <Text style={styles.title}>
          Pictionary
        </Text>
        
        <Text style={styles.subtitle}>
          Draw, Guess & Have Fun!
        </Text>
        
        <View style={styles.features}>
          <Text style={styles.feature}>✨ Simple drawing canvas</Text>
          <Text style={styles.feature}>🎉 Fun celebrations</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <AnimatedButton
          title="Start Playing!"
          onPress={onStartGame}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#3B82F6',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 300,
  },
  features: {
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  feature: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
});
