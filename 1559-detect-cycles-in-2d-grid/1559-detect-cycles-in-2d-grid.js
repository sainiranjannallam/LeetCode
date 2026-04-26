const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];

const containsCycle = grid => {
    const m = grid.length, n = grid[0].length;
    const visit = [];

    const dfs = (r, c, pr, pc) => {
        visit[r * n + c] = true;

        return dirs.some(([dr, dc]) => {
            const nr = r + dr;
            const nc = c + dc;

            if (nr !== pr || nc !== pc)
                if (grid[nr]?.[nc] === grid[r][c])
                    return visit[nr * n + nc] || dfs(nr, nc, r, c);

            return false;
        });
    };

    return grid.some((c, i) => c
        .some((c, j) => !visit[i * n + j] && dfs(i, j, -1, -1)));
};