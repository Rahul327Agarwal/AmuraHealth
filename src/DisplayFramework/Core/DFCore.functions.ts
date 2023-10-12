import gridConfig from './../Configuration/GridConfiguration.json';
import { IGridConfig } from './DFCore.types';

/**
 * Load Panel Grid Configuration
 * (Can fetch from API or local file)
 */
export const loadPanelConfiguration = async () => {
  return gridConfig as IGridConfig;
};

export const getGridMatrix = (gridConfig: IGridConfig): IGridConfig => {
  let matrix: IGridConfig = JSON.parse(JSON.stringify(gridConfig));

  Object.keys(gridConfig).forEach((key) => {
    const row = gridConfig[key];
    const sortedRow = [
      ...row.filter((item) => item.L2R >= 0).sort((a, b) => a.L2R - b.L2R),
      ...row.filter((item) => item.L2R < 0).sort((a, b) => b.L2R - a.L2R),
    ];
    matrix[key] = sortedRow;
  });

  return matrix;
};
