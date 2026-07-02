const Profit=(priceArr)=>{
    let minPrice=priceArr[0]
    let maxProfit=0
    for(let i=0; i<priceArr.length; i++){
        if(priceArr[i]<minPrice){
            minPrice=priceArr[i];
        }
        let profit = priceArr[i]-minPrice
        if(profit>maxProfit){
            maxProfit=profit;
        }
        
    }
    return maxProfit;
}
console.log(Profit([7,6,4,3,1]))