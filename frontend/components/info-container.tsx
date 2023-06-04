import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface InfoContainerProps {
  texts: string[];
}

export const InfoContainer = ({ texts }: InfoContainerProps) => {
  return (
    <View style={styles.infoContainer}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...styles.iconWrap,
            paddingRight: 1,
            borderColor: "grey",
          }}
        >
          <AntDesign name="info" size={24} color="grey" />
        </View>
      </View>

      {texts.map((text, index) => (
        <Text key={index} style={styles.infoText}>
          {text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BF7E5C",
    borderWidth: 2,
    borderRadius: 40,
  },
  infoContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#F4F1EC",
    borderRadius: 10,
    gap: 40,
  },
  infoText: {
    width: 300,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 30,
  },
});
