// Change Please
// You’re building an ATM and are tasked with determining how many different ways you can “break” a given amount of money into different bills.
// Given an input amount of money inputMoney and a list of values coins representing the possible denominations of coins the ATM can give back, complete the function changeOptions(inputMoney, coins) so that it returns the number of different ways the ATM could give you change.

// For example, changeOptions(5, [1, 2, 5, 10, 100]) should return 4. This is because there are 4 unique ways that the ATM can give change for 5:

// 1 + 1 + 1 + 1 + 1
// 1 + 1 + 1 + 2
// 1 + 2 + 2
// 5
// You can assume inputMoney is positive and you can assume coins has at least one value.

const americanCoins = [1, 5, 10, 25] 
const changeDue = 36

/////// first attempt ////////
function allOptions(value, coins, usedCoins = []) {
  if (value === 0) {
    console.log(usedCoins)
    return 1;
  }
  
  if (coins.length === 0 || value < 0) {
    return 0;
  }

  const coin = coins[0];
  const remainingCoins = coins.slice(1, coins.length);

  const useCoinCount = allOptions(value - coin, coins, [...usedCoins, coin]);
  const skipCoinCount = allOptions(value, remainingCoins, usedCoins);
  
  return useCoinCount + skipCoinCount;
}

// console.log(allOptions(changeDue, americanCoins))

// const americanCoins = [1, 5, 10, 25]
// const changeDue = 26;


// function findAllOptions(changeDue, americanCoins) {
//   const table = new Array(changeDue + 1).fill(0);
//   table[0] = 1; 

//   for (const coin of americanCoins) {
//       for (let i = coin; i <= changeDue; i++) {
//         table[i] += table[i - coin];
//       }
//     }
//     return table[changeDue]
// }

function findAllOptions(changeDue, americanCoins) {
  const table = new Array(changeDue + 1).fill(0);
  table[0] = 1;
  console.log(table)
  const subsets = new Array(changeDue + 1).fill(null);
  subsets[0] = [[]];
  console.log(subsets)

  for (const coin of americanCoins) {
    for (let i = coin; i <= changeDue; i++) {
      table[i] += table[i - coin];
      if (subsets[i - coin] !== null) {
        const newSubsets = subsets[i - coin].map((s) => s.concat([coin]));
        subsets[i] = (subsets[i] || []).concat(newSubsets);
      }
    }
  }

  const allSubsets = subsets[changeDue] || [];
  console.log(`All subsets of coins that add up to ${changeDue}:`);
  allSubsets.forEach((subset) => console.log(subset.join(', ')));

  return table[changeDue];
}

// console.log(findAllOptions(changeDue, americanCoins));

function myVersion(target, values) {
  let counterArray = new Array(target + 1).fill(0);
  counterArray[0] = 1;

  for (const value of values) {
    for (let i = value; i <= target; i++) {
      counterArray[i] = counterArray[i] + counterArray[i - value]; 
    }
  }
  return counterArray[target]
}

console.log(myVersion(changeDue, americanCoins))
