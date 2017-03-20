/**
 * Created by pompey on 2017/3/20.
 * 模拟queue
 */
window.onload = function () {
    //获取element
    const input = document.getElementById('input-text');
    const list = document.getElementById('list');
    let data = [];
    // let lis = list.children;
    //获取原数据
    // data = Array.from(lis, li => li.innerHTML);

    //校验是否输入数字
    function checkNum(num) {
        if (num == '') {
            return false;
        } else if (Number.isNaN(Number(num))) {
            return false;
        }
        return true;
    }

    //获取输入的数据
    function getInput() {
        let inText = input.value;
        input.value = '';
        let inputData = inText.split(/\s|,|，|、/);

        // if (checkNum(inText)) {
        //     return inText;
        // } else {
        //     throw new Error('请输入数字');
        // }
        return inputData;
    }

    function render(data) {
        let liStr = '';
        data.map(dataCell => liStr += '<li>' + dataCell + '</li>');
        list.innerHTML = liStr;
    }


    //绑定事件
    document.getElementById('left-push').addEventListener('click', function () {
        try {
            let inText = getInput();
            data.unshift(...inText);
            render(data);
        } catch (e) {
            alert(e.message);
        }
    });
    document.getElementById('right-push').addEventListener('click', function () {
        try {
            let inText = getInput();
            data.push(...inText);
            render(data);
        } catch (e) {
            alert(e.message);
        }
    });
    document.getElementById('left-pop').addEventListener('click', function () {
        if (data.length == 0) {
            alert('列表已空');
            return false;
        }
        alert(data.shift());
        render(data);

    });
    document.getElementById('right-pop').addEventListener('click', function () {
        if (data.length == 0) {
            alert('列表已空');
            return false;
        }
        alert(data.pop());
        render(data);

    });

    //事件代理
    list.addEventListener('click', function (e) {
        list.removeChild(e.target);
    });

    document.getElementById('search-btn').addEventListener('click', function () {
        let searchText = document.getElementById('search-text').value;
        let lis = list.children;
        for (let li of lis) {
            let index = li.innerHTML.indexOf(searchText);
            if (index != -1) {
                let oldText = li.innerHTML;
                li.innerHTML = oldText.substring(0, index) + '<span style="color:green;">'
                    + searchText + '</span>' + oldText.substring(index + searchText.length);
            }
        }
    });
};
