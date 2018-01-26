let account = localStorage.getItem('account');

if (typeof (Storage) !== "undefined") {
    if (!account) {
        login();
    } else {
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.logout').style.display = 'inline';
    }
} else {
    alert('Oops! Your browser can not support localstorage');
}

function login() {
    swal("please input your name:", {
            content: "input",
        })
        .then((value) => {

            console.log(value);
            if (value === undefined || value === null) {
                swal("can not empty!");
                return false;
            }

            localStorage.setItem('account', value);
            account = localStorage.getItem('account');

            document.querySelector('.login').style.display = 'none';
            document.querySelector('.logout').style.display = 'inline';
            location.reload();
        });
}

function logout() {

    localStorage.clear();
    location.reload();
}