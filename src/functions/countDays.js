export default function countDays(data1, data2) {
  const partesData1 = data1.split("/");
  const partesData2 = data2.split("/");

  const date1 = new Date(partesData1[2], partesData1[1] - 1, partesData1[0]);
  const date2 = new Date(partesData2[2], partesData2[1] - 1, partesData2[0]);

  const differenceMilliseconds = date2 - date1;

  const differenceDays = differenceMilliseconds / (1000 * 60 * 60 * 24);

  return differenceDays;
}
