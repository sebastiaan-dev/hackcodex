import { StyleSheet, Pressable, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";

interface MicrophoneProps {
  onPress: () => void;
  onRelease: () => void;
  active: boolean;
}

export const Microphone = ({ onPress, onRelease, active }: MicrophoneProps) => {
  return (
    <Pressable onPressIn={onPress} onPressOut={onRelease}>
      <Animatable.Text
        animation={active ? "pulse" : undefined}
        duration={800}
        easing="ease-out"
        iterationCount="infinite"
        style={{ textAlign: "center" }}
      >
        <View style={active ? styles.iconRecordActive : styles.iconRecord}>
          <FontAwesome5 name="microphone-alt" size={35} color="white" />
        </View>
      </Animatable.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconRecord: {
    width: 80,
    height: 80,
    backgroundColor: "#FF8B71",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 40,
  },
  iconRecordActive: {
    width: 80,
    height: 80,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 40,
  },
});
