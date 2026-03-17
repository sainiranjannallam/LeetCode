/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function(zero, one, limit) {
    const dp = Array.from({length: zero+1}, () => Array.from({length: one+1}, () => [0, 0])), MOD = 1e9+7;
    for(let i = 0; i <= zero; i++) {
        for(let j = 0; j <= one; j++) {
            for(let curr = 0; curr <= 1; curr++) {
                if(i == 0) {
                    if(j == 0) continue;
                    dp[i][j][1] = 1;
                    if(j > limit) dp[i][j][1] = 0;
                } else if(j == 0) {
                    dp[i][j][0] = 1;
                    if(i > limit) dp[i][j][0] = 0;
                } else if(curr == 0) {
                    dp[i][j][curr] = dp[i-1][j][0] + dp[i-1][j][1];
                    if(i > limit) dp[i][j][curr] -= dp[i-limit-1][j][1];
                } else {
                    dp[i][j][curr] = dp[i][j-1][0] + dp[i][j-1][1];
                    if(j > limit) dp[i][j][curr] -= dp[i][j-limit-1][0];
                }
                if(dp[i][j][curr] < 0) dp[i][j][curr] += MOD;
                dp[i][j][curr] %= MOD;
            }
        }
    }
    return (dp[zero][one][0] + dp[zero][one][1]) % MOD;
};