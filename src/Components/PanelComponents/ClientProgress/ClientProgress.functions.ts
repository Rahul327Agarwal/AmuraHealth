import { IEmptyChartData } from './ClientProgress.types';

export const setGraphValues = (dates: any[], data: { Values: any; Unit: string }, dyastoleData: any) => {
  let emptyObject: IEmptyChartData = {
    labels: [],
    units: '',
    datasets: [] as any,
  } as IEmptyChartData;

  const object = {
    type: 'line',
    label: 'Weight',
    borderColor: '#252427',
    borderWidth: 4,
    fill: false,
    pointRadius: 0.75,
    pointHoverRadius: 2,
    pointHoverBackgroundColor: '#E1E1E1',
    pointHoverColor: '#252427',
    tension: 0.1,
    data: data?.Values?.map((item: any) => (item && !isNaN(item) && Number(item) !== 0 ? item : null)) || [],
  };
  emptyObject.labels = dates;
  if (dyastoleData) {
    const dayastoleObject = {
      type: 'line',
      label: 'Dia',
      borderColor: '#252427',
      borderWidth: 4,
      fill: false,
      pointRadius: 0.75,
      pointHoverRadius: 2,
      tension: 0.1,
      pointHoverBackgroundColor: 'E1E1E1',
      pointHoverColor: '#252427',
      data: dyastoleData?.Values?.map((item: any) => (item && !isNaN(item) && Number(item) !== 0 ? item : null)) || [],
    };
    emptyObject.datasets.push(dayastoleObject);
  }
  emptyObject.units = data?.Unit || '';
  emptyObject.datasets.push(object);
  return emptyObject;
};
