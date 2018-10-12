// DFS + 回溯
function hasPath(matrix, rows, cols, path) {
    // write code here
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === path[0]) {
                var visited = Array(rows).fill(0).map(v => Array(cols).fill(0))
                var rst = dfs(matrix, i, j, visited, 0, path);
                if (rst)
                    return true;
            }
        }
    }
    return false;
}

function dfs(matrix, i, j, visited, index, path) {
    if (
        i >= 0 && j >= 0 && 
        i < matrix.length && j < matrix[0].length && 
        matrix[i][j] === path[index] && 
        visited[i][j] === 0
    ) {
        visited[i][j] = 1;
        index++;
        if (index === path.length)
            return true;
        // DFS
        var flag = dfs(matrix, i + 1, j, visited, index, path) ||
            dfs(matrix, i - 1, j, visited, index, path) ||
            dfs(matrix, i, j + 1, visited, index, path) ||
            dfs(matrix, i, j - 1, visited, index, path)
        // 回溯
        visited[i][j] = 0;
        return flag;
    }
    else {
        return false;
    }
}

var matrix = [
        [1, 2, 3, 4, 5],
        [1, 2, 4, 9, 2],
        [5, 8, 0, 2, 3],
        [3, 4, 7, 7, 3],
        [1, 5, 7, 2, 4],
    ],
    cols = 5,
    rows = 5,
    path = '1 2 3 4 0 7 7 2 4';
console.log(hasPath(matrix, rows, cols, path.split(' ').map(v => parseInt(v))));