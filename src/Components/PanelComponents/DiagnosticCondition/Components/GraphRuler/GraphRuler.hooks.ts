import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import { IDateRangeState } from '../../DiagnosticCondition.types';

interface IProps {
  canvas: MutableRefObject<HTMLCanvasElement>;
  localDateRange: IDateRangeState;
  setLocalDateRange: Dispatch<SetStateAction<IDateRangeState>>;
  setDateRange: Dispatch<SetStateAction<IDateRangeState>>;
  width: number;
}

export const useGraphRulerPanZoom = ({ canvas, localDateRange, setLocalDateRange, setDateRange, width }: IProps) => {
  const { viewMinDate, viewMaxDate } = localDateRange;

  const panGesture = useRef({
    startX: 0,
    prevX: 0,
    isPanning: false,
  });

  const onPanStart = (event) => {
    const { pointerId, clientX } = event;

    canvas.current.setPointerCapture(pointerId);
    panGesture.current.startX = clientX;
    panGesture.current.prevX = clientX;
    panGesture.current.isPanning = true;
    canvas.current.style.cursor = 'grabbing';
  };

  const onPanChange = (event) => {
    if (!panGesture.current.isPanning) return;

    const { clientX } = event;
    const changeX = clientX - panGesture.current.prevX;
    panGesture.current.prevX = clientX;

    const diffDate = viewMaxDate - viewMinDate;
    const diffDays = diffDate / (1000 * 60 * 60 * 24);

    const diffX = diffDays / width;
    const increment = changeX * diffX * 100000000;

    setLocalDateRange((pre) => {
      let _viewMinDate = pre.viewMinDate - increment;
      let _viewMaxDate = pre.viewMaxDate - increment;

      if (pre.tempMinDate >= _viewMinDate) {
        _viewMinDate = pre.tempMinDate;
        _viewMaxDate = pre.tempMinDate + diffDate;
      }
      if (pre.tempMaxDate <= _viewMaxDate) {
        _viewMinDate = pre.tempMaxDate - diffDate;
        _viewMaxDate = pre.tempMaxDate;
      }
      return {
        ...pre,
        viewMinDate: _viewMinDate,
        viewMaxDate: _viewMaxDate,
      };
    });
  };

  const onPanEnd = (event) => {
    if (!panGesture.current.isPanning) return;

    panGesture.current.isPanning = false;
    canvas.current.style.cursor = 'grab';

    setDateRange((pre) => ({
      ...pre,
      viewMinDate: localDateRange.viewMinDate,
      viewMaxDate: localDateRange.viewMaxDate,
    }));
  };
  return { onPanStart, onPanChange, onPanEnd };
};
