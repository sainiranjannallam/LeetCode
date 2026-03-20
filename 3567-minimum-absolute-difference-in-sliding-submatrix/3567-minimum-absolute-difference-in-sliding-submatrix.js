var minAbsDiff = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    const ans = Array.from({ length: m - k + 1 }, () => Array(n - k + 1).fill(0));

    for (let i = 0; i <= m - k; i++) {
        for (let j = 0; j <= n - k; j++) {

            let temp = [];

            for (let x = i; x < i + k; x++) {
                for (let y = j; y < j + k; y++) {
                    temp.push(grid[x][y]);
                }
            }

            if (k === 1) {
                ans[i][j] = 0;
                continue;
            }

            temp = [...new Set(temp)].sort((a, b) => a - b);

            if (temp.length <= 1) {
                ans[i][j] = 0;
                continue;
            }

            let mini = Infinity;
            for (let p = 1; p < temp.length; p++) {
                mini = Math.min(mini, Math.abs(temp[p] - temp[p - 1]));
            }

            ans[i][j] = mini;
        }
    }

    return ans;
};