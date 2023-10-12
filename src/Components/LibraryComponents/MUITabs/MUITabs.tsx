import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EditIcon } from '../../SVGs/Common';
import { TabsStyled, TabStyled, useStyles } from './MUITabs.styles';
import { IProps } from './MUITabs.types';

const MUITabs = (props: IProps) => {
  const { tabOptions, activeTab, handleEditTab, onTabChange, customStyle, ...restProps } = props;

  const  {classes } = useStyles(props);
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab);

  useEffect(() => {
    setCurrentActiveTab(activeTab);
  }, [activeTab]);

  const handleChange = (_: any, value: any) => {
    onTabChange(value);
    setCurrentActiveTab(value);
  };

  return (
    <div className={`${classes.rootTabsContainer} ${customStyle}`}>
      <TabsStyled selectionFollowsFocus value={currentActiveTab} onChange={handleChange} variant="scrollable" scrollButtons={false}>
        {tabOptions.map((data, index) => (
          <TabStyled disableFocusRipple key={index} label={data} value={data} tabIndex={-1} />
        ))}
      </TabsStyled>
      {handleEditTab && <IconButton onClick={handleEditTab}>{<EditIcon />}</IconButton>}
    </div>
  );
};


export default MUITabs;
