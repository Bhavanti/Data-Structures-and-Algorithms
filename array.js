//1.FIND LARGEST (find the largest number present in the array)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(1)
const largestEle = (nums) => {
    let max = nums[0];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max) {
            max = nums[i];
        }
    }
    return max;
}
console.log(largestEle([12, 45, 7, 89, 23]));


//2.DUPLICATES(return true if duplicate of a number exist else return false)
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const findDuplicates = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) {
                return true;
            }
        }
    }
    return false;
}
console.log(findDuplicates([2, 4, 6, 1, 2, 4, 5]));


//OPTIMAL SOLUTION(NEED TO FIND THE DUPLICATE ONLY WHY TO RUN THROUGH THE ENTIRE ARRAY? USING SET.HAS CAN FIND THE DIRECT ELEMENT)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(n)
const findDuplicates1 = (nums) => {
    let numSet = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (numSet.has(nums[i])) {
            return true;
        }
        numSet.add(nums[i]);//first check then add to avoid wrong checking e.g. if in set u add element before checking then set has the element, hpwever when u will check for the element then u will find the duplicate even if array doesnt have the duplicate  as it compares the same elements so first check then add .
    }
    return false;
}
console.log(findDuplicates1([2, 1, 5, 6, 4,]));


//3.TWO SUM (find the inde of the numbers which sum upto the given target)
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const twoSum = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j];
            }
        }
    }
    return -1;
}
console.log(twoSum([2, 7, 11, 15], 9));

//OPTIMAL SOLUTION (here we need only the number then why ro check all the numbers and pairings? if we know one number then the other number can be easily known as we know the target , got to find if the number is present or not )
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(n)
const twoSum1 = (nums, target) => {
    let sumMap = new Map() //using a map instead of set because we need the index of the number and map can store the number and the index as key value pair
    for (let i = 0; i < nums.length; i++) {
        let sumNum = target - nums[i]
        if (sumMap.has(sumNum)) {
            return [sumMap.get(sumNum), i]
        }
        sumMap.set(nums[i], i);
    }
    return -1;
}
console.log(twoSum1([2, 7, 11, 15], 9));


//4.BEST TIME TO BUY AND SELL(find the maximum profit according to the prices array where each number represent the price of each day and we can sell after we buy)
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const Profit = (profitArr) => {
    let maxProfit = 0;
    for (let buy = 0; buy < profitArr.length; buy++) {
        for (let sell = buy + 1; sell < profitArr.length; sell++) {
            let profit = profitArr[sell] - profitArr[buy];
            if (profit > maxProfit) {
                maxProfit = profit;
            }
        }
    }
    return maxProfit
}
console.log(Profit([7, 1, 5, 3, 6, 4]));

//OPTIMAL SOLUTION(instead of checking every buy and sell price we can estimate the maximum profit by getting the loweest price so far as current price - lowest past price = maximum profit)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(1)
const ProfitCheck = (priceArr) => {
    let minPrice = priceArr[0]
    let maxProfit = 0
    for (let i = 0; i < priceArr.length; i++) {
        if (priceArr[i] < minPrice) {
            minPrice = priceArr[i];  //storing only the minimum price as we dont have any work with al the prices we need only the lowest price so far.
        }
        let profitNum = priceArr[i] - minPrice   // Keep track of the lowest price seen so far. We don't need to store all previous prices—only the minimum price, because it always gives the maximum possible profit for the current day.
        if (profitNum > maxProfit) {
            maxProfit = profitNum;
        }

    }
    return maxProfit;
}
console.log(ProfitCheck([7, 6, 4, 3, 1]))


//5.LONGEST CONSECUTIVE 1S(running count, count the longest 1s appeared )
//TIME COMPLEXITY O(n);
//SPACE COMPLEXITY O(1);
const longConsecutive = (nums) => {
    let currCount = 0;
    let maxCount = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            currCount++;
        } else {
            currCount = 0;
        }
        if (currCount > maxCount) {
            maxCount = currCount;
        }
    }
    return maxCount;
}
console.log(longConsecutive([1, 1, 1, 1]));


//6.MAXIMUM SUM OF SUBARRAY SIZE K(problem asks for a continous subarray)
//BRUTE FORCE
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
const subArraysum = (nums, k) => {
    let sum = 0;
    let maxSum = 0;
    for (let i = 0; i <= nums.length - k; i++) {
        for (let j = i; j < i + k; j++) {
            sum = sum + nums[j];
        }
        if (sum > maxSum) {
            maxSum = sum;
        }
        sum = 0;
    }
    return maxSum;
}
console.log(subArraysum([3, 8, 2, 5, 7, 6], 3));
//OPTIMIZATION ( bottleneck of brute force computing the same sum mulitple times use sliding window pattern
//for sliding window pattern problem asks about a continous array of fixed size and CONSECUTIVE SUBARRAY OVERLAY)
//compute the first window sum then slide the window one by one , one element enters and one element leaves. so update the sum instead of recalculating it . 

const maxsubArraySum = (nums, k) => {
    let sum = 0;
    let maxSum = 0;
    for (let i = 0; i < k; i++) {
        sum = sum + nums[i];
    }
    maxSum = sum;
    for (let j = 0; j < nums.length - k; j++) {
        sum = sum + (nums[j + k] - nums[j]);
        if (sum > maxSum) {
            maxSum = sum;
        }
    }

    return maxSum;
}
console.log(maxsubArraySum([3, 8, 2, 5, 7, 6], 3));

//7.MAXIMUM SUM OF ANY CONTIGUOUS SUBARRAY
//  Fix every possible starting index using the outer loop.
//Extend the ending index using the inner loop.
//Maintain a running sum while extending the subarray.
//Update the maximum sum whenever a larger sum is found.
//TIME COMPLEXITY: O(n²)
//SPACE COMPLEXITY: O(1)

const maxsubArray = (nums) => {
    let sum = 0;
    let Maxsum = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            sum = sum + nums[j];
            if (sum > Maxsum) {
                Maxsum = sum;
            }
        }

        sum = 0;
    }
    return Maxsum;
}
console.log(maxsubArray([-5, -2, -8]));

//OPTIMAL SOLUTION
//The bottleneck is repeatedly calculating sums for overlapping subarrays instead of reusing information from the previous computation.
//Add the current element to currentSum.
//Update maxSum if currentSum is larger.
//If currentSum becomes negative, reset it to 0 because carrying a negative running sum can never help a future subarray.
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(1)
const subArray = (nums) => {
    let sum = 0;
    let maxsum = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
        if (sum > maxsum) {
            maxsum = sum;
        }
        if (sum < 0) {     //A negative running sum can never increase the sum of any future subarray. Starting from the next element will always give a sum that is greater than or equal to continuing with a negative running sum.
            sum = 0;
        }
    }
    return maxsum;
}
console.log(subArray([2, -5, 3, -2, 10]));


//8.PRODUCT OF ARRAY EXCEPT SELF 
//BRUTE FORCE
//TIME COMLEXITY O(n^2)
//SPACE COMPLEXITY O(n)
const productArray = (nums) => {
    let answerArray = new Array();
    let product = 1;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (j != i) {
                product = product * nums[j];
            }
        }
        answerArray.push(product);
        product = 1;
    }
    return answerArray;
}
console.log(productArray([1, 2, 3, 4, 5]));

//  OPTIMAL SOLUTION(The algorithm first computes the product of all elements to the left of every index, 
//                   then computes the product of all elements to the right of every index,
//                    and finally multiplies both products to get the answer for each index,instead of recalculating the product for every index)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(n)
const productansArray = (arr) => {
    let left = new Array();
    left[0] = 1;
    let right = new Array();
    right[arr.length - 1] = 1;
    let answer = new Array();
    for (let i = 1; i < arr.length; i++) {
        left[i] = left[i - 1] * arr[i - 1];
    }
    console.log(left);
    for (let j = arr.length - 2; j >= 0; j--) {
        right[j] = right[j + 1] * arr[j + 1];
    }
    console.log(right);
    for (let k = 0; k < arr.length; k++) {
        answer[k] = left[k] * right[k];
    }
    return answer;
}
console.log(productansArray([1, 2, 3, 4, 5]));

//9. MOVEE ZEROES TO LAST OF THE ARRAY
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const divideArray = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length - 1; j++) {
            if (nums[j] === 0 && nums[j + 1] != 0) {
                let zero = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = zero;

            }
        }
    }
    return nums;
}
console.log(divideArray([1, 0, 0, 0, 3, 0, 0]));

//OPTIMAL SOLUTION(two pointer method always look for the invariant instead of getting confused due to the common elements)
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(1)
const moveZeroes = (nums) => {
    let int = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            let temp = nums[i];
            nums[i] = nums[int];
            nums[int] = temp;
            int++;
        }
    }
    return nums;
}
console.log(moveZeroes([0, 0, 0, 0, 0, 2, 5]));


//10. CONTAINER WITH MOST H2O(find the maximum amount of water that can be contained between the heights given in the array.)
//TIME COMPLEXITY O(n^2)
//SPACE COMPLEXITY O(1)
//BRUTE FORCE
const maxWater = (heights) => {
    let amount = 0;
    let maxAmount = 0;
    for (let i = 0; i < heights.length-1; i++) {
        for (let j = i+1; j < heights.length; j++) {
            let minimum = Math.min(heights[i], heights[j]);
            let width = j - i;
            amount = minimum * width;
            if (amount > maxAmount) {
                maxAmount = amount;
            }
        }
    }
    return maxAmount;
}
console.log(maxWater([1,3,6,2,5,4,2,8,7]));

//OPTIMAL SOLUTION()
//TIME COMPLEXITY O(n)
//SPACE COMPLEXITY O(1)
const maxWateramt = (height) => {
    let j=height.length-1;
    let i=0; 
    let area = 0;
    let maxArea = 0;
    while (i<j){
        let minimum = Math.min(height[i], height[j]);
        let width = j-i
        area = minimum * width;
        if(area>maxArea){
            maxArea=area
        }
       if(height[j]<height[i]){
        j--;
       }else{
        i++;
       }
    }    
    return maxArea;
}
console.log(maxWateramt([1,8,6,2,5,4,8,3,7]));