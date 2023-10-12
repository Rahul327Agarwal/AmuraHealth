import { useEffect, useMemo, useState } from 'react';
import { PRIVACY } from './RoleAndTenant.functions';
import { ICardData, ICheckedCard, IPrivayCard, TPrivacy } from './RoleAndTenant.types';

export const useCardCheckbox = (
  cardData: ICardData[],
  setSelectedRoleCards: React.Dispatch<React.SetStateAction<ICheckedCard>>,
  selectedRoleCards: ICheckedCard
) => {
  // const [checkedCards, setCheckedCards] = useState<ICheckedCard>({});

  const isAllChecked = useMemo(() => {
    let allSelected = true;
    for (let index = 0; index < cardData.length; index++) {
      const d1: ICardData = cardData[index];
      const d2: string[] = selectedRoleCards[d1?.tenantId] || [];
      const cardArray = Object.keys(d1.roleIds || {});
      if (cardArray.length && cardArray.length !== d2?.length) {
        allSelected = false;
        break;
      }
    }
    return allSelected;
  }, [cardData, selectedRoleCards]);

  const onCheckedAllCards = (value: boolean) => {
    let selected = {};
    if (value) {
      cardData.forEach((data) => {
        selected[data.tenantId] = data.roleIds || [];
      });
    }
    // setCheckedCards(JSON.parse(JSON.stringify(selected)));
    setSelectedRoleCards(JSON.parse(JSON.stringify(selected)));
  };

  const onCheckedAllTenantCards = (data: ICardData, selectAll: boolean) => {
    const { roleIds, tenantId } = data || {};
    let preClone = JSON.parse(JSON.stringify(selectedRoleCards));
    let selectAllObject = [];
    if (selectAll) {
      selectAllObject = roleIds;
    }
    // setCheckedCards({ ...preClone, [tenantId]: selectAllObject });
    setSelectedRoleCards({ ...preClone, [tenantId]: selectAllObject });
  };

  const onCheckedCard = (currStaff: string, currTenant: string) => {
    let preClone = JSON.parse(JSON.stringify(selectedRoleCards));
    let preValue = preClone[currTenant] || [];
    const index = preValue.indexOf(currStaff);
    if (index !== -1) {
      preValue.splice(index, 1);
    } else {
      preValue = [...preValue, currStaff];
    }
    // setCheckedCards({ ...preClone, [currTenant]: preValue });
    setSelectedRoleCards({ ...preClone, [currTenant]: preValue });
  };

  return {
    checkedCards: selectedRoleCards,
    isAllChecked,
    onCheckedAllCards,
    onCheckedAllTenantCards,
    onCheckedCard,
  };
};

export const useCardPrivacy = (cardData: ICardData[]) => {
  const [privacyCards, setPrivacyCards] = useState<IPrivayCard>({});

  useEffect(() => {
    if (cardData) {
      const privacyObject = {};
      cardData.forEach((data) => {
        const curPrivacy = data.roleIds.map(() => PRIVACY.Public);
        privacyObject[data.tenantId] = curPrivacy;
      });
      setPrivacyCards(JSON.parse(JSON.stringify(privacyObject)));
    }
  }, [cardData]);

  const { tenantPrivacyObject, allPrivacy } = useMemo(() => {
    const tenantPrivacyObject = {};
    const tenantPrivacyArray = [];
    for (const key in privacyCards) {
      if (!Object.prototype.hasOwnProperty.call(privacyCards, key)) continue;
      const currPrivacy = privacyCards[key] || [];
      const isAllSame = currPrivacy.every((data) => data === currPrivacy[0]);
      const tenantPrivacy = currPrivacy.length && isAllSame ? currPrivacy[0] : PRIVACY.Default;
      tenantPrivacyObject[key] = tenantPrivacy;
      tenantPrivacyArray.push(tenantPrivacy);
    }
    const isAllTenantSame = tenantPrivacyArray.every((data) => data !== PRIVACY.Default && data === tenantPrivacyArray[0]);
    const allPrivacy = isAllTenantSame ? tenantPrivacyArray[0] : PRIVACY.Default;
    return { tenantPrivacyObject, allPrivacy };
  }, [privacyCards]);

  const onPrivacyChange = (value: TPrivacy, key: string, tenantIndex: number, index: number) => {
    setPrivacyCards((pre) => {
      let currdata: TPrivacy[] = privacyCards[key] || [];
      if (currdata[index]) {
        currdata[index] = value;
      } else {
        const updateData = cardData[tenantIndex]?.roleIds?.map((_, i: number) => {
          if (i === index) return value;
          return PRIVACY.Public;
        });
        currdata = updateData || [];
      }
      const copyObject = { ...pre, [key]: currdata };
      return JSON.parse(JSON.stringify(copyObject));
    });
  };

  const onTenantPrivacyChange = (value: TPrivacy, key: string, tenantIndex: number) => {
    setPrivacyCards((pre) => {
      let currdata: TPrivacy[] = cardData[tenantIndex]?.roleIds?.map((_) => value);
      const copyObject = { ...pre, [key]: currdata };
      return JSON.parse(JSON.stringify(copyObject));
    });
  };

  const onAllPrivacyChange = (value: TPrivacy) => {
    const privacyObject = {};
    cardData.forEach((data) => {
      const curPrivacy = data.roleIds.map(() => value);
      privacyObject[data.tenantId] = curPrivacy;
    });
    setPrivacyCards(JSON.parse(JSON.stringify(privacyObject)));
  };

  return {
    allPrivacy,
    tenantPrivacyObject,
    privacyCards,
    onPrivacyChange,
    onTenantPrivacyChange,
    onAllPrivacyChange,
  };
};
