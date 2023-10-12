import { useEffect, useState } from 'react';
import { DragIcon } from './DragArea.svg';
import { handleMouseLeave, handleMouseMove, handleMouseOver, onMouseMoveWrapper } from './Windash.function';
import { useStyles } from './Windash.styles';
import { DragAreaProps } from './Windash.types';

export default function DragArea(props: DragAreaProps) {
  const { setComponentsHeight, dragRef, dragName, lower, screen } = props;
  const { classes } = useStyles(props);
  const [upper, setUpper] = useState('');
  const COMPONENT_ORDER = [
    'people',
    'events',
    'postCollections',
    'postmanagement',
    'configuration',
    'Polls',
    'KnowledgeBase',
    'Questionnaire',
    'LMS',
  ];

  useEffect(() => {
    let index = COMPONENT_ORDER.indexOf(lower);
    let temp_upper = '';
    for (let i = index - 1; i >= 0; i--) {
      if (screen.includes(COMPONENT_ORDER[i])) {
        temp_upper = COMPONENT_ORDER[i];
        break;
      }
    }
    setUpper(temp_upper);
  }, [screen]);

  return (
    <>
      {upper !== '' && (
        <div
          id={'divider'}
          className={classes.drag}
          onMouseDown={(e) => {
            onMouseMoveWrapper(e, upper, lower, setComponentsHeight);
            dragRef.current.style.cursor = 'grabbing';
          }}
          onMouseUp={(e) => {
            dragRef.current.style.cursor = 'grab';
          }}
          onMouseEnter={(e) => {
            handleMouseOver(dragRef);
          }}
          onMouseLeave={(e) => {
            handleMouseLeave(dragRef);
          }}
          onMouseMove={(e) => {
            handleMouseMove(dragRef, e);
          }}
        >
          {
            <span ref={dragRef} className={`${classes.dragIcon} ${dragName}`}>
              <DragIcon />
            </span>
          }
        </div>
      )}
    </>
  );
}
