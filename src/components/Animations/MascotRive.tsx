import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import RiveReactNative, { RiveRef } from 'rive-react-native';

type MascotState = 'idle' | 'happy' | 'sad';

interface MascotRiveProps {
  state: MascotState;
  size?: number;
}

export const MascotRive = ({ 
  state, 
  size = 120 
}: MascotRiveProps) => {
  const riveRef = useRef<RiveRef>(null);
  
  // Map mascot states to Rive state machine inputs or animations
  const getStateInput = (mascotState: MascotState): string => {
    switch (mascotState) {
      case 'idle':
        return 'idle';
      case 'happy':
        return 'isHappy';
      case 'sad':
        return 'isSad';
      default:
        return 'idle';
    }
  };
  
  // Safe function to set animation state with proper error handling
  const safeSetState = (inputName: string, value: any) => {
    if (!riveRef.current) {
      return false;
    }
    
    try {
      if (inputName !== 'idle') {
        riveRef.current.setInputState('avatar', inputName, value);
        riveRef.current.play();
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  // Update Rive animation state when mascot state changes
  useEffect(() => {
    const stateInput = getStateInput(state);
    // Then set the desired state to true
    safeSetState(stateInput, true);

  }, [state]);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <RiveReactNative
        ref={riveRef}
        url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
        artboardName="Avatar 1"
        stateMachineName="avatar"
        style={{ width: size, height: size }}
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 60,
  },
});
