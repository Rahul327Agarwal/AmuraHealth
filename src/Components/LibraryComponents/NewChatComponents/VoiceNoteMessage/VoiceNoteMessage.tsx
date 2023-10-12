import React, { useEffect, useState } from 'react';
import MessageAudioPlayer from '../MessageAudioPlayer/MessageAudioPlayer';
import { getVoiceNoteFromURL } from './VoiceNoteMessage.functions';
import { IProps } from './VoiceNoteMessage.types';

export default function VoiceNoteMessage(props: IProps) {
  const { sessions, audioUrl, recordingMinutes, recordingSeconds } = props;
  const [audioBlob, setAudioBlob] = useState(null);
  useEffect(() => {
    if (audioUrl) {
      let download = async () => {
        let response: any = await getVoiceNoteFromURL(sessions, audioUrl);
        setAudioBlob(response);
      };
      download();
    }
  }, [audioUrl]);
  return (
    <div>
      <MessageAudioPlayer audioUrl={audioBlob!} recordingMinutes={recordingMinutes} recordingSeconds={recordingSeconds} />
    </div>
  );
}
