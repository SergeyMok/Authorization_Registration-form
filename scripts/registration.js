import { validateInputBox } from "./functions.js";
import { validateAll } from "./functions.js";
import { isUserRegistered } from "./functions.js";
import { registerUser } from "./functions.js";

const inputBoxEmail = document.querySelector("#email-registration");
const inputBoxPassword = document.querySelector("#password-registration");
const checkBox = document.querySelector("#checkbox-registration");
const btnAuthorize = document.querySelector("#btn-authorize");
const btnRegister = document.querySelector("#register");

inputBoxEmail.addEventListener("focus", (e) => {
    validateInputBox(e.target);
});

inputBoxPassword.addEventListener("focus", (e) => {
    validateInputBox(e.target);
});

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateAll(inputBoxEmail, inputBoxPassword, checkBox)) {
        if (isUserRegistered(inputBoxEmail.value)) {
            const errorText = "Такой пользователь уже зарегистрирован!";
            validateInputBox(inputBoxEmail, errorText);
            alert(errorText);
            return;
        }

        registerUser(inputBoxEmail.value, inputBoxPassword.value);
        document.location.href = "regtrue.html";
    }
});

btnAuthorize.addEventListener("click", (e) => {
    e.preventDefault();
    document.location.href = "entrance.html";
});