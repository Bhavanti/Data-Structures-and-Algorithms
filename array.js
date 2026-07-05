//1.FIND LARGEST (find the largest number present in the array)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(1)
const largestEle=(nums)=>{
    let max=nums[0];
    for(let i=0;i<nums.length;i++){
        if(nums[i]>max){
            max=nums[i];
        }
    }
    return max;
}
console.log(largestEle([12,45,7,89,23]));


//2.DUPLICATES(return true if duplicate of a number exist else return false)
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const findDuplicates=(nums)=>{
    for(let i=0; i<nums.length; i++){
        for(let j=i+1; j<nums.length; j++){
            if(nums[i]==nums[j]){
                return true;
            }
        }
    }
    return false;
}
console.log(findDuplicates([2,4,6,1,2,4,5]));


//OPTIMAL SOLUTION(NEED TO FIND THE DUPLICATE ONLY WHY TO RUN THROUGH THE ENTIRE ARRAY? USING SET.HAS CAN FIND THE DIRECT ELEMENT)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(n)
const findDuplicates1=(nums)=>{
    let numSet = new Set();
    for(let i=0; i<nums.length; i++){
        if(numSet.has(nums[i])){
            return true;
        }
        numSet.add(nums[i]);//first check then add to avoid wrong checking e.g. if in set u add element before checking then set has the element, hpwever when u will check for the element then u will find the duplicate even if array doesnt have the duplicate  as it compares the same elements so first check then add .
    }
    return false;
}
console.log(findDuplicates1([2,1,5,6,4,]));


//3.TWO SUM (find the inde of the numbers which sum upto the given target)
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const twoSum=(nums,target)=>{
    for(let i=0; i<nums.length; i++){
        for(let j=i+1; j<nums.length; j++){
            if(nums[i]+nums[j]==target){
                return [i,j];
            }
        }
    }
    return -1;
}
console.log(twoSum([2,7,11,15],9));

//OPTIMAL SOLUTION (here we need only the number then why ro check all the numbers and pairings? if we know one number then the other number can be easily known as we know the target , got to find if the number is present or not )
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(n)
const twoSum1=(nums,target)=>{
    let sumMap = new Map() //using a map instead of set because we need the index of the number and map can store the number and the index as key value pair
    for(let i=0; i<nums.length; i++){
        let sumNum = target-nums[i]
        if(sumMap.has(sumNum)){
            return [sumMap.get(sumNum),i]
        }
        sumMap.set(nums[i],i);
    }
    return -1;
}
console.log(twoSum1([2,7,11,15],9));


//4.BEST TIME TO BUY AND SELL(find the maximum profit according to the prices array where each number represent the price of each day and we can sell after we buy)
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const Profit=(profitArr)=>{
    let maxProfit=0;
    for(let buy=0; buy<profitArr.length; buy++){
        for(let sell=buy+1; sell<profitArr.length; sell++){
            let profit=profitArr[sell]-profitArr[buy];
            if(profit>maxProfit){
                maxProfit=profit;
            }
        }
    }
    return maxProfit
}
console.log(Profit([7,1,5,3,6,4]));

//OPTIMAL SOLUTION(instead of checking every buy and sell price we can estimate the maximum profit by getting the loweest price so far as current price - lowest past price = maximum profit)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(1)
const ProfitCheck=(priceArr)=>{
    let minPrice=priceArr[0]
    let maxProfit=0
    for(let i=0; i<priceArr.length; i++){
        if(priceArr[i]<minPrice){
            minPrice=priceArr[i];  //storing only the minimum price as we dont have any work with al the prices we need only the lowest price so far.
        }
        let profitNum = priceArr[i]-minPrice   // Keep track of the lowest price seen so far. We don't need to store all previous prices—only the minimum price, because it always gives the maximum possible profit for the current day.
        if(profitNum>maxProfit){
            maxProfit=profitNum;
        }
        
    }
    return maxProfit;
}
console.log(ProfitCheck([7,6,4,3,1]))


//5.LONGEST CONSECUTIVE 1S(running count, count the longest 1s appeared )
//TIME COMPLEXITY O(n);
//SPACE COMPLEXITY O(1);
const longConsecutive =(nums)=>{
    let currCount = 0;
    let maxCount = 0;
    for(let i=0; i<nums.length; i++){
        if(nums[i]===1){
            currCount++;
        }else{
            currCount=0;
        }
        if(currCount>maxCount){
            maxCount = currCount;
        }
    }
    return maxCount;
}
console.log(longConsecutive([1,1,1,1]));


//6.MAXIMUM SUM OF SUBARRAY SIZE K(problem asks for a continous subarray)
//BRUTE FORCE
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
const subArraysum=(nums,k)=>{
    let sum=0;
    let maxSum=0;
    for(let i=0; i<=nums.length-k; i++){
        for(let j=i; j<i+k; j++){
            sum=sum+nums[j];
        }
        if(sum>maxSum){
            maxSum=sum;
        }
        sum=0;
    }
    return maxSum;
}
 console.log(subArraysum([3,8,2,5,7,6],3));
//OPTIMIZATION ( bottleneck of brute force computing the same sum mulitple times use sliding window pattern
                 //for sliding window pattern problem asks about a continous array of fixed size and CONSECUTIVE SUBARRAY OVERLAY)
                 //compute the first window sum then slide the window one by one , one element enters and one element leaves. so update the sum instead of recalculating it . 

 const maxsubArraySum=(nums,k)=>{
    let sum=0;
    let maxSum=0;
    for(let i=0; i<k; i++){
        sum=sum+nums[i];
    }
    maxSum=sum;
    for(let j=0; j<nums.length-k; j++){
        sum=sum+(nums[j+k]-nums[j]);
        if(sum>maxSum){
        maxSum=sum;
    }
    }
    
    return maxSum;
 }
console.log(maxsubArraySum([3,8,2,5,7,6],3));