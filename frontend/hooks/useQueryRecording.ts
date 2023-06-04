import * as React from "react";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import { getResponse } from "../services/backend";
import { useStore } from "../store";
import { transcribeAudio } from "../services/openapi";
import { RECORDING_OPTIONS } from "../config";
import * as Speech from "expo-speech";
import { QueryResponse } from "../types";

export const useQueryRecording = () => {
  const [recording, setRecording] = React.useState<Recording>();
  const [response, setResponse] = React.useState<QueryResponse>();
  const { toggleLoading } = useStore();

  const handlePressButton = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);

    setRecording(recording);
  };

  const handleReleaseButton = async () => {
    toggleLoading();
    setRecording(undefined);

    if (!recording) return;

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    await forceAudioIOS();

    const uri = recording.getURI();
    if (!uri) throw new Error("URI could not be generated");

    const blob = await fetch(uri).then((r) => r.blob());
    let text = await transcribeAudio(blob);

    const response = await getResponse(text);
    setResponse(response);
    Speech.speak(response.answer, {
      rate: 0.9,
    });

    console.log(response);

    toggleLoading();
  };

  // Fixes a bug on iOS where the recording is played through the earpiece speaker
  const forceAudioIOS = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/500ms-empty.mp3")
    );
    await sound.playAsync();
  };

  return { handlePressButton, handleReleaseButton, recording, response };
};
