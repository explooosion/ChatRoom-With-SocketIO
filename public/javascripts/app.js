if (account) {

    // 新增使用者    

    console.log('account:' + account);

    socket = io.connect('ws://218.161.68.185:3001');

    socket.emit('clients', account);

    // 歷史訊息
    socket.on('history', (obj) => {
        if (obj.length > 0) {
            appendData(obj);
        }
    });

    socket.on('clients', (obj) => {
        console.log(obj);
        document.querySelector('.online').innerHTML = obj.clients;
        if (obj.user !== undefined) broadcast(obj.user);
    });

    socket.on('message', (obj) => {
        appendData([obj]);
    });
}

document.querySelector('#btnAddMsg').addEventListener('click', () => {
    sendData();
});
document.querySelector('input').addEventListener('keypress', (e) => {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
        sendData();
    }
});

/**
 * 傳送訊息
 */
function sendData() {
    let msg = document.querySelector('input').value;
    if (!msg) {
        swal({
            title: "請輸入訊息!",
            icon: "error",
        });
        return;
    }
    let data = {
        name: account,
        msg: msg,
    };
    socket.emit('message', data);
    document.querySelector('input').value = '';
}

/**
 * 卷軸捲動至下
 */
function scrollWindow() {
    let h = document.querySelector('.speeches');
    h.scrollTo(0, h.scrollHeight);
}

/**
 * 聊天紀錄
 * @param {聊天訊息} obj 
 */
function appendData(obj) {

    let el = document.querySelector('.speeches');
    let html = el.innerHTML;

    obj.forEach(element => {

        // other peaple
        //   <div class="speech">
        //     <div class="avatar">
        //       <img src="./images/user.png">
        //     </div>
        //     <div class="content">
        //       <div class="inline author">Yami Odymel</div>
        //       <div class="text">：嗨！早安。</div>
        //     </div>
        //     <div class=" time"></div>
        //   </div>

        // myself
        //   <div class="speech">
        //     <div class="group">
        //       <div class="avatar">
        //         <img src="./images/user.png">
        //       </div>
        //       <div class="content">
        //         <div class="inline author">Yami Odymel</div>
        //         <div class="text">：嗨！早安。</div>
        //       </div>
        //     <div class=" time"></div>
        //     </div>
        //   </div>

        html +=
            `
            <div class="${element.name == account ? 'right circular group' : 'circular group'}">
                <div class="speech">
                    ${element.name == account? "<div class='group'>":''}
                        <div class="avatar">
                            <img src="${element.name == account ? './images/user.png' : './images/user1.png'}">
                        </div>
                        <div class="content">
                            <div class="inline author">${element.name == account ? '' : element.name}</div>
                            <div class="text">${element.name == account ? element.msg : '：' + element.msg}</div> 
                        </div>  
                        <div class=" time">${moment(element.time).fromNow()}</div>
                    ${element.name == account? "</div>":''}
                </div>
            </div>
            `;
    });

    el.innerHTML = html.trim();
    scrollWindow();

}

/**
 * 廣播有人進來
 * @param {暱稱} obj 
 */
function broadcast(obj) {

    // <div class="speech">
    //     <div class="broadcast">
    //         <i class="announcement icon"></i>Robby 溜了進來。
    //     </div>
    // </div>

    let el = document.querySelector('.speeches');
    let html = el.innerHTML;

    html +=
        `
        <div class="speech">
            <div class="broadcast">
                <i class="announcement icon"></i>${obj} 溜了進來。
            </div>
        </div>
        `;

    el.innerHTML = html.trim();
    scrollWindow();

}