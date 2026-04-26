/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function(n) {
    let max = 0;
    for (let i = 0; i < n.length; i++) {
        const digit = parseInt(n[i], 10);
        if (digit > max) max = digit;
        if (max === 9) return 9;
    }
    return max;
};