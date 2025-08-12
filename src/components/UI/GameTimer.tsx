import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimerProps {
  duration: number; // in seconds
  isActive: boolean;
  onTimeUp: () => void;
}

export const GameTimer: React.FC<TimerProps> = ({ duration, isActive, onTimeUp }) => {
  // Use duration directly from props - let GameController manage the timer
  const timeLeft = duration;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerStyle = () => {
    if (timeLeft <= 10) return { color: '#DC2626' }; // red-600
    if (timeLeft <= 30) return { color: '#D97706' }; // yellow-600
    return { color: '#059669' }; // green-600
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, getTimerStyle()]}>
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
