import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, PanResponder, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface DrawingCanvasProps {
  disabled?: boolean;
  onClear?: () => void;
}

export interface DrawingCanvasRef {
  clearCanvas: () => void;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ disabled = false }, ref) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const pathRef = useRef<string>('');

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath('');
    pathRef.current = '';
  };

  useImperativeHandle(ref, () => ({
    clearCanvas,
  }));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderTerminationRequest: () => false,

    onPanResponderGrant: (event) => {
      if (disabled) return;
      const { locationX, locationY } = event.nativeEvent;
      const newPath = `M${locationX},${locationY}`;
      pathRef.current = newPath;
      setCurrentPath(newPath);
    },

    onPanResponderMove: (event) => {
      if (disabled) return;
      const { locationX, locationY } = event.nativeEvent;
      const newPath = `${pathRef.current} L${locationX},${locationY}`;
      pathRef.current = newPath;
      setCurrentPath(newPath);
    },

    onPanResponderRelease: () => {
      if (disabled) return;
      if (pathRef.current && pathRef.current.length > 0) {
        setPaths((prev) => {
          const newPaths = [...prev, pathRef.current];
          return newPaths;
        });
        // Use setTimeout to ensure the path is added before clearing
        setTimeout(() => {
          setCurrentPath('');
          pathRef.current = '';
        }, 10);
      }
    },

    onPanResponderTerminate: () => {
      // Handle case where gesture is interrupted
      if (!disabled && pathRef.current && pathRef.current.length > 0) {
        setPaths((prev) => [...prev, pathRef.current]);
        setTimeout(() => {
          setCurrentPath('');
          pathRef.current = '';
        }, 10);
      }
    },
  });

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers} style={styles.canvas}>
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
          {currentPath !== '' && (
            <Path
              d={currentPath}
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </Svg>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  canvas: {
    flex: 1,
  },
});
