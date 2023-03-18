  function findDuplicateTransactions(transactions) {
      let dubTrans = [...transactions];
      if (transactions.length == 1) {
        return [];
      }
      if (!Array.isArray(transactions)) {
        throw Error("Invalid");
      }
      //Group similar objects together by comparing properties
        let similarObjArr = [];
          for (let i = 0; i < dubTrans.length; i++) {
              let arr2 = [];
        const {
          sourceAccount: srcActI,
          targetAccount: tgrActI,
          category: categI,
          amount: amtI,
        } = dubTrans[i];
        let index = dubTrans.findIndex((transaction) => {
          return (
            transaction.sourceAccount === srcActI &&
            transaction.targetAccount == tgrActI &&
            transaction.amount == amtI &&
            transaction.category == categI
            );
        });
        for (let j = i; j <dubTrans.length; j++) {
          const {
            sourceAccount: srcActJ,
            targetAccount: tgrActJ,
            category: categJ,
            amount: amtJ,
          } = cdubTrans[j];
          if (index == i) {
            if (
              srcActI === srcActJ &&
              tgrActI === tgrActJ &&
              amtI === amtJ &&
              categI === categJ)
              {
              arr2.push(dubTrans[j]);
            }
          } else continue;
        }
        
          if (arr2.length > 0) {
              similarObjArr.push(arr2);
               }
      }
      //Sort objects in each sub-array by time of occurence
        let sortedArray = [];
          for (let i = 0; i < similarObjArr.length; i++) {
          let sortedArr = similarObjArr[i].sort((a, b) => {
          let aTime = new Date(a.time).getTime() / 1000;
          let bTime = new Date(b.time).getTime() / 1000;
          return aTime - bTime;
        });
        sortedArray.push(sortedArr);
      }
      //Filter to remove  arrays
        let filter = sortedArray.filter((elem) => {
            return elem.length !== 1;
          });
      //Remove more than 60 secs interval transactions
      let solutionArray = [];
          filter.forEach((subArr) => {
        let holder = [];
        for (let j = 0; j < subArr.length - 1; j++) {
          let currentTime = new Date(subArr[j].time).getTime() / 1000;
          let nextTime = new Date(subArr[j + 1].time).getTime() / 1000;
          if (subArr.length < 3) {
            if (j < 2 && nextTime - currentTime <= 60) {
              holder.push(subArr[j]);
              holder.push(subArr[j + 1]);
            } else continue;
          } else if (subArr.length > 2) { //More than 2 similar transactions in a list
            if (Math.abs(currentTime - nextTime) <= 60) {
                    holder.push(subArr[j]);
              if (j == subArr.length - 2) {// This would compare a second-to-the-last transaction to the last transaction ref if statement above
                  holder.push(subArr[j + 1]);
                    }
                      } else if (
                          j >= 2 && Math.abs(currentTime - nextTime) > 60 && Math.abs(currentTime - new Date(subArr[j - 1].time).getTime() / 1000) <= 60)
                          {
                            holder.push(subArr[j]);
            } else continue;
          }
        }
        if (holder.length > 0) {
          solutionArray.push(holder);
        }
      });
      //Sort by id
      solutionArray.sort((a, b) => {
          return a[0].id - b[0].id;
          });
      solutionArray;
      return solutionArray;
    }



  export default findDuplicateTransactions;
