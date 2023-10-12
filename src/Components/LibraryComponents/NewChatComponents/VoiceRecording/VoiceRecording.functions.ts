import { SetRecorder } from './VoiceRecording.types';

export async function startRecording(setRecorderState: SetRecorder) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    console.error(err);
  }
}

export function saveRecording(recorder: any) {
  if (recorder.state !== 'inactive') recorder.stop();
}

export function formatMinutes(minutes: number) {
  return minutes < 10 ? `0${minutes}` : `${minutes}`;
}

export function formatSeconds(seconds: number) {
  return seconds < 10 ? `0${seconds}` : `${seconds}`;
}

export function getTimeCodeFromNum(num: string) {
  let seconds = parseInt(num);
  let minutes = Math.trunc(seconds / 60);
  seconds -= minutes * 60;
  const hours = Math.trunc(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  return `${String(hours).padStart(2, '0')}:${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}
