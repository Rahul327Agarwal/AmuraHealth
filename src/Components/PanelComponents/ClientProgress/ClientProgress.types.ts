export const EmptyChart = {
  StartDate: '',
  EndDate: '',
  Dates: [],
  Days: [],
  Glucose: {
    Unit: '',
    Context: 'Glucose',
    Measurements: [],
  },
  Height: {
    Unit: '',
    Context: 'Height',
    Measurements: [],
  },
  Weight: {
    Unit: '',
    Context: 'Weight',
    Measurements: [],
  },
  Waist: {
    Unit: '',
    Context: 'Waist',
    Measurements: [],
  },
  Chest: {
    Unit: '',
    Context: 'Chest',
    Measurements: [],
  },
  Hip: {
    Unit: '',
    Context: 'Hip',
    Measurements: [],
  },
  BP_SYS: {
    Unit: '',
    Context: 'BP_SYS',
    Measurements: [],
  },
  BP_DIA: {
    Unit: '',
    Context: 'BP_DIA',
    Measurements: [],
  },
};
export const EmptyChartData = {
  labels: [],
  units: '',
  datasets: [
    {
      type: 'line',
      label: 'Glucose',
      borderColor: '#FFFFFF',
      borderWidth: 3,
      fill: false,
      data: [],
    },
  ],
};

export interface IEmptyChartData {
  labels: string[];
  units: string;
  datasets: [
    {
      type: string;
      label: string;
      borderColor: string;
      borderWidth: number;
      fill: boolean;
      data: number[];
      pointRadius: number;
    }
  ];
}

export const DefaultOptions: any = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      // mode: "x",
      backgroundColor: '#E1E1E1',
      titleColor: '#252427',
      // yAlign: "top",
      // xAlign: "center",
      displayColors: false,
      bodyAlign: 'center',
      titleAlign: 'center',
      callbacks: {
        label: function (context: { [x: string]: any }) {
          return context['formattedValue'];
        },
        labelTextColor: function (context: any) {
          return '#252427';
        },
      },
    },
  },
  scales: {
    xAxes: {
      display: false,
    },
    yAxes: {
      display: false,
    },
  },
  layout: {
    padding: 10,
  },
  hover: {
    mode: 'x',
    intersect: false,
  },
};
