// Destructuring with objects - ES6

const frenchTeam = {
  players: 23,
  footballers: ['Giroud', 'Grizemann', 'N"golo Kante'],
  isFrance: true,
  destination: 'Germany',
  euro: {
    qualified: 15,
    address: {
      city: 'Berlin',
      street: 'Ich bin Berliner',
      num: 6,
    },
  },
};

// const destination = frenchTeam.destination;
// const isFrance = frenchTeam.isFrance;
// const players = frenchTeam.players;

const { destination, isFrance, players } = frenchTeam;

console.log(destination);
console.log(players);
console.log(isFrance);

// destructuring a prop that does not exist ==> undefined
const { price } = frenchTeam;
console.log(price);

// renaming a destructured property
const { destination: dest, isFrance: isFr, players: playersName } = frenchTeam;

console.log(dest);
console.log(isFr);
console.log(playersName);

// destructuring in embedded objects
const {
  euro: {
    address: { num },
  },
} = frenchTeam;

console.log(num);

// destructuring in embedded objects : renaming !
const {
  euro: {
    address: { num: streetNumber },
  },
} = frenchTeam;

console.log(streetNumber);

const {
  euro,
  euro: { address },
} = frenchTeam;

console.log(euro);
console.log(address);

//////\\\\\\\//////\\\\\\\//////\\\\\\\//////\\\\\\\//////\\\\\\\//////\\\\\\\

// Destructuring with arrays - ES6

const fruits = ['banane', 'orange', 'kiwi', 'litchi'];

// Before
const banane = fruits[0];
const orange = fruits[1];
const kiwi = fruits[2];
const litchi = fruits[3];

console.log(orange, banane, kiwi, litchi);

// With destructuring

const [ban, ora, kiw, litch] = fruits;

console.log(ban, ora, kiw, litch);

// Destructuring only some items
const [, , itemKiwi, itemLitchi] = fruits;

console.log(itemKiwi, itemLitchi);

// Spread operator with objects - ES6

const me = {
  name: 'Pierre',
  age: 18,
};

const newMe = {
  ...me,
  // adding properties
  car: 'Mercedes',
  // modifying existing properties
  age: 19,
};

console.log(me);
console.log(newMe);

// Spread operator with arrays - ES6
const array = [
  0,
  function (el) {
    return el;
  },
];

const newArray = [...array];

console.log(array);
console.log(newArray);

// adding elements using spread

const aNewArray = [true, 'kikoo', ...array, false, null, undefined];

console.log(aNewArray);
