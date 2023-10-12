import { useCallback, useEffect, useMemo, useState } from 'react';
import { IPanelData } from '../Components/Panel/Panel.types';
import { useSetPanelsData } from '../State/Slices/DF';
import { getGridMatrix, loadPanelConfiguration } from './DFCore.functions';
import { IGridConfig, IPanelConfig, IPanelGrid, IPanelId } from './DFCore.types';

import { getFixedMaxWidgetWidth } from '../DisplayFramework.functions';
import { usePanelContainerInfo } from '../DisplayFramework.hooks';

/**
 * Load Panel Grid Configuration
 */
export const usePanelGridConfiguration = () => {
  const [config, setConfig] = useState<IGridConfig>();

  const loadConfig = useCallback(async () => {
    const config = await loadPanelConfiguration();
    setConfig(config);
  }, []);

  useEffect(() => {
    loadConfig();
  }, []);

  return config;
};

/**
 * Intial Panel Data, Grid Matrix
 * Can use BE, therefore use `loading` to wait for data
 *
 */
export const useInitialPanelData = () => {
  const config = usePanelGridConfiguration();
  const setData = useSetPanelsData();

  const [alreadySetInitData, setAlreadySetInitData] = useState(false);

  useEffect(() => {
    if (!config) return;
    if (alreadySetInitData) return;
    const sortedGridConfig = getGridMatrix(config);

    const panelData: IPanelGrid = {};
    Object.keys(sortedGridConfig).forEach((key) => {
      const row = sortedGridConfig[key] as IPanelConfig[];
      panelData[key] = row.map((config) => {
        return {
          id: config.panelId,
          name: config.panelName,
          initialPanelConfig: { ...config },
          panelConfig: { ...config },
          row: key as any,
          isActive: false,
          isStatic: config.static,
          panelComponentData: [],
        } satisfies IPanelData;
      });
    });

    setData(panelData);
    setAlreadySetInitData(true);
  }, [config, alreadySetInitData]);

  return {
    loading: !config || !alreadySetInitData,
  };
};

//
//
//

/**
 *
 */
// const useUpdatePanelGridConfig = () => {
//   const setPanelsData = useSetPanelsData();
//   const panelContainer = usePanelContainerInfo();

//   const updateGridConfig = (id: IPanelId, gridConfig: Partial<IPanelConfig>) => {
//     setPanelsData((prevPanelsData) => {
//       return prevPanelsData.map((prevPanelData) => {
//         if (prevPanelData.id === id) {
//           return {
//             ...prevPanelData,
//             panelConfig: {
//               ...prevPanelData.panelConfig,
//               ...gridConfig,
//             },
//           };
//         }
//         return prevPanelData;
//       });
//     });
//   };

//   // TEMP: WIP Optimise this
//   const updateResizedWidth = (id: IPanelId, maxW?: number, resizedSnapSize?: number) => {
//     setPanelsData((prevPanelsData) => {
//       let newData = [];

//       //

//       for (let i = 0; i < prevPanelsData.length; i++) {
//         const prevPanelData = prevPanelsData[i];

//         //
//         const row = panelContainer.rowPanelIds.find((e) => e.includes(id))!;

//         const panelPos = row.indexOf(id);
//         const currentPanelPos = row.indexOf(prevPanelData.id);

//         const currentPanelResize = prevPanelData.panelConfig.resizedSnapSize ?? 1;

//         const allPanelSizes = row.map((e) => {
//           const panel = prevPanelsData.find((p) => p.id === e)!;
//           return panel.panelConfig.resizedSnapSize ?? 1;
//         });

//         const sizeTillCurrentPanel = allPanelSizes.slice(0, currentPanelPos).reduce((a, b) => a + b, 0);

//         const sizeTillPanel = allPanelSizes.slice(0, panelPos).reduce((a, b) => a + b, 0);

//         //

//         if (prevPanelData.initialPanelConfig.MaxW !== 'User') {
//           newData.push(prevPanelData);
//           continue;
//         }

//         //

//         const canResize = sizeTillPanel + resizedSnapSize <= panelContainer.numOfPanelsCanFit;

//         //

//         if (prevPanelData.id !== id) {
//           if (currentPanelResize <= 1) {
//             newData.push(prevPanelData);
//             continue;
//           }

//           // can shrink

//           const shouldShrink = true;
//           const newResize = 1;

//           if (!shouldShrink) {
//             newData.push(prevPanelData);
//             continue;
//           }

//           const newPanelData = {
//             ...prevPanelData,
//             gridConfig: {
//               ...prevPanelData.panelConfig,
//               MaxW: prevPanelData.initialPanelConfig.MaxW,
//               resizedSnapSize: newResize,
//             },
//           };
//           newData.push(newPanelData);
//           continue;
//         }

//         if (!canResize) {
//           newData.push(prevPanelData);
//           continue;
//         }

//         const newPanelData = {
//           ...prevPanelData,
//           gridConfig: {
//             ...prevPanelData.panelConfig,
//             MaxW: maxW ?? prevPanelData.initialPanelConfig.MaxW,
//             resizedSnapSize: resizedSnapSize,
//           },
//         };

//         newData.push(newPanelData);
//       }

//       //

//       //

//       return newData;
//       // return prevPanelsData.map((prevPanelData) => {
//       //   //
//       //   if (prevPanelData.id !== id) return prevPanelData;

//       //   if (prevPanelData.initialGridConfig.MaxW !== "User")
//       //     return prevPanelData;

//       //   return {
//       //     ...prevPanelData,
//       //     gridConfig: {
//       //       ...prevPanelData.gridConfig,
//       //       MaxW: maxW ?? prevPanelData.initialGridConfig.MaxW,
//       //       resizedSnapSize: resizedSnapSize,
//       //     },
//       //   };

//       //   //
//       // });
//     });
//   };

//   return { updateGridConfig, updateResizedWidth };
// };

//
//
//

/**
 * Main Hook for Display Framework API
 */
// export const useDisplayFramework = () => {
//   // const { updateResizedWidth } = useUpdatePanelGridConfig();

//   /**
//    * Resizes Panel to given Snap Size (1-5)
//    * @param id Panel Id
//    * @param snapSize Snap Size (1-5) (eg. 2 => 2 * MinWidgetWidth)
//    */
//   function resizePanel(id: IPanelId, snapSize: number) {
//     // let newWidth = snapSize * getFixedMaxWidgetWidth();
//     // //add Spacing
//     // newWidth += snapSize * 8 - 8;
//     // updateResizedWidth(id, newWidth, snapSize);
//   }

//   return {
//     resizePanel,
//   };
// };
