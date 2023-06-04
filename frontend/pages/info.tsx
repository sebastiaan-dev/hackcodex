import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Pressable, Image, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";

interface InfoProps {
  navigation: any;
}

export const Info = ({ navigation }: InfoProps) => {
  const handleBackPress = () => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    navigation.goBack();
  };

  const [isHoveringBack, setIsHoveringBack] = useState(false);

  const handleMouseOverBack = () => {
    setIsHoveringBack(true);
  };

  const handleMouseOutBack = () => {
    setIsHoveringBack(false);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.menuBar}>
            <View style={isHoveringBack ? styles.iconWrap_hover : styles.iconWrap}>
              <Pressable
                onHoverIn={handleMouseOverBack}
                onHoverOut={handleMouseOutBack}
              >
                <AntDesign
                  onPress={handleBackPress}
                  name="arrowleft"
                  size={24}
                  color={isHoveringBack ? "#FBF8F3" : "#BF7E5C"}
                />
              </Pressable>

            </View>
            <Text style={styles.title}>Info</Text>
            <View style={{ width: 35 }}></View>
          </View>
          <View style={styles.content}>
            <Image
              style={styles.image}
              source={require("../assets/images/unbounded.png")}
            />
            <Text style={styles.infoText}>
              Unbounded is an app designed specifically for individuals living
              with Alzheimer's.
            </Text>
            <Text style={styles.infoText}>
              Unbounded serves as a trusted companion, providing gentle guidance
              and support throughout daily life while alleviating the burden of
              remembering and managing tasks.
            </Text>
            <Text style={styles.infoText}>v0.0.0</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FBF8F3",
  },
  safe: {
    flex: 1,
  },
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#FBF8F3",
    alignItems: "center",
    justifyContent: "center",
  },
  menuBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50,
  },
  title: {
    width: 165,
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Figtree",
  },
  iconWrap: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BF7E5C",
    borderWidth: 2,
    borderRadius: 40,
  },

  iconWrap_hover: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FBF8F3",
    backgroundColor: "#BF7E5C",
    borderWidth: 2,
    borderRadius: 40,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 40,
  },
  infoText: {
    width: 250,
    color: "gray",
    textAlign: "center",
    marginTop: 40,
  },
  responseText: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Figtree",
  },
  interactionBar: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  iconInteract: {
    width: 45,
    height: 45,
    backgroundColor: "#BF7E5C",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BF7E5C",
    borderRadius: 40,
  },
  iconRecord: {
    width: 80,
    height: 80,
    backgroundColor: "#FF8B71",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 40,
  },
});
