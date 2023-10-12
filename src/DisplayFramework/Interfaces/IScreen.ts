export type IScreen = {
  name: string;
  t2bOrder: number;
  displayOrder: number;
  r2lOrder: number;
  maxColWidth: number;
  minColWidth: number;
  minRowHeight: number;
  maxRowHeight: number;
  unitPixel:number;
  gutter:number;
  width: number;
  height: number;
  isActive: boolean;
  startWith: string,
  parameters: any,
  session?: any,
  selectedClient?: any,
  minimizedState?: {
    type?: "button" | "bar";
    position?: "BL" | "BR" | "TOP";
    primary: string;
    secondary?: string;
    color?: string;
    isMinimized: boolean;
    event: string;
  }
}