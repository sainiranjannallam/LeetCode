class Solution {
    buildPrefixCount(grid, prefixCount) {
        const m = prefixCount.length;
        const n = prefixCount[0].length;

        for (let r = 1; r < m; r++) {
            for (let c = 1; c < n; c++) {
                const p1 = prefixCount[r - 1][c];
                const p2 = prefixCount[r][c - 1];
                const p3 = prefixCount[r - 1][c - 1];
                const ch = grid[r - 1][c - 1];

                let x = p1[0] + p2[0] - p3[0];
                let y = p1[1] + p2[1] - p3[1];

                if (ch === 'X') x++;
                else if (ch === 'Y') y++;

                prefixCount[r][c] = [x, y];
            }
        }
    }

    numberOfSubmatrices(grid) {
        const m = grid.length, n = grid[0].length;

        const prefixCount = Array.from({ length: m + 1 }, () =>
            Array.from({ length: n + 1 }, () => [0, 0])
        );

        this.buildPrefixCount(grid, prefixCount);

        let res = 0;
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                const [x, y] = prefixCount[r + 1][c + 1];
                if (x !== 0 && x === y) res++;
            }
        }

        return res;
    }
}