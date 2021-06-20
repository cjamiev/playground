const item1 = 'item1';
const item2 = 'item2';

const chainArrayModifications = () => {
  const list = [];
  const listModifier = {
    add(item) {
      list.push(item);

      return this;
    },
    remove(item) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === item) {
          list.splice(i, 1);
        }
      }

      return this;
    },
    getList() {
      return list;
    }
  };

  return listModifier;
};

const test = chainArrayModifications()
  .add(item1)
  .add(item2)
  .add(item2)
  .remove(item2)
  .getList();

console.log(test);
