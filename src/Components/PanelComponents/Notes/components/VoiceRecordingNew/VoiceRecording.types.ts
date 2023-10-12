import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  recorderState: Recorder;
  handlers: {
    startRecording: () => void;
    cancelRecording: () => void;
    saveRecording: () => void;
    pauseRecording: () => void;
    resumeRecording: () => void;
  };
  isSmall?: boolean;
}

export type PausedRecord = {
  pausedaudioUrl: string;
  pausedrecordingMinutes: number;
  pausedrecordingSeconds: number;
  pausedaudioName: string;
};
export type Recorder = {
  recordingMinutes: number;
  recordingSeconds: number;
  initRecording: boolean;
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  audio: string | null;
  isPause: boolean;
  chunk: any;
};

export type UseRecorder = {
  recorderState: Recorder;
  startRecording: () => void;
  cancelRecording: () => void;
  saveRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
};

export type Audio = {
  key: string;
  audio: string;
};

export type Interval = null | number | ReturnType<typeof setInterval>;
export type SetRecorder = Dispatch<SetStateAction<Recorder>>;
export type AudioTrack = MediaStreamTrack;
export type MediaRecorderEvent = {
  data: Blob;
};
