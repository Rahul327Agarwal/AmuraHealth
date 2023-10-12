import React, { memo, useCallback, useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_S3 } from '../../../../Utils';
import { FoodAndHealthProps, FoodAndHealthType } from '../ProfileManagement.types';
import InputField from './../../../LibraryComponents/InputField/InputField';
import ReadMore from './../../../LibraryComponents/ReadMore/ReadMore';
import Select from './../../../LibraryComponents/Select/Select';
import { CUISIN_OPTIONS, FOOD_RESTRICTIONS_OPTIONS, foodAndHealth } from './FoodAndHealth.functions';
import { useStyles } from './FoodAndHealth.styles';

const MemoSelect = memo(Select);
const MemoInputField = memo(InputField);

export default function FoodAndHealth(props: FoodAndHealthProps) {
  const { profileEditable, sessions, selectedClient, setHealthAndFoodState, healthAndFoodState } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [foodAndHealthError, setFoodAndHealthError] = useState<FoodAndHealthType>(foodAndHealth);
  const [cuisineOptions, setCuisineOptions] = useState([]);

  const handlefoodRestriction = useCallback((FoodRestriction: any) => {
    setHealthAndFoodState?.((pre: any) => ({ ...pre, FoodRestriction }));
  }, []);

  const handleCuisine = useCallback((Cuisine: any) => {
    setHealthAndFoodState?.((pre: any) => ({ ...pre, Cuisine }));
  }, []);

  const handleObjective = useCallback((e: any) => {
    const Objective = e.target.value;
    setHealthAndFoodState?.((pre: any) => ({ ...pre, Objective }));
  }, []);

  const getAllCuisines = async (props: any) => {
    let allCuisines = await PMS_S3.getObject(`pms-ql-cuisines/allCuisines.json`, import.meta.env.VITE_PLATFORM_BUCKET, {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    });
    return Promise.resolve(allCuisines);
  };
  useEffect(() => {
    getAllCuisines(props)
      .then((res: any) => {
        if (res) {
          const options = res?.map((data: any) => ({
            label: data.name,
            value: data.name,
          }));
          setCuisineOptions(options);
        } else {
        }
      })
      .catch((err: any) => {
        console.error('allCuisines error', err);
      });
  }, []);

  return (
    <>
      <div className={classes.container}>
        {profileEditable ? (
          <MemoSelect
            placeholder="Food Restriction"
            headerTitle="Food Restriction"
            options={FOOD_RESTRICTIONS_OPTIONS}
            setValues={handlefoodRestriction}
            values={healthAndFoodState.FoodRestriction}
            position={'bottom'}
            optionsType={'label'}
            isAutoOk
            isDivider
            drawerPadding={'20px 20px 0px 20px'}
            listAutoHeight
          />
        ) : (
          <MemoInputField label="Food Restriction" value={healthAndFoodState.FoodRestriction} disabled={true} />
        )}
        {profileEditable ? (
          <MemoSelect
            placeholder="Cuisine"
            headerTitle="Cuisine"
            options={cuisineOptions}
            setValues={handleCuisine}
            values={healthAndFoodState.Cuisine}
            position={'bottom'}
            optionsType={'checkbox'}
            disabled={!profileEditable}
            isDivider
            isSearch
            isToken
            isTokenDeletable
            renderValueAsToken
            renderValueAsTokenDeletable={profileEditable}
          />
        ) : (
          <MemoInputField label="Cuisine" value={healthAndFoodState.Cuisine.join(', ')} disabled={true} multiline maxRows={3} />
        )}
        {/* { profileEditable ?
        <MemoInputField
          label="Health Objective"
          onChange={handleObjective}
          value={healthAndFoodState.Objective}
          disabled={!profileEditable}
          multiline
          autoHeight
          maxHeight="50px"
        />:
        <MemoInputField
          label="Health Objective"
          onChange={handleObjective}
          value={healthAndFoodState.Objective}
          disabled={true}
          multiline
          autoHeight
          maxHeight="50px"
        />
      } */}
      </div>
    </>
  );
}
