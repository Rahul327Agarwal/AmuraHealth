import React, { useEffect, useState } from 'react';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import { getVoiceNoteFromURL } from './VoiceNoteMessage.functions';
import { IProps } from './VoiceNoteMessage.types';

export default function VoiceNoteMessage(props: IProps) {
  const { audioUrl, recordingMinutes, recordingSeconds, messageId } = props;
  const sessions = useUserSession();
  const [audioBlob, setAudioBlob] = useState<any>(null);
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
    <AudioPlayer
      audioUrl={audioBlob}
      recordingMinutes={recordingMinutes}
      recordingSeconds={recordingSeconds}
      voiceNote
      messageId={messageId}
    />
  );
}
