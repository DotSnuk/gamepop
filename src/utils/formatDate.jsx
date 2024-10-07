export default function formatDate(date) {
  const year = date.getFullYear();
  const month = formatMonth(date.getMonth());
  const day = formatDay(date.getDate());
  return `${year}-${month}-${day}`;
}

function formatMonth(javascriptMonth) {
  return ('0' + (javascriptMonth + 1)).slice(-2);
}

function formatDay(javascriptDay) {
  return ('0' + javascriptDay).slice(-2);
}
