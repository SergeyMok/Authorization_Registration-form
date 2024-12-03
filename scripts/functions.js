
export function validateInputBox(inputBox, errorText) {
    if (typeof(errorText) === "string") {
        inputBox.previousElementSibling.style.color = 'red';
        inputBox.style.borderColor = 'red';
        inputBox.nextElementSibling.textContent = errorText;
        inputBox.nextElementSibling.style.display = 'block';
        return false;
    } else {
        inputBox.previousElementSibling.style.color = 'black';
        inputBox.style.borderColor = 'black';
        inputBox.nextElementSibling.style.display = 'none';
        return true;
    }
}


function validateEmail(inputBoxEmail) {
    const email = inputBoxEmail?.value;
    if (email === null || email === undefined || email === "") {
        return validateInputBox(inputBoxEmail, "Поле обязательно для заполнения");
    }

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validateInputBox(inputBoxEmail, email.match(pattern) ? null : "Email невалидный");
}


function validatePassword(inputBoxPassword) {
    const pw = inputBoxPassword?.value;
    if (pw === null || pw === undefined || pw === "") {
        return validateInputBox(inputBoxPassword, "Поле обязательно для заполнения");
    }

    return validateInputBox(inputBoxPassword, pw.length >= 8 ? null : "Пароль должен содержать как минимум 8 символов");
}

function validateCheckBox(checkBox) {
    const errorLabel = checkBox.nextElementSibling.nextElementSibling;
    if (checkBox.checked) {
        errorLabel.style.display = 'none';
        checkBox.previousElementSibling.style.color = 'black';
        return true;
    } else {
        errorLabel.style.display = 'block';
        checkBox.previousElementSibling.style.color = 'red';
        return false;
    }
}

export function validateAll(inputBoxEmail, inputBoxPassword, checkBox) {
    const bool1 = validateEmail(inputBoxEmail);
    const bool2 = validatePassword(inputBoxPassword);
    const bool3 = validateCheckBox(checkBox);
    return bool1 && bool2 && bool3;
}

export function isUserRegistered(email) {
    if (localStorage.length === 0) {
        return false;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    if (users === null || users === undefined || users === "") {
        return false;
    }

    const userPassword = users[email];
    return userPassword !== undefined && userPassword !== null;
}

export function registerUser(email, password) {
    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
        users[email] = password;
        localStorage.setItem("users", JSON.stringify(users));
    } else {
        users = JSON.parse("{}");
        users[email] = password;
        localStorage.setItem("users", JSON.stringify(users));
    }
}

/**
 *  Авторизация юзера
 * @param {string} email - email юзера
 * @param {string} password - Пароль юзера
 * @returns {number} 0 - успех. 1 - юзер не зарегистрирован. 2 - неверный пароль.
 */
export function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users === null || users === undefined || users === "") {
        return 1;
    }

    const userPassword = users[email];
    if (userPassword === undefined || userPassword === null || typeof(userPassword) !== "string") {
        return 1;
    }

    return userPassword === password ? 0 : 2;
}