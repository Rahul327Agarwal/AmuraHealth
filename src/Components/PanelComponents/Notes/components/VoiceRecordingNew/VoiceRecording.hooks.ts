import { useState, useEffect } from 'react';
import { startRecording, saveRecording, pauseRecording, resumeRecording } from './VoiceRecording.functions';
import { Recorder, Interval, AudioTrack, MediaRecorderEvent } from './VoiceRecording.types';

const initialState: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
  isPause: false,
  chunk: [],
};

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState);

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval: Interval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (prevState.recordingMinutes === MAX_RECORDER_TIME && prevState.recordingSeconds === 0) {
            typeof recordingInterval === 'number' && clearInterval(recordingInterval);
            return prevState;
          }

          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59 && !prevState.isPause)
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };
          else if (prevState.recordingSeconds === 59 && !prevState.isPause)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
          else return prevState;
        });
      }, 1000);
    else typeof recordingInterval === 'number' && clearInterval(recordingInterval);

    return () => {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval);
    };
  });

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      else return prevState;
    });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks: Blob[] = [];

    if (recorder && recorder.state === 'inactive') {
      recorder.start();
      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        if (recorder.state !== 'paused') {
          setRecorderState((prevState: Recorder) => {
            chunks = [...prevState.chunk, e.data];
            return prevState;
          });
        }
        if (recorder.state === 'paused') {
          setRecorderState((prevState: Recorder) => {
            let tempState: Blob[] = [...prevState.chunk];
            tempState.push(e.data);
            const blob = new Blob(tempState, { type: 'audio/ogg; codecs=opus' });
            if (prevState.mediaRecorder)
              return {
                ...prevState,
                recordingMinutes: prevState.recordingMinutes,
                recordingSeconds: prevState.recordingSeconds,
                audio: window.URL.createObjectURL(blob),
                chunk: [...tempState],
              };
            else return prevState;
          });
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        chunks = [];

        setRecorderState((prevState: Recorder) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              recordingMinutes: prevState.recordingMinutes,
              recordingSeconds: prevState.recordingSeconds,
              audio: window.URL.createObjectURL(blob),
            };
          else return initialState;
        });
      };
      recorder.onpause = () => {
        setRecorderState((prevState: Recorder) => {
          return {
            ...prevState,
            isPause: true,
          };
        });
        if (recorder.state === 'paused') {
          recorder.requestData();
        }
      };
      recorder.onresume = () => {
        setRecorderState((prevState: Recorder) => {
          return {
            ...prevState,
            isPause: false,
          };
        });
      };
    }

    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track: AudioTrack) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
    pauseRecording: () => pauseRecording(recorderState.mediaRecorder),
    resumeRecording: () => resumeRecording(recorderState.mediaRecorder),
  };
}
