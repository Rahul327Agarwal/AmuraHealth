import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../DisplayFramework/State/store';
import { getEsDataforUsersArray, getUserNameFromES } from './Common.functions';
import { setUsernames } from '../DisplayFramework/State/Slices/CacheSlice';

// TODO: if we call multiple fetch functions one after another or at the same time, the loading state can be wonky... have to addresss that

export const useFetchUserName = () => {
  const { userNames } = useSelector((state: IRootState) => state.cache);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const fetchUserName = async (id: string) => {
    let name = userNames[id] || '';
    if (!name) {
      try {
        setIsLoading(true);
        let fullNameString = await getUserNameFromES(id);
        if (fullNameString) {
          dispatch(setUsernames({ [id]: fullNameString }));
          name = fullNameString;
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    return name || id;
  };
  const fetchMultipleUserNames = async (ids: string[]) => {
    const userNamesNotFound: string[] = [];
    const userNamesFoundObject: { [id: string]: string } = {};
    let newelyFetchedUserNames: { [id: string]: string } = {};
    let failsUserNames: { [id: string]: string } = {};
    let users = [];
    if (ids?.length > 0) {
      setIsLoading(true);
      try {
        ids.forEach((id) => {
          let name = userNames[id];
          const alreadyAddedForFetch = failsUserNames[id] !== undefined;
          const isValid = id !== 'SYSTEM' && id.trim() !== '';
          if (!name && !alreadyAddedForFetch && isValid) {
            userNamesNotFound.push(id);
            users.push({ match: { _id: id } });
            failsUserNames[id] = id;
          } else {
            userNamesFoundObject[id] = name;
          }
        });

        if (userNamesNotFound.length > 0) {
          const userNameObject = await getEsDataforUsersArray(users);
          if (userNameObject) {
            dispatch(setUsernames(userNameObject));
            newelyFetchedUserNames = userNameObject;
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        newelyFetchedUserNames = failsUserNames;
        setIsLoading(false);
      }
    }
    return { ...userNamesFoundObject, ...newelyFetchedUserNames };
  };
  const fetchMultipleUserNamesAsString = async (ids: string[]) => {
    const userNamesNotFound: string[] = [];
    const userNamesFoundObject: string[] = [];
    let newelyFetchedUserNames: string[] = [];
    let failsUserNames: string[] = [];
    let users = [];
    if (ids?.length > 0) {
      setIsLoading(true);
      try {
        ids.forEach((id) => {
          let name = userNames[id] || '';
          if (!name) {
            userNamesNotFound.push(id);
            users.push({ match: { _id: id } });
            failsUserNames.push(id);
          } else {
            userNamesFoundObject.push(name);
          }
        });

        if (userNamesNotFound.length > 0) {
          const userNameObject = await getEsDataforUsersArray(users);
          if (userNameObject) {
            dispatch(setUsernames(userNameObject));
            newelyFetchedUserNames = Object.values(userNameObject);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        newelyFetchedUserNames = failsUserNames;
        setIsLoading(false);
      }
    }
    return [...userNamesFoundObject, ...newelyFetchedUserNames];
  };

  return {
    isLoading,
    error,
    fetchUserName,
    fetchMultipleUserNames,
    fetchMultipleUserNamesAsString,
  };
};
