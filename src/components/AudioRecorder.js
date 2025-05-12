// Audio Recorder component
// Handles the UI for recording audio and displaying transcriptions

import { invoke } from '@tauri-apps/api/tauri';

export default function AudioRecorder() {
  const startRecording = async () => {
    try {
      await invoke('start_recording');
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const audioPath = await invoke('stop_recording');
      console.log('Recording stopped, file saved at:', audioPath);
      return audioPath;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      return null;
    }
  };

  const transcribeAudio = async (audioPath) => {
    try {
      const transcription = await invoke('transcribe_audio', { audioPath });
      console.log('Transcription complete:', transcription);
      return transcription;
    } catch (error) {
      console.error('Failed to transcribe audio:', error);
      return null;
    }
  };

  return {
    startRecording,
    stopRecording,
    transcribeAudio
  };
}
