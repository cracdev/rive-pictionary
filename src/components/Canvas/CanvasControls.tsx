import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CanvasControlsProps {
  onClear: () => void;
  onUndo?: () => void;
  disabled?: boolean;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  onClear,
  onUndo,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onClear}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          Clear
        </Text>
      </TouchableOpacity>
      
      {onUndo && (
        <TouchableOpacity
          style={[styles.button, styles.undoButton, disabled && styles.buttonDisabled]}
          onPress={onUndo}
          disabled={disabled}
        >
          <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
            Undo
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  undoButton: {
    backgroundColor: '#F59E0B',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});
