let account = localStorage.getItem('account');

if (typeof (Storage) !== "undefined") {
    if (!account) {
        login();
    } else {
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.logout').style.display = 'inline';
    }
} else {
    swal({
        title: "Oops!",
        text: "Your browser can not support localstorage.",
        icon: "error"
    });
}

function login() {
    swal({
            title: "請輸入使用者名稱:",
            icon: "info",
            content: "input"
        })
        .then((value) => {
            console.log(value);
            if (value === undefined || value === null) {
                login();
                return false;
            }

            localStorage.setItem('account', value);
            account = localStorage.getItem('account');
            location.reload();
        });
}

function logout() {
    swal({
        title: "確定要登出?",
        icon: "warning",
        buttons: true
    }).then((e) => {
        if (e) {
            localStorage.clear();
            location.reload();
        }
    });
}