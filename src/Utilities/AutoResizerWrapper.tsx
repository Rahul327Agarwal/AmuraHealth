import React, { useEffect } from 'react';
import AutoSizerRV from 'react-virtualized-auto-sizer';
import { Align, FixedSizeList as ListRV, VariableSizeList as ListV } from 'react-window';

export const AutoSizer = (props: any) => {
  return <AutoSizerRV {...props} />;
};

export const List = (props: {
  listRef?: React.Ref<ListRV>;
  className?: string;
  width: number;
  height: number | string;
  rowHeight: number;
  rowCount: number;

  rowRenderer: ({ index, style }: { index: number; style: any }) => JSX.Element | undefined;

  /** Not used */
  tabIndex?: number;
  //? the following types were added to get rid of the errors in new register component added
  overscanCount?: number;
  overscanRowCount?: number;
  role?: any;
  data?: any[];
}) => {
  return (
    <ListRV
      className={props.className}
      height={props.height}
      itemCount={props.rowCount}
      itemSize={props.rowHeight}
      width={props.width}
    >
      {props.rowRenderer}
    </ListRV>
  );
};

export const VList = (props: {
  listRef?: React.Ref<ListV>;
  data: any[];
  className?: string;
  width: number;
  height: number;
  rowHeight: (index: number) => number;
  rowCount: number;
  rowRenderer: ({ index, style }: { index: number; style: any }) => JSX.Element | undefined;

  /** Not used */
  tabIndex?: number;
}) => {
  return (
    <ListV
      className={props.className}
      height={props.height}
      itemCount={props.rowCount}
      itemSize={props.rowHeight}
      width={props.width}
    >
      {props.rowRenderer}
    </ListV>
  );
};
