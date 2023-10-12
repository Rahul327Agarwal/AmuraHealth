import axios from "axios";

const users = [
  { label: "Kyle Rachau", value: "Manage statuses", avatarUrl: "urlstring" },
  { label: "Steve Rogers", value: "Steve Rogers", avatarUrl: "urlstring" },
  { label: "Peter Parker", value: "Peter Parker", avatarUrl: "urlstring" },
  { label: "Bruce Banner", value: "Bruce Banner", avatarUrl: "urlstring" },
  { label: "Bruce Banner", value: "Bruce Banner", avatarUrl: "urlstring" },
];

export const nameCardData = [
  {
    imageURL: "",
    name: "Amura1",
    username: "@Amura1",
    userId: "@Amura1",
    acronym: "AMU",
    mainDescription: "Lorem ipsum dolor sit amet,  adipiscing elit. ",
    rating: "Tables: 1",
    status: "v1",
    time: "09:30 PM",
    users: users,
    isEmergency: false,
    isNewMessage: true,
    isOthers: true,
  },
  {
    imageURL: "",
    name: "Amura2",
    username: "@Amura2",
    userId: "@Amura2",
    acronym: "AMU",
    mainDescription: "Lorem ipsum dolor sit amet,  adipiscing elit. ",
    rating: "Tables: 1",
    status: "v1",
    time: "09:30 PM",
    users: users,
    isEmergency: true,
    isNewMessage: false,
    isOthers: true,
  },
  {
    imageURL: "",
    name: "Amura3",
    username: "@Amura3",
    userId: "@Amura3",
    acronym: "AMU",
    mainDescription: "Lorem ipsum dolor sit amet,  adipiscing elit. ",
    rating: "Tables: 1",
    status: "v1",
    time: "09:30 PM",
    users: users,
    isEmergency: false,
  },
  {
    imageURL: "",
    name: "Amura4",
    username: "@Amura4",
    userId: "@Amura4",
    acronym: "AMU",
    mainDescription: "Lorem ipsum dolor sit amet,  adipiscing elit. ",
    rating: "Tables: 1",
    status: "v1",
    time: "09:30 PM",
    users: users,
    isEmergency: false,
    isNewMessage: true,
    isOthers: true,
  },
  {
    imageURL: "",
    name: "Amura5",
    username: "@Amura5",
    userId: "@Amura5",
    acronym: "AMU",
    mainDescription: "Lorem ipsum dolor sit amet,  adipiscing elit. ",
    rating: "Tables: 1",
    status: "v1",
    time: "09:30 PM",
    users: users,
    isEmergency: true,
  },
];

export const configurationCardData = [
  // {
  //   imageURL: "",
  //   name: "Biomarkers",
  //   username: "@Amura5",
  //   userId: "@Amura5",
  //   //record: "1200 records",
  //   mainDescription: "Biomarkers are blood markers. ",
  //   time: "14:30",
  // },
  // {
  //   imageURL: "",
  //   name: "Biomarkers",
  //   username: "@Amura5",
  //   userId: "@Amura5",
  //   record: "1200 records",
  //   mainDescription: "Biomarkers are blood markers. ",
  //   time: "14:30",
  // },
  // {
  //   imageURL: "",
  //   name: "Biomarkers",
  //   username: "@Amura5",
  //   userId: "@Amura5",
  //   record: "1200 records",
  //   mainDescription: "Biomarkers are blood markers. ",
  //   time: "14:30",
  // },
];

export const getBotListFromDB = async (
  props: any,
  setConfigurationCard: Function
) => {
  const payload = {
    payLoad: {
      partKey: "part_key",
      partKeyValue: "~bot~card~",
      tableName: "botcard-meta",
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    if (response.data.length > 0 && response.status === 201) {
      let botListdataObj = response.data.map((each) => ({
        ...each,
        tableName: each.sort_key,
      }));
      botListdataObj.sort((a, b) => {
        let fa = a?.tableName?.toLowerCase(),
          fb = b?.tableName?.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      setConfigurationCard(botListdataObj);
    } else {
      setConfigurationCard([]);
    }
  } catch (error) {
    setConfigurationCard([]);
  }
};
