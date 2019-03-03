function getRandomDate(offset) {
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0);
  date.setDate(date.getDate() + offset);

  return date.toISOString();
}

function getRandomFutureDate() {
  const randomNumber = Math.ceil(Math.random() * 100);
  return getRandomDate(randomNumber);
}

function getRandomPastDate() {
  const randomNumber = Math.ceil(Math.random() * 100) * -1;
  return getRandomDate(randomNumber);
}

module.exports = {
  getRandomFutureDate,
  getRandomPastDate
};
