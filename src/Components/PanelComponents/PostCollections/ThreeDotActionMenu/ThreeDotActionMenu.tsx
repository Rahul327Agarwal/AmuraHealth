import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import Checkbox from './../../../LibraryComponents/MUICheckbox/MUICheckbox';
import { useStyles } from './ThreeDotActionMenu.styles';
import { ThreeDotActionMenuOption, ThreeDotActionMenuProps, menuTypes } from './ThreeDotActionMenu.types';

const ThreeDotActionMenu = (props: ThreeDotActionMenuProps) => {
  const { options, handleOnClick, checkedKeys } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [checked, setChecked] = useState<any>([]);

  useEffect(() => {
    if (checkedKeys.length) {
      setChecked(checkedKeys);
    }
  }, [checkedKeys]);

  const handleClick = (value: string, type: menuTypes) => {
    switch (type) {
      case 'checkbox':
        setChecked((pre: any) => {
          let selected = [];
          let newPre = JSON.parse(JSON.stringify(pre));
          const index = pre.indexOf(value);
          if (index === -1) {
            selected = [...pre, value];
          } else {
            newPre.splice(index, 1);
            selected = [...newPre];
          }
          handleOnClick({ selected, type });
          return selected;
        });
        return;
      case 'label':
        handleOnClick({ selected: value, type });
        return;
    }
  };

  const renderMenuLists = (listOptions: Array<ThreeDotActionMenuOption>, preIndex = 0) => {
    return listOptions?.map((data, index) => (
      <div key={data.title + index} className={`${classes.menuStyle} LEVEL-${preIndex}`}>
        <div
          className={`${classes.titleBox} ${data.disable || data?.subMenu ? 'disabled' : 'clickable'}`}
          onClick={() => handleClick(data.value, data.type)}
        >
          <span className={`${commonClasses.body15Regular} ${classes.titleStyle}`}>{data.title}</span>
          {data.type === 'checkbox' && <Checkbox checked={checked.indexOf(data.value) > -1} />}
        </div>
        {renderMenuLists(data.subMenu, index + 1)}
      </div>
    ));
  };

  return <div className={classes.menuContainer}>{renderMenuLists(options)}</div>;
};

export default ThreeDotActionMenu;
