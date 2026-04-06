/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    const obstacleSet = new Set();
    for (const [ox, oy] of obstacles) {
        obstacleSet.add(`${ox},${oy}`);
    }
    
    // Direction vectors: N, E, S, W
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    let dir = 0; // 0:N, 1:E, 2:S, 3:W
    
    let x = 0, y = 0;
    let maxSqDist = 0;
    
    for (const cmd of commands) {
        if (cmd === -2) {
            dir = (dir + 3) % 4; // Left
        } else if (cmd === -1) {
            dir = (dir + 1) % 4; // Right
        } else {
            for (let i = 0; i < cmd; i++) {
                const nx = x + dx[dir];
                const ny = y + dy[dir];
                const key = `${nx},${ny}`;
                if (obstacleSet.has(key)) {
                    break; // Blocked
                }
                x = nx;
                y = ny;
                maxSqDist = Math.max(maxSqDist, x * x + y * y);
            }
        }
    }
    return maxSqDist;
};