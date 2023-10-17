export default function getPeriodDates(data1, data2) {
  const partesData1 = data1.split("/");
  const partesData2 = data2.split("/");

  const date1 = new Date(partesData1[2], partesData1[1] - 1, partesData1[0]);
  const date2 = new Date(partesData2[2], partesData2[1] - 1, partesData2[0]);

  const dates = [];
  let date = date1;

  while (date <= date2) {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    dates.push(`${dia}/${mes}/${ano}`);
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
