/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n < 4) return n;
    let a = 2, b = 3; 
    for(let i = 0; i < n - 3; i++){
        let temp = a;
        a = b;
        b += temp;
    }
    return b;
};