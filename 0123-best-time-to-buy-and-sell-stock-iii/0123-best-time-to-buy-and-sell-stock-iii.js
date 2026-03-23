/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let n = prices.length;
	let leftMaxProfit = new Array(n).fill(0), rightMaxProfit = new Array(n).fill(0);
	let minPrice = prices[0];
	for (let i = 1; i < n; i++) {
		minPrice = Math.min(minPrice, prices[i]);
		leftMaxProfit[i] = Math.max(leftMaxProfit[i - 1], prices[i] - minPrice);
	}
	let maxPrice = prices[n - 1];
	for (let i = n - 2; i >= 0 ; i--) {
		maxPrice = Math.max(maxPrice, prices[i]);
		rightMaxProfit[i] = Math.max(rightMaxProfit[i + 1], maxPrice - prices[i]);
	}
	let profit = 0;
	for (let i = 0; i < n; i++) {
		profit = Math.max(profit, rightMaxProfit[i] + leftMaxProfit[i]);
	}
	return profit;
};