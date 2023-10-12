import { IFilterState } from "../MyListHome.types";

export const selectOption = [
  { label: "Test package 1", value: "Test package 1" },
  { label: "Test package 2", value: "Test package 2" },
  { label: "Test package 3", value: "Test package 3" },
  { label: "Test package 4", value: "Test package 4" },
  { label: "Test package 5", value: "Test package 5" },
  { label: "Test package 6", value: "Test package 6" },
];
export const sortByOptions = [
  { label: "Newest", value: "Newest" },
  { label: "Oldest", value: "Oldest" },
  { label: "Name", value: "Name" },
  { label: "Status", value: "Status" },
];

export const groupByOptions = [
  { label: "Status", value: "Status" },
  { label: "Owner", value: "Owner" },
];
export const groupByOptions2 = [{ label: "Status", value: "Status" }];

export const defaultFilterState: IFilterState = {
  owner: [],
  status: [],
  role:[],
  createdOnStart: null,
  createdOnEnd: null,
  sortBy: "bluedot",
  groupBy: "",
};

export const belongsToGCL2 = (data) => {
  return data.indexOf("amura_guidance_counselor_level2") > -1;
};

export const belongsToGC = (data) => {
  return data.indexOf("guidance_counselor") > -1;
};
