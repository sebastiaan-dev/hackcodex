import { StyleSheet, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface CompleteProps {
  onPress: () => void;
}

export const Complete = ({ onPress }: CompleteProps) => {
  return (
    <Pressable onPressIn={onPress}>
      <View style={styles.icon}>
        <Feather name="check" size={35} color="white" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    backgroundColor: "#FF8B71",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 40,
  },
});
