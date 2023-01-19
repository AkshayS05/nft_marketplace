export const makeId=(length)=>{

let result='';
const characters ='abcdefghijklmnopqrstuvwxyz1023456789';
const charactersLength= characters.length;

for(let i=0; i<length; i++){
    result+= characters.charAt( Math.floor( Math.random() * charactersLength ));
}

return result;
}
// suppose we pass length=3
// it will generate an id of length 3 which can be a mix of number letters, only letters or a number
// aed a3r 567
