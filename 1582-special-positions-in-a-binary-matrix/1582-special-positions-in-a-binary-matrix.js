var numSpecial = function(mat) {
    let m = mat.length
    let n = mat[0].length
    let count = 0

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            if (mat[i][j] === 1) {

                let special = true

                for (let k = 0; k < n; k++) {
                    if (k !== j && mat[i][k] === 1) {
                        special = false
                        break
                    }
                }

                for (let k = 0; k < m && special; k++) {
                    if (k !== i && mat[k][j] === 1) {
                        special = false
                        break
                    }
                }

                if (special)
                    count++
            }
        }
    }

    return count
};