// 中国象棋：马走日，8行8列，将马放在任意一个位置，求他能遍历的最大点数（任意一个位置只能遍历一遍）
// 优化：使用 stack 模拟 DFS 的过程，否则绝对巨慢

function getMaxSteps(x, y, visited, count) {
    if(
        x>= 0 && y>= 0 &&
        x< visited.length && y< visited[0].length &&
        visited[x][y] === 0
    ) {
        var dx = [1,1,2,2,-1,-1,-2,-2],
            dy = [2,-2,1,-1,2,-2,1,-1],
            max = 0;
        visited[x][y] = 1;
        count++;
        var max = count;
        // 递归
        for(let i=0;i< 8; i++) {
            var newX = x + dx[i];
            var newY = y + dy[i];
            max = Math.max(getMaxSteps(newX, newY, visited, count),max);
        }
        // 回溯
        visited[x][y] = 0;
        return max;
    }
    else {
        return count;
    }
}

var visited = Array(8).fill(0).map(v => Array(8).fill(0));
console.log(getMaxSteps(0, 1, visited, 0));