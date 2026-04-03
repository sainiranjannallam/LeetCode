/**
 * @param {number[]} robots
 * @param {number[]} distance
 * @param {number[]} walls
 * @return {number}
 */
var maxWalls = function(robots, distance, walls) {
    let n = robots.length;
    let r = [];
    let rs = new Set();
    
    for (let i = 0; i < n; i++) {
        r.push([robots[i], distance[i]]);
        rs.add(robots[i]);
    }
    r.sort((a, b) => a[0] - b[0]);
    
    let bw = 0;
    let vw = [];
    for (let w of walls) {
        if (rs.has(w)) bw++;
        else vw.push(w);
    }
    vw.sort((a, b) => a - b);
    
    const lowerBound = (arr, val) => {
        let l = 0, right = arr.length;
        while (l < right) {
            let mid = (l + right) >> 1;
            if (arr[mid] >= val) right = mid;
            else l = mid + 1;
        }
        return l;
    };
    
    const upperBound = (arr, val) => {
        let l = 0, right = arr.length;
        while (l < right) {
            let mid = (l + right) >> 1;
            if (arr[mid] > val) right = mid;
            else l = mid + 1;
        }
        return l;
    };
    
    const getW = (x, y) => {
        if (x > y) return 0;
        let i1 = lowerBound(vw, x);
        let i2 = upperBound(vw, y);
        return i2 - i1;
    };
    
    let dp = Array.from({length: n}, () => [0, 0]);
    dp[0][0] = getW(r[0][0] - r[0][1], r[0][0] - 1);
    dp[0][1] = 0;
    
    for (let i = 1; i < n; i++) {
        let L = r[i-1][0], R = r[i][0];
        let d1 = r[i-1][1], d2 = r[i][1];
        
        let eR = Math.min(R - 1, L + d1);
        let sL = Math.max(L + 1, R - d2);
        
        let wR = getW(L + 1, eR);
        let wL = getW(sL, R - 1);
        let wBoth = (eR >= sL) ? getW(L + 1, R - 1) : wR + wL;
        
        dp[i][0] = Math.max(dp[i-1][0] + wL, dp[i-1][1] + wBoth);
        dp[i][1] = Math.max(dp[i-1][0], dp[i-1][1] + wR);
    }
    
    let wEnd = getW(r[n-1][0] + 1, r[n-1][0] + r[n-1][1]);
    return Math.max(dp[n-1][0], dp[n-1][1] + wEnd) + bw;
};