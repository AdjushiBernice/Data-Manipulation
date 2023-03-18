function classifier(input) {
  if (!Array.isArray(input)) {
    throw new Error();
  }

  if (input.length === 0) {
    return { noOfGroups: 0 };
  }

  let Obj = {};
  let holderArray = [];
  let member = [];

  let copyArray = [...input];

  let newAgeArray = copyArray.map((member) => {
    let age = 2019 - new Date(member.dob).getFullYear();
    return { ...member, age };
  });

  let sortedArray = newAgeArray.sort((a, b) => a.age - b.age);

  member.push(sortedArray[0]);

  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i].age - member[0].age <= 5 && member.length < 3) {
      member.push(sortedArray[i]);
    } else {
      holderArray.push(member);
      member = [];
      member.push(sortedArray[i]);
    }
  }

  if (member.length > 0) {
    holderArray.push(member);
}
holderArray;
Obj.noOfGroups=holderArray.length;
for(let i=0; i<holderArray.length; i++) {
  Obj[`group${i+1}`]={
    members: holderArray[i],
    oldest: holderArray[i][holderArray[i].length-1].age,
    sum: holderArray[i].reduce((acc, b)=> acc + b.age, 0),
    regNos: holderArray[i].map((ele)=>+ele.regNo).sort((a,b)=>a-b),
  };

}
Obj;
return Obj;
}
export default classifier;
