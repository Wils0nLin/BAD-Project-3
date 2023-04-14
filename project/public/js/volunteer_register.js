const form = document.querySelector("#register-form");

function check_password_again() {
    const passwordInput = document.getElementById("v_password").value;
    const confirmInput = document.getElementById("v_password_check").value;

    if (passwordInput != confirmInput) {
        alert("兩次密碼須一致");
    } else {
        return passwordInput, confirmInput;
    }
}

function check_phone_number() {
    const phone_number = document.getElementById("phone_number").value;
    if (phone_number.length !== 8) {
        alert("電話必須為8位數字");
    }
    return phone_number;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const v_username = form.v_username.value;
    const v_password = form.v_password.value;
    const v_name = form.v_name.value;
    const v_email = form.v_email.value;
    const v_birth_date = form.v_birth_date.value;
    const v_phone_number = form.v_phone_number.value;
    const v_address = form.v_address.value;
    let formObject = {
        v_username,
        v_password,
        v_name,
        v_email,
        v_birth_date,
        v_phone_number,
        v_address,
    };

    const response = await fetch("/volunteer_register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
    });

    if (response.status === 200) {
        const data = await response.json();
        window.location = "/volunteer_login.html";
        alert("登記成功");
    } else {
        alert("登記失敗");
    }
});
