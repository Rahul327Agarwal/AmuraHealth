import React, { useState, useEffect } from 'react';
import PrescriptionCard from './PrescriptionCard/PrescriptionCard';
import { IPrescriptionPageDetails } from './PrescriptionPage.types';
import { useStyles } from './PrescriptionPage.styles';
import { AmuraLoginLog } from '../../../SVGs/Common';
import { Helmet } from 'react-helmet';

export default function PrescriptionPage() {
  const [UUID, setUUID] = useState('');
  const [patientId, setPatientId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [noUUID, setNoUUID] = useState(false);
  const { classes } = useStyles();
  const [prescriptionPageDetails, setPrescriptionPageDetails] = useState<IPrescriptionPageDetails>({
    patientName: '',
    issuedOn: '2022-01-01',
    serialNumber: '',
    patientRegion: '',
    prescriptionNumber: '',
    ambroNutrition: {
      prescription: '',
      shoppingList: '',
      consumption7d: '',
      consumption90d: '',
      totalPrice: '',
      totalProducts: '',
      currency: '',
    },
    assortedBrands: {
      prescription: '',
      shoppingList: '',
      consumption7d: '',
      consumption90d: '',
      totalPrice: '',
      totalProducts: '',
      currency: '',
    },
  });
  useEffect(() => {
    const data = new URLSearchParams(window.location.search);
    if (data.get('h')) {
      setIsLoading(true);
      setUUID(data.get('h')!);
      setNoUUID(false);
    } else if (data.get('u') && data.get('p')) {
      setIsLoading(true);
      setUUID(data.get('u')!);
      setPatientId(data.get('p')!);
      setNoUUID(false);
    } else {
      setNoUUID(true);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (UUID) {
      let getDetails = async () => {
        const response = await fetch(
          patientId
            ? `${import.meta.env.VITE_GET_PRESCRIPTION_INFO}${patientId}/${UUID}`
            : `${import.meta.env.VITE_GET_PRESCRIPTION_INFO_BY_HEX}${UUID}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        try {
          const data = await response.json();
          if (data?.Status === 'Failure') {
            throw new Error('Error');
          }
          setPrescriptionPageDetails(data);
        } catch (e) {
          setNoUUID(true);
        } finally {
          setIsLoading(false);
        }
      };
      getDetails();
    }
  }, [UUID]);
  return (
    <div className={classes.main}>
      <div className={classes.logo}>
        <span>{<AmuraLoginLog />}</span>
      </div>
      {isLoading && !noUUID && <div>Loading...</div>}
      {!isLoading && noUUID && <div>{'This link seems to be incorrect...'}</div>}
      {!isLoading && !noUUID && (
        <>
          <div>
            <div className={classes.patientDiv}>
              <span className={classes.patientName}>
                {prescriptionPageDetails.patientName ? `${prescriptionPageDetails.patientName}'s Prescriptions` : `Amura PMS`}
              </span>
            </div>
            <div className={classes.issuedOnDiv}>
              <div>
                <span className={classes.issuedOn}>
                  {`Issued on ${new Date(Number(prescriptionPageDetails.issuedOn))
                    .toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                    .replace(/ /g, ' ')}`}
                </span>
              </div>
              <div>
                <span className={classes.serialNumber}>{prescriptionPageDetails.prescriptionNumber}</span>
              </div>
            </div>
          </div>
          <div className={classes.linksDiv}>
            {prescriptionPageDetails.ambroNutrition && (
              <>
                {' '}
                <PrescriptionCard
                  patientName={prescriptionPageDetails.patientName}
                  title={'Alternative 1: Amura Nutrition'}
                  subTitle={'Optimized for lower cost'}
                  advantages={
                    'One-click shopping, optimized formulations, lower cost, quality controlled by Amura.' // Plus, all patients get a 20% special discount."
                  }
                  links={[
                    {
                      link: `${prescriptionPageDetails.ambroNutrition.prescription}`,
                      title: 'Prescription',
                      subTitle: `${prescriptionPageDetails.ambroNutrition.totalProducts} products`,
                      downloadTitle: 'prescription',
                    },
                    {
                      link: `${prescriptionPageDetails.ambroNutrition.shoppingList}`,
                      title: 'Shopping list',
                      subTitle:
                        prescriptionPageDetails.patientRegion === 'IND'
                          ? `${prescriptionPageDetails.ambroNutrition.currency} ${prescriptionPageDetails.ambroNutrition.totalPrice} for 3 months`
                          : `For 3 months`,
                      downloadTitle: 'shopping-list',
                    },
                    {
                      link: `${prescriptionPageDetails.ambroNutrition.consumption7d}`,
                      title: 'Consumption Chart - 7d',
                      subTitle: `Tells you what you should consume with every meal`,
                      downloadTitle: 'consumption-chat-7d',
                    },
                    {
                      link: `${prescriptionPageDetails.ambroNutrition.consumption90d}`,
                      title: 'Consumption Chart - 90d',
                      subTitle: `Tells you what you should consume with every meal`,
                      downloadTitle: 'consumption-chat-90d',
                    },
                  ]}
                />
                <PrescriptionCard
                  patientName={prescriptionPageDetails.patientName}
                  title={'Alternative 2: Assorted Brands'}
                  subTitle={`Optimized for lower cost in ${prescriptionPageDetails.patientRegion}`}
                  advantages={'Widely available, established brands, you can order in installments'}
                  links={[
                    {
                      link: `${prescriptionPageDetails.assortedBrands.prescription}`,
                      title: 'Prescription',
                      subTitle: `${prescriptionPageDetails.assortedBrands.totalProducts} products`,
                      downloadTitle: 'prescription',
                    },
                    {
                      link: `${prescriptionPageDetails.assortedBrands.shoppingList}`,
                      title: 'Shopping list',
                      subTitle:
                        prescriptionPageDetails.patientRegion === 'IND'
                          ? `${prescriptionPageDetails.assortedBrands.currency} ${prescriptionPageDetails.assortedBrands.totalPrice} for 3 months`
                          : `For 3 months`,
                      downloadTitle: 'shopping-list',
                    },
                    {
                      link: `${prescriptionPageDetails.assortedBrands.consumption7d}`,
                      title: 'Consumption Chart - 7d',
                      subTitle: `Tells you what you should consume with every meal`,
                      downloadTitle: 'consumption-chat-7d',
                    },
                    {
                      link: `${prescriptionPageDetails.assortedBrands.consumption90d}`,
                      title: 'Consumption Chart - 90d',
                      subTitle: `Tells you what you should consume with every meal`,
                      downloadTitle: 'consumption-chat-90d',
                    },
                  ]}
                />
              </>
            )}{' '}
            {!prescriptionPageDetails.ambroNutrition && (
              <PrescriptionCard
                patientName={prescriptionPageDetails.patientName}
                title={`Optimized for lower cost in ${prescriptionPageDetails.patientRegion}`}
                subTitle={''}
                advantages={''}
                links={[
                  {
                    link: `${prescriptionPageDetails.assortedBrands.prescription}`,
                    title: 'Prescription',
                    subTitle: `${prescriptionPageDetails.assortedBrands.totalProducts} products`,
                    downloadTitle: 'prescription',
                  },
                  {
                    link: `${prescriptionPageDetails.assortedBrands.shoppingList}`,
                    title: 'Shopping list',
                    subTitle:
                      prescriptionPageDetails.patientRegion === 'IND'
                        ? `${prescriptionPageDetails.assortedBrands.totalPrice} for 3 months`
                        : `For 3 months`,
                    downloadTitle: 'shopping-list',
                  },
                  {
                    link: `${prescriptionPageDetails.assortedBrands.consumption7d}`,
                    title: 'Consumption Chart - 7d',
                    subTitle: `Tells you what you should consume with every meal`,
                    downloadTitle: 'consumption-chat-7d',
                  },
                  {
                    link: `${prescriptionPageDetails.assortedBrands.consumption90d}`,
                    title: 'Consumption Chart - 90d',
                    subTitle: `Tells you what you should consume with every meal`,
                    downloadTitle: 'consumption-chat-90d',
                  },
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
