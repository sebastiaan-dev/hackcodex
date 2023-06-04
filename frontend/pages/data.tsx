import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StyleSheet, Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";
import { InfoContainer, Microphone, Complete, Cancel } from "../components";
import { useDataRecording } from "../hooks";
import { useState } from "react";

interface DataProps {
  navigation: any;
}

export const Data = ({ navigation }: DataProps) => {
  const {
    recording,
    response,
    handlePressButton,
    handleReleaseButton,
    handleCancelButton,
    handleConfirmButton,
  } = useDataRecording();

  const [isHoveringBack, setIsHoveringBack] = useState(false);

  const handleMouseOverBack = () => {
    setIsHoveringBack(true);
  };

  const handleMouseOutBack = () => {
    setIsHoveringBack(false);
  };

  const handleBackPress = () => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    navigation.goBack();
  };

  const texts = [
    "Select the below button to record new information to the person's profile.",
    "Your message will automatically be transcribed and added.",
  ];

  const selectContent = () => {
    if (!response) {
      return (
        <View style={styles.content}>
          <InfoContainer texts={texts} />
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <Text style={styles.responseTitle}>Add new data to profile?</Text>
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      </View>
    );
  };

  const selectActions = () => {
    if (!response) {
      return (
        <Microphone
          active={recording !== undefined}
          onPress={handlePressButton}
          onRelease={handleReleaseButton}
        />
      );
    }

    return (
      <View style={{ flexDirection: "row", gap: 30 }}>
        <Complete onPress={handleConfirmButton} />
        <Cancel onPress={handleCancelButton} />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.menuBar}>
            <View style={isHoveringBack ? styles.iconWrap_hover : styles.iconWrap}>
              <Pressable
                onHoverIn={handleMouseOverBack}
                onHoverOut={handleMouseOutBack}>
                <AntDesign
                  onPress={handleBackPress}

                  name="arrowleft"
                  size={24}
                  color={isHoveringBack ? "#FBF8F3" : "#BF7E5C"}
                />
              </Pressable>

            </View>
            <Text style={styles.title}>Add to profile</Text>
            <View style={{ width: 35 }}></View>
          </View>
          {selectContent()}
          <View style={styles.interactionBar}>{selectActions()}</View>
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
    backgroundColor: "#FBF8F3",
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
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
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
  responseContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 40,
    backgroundColor: "#F4F1EC",
    borderRadius: 10,
  },
  responseTitle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Figtree",
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
    justifyContent: "center",
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
});
