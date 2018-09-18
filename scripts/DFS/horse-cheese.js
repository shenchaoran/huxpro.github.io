// 中国象棋：马走日，8行8列，将马放在任意一个位置，求他能遍历的最大点数（任意一个位置只能遍历一遍）
// 优化：使用 stack 模拟 DFS 的过程，否则绝对巨慢

function getMaxSteps(x0, y0) {
    var matrix = Array(8).fill(0).map(v => Array(8).fill(0));
    var dx = [1,1,2,2,-1,-1,-2,-2],
        dy = [2,-2,1,-1,2,-2,1,-1];
    let dfs = (i, j) => {
        var hasNext = false;
        matrix[newX][newY] = 1;
        for(let i=0;i<8; i++) {
            var newX = i + dx[i];
            var newY = j + dy[j];
            if(matrix[newX][newY] === 0 && newX>=0 && newY<8 && newY>=0 && newY<8) {
                hasNext = true;
                // 递归
                dfs(newX, newY);
            }
        }
        // 回溯
        matrix[newX][newY] = 0;
    };
}