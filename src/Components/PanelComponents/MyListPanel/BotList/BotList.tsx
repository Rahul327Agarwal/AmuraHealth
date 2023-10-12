import React, { useEffect, useMemo, useState } from 'react';

import { useStyles } from './Botlist.styles';

import { configurationCardData, getBotListFromDB } from './BotList.function';

import { myListOptions, myListOptionsType } from '../../../../Common/Common.functions';
import { IBotCard } from './BotList.types';

import { AutoSizer, List } from '../../../../Utilities/AutoResizerWrapper';
import ConfigurationCard from '../../../LibraryComponents/ConfigurationCard/ConfigurationCard';
import { ArrowDown, RefreshIcon } from '../../../SVGs/Common';
const MIN_SEARCH_CHAR = 3;

export default function BotList(props: IBotCard) {
  const { childEventTrigger, registerEvent, patientId, unRegisterEvent, AutoSizerHeight, selectedClient } = props;
  const { classes } = useStyles();

  const [filterSelected, setFilterSelected] = useState<myListOptionsType>('configuration');
  const [searchString, setSearchString] = useState('');
  const [configurationCard, setConfigurationCard] = useState(configurationCardData);
  const [selectedId, setSelectedId] = React.useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const searchedList = useMemo(() => {
    if (searchString.length >= MIN_SEARCH_CHAR) {
      const value = searchString.toLowerCase();
      const cardDetails = configurationCard.filter((item) => {
        if (item.tableName) return item.tableName.toLowerCase().includes(value);
        return true;
      });
      return cardDetails;
    } else {
      return configurationCard;
    }
  }, [configurationCard, searchString]);

  let botListSubscription: any;

  useEffect(() => {
    getBotListFromDB(props, setConfigurationCard);
    botListSubscription = registerEvent(patientId, 'allTables.json', () => {
      getBotListFromDB(props, setConfigurationCard);
    });
    return () => {
      if (botListSubscription) unRegisterEvent(botListSubscription);
    };
  }, []);

  const handleCardClick = (data, index) => {
    if (selectedId === index) return;
    setSelectedId(index);
    childEventTrigger('MyList', 'MyList', 'onBotSelect', {
      patientId: data?.tableName,
      clientData: {
        client_id: data?.tableName,
        client_name: data?.tableName,
        LastName: '',
      },
      type: 'bot',
      botData: data,
    });
  };

  useEffect(() => {
    if (!Object.keys(selectedClient).length) {
      setSelectedId(-1);
    }
  }, [selectedClient]);

  const selectedValue = useMemo(() => myListOptions?.find((v) => v.value === filterSelected), [filterSelected]);
  const renderButton = (
    <div className={classes.renderButtonWrapper}>
      <span>{selectedValue.icon}</span>
      <span>{selectedValue.label}</span>
      <span className={classes.reSize}>
        <ArrowDown />
      </span>
    </div>
  );
  const headerActionOptions = useMemo(
    () => [
      {
        id: 'refresh',
        icon: (
          <span className={`${classes.refreshIcon} ${isLoading ? classes.animate : ''}`}>
            <RefreshIcon />
          </span>
        ),
        onClick: () => {
          if (!isLoading) {
            handleRefresh();
          }
        },
      },
    ],
    [isLoading]
  );

  const handleRefresh = async () => {
    setIsLoading(true);
    await getBotListFromDB(props, setConfigurationCard);
    setIsLoading(false);
  };

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.nameChardWrapper}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <AutoSizer style={{ height: '100%', width: '100%' }} data-header-hidable>
          {({ width, height }) => (
            <List
              data={searchedList}
              className={classes.listStyle}
              width={width}
              height={height}
              rowHeight={114}
              rowCount={searchedList.length}
              rowRenderer={({ index, style }) => {
                const currentCardData = searchedList[index];
                return (
                  <div
                    key={index}
                    style={{ ...style, transition: 'all 0.4s ease-in-out 0s' }}
                    onClick={() => {
                      handleCardClick(currentCardData, index);
                    }}
                  >
                    <ConfigurationCard
                      cardTitle={currentCardData?.tableName}
                      cardCaption={''}
                      recordTitle={''}
                      time={currentCardData?.time}
                      selected={selectedId == index}
                      acronym={currentCardData?.acronym}
                    />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
