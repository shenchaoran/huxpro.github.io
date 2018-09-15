function sortStudents(students) {
    return students.sort(function(v1, v2) {
        return v1.class - v2.class === 0? v2.score - v1.score: v1.class - v2.class;
    })
}

var stu = [{"name":"张三","class":2,"score":64},{"name":"李四","class":1,"score":80},{"name":"王五","class":1,"score":80},{"name":"赵六","class":4,"score":94}];
sortStudents(stu);