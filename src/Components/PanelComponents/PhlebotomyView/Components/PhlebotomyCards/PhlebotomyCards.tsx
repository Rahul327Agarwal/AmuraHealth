import React, { useState } from 'react';
import { packagesData } from './PhlebotomyCards.function';
import { useStyles } from './PhlebotomyCards.styles';
import { IProps } from './PhlebotomyCards.types';
import PanelHeader from '../../../../LibraryComponents/PanelHeaderForWhite/PanelHeaderForWhite';
import { ForwardArrow, MyListDownArrow, SearchIcon } from '../../PhlebotomyView.svg';

export default function PhlebotomyCards(props: IProps) {
  const { childEventTrigger } = props;
  const { classes } = useStyles();
  const [packages, setPackages] = useState(packagesData);
  const [openListSelect, setOpenListSelect] = React.useState(false);
  const handleViewPackage = (data: any) => {
    childEventTrigger(null, null, 'onPhleboCardSelect', {
      patientId: '',
      clientData: {
        ID: ' ',
        FirstName: '',
        LastName: '',
      },
    });
  };

  return (
    <div className={classes.mainConatainer}>
      {/* TODO: <TopSheet
        isOpen={openListSelect}
        children={
          <MultiOptionsSwitch
            selectedName={activeMylist}
            setSelectedName={(value) => {
              dispatch(setActiveMyList(value));
            }}
            panel={panel}
            childEventTrigger={childEventTrigger}
          />
        }
        handleClose={() => {
          setOpenListSelect(false);
        }}
      /> */}

      <PanelHeader
        title={'Store'}
        besideHeader={
          <span
            className={classes.cursor}
            onClick={() => {
              setOpenListSelect(!openListSelect);
            }}
          >
            {<MyListDownArrow />}
          </span>
        }
        iconTray={
          <div className={classes.displayFlex}>
            <span className={classes.cursor}>{<SearchIcon />}</span>
          </div>
        }
      />
      <div className={classes.body}>
        {packages?.map((data) => {
          return (
            <div className={classes.eachPackageCon} key={data?.id}>
              <div className={classes.imgCon}>
                <img src={data?.url} className={classes.imgstyle} />
              </div>
              <div className={classes.packageDetails}>
                <span className={classes.packageName}>{data?.title}</span>
                <span className={classes.packageTestname}>{data?.testNames}</span>
              </div>
              <p className={classes.message}>{data?.message?.join(', ')}</p>
              <p className={classes.subMessage}>{data?.programs?.join(', ')}</p>
              <div className={classes.fixedFooter}>
                <span className={classes.price}>{`$${data?.price}/-`}</span>
                <div className={classes.buttonItemsCon} onClick={handleViewPackage}>
                  <span className={classes.discription2}>View Package</span>
                  <span className={classes.iconContainer2}>{<ForwardArrow />}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
