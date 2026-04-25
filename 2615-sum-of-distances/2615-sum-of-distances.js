/**
 * @param {number[]} nums
 * @return {number[]}
 */
var distance = function(nums) {
    const d = new Map();
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (!d.has(nums[i])) 
            d.set(nums[i], []);
        d.get(nums[i]).push(i);
    }
    const res = new Array(n).fill(0);
    for (let v of d.values()) {
        if (v.length > 1) {
            const c = v.length;
            let i = v[0];
            let sum = v.reduce((a, b) => a + b, 0);
            res[i] = sum - c * i;
            let x = 0, y = c - 2;
            for (let k = 1; k < c; k++) {
                const nidx = v[k];
                res[nidx] = res[i] + (x - y) * (nidx - i);
                x++;
                y--;
                i = nidx;
            }
        }
    }
    return res;
};