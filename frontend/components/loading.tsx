import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Easing, ColorValue } from "react-native";

interface Props {
  color: ColorValue;
  size?: number;
  durationMs?: number;
}

export const LoadingSpinner = ({
  color,
  size = 24,
  durationMs = 1000,
}: Props): JSX.Element => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation();
  }, []);

  const startRotationAnimation = (): void => {
    Animated.timing(rotationDegree, {
      toValue: 1,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotationDegree.setValue(0); // Reset the value for next animation
      startRotationAnimation(); // Restart the animation
    });
  };

  const spin = rotationDegree.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <View
        style={[
          styles.background,
          { borderColor: color, width: size, height: size },
        ]}
      />
      <Animated.View
        style={[
          styles.progress,
          { borderTopColor: color, width: size, height: size },
          {
            transform: [
              {
                rotate: spin,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    borderRadius: 9999,
    borderWidth: 4,
    opacity: 0.25,
  },
  progress: {
    borderRadius: 9999,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 4,
    position: "absolute",
  },
});
