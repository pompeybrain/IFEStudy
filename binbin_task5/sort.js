/**
 * Created by pompey on 2017/3/20.
 * 模拟queue
 */
window.onload = function () {
    //获取element
    const input = document.getElementsByTagName('input')[0];
    const list = document.getElementById('list');
    let lis = [...list.children];
    let data = [90, 20, 80, 44, 83, 12, 40, 30, 50];

    //获取原数据
    // data = Array.from(lis, li => li.innerHTML);

    //校验是否输入数字
    function checkNum (num) {
        if (num == '') {
            return false;
        } else if (Number.isNaN(Number(num))) {
            return false;
        } else if (num < 10 || num > 100) {
            return false;
        }
        return true;
    }

    //获取输入的数据
    function getInput () {
        if (data.length > 60) {
            throw new Error('Li的数量超过60个了');
        }
        let inText = input.value;
        input.value = '';
        if (checkNum(inText)) {
            return inText;
        } else {
            throw new Error('请输入10-100的数字');
        }
    }

    function render (data) {
        list.innerHTML = '';//清空原li
        data.map(dataCell => {
            let liItem = document.createElement('li');
            liItem.style.height = dataCell * 2 + 'px';
            list.appendChild(liItem);
        });
    }

    render(data);

    //绑定事件
    document.getElementById('left-push').addEventListener('click', function () {
        try {
            let inText = getInput();
            data.unshift(inText);
            render(data);
        } catch (e) {
            alert(e.message);
        }
    });
    document.getElementById('right-push').addEventListener('click', function () {
        try {
            let inText = getInput();
            data.push(inText);
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
        if (e.target.nodeName == 'LI') {
            list.removeChild(e.target);
        }

    });


    //选择排序
    document.getElementById('select-sort').addEventListener('click', function () {
        let time = 0;
        for (let i = 0; i < data.length - 1; i++) {
            (function (i, time) {
                setTimeout(function () {
                    let minIndex = i;
                    for (let j = i + 1; j < data.length; j++) {
                        if (data[j] < data[minIndex]) {
                            minIndex = j;
                        }
                    }
                    let temp = data[i];
                    data[i] = data[minIndex];
                    data[minIndex] = temp;
                    render(data);
                }, time * 400);
            })(i, time);
            time++;
            //选择剩下的数中最小的索引
        }
    });


    //冒泡排序
    document.getElementById('bubble-sort').addEventListener('click', function () {
        let lis = [...list.children];
        let time = 0;//计数
        for (let i = data.length; i > 1; i--) {
            for (let j = 0; j < i - 1; j++) {
                (function (i, j, time) {
                    setTimeout(function () {
                        if (data[j] > data[j + 1]) {
                            let temp = data[j];
                            data[j] = data[j + 1];
                            data[j + 1] = temp;
                            render(data);
                        }
                    }, time * 300);
                })(i, j, time);
                time++;
            }
        }
    });
    //插入排序
    document.getElementById('insert-sort').addEventListener('click', function () {
        let time = 0;//计数
        for (let i = 1; i < data.length; i++) {
            for (let j = i; j > 0; j--) {
                (function (i, j, time) {
                    setTimeout(function () {
                        if (data[j] < data[j - 1]) {
                            let temp = data[j];
                            data[j] = data[j - 1];
                            data[j - 1] = temp;
                            render(data);
                        }
                    }, time * 400);
                })(i, j, time);
                time++
            }
        }
    });

    function quickSort (arr, left, right) {
        if (left >= right) {
            return;
        }
        // console.log('quick');
        let i = left;
        let j = right;
        let k = left;
        for (; i < j;) {
            // console.log(i);
            // console.log(j);
            // console.log(data);
            let lower = k;
            let bigger = k;
            for (; i <= j; i++) {
                if (data[i] > data[k]) {
                    bigger = i;
                    break;
                }
            }
            for (; j >= i; j--) {
                if (data[j] < data[k]) {
                    lower = j;
                    break;
                }
            }
            // console.log('k:', k);
            // console.log('j:', j);
            // console.log('lower:', lower);
            // console.log('i', i);
            // console.log('bigger', bigger);

            if (lower != bigger && lower != k && bigger != k) {
                // console.log(bigger);
                let temp = data[lower];
                data[lower] = data[bigger];
                data[bigger] = temp;
            }
            // console.log('data:', data);
        }
        // console.log('k:', k);
        // console.log('j:', j);
        // console.log('lower:', lower);
        // console.log('i', i);
        // console.log('bigger', bigger);
        let temp = data[j];
        data[j] = data[k];
        data[k] = temp;

        quickSort(arr, left, j - 1);
        quickSort(arr, j + 1, right);
    }

    document.getElementById('quick-sort').addEventListener('click', function () {
        let time = 0;
        quickSort(data, 0, data.length - 1);
        render(data);
    });


};
// //理解setTimeout
// (function () {
//
//     console.log('this is the start');
//
//     setTimeout(function cb() {
//         console.log('this is a msg from call back');
//     });
//
//     console.log('this is just a message');
//
//     setTimeout(function cb1() {
//         console.log('this is a msg from call back1');
//     }, 0);
//
//     console.log('this is the  end');
//
// })();