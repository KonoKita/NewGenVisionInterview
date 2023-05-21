class UserService {
    username = ''; 
    password = '';

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // я отказался от геттеров и сеттеров в данном кейсе,
    // т.к. username возвращает тоже что UserService.username
    // а password не несет никакой полезной нагрузки

    static async authenticateUser(username, password) {
        let url = 'https: //examples.com/api/user/authenticate';
        let usesAuthenticateResult = await fetch(url, {//fetch удобнее и читается лучше
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            .then(response => response.json())
            .then(data => function () {
                let result = false;

                if (data.status == '200') {
                    result = true
                }
                else {
                    result = data
                }

                return result;
            });
        return usesAuthenticateResult;
    }
}


const form = document.querySelector('.form');
const formButton = form.querySelector('.form__confirm-button');

formButton.onclick = function() {//привык писать на чистом js т.к. его функционал сейчас jquery не уступает
    let username = form.querySelector('.form__login-input').innerText;
    let password = form.querySelector('.form__password-input').innerText;
    UserService.authenticateUser(username, password)//на промисах т.к. fetch и xhr асинхронные
    .then(usesAuthenticateResult => function () {
        if (usesAuthenticateResult == true) {
            document.location.href = '/home';
        } else {
            alert(usesAuthenticateResult.error);
        }
    });
};