function parseQueryString(url, key){
    var reg = new RegExp(`^${key}=`);
	var item = url.split(/\?|\&/).find(v => v.match(reg));
    var result = item? item.replace(reg, ''): '_EMPTY_';
	return result;
}

const _ret = eval(read_line());
print(_ret)

// 83%