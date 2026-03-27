let areSimilar = function (mat, k) {
    const n = mat.length, l = mat[0].length;
    k = k % l;

    for (let i = 0; i < n; i++) {
        const el1 = [...mat[i].slice(k), ...mat[i].slice(0, k)].join('');
        const el2 = mat[i].join('');
        if (el1 !== el2) return false;
    }

    return true;
}