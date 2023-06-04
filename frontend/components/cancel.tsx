import { StyleSheet, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface CancelProps {
  onPress: () => void;
}

export const Cancel = ({ onPress }: CancelProps) => {
  return (
    <Pressable onPressIn={onPress}>
      <View style={styles.icon}>
        <Feather name="x" size={35} color="white" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    backgroundColor: "#BF7E5C",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 40,
  },
});
