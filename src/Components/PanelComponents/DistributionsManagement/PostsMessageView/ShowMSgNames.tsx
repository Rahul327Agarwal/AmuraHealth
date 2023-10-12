import React, { useEffect, useState } from 'react';
import { IShowMSgNamesprops } from './MessageView.types';
import { useFetchUserName } from '../../../../Common/Common.hooks';

export default function ShowMSgNames(props: IShowMSgNamesprops) {
  const { userData } = props;

  const [namesData, setNamesData] = useState([]);
  const { fetchMultipleUserNamesAsString } = useFetchUserName();

  useEffect(() => {
    let response;
    if (userData?.length) {
      (async () => {
        // response = await getEsDataforUsers(userData);
        response = await fetchMultipleUserNamesAsString(userData);
        setNamesData(response || []);
      })();
    }
  }, [userData]);

  return <span>{namesData.join(', ')}</span>;
}
