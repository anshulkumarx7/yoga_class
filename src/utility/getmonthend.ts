function expiryCalculation(){ 
const today =new Date();
const dd = today.getDate();
const mm =today.getMonth()+1;
const yyyy =today.getFullYear();
var expirydate;

// console.log(dd,mm,yyyy);
if(mm==1 || mm==3|| mm==5|| mm==7|| mm==8|| mm==10|| mm==12){
    expirydate=31;
}
else if( mm==2){
    expirydate=28;
}
else{
    expirydate=30;
}
const expiry =`${expirydate}/${mm}/${yyyy}`;
return expiry;
}

export default expiryCalculation;
