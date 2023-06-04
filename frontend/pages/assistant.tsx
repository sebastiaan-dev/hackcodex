import { SafeAreaView } from "react-native-safe-area-context";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useStore } from "../store";
import { Microphone, LoadingSpinner, InfoContainer } from "../components";
import { useQueryRecording } from "../hooks";
import { useState } from "react";

interface AssistantProps {
  navigation: any;
}

export const Assistant = ({ navigation }: AssistantProps) => {
  const { loading } = useStore();
  const { response, recording, handlePressButton, handleReleaseButton } =
    useQueryRecording();
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringComment, setIsHoveringComment] = useState(false);
  const [isHoveringInfo, setIsHoveringInfo] = useState(false);

  const handleInfoPress = () => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    navigation.navigate("Info");
  };

  const handleDataPress = () => {
    if (Platform.OS !== "web")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    navigation.navigate("Data");
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleMouseOverComment = () => {
    setIsHoveringComment(true);
  };

  const handleMouseOutComment = () => {
    setIsHoveringComment(false);
  };

  const handleMouseOverInfo = () => {
    setIsHoveringInfo(true);
  };

  const handleMouseOutInfo = () => {
    setIsHoveringInfo(false);
  };

  const texts = ["Press and hold the microphone button to ask a question."];

  const selectContent = () => {
    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoadingSpinner color="orange" size={200} durationMs={1000} />
        </View>
      );
    }

    if (!response) {
      return (
        <View style={styles.content}>
          <InfoContainer texts={texts} />
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{response.answer}</Text>
        </View>
        <View style={{ justifyContent: "center", marginTop: 40 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
          >
            <FlatList
              style={{
                flex: 1,
                flexDirection: "row",
                height:
                  response.images.length === 0
                    ? 0
                    : response.images.length <= 3
                    ? 150
                    : 300,
                width: "80%",
              }}
              data={response.images}
              renderItem={({ item }) => {
                const base64 = `data:image/png;base64,${item.image}`;

                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      marginHorizontal: 15,
                      marginVertical: 5,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 20,
                        paddingLeft: 20,
                        paddingRight: 40,
                        backgroundColor: "#F4F1EC",
                        borderRadius: 15,
                      }}
                    >
                      <Image
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                        source={{ uri: base64 }}
                      />
                      <Text style={styles.imageText}>{item.title}</Text>
                    </View>
                  </View>
                );
              }}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item) => item.title}
            />
          </ScrollView>

          {/* {response.images.map(({ image, title }) => {
            const base64 = `data:image/png;base64,${image}`;

            return (
              <View key={title} style={{ flexDirection: "row", gap: 20 }}>
                <Text>{title}</Text>
                <Image
                  key={title}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  source={{ uri: base64 }}
                />
              </View>
            );
          })} */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.menuBar}>
            <View
              style={{
                ...(isHoveringInfo ? styles.iconWrap_hover : styles.iconWrap),
                paddingRight: 1,
              }}
            >
              <Pressable
                onHoverIn={handleMouseOverInfo}
                onHoverOut={handleMouseOutInfo}>
                <AntDesign
                  onPress={handleInfoPress}
                  name="info"
                  size={24}
                  color={isHoveringInfo ? "#FBF8F3" : "#BF7E5C"}
                />
              </Pressable>

            </View>
            <Text style={styles.title}>Assistant</Text>
            <Pressable
              onPress={handleDataPress}
              onHoverIn={handleMouseOver}
              onHoverOut={handleMouseOut}
            >
              <View
                style={{
                  ...(isHovering ? styles.iconWrap_hover : styles.iconWrap),
                  paddingLeft: 2,
                }}
              >
                <Ionicons
                  name="add"
                  size={28}
                  color={isHovering ? "#FBF8F3" : "#BF7E5C"}
                />
              </View>
            </Pressable>
          </View>
          {selectContent()}
          <View style={styles.interactionBar}>
            <Pressable
              onHoverIn={handleMouseOverComment}
              onHoverOut={handleMouseOutComment}
            >
              <View
                style={
                  isHoveringComment
                    ? styles.iconInteract_hover
                    : styles.iconInteract
                }
              >
                <MaterialCommunityIcons
                  name="card-text-outline"
                  size={24}
                  color={isHoveringComment ? "#BF7E5C" : "#FBF8F3"}
                />
              </View>
            </Pressable>
            <Microphone
              active={recording !== undefined}
              onPress={handlePressButton}
              onRelease={handleReleaseButton}
            />
            <View style={styles.iconEmpty}></View>
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
    fontSize: 25,
    textAlign: "center",
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
    borderColor: "#BF7E5C",
    backgroundColor: "#BF7E5C",
    borderWidth: 2,
    borderRadius: 40,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  responseContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 40,
    backgroundColor: "#F4F1EC",
    borderRadius: 10,
  },
  responseText: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Figtree",
  },
  imageText: {
    paddingLeft: 10,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Figtree",
  },
  interactionBar: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  iconInteract: {
    width: 45,
    height: 45,
    backgroundColor: "#BF7E5C",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BF7E5C",
    borderWidth: 2,
    borderRadius: 40,
  },

  iconInteract_hover: {
    width: 45,
    height: 45,
    backgroundColor: "#FBF8F3",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BF7E5C",
    borderWidth: 2,
    borderRadius: 40,
  },

  iconEmpty: {
    width: 45,
    height: 45,
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
