import { useHeaderShown, usePanelVisibilities, usePanelsData, useSamePanelEventShown } from '../../State/Slices/DF';
import { MenuItem } from './SinglePanelNavigator.types';
import { SinglePanelViewNavigatorIcon, panelIconsMap } from './MenuIcon';
import { DefaultPanelIcon } from '../Icons/Icons';
import { useSinglePanelNavigator } from './SinglePanelNavigator.hooks';
import { useStyles } from './SinglePanelNavigator.styles';
import { useEffect } from 'react';
import { useDFEvent } from '../../Events/DFEvents';

//

//

export const SinglePanelNavigator = () => {
  const panels = usePanelsData();

  const menuNavigator = useSinglePanelNavigator();
  const [isSamePanelEventShown] = useSamePanelEventShown();

  const panelsToDisplay = panels.main;
  const panelVisibility = usePanelVisibilities();

  useEffect(() => {
    menuNavigator?.selectPrimaryMenu({ id: 'H' });
  }, []);

  const primaryMenu: MenuItem[] = (() => {
    const resArray = new Array(5).fill(undefined) as MenuItem[];

    panelsToDisplay
      // .filter((p) => p.id !== 'R')
      .forEach((item, i) => {
        const menuItem = {
          id: item.id,
          label: item.name,
          icon: panelIconsMap[item.id] ?? <DefaultPanelIcon />,
          disabled: !item.isActive,
          type: 'navigation',
        } as MenuItem;
        resArray[i] = menuItem;
      });

    // const recipe: MenuItem = {
    //   id: 'R',
    //   label: 'Recipe',
    //   icon: <RecipeIconDark inheritFill />,
    //   type: 'event',
    //   event: 'onRecipeClick',
    //   disabled: !(panelsToDisplay.find((p) => p.id === 'R')?.isActive ?? false),
    // };
    // resArray[resArray.length - 1] = recipe;

    return resArray;
  })();

  const { classes } = useStyles({
    isHeaderShown: !isSamePanelEventShown,
  });

  return (
    <div className={classes.rootContainer}>
      <div className={classes.mainContainer}>
        {primaryMenu.map((item, i) => {
          if (!item) return <div key={i} />;
          return (
            <div
              key={i}
              className={classes.iconWrapper}
              onClick={() => {
                if (item.disabled) return;

                menuNavigator.selectPrimaryMenu(item);
              }}
            >
              <SinglePanelViewNavigatorIcon disabled={item.disabled} isSelected={panelVisibility[item.id]}>
                {item.icon}
              </SinglePanelViewNavigatorIcon>
            </div>
          );
        })}
      </div>
    </div>
  );
};
