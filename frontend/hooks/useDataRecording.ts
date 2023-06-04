import * as React from "react";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import { addPersonalInfo } from "../services/backend";
import { transcribeAudio } from "../services/openapi";
import { RECORDING_OPTIONS } from "../config";

export const useDataRecording = () => {
  const [recording, setRecording] = React.useState<Recording>();
  const [response, setResponse] = React.useState<string>();

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
    setResponse(text);
  };

  const handleConfirmButton = () => {
    if (!response) throw new Error("Response is undefined");

    addPersonalInfo(response);
    setResponse(undefined);
  };

  const handleCancelButton = () => {
    setResponse(undefined);
  };

  // Fixes a bug on iOS where the recording is played through the earpiece speaker
  const forceAudioIOS = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/500ms-empty.mp3")
    );
    await sound.playAsync();
  };

  return {
    handleConfirmButton,
    handleCancelButton,
    handlePressButton,
    handleReleaseButton,
    recording,
    response,
  };
};
