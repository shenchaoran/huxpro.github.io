# rebase 命令理解
对一个分支做**变基**操作
# 应用场景一：合并多次提交记录
**rebase**

    - git rebase -i <commitId>^
    - git rebase -i HEAD~4: 从 HEAD 版本开始往过去数4个版本
    - git rebase -i <startpoint> <endpoint>
      - endpoint 省略时为当前分支的 HEAD commit
      - （startpoint, endpoint]，前开后闭区间
  
**如果有冲突，先解决冲突**

    - git status
    - 切到 vscode git 面板，resolve conflict
    - git add .
    - git rebase --continue
    - 提交 commit comment

**如果退出了 vim,**

    - git --rebase --edit-todo
    - git rebase --continue

**放弃 rebase: git rebase --abort**
**rebase 合并的多个 commit 的选择**
通过以下命令选择 rebase 的提交记录：

```
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit. **忽略前几次的 commit comment message**
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit. **不参与提交记录的合并**
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
```

一般是如下形式：
```
# 使用最前面的  提交 comment，后续的 commit 忽略 comment
pick 3ca6ec3   '注释**********'
squash 1b40566   '注释*********'
squash 53f244a   '注释**********'
```

# 应用场景二：去除分支合并记录
rebase 和 merge 操作通常进行对比：
- rebase: 无合并的记录
- merge: 有合并的记录

![](../img/in-post/git/git-rebase-merge.png)

# 注意事项
- rebase 改变了提交记录，属于危险操作
- rebase 要保证在只有自己一人使用的分支上使用

# 参考
- [彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)