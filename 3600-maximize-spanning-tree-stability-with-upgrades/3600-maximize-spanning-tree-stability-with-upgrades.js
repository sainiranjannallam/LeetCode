/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStability = function(n, edges, k) {
    const parent = Array(n).fill(0).map((_, idx) => idx);
    const size = Array(n).fill(1);

    function find(v) {
        if (parent[v] === v) 
            return v;
        parent[v] = find(parent[v]);
        return parent[v];
    }

    function union(a, b) {
        a = find(a);
        b = find(b);
        if (a !== b) {
            if (size[a] < size[b]) {
                [a, b] = [b, a];
            }
            parent[b] = a;
            size[a] += size[b];
            return true;
        }
        return false;
    }

    let comp = n;
    let res = Number.MAX_VALUE;
    let opt = [];

    for (let i = 0; i < edges.length; i++) {
        if (edges[i][3] === 1) {
            if (union(edges[i][0], edges[i][1])) {
                comp--;
                res = Math.min(res, edges[i][2]);
            } else {
                return -1;
            }
        }
    }

    if (comp === 1) {
        return res;
    }

    for (let i = 0; i < edges.length; i++) {
        if (edges[i][3] === 0) {
            opt.push(i);
        }
    }

    opt.sort((a, b) => edges[b][2] - edges[a][2]);

    let stab = [];

    for (let i of opt) {
        if (union(edges[i][0], edges[i][1])) {
            comp--;
            stab.push(edges[i][2]);
            if (comp === 1) {
                break;
            }
        }
    }

    if (comp > 1) {
        return -1;
    }

    for (let i = 1; i <= Math.min(stab.length, k); i++) {
        stab[stab.length - i] *= 2;
    }

    let minStab = Math.min(...stab);

    return Math.min(res, minStab);
};