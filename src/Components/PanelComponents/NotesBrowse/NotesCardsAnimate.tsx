import { AnimatePresence, motion } from 'framer-motion';
import NoteHistory from './History/NoteHistory';
import { memo } from 'react';
import { cardData } from './NotesBrowse.types';

interface IProps {
  sessions: any;
  notesdata: cardData[];
  userNames: {};
  handleOnCardClick: (Cardkey: any) => void;
  handleDeactivate: (e: any, cardData: any) => void;
  selectedCard: string[];
  handleNoteEdit: (data: any) => void;
}

const NotesCardsAnimate = ({
  sessions,
  notesdata,
  userNames,
  handleOnCardClick,
  handleDeactivate,
  selectedCard,
  handleNoteEdit,
}: IProps) => {
  return (
    <AnimatePresence initial={false}>
      {notesdata.length > 0 &&
        Object.keys(userNames).length > 0 &&
        notesdata?.map((ele) => (
          <motion.div
            key={ele.sort_key}
            layout={'preserve-aspect'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // style={{background:"red",padding:"20px",marginBottom:"10px"}}
          >
            <NoteHistory
              mainCardData={ele}
              handleOnCardClick={handleOnCardClick}
              handleDeactivate={handleDeactivate}
              parentprop={{ sessions }}
              selectedCard={selectedCard}
              mainCardUser={userNames[ele.updatedBy]}
              handleNoteEdit={handleNoteEdit}
            />
          </motion.div>
        ))}
    </AnimatePresence>
  );
};

export default memo(NotesCardsAnimate);
