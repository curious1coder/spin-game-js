// 1 deposit some money
// 2 determine the number of lines to bet on
// 3 collect a bet amount
// 4 spin the slot machine
// 5 check if the user won
// 6 give the user their winning
// 7 play again ?

const prompt = require("prompt-sync")();

const ROW = 3;
const COL = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Enter a valid number, try again.");
    } else {
      return numberDepositAmount;
    }
  }
};
// const depositAmount= deposit();
// console.log(depositAmount+" play ahead?");

const getNumberOfLines = () => {
  while (true) {
    const NumberOfLines = prompt("Enter number of lines you want to bet on: ");
    const lines = parseFloat(NumberOfLines);

    if (isNaN(lines) || lines <= 0 || lines > ROW) {
      console.log("Enter a valid numer of lines [1,3], try again.");
    } else {
      return lines;
    }
  }
};

// const numberOfLines= getNumberOfLines();
// console.log(numberOfLines);

const getBet = (balance, numberOfLines) => {
  while (true) {
    const betAmount = prompt("Enter the bet amount per line: ");
    const amount = numberOfLines * parseFloat(betAmount);

    if (isNaN(amount) || amount <= 0 || amount > balance) {
      console.log(`Sorry you only have ${balance} left. Try again!`);
    } else {
      balance -= amount;
      return amount;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels=[];
  for(let i=0; i<COL; i++) {
    reels.push([]);
    const reelSymbols= [...symbols];
    
    for(let j=0; j<ROW; j++) {
        const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbols = reelSymbols[randomIndex];
            reels[i].push(selectedSymbols);
            reelSymbols.splice(randomIndex, 1);
    }

  }

  return reels;
};


const printSpin= (reels) => {
    
    for(let i=0; i<reels.length; i++)
        {
            let stringA= "";
            for(let j=0; j<reels[i].length; j++)
            {
               stringA+= reels[i][j];

               if(j!=reels[i].length-1)
               {
                stringA+=" | ";
               }
                
            }
            console.log(stringA);
        }
};

const getWinnings = (reels, bet, numberOfLines) => {
    let winnings = 0;
    
    for(let i=0; i<numberOfLines; i++)
    {
        const symbols =reels[i];
        let won= true;

        for(symbol of symbols) {
            if(symbol!=symbols[0])
            {
                won=false;
                break;
            }
        
        }

        if(!won)continue;
        winnings+= bet*SYMBOL_VALUES[symbols[0]];
    }
return winnings;
}


const reels =spin();
// console.log(reels);


// for(let i=0; i<reels.length; i++)
// {
//     for(let j=0; j<reels[i].length; j++)
//     {
//         console.log(reels[i][j]+" ");
        
//     }
//     // console.log("\n");
// }


function Game() 
{
    let balance = deposit();
const numberOfLines = getNumberOfLines();

const bet = getBet(balance, numberOfLines);
console.log(bet);
console.log(balance);


const winnings=getWinnings(reels, bet, numberOfLines);
console.log(`You Won ${winnings} !!!`);
printSpin(reels);}
;






Game();