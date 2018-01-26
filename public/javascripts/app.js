if (account) {

    console.log('account:' + account);

    socket = io.connect('ws://127.0.0.1:3001');
    // socket.emit("message", 'hi');

    // // 歷史訊息
    socket.on('history', (obj) => {

        console.log(obj);

        if (obj.length > 0) {
            appendData(obj);
        }

    });

    socket.on('message', (obj) => {
        appendData([obj]);
    });
}

document.querySelector('#btnAddMsg').addEventListener('click', () => {
    sendData()
});
document.querySelector('input').addEventListener('keypress', (e) => {
    if (e.code == 'Enter') {
        sendData();
        document.querySelector('input').value = '';
    }
});

function sendData() {
    let msg = document.querySelector('input').value;
    if (!msg) {
        alert('請輸入訊息!');
        return;
    }
    let data = {
        name: 'Robby',
        msg: msg,
    };
    socket.emit('message', data);
}

function scrollWindow() {
    let h = document.querySelector('.speeches');
    h.scrollTo(0, h.scrollHeight);
}

function appendData(obj) {
    obj.forEach(element => {

        let el = document.querySelector('.speeches');

        //   <div class="speech">
        //     <div class="avatar">
        //       <img src="./images/user.png">
        //     </div>
        //     <div class="content">
        //       <div class="inline author">Yami Odymel</div>
        //       <div class="text">：嗨！早安。</div>
        //     </div>
        //   </div>

        let el_circular = document.createElement('div');
        el_circular.className = element.name == account ? 'right circular group' : 'circular group';


        let el_speech = document.createElement('div');
        el_speech.className = 'speech';

        let el_avatar = document.createElement('div');
        el_avatar.className = 'avatar';

        let el_img = document.createElement('img');
        el_img.src = element.name == account ? './images/user.png' : './images/user1.png';

        let el_content = document.createElement('div');
        el_content.className = 'content';

        let el_content_author = document.createElement('div');
        el_content_author.className = 'inline author';
        el_content_author.innerHTML = element.name == account ? '' : element.name;

        let el_content_text = document.createElement('div');
        el_content_text.className = 'text';
        el_content_text.innerHTML = element.name == account ? element.msg : '：' + element.msg;

        el_avatar.appendChild(el_img);
        el_speech.appendChild(el_avatar);
        el_content.appendChild(el_content_author);
        el_content.appendChild(el_content_text);
        el_speech.appendChild(el_content);
        el_circular.appendChild(el_speech);
        el.appendChild(el_circular);

        scrollWindow();
    });
}