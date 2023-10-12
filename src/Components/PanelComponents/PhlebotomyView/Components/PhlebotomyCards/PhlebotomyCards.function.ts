
// export const getPhleboCardsList = async (props: any, setPhleboCardsList: Function) => {
//   let phleboCardsList = await PMS_S3.getObject(
//     `pms-ql-tables/allTables.json`,
//     import.meta.env.VITE_CLIENT_BUCKET,
//     {
//       TenantId: "",
//       Locale: sessionStorage.getItem("locale"),
//       url: import.meta.env.VITE_S3_FETCH_API,
//       token: props.sessions.id_token,
//       headers: {},
//     },
//     {}
//   );
//   if (!phleboCardsList.Error) setPhleboCardsList(phleboCardsList);
//   else setPhleboCardsList([]);
// };



export const packagesData = [
  {
    id: "1",
    title: "Test Package A",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Marketvegetables.jpg/800px-Marketvegetables.jpg",
    price: 10000,
    message: [
      "Test group 1",
      "test group 2",
      "Test group 3",
      "test group 4",
      "Test group 5",
      "test group 6",
      "test group 7",
      "test group 8",
      "test group 9",
      "test group 10",
    ],
    testNames: "Blood Serum",
    programs: ["program group 3", "program group 4", "program group 5", "program group 6"],
  },
  {
    id: "2",
    title: "Test Package B",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Marketvegetables.jpg/800px-Marketvegetables.jpg",
    price: 10000,
    message: [
      "Test group 1",
      "test group 2",
      "Test group 3",
      "test group 4",
      "Test group 5",
      "test group 6",
      "test group 7",
      "test group 8",
      "test group 9",
      "test group 10",
    ],
    testNames: "Blood Serum",
    programs: ["program group 3", "program group 4", "program group 5", "program group 6"],
  },
];
