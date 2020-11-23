const log = console.log;

const promise1 = new Promise(((resolve, reject) => {
  setTimeout(() => resolve('done 1'), 1000);
}));

const promise2 = new Promise(((resolve, reject) => {
  setTimeout(() => resolve('done 2'), 5000);
}));

promise1
  .then(result => {
    log(result);
    promise2
      .then(result2 => {
        log(result2);
      })
      .catch(error2 => log(error2))
      .finally(() => log('done with 2'));
  })
  .catch(error => log(error))
  .finally(() => log('done with 1'));

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => log('runs after 3 seconds'));

new Promise(((resolve, reject) => {

  setTimeout(() => resolve(1), 1000);

})).then((result) => {

  log(result);
  return result * 2;

}).then((result) => {

  log(result);
  return result * 2;

}).then((result) => {

  log(result);
  return result * 2;

});

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 1000))
]).then(data => log(data));