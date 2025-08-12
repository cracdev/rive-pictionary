import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  GestureResponderEvent,
  StyleProp
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

interface AnimatedButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  size = 'medium',
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles] as ViewStyle,
    styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles] as ViewStyle,
    fullWidth && styles.buttonFullWidth,
    disabled && styles.buttonDisabled,
    style,
  ].filter(Boolean);

  const buttonTextStyle = [
    styles.buttonText,
    styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles],
    styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={buttonTextStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Variants
  buttonPrimary: {
    backgroundColor: '#2563EB',
  },
  buttonSecondary: {
    backgroundColor: '#6B7280',
  },
  buttonSuccess: {
    backgroundColor: '#059669',
  },
  buttonDanger: {
    backgroundColor: '#DC2626',
  },
  buttonWarning: {
    backgroundColor: '#D97706',
  },
  
  // Sizes
  buttonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonMedium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonLarge: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  
  // States
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonFullWidth: {
    width: '100%',
  },
  
  // Text Styles
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  
  // Text Variants (all white for now)
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: 'white',
  },
  textSuccess: {
    color: 'white',
  },
  textDanger: {
    color: 'white',
  },
  textWarning: {
    color: 'white',
  },
  
  // Text Sizes
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  
  textDisabled: {
    color: '#9CA3AF',
  },
});
