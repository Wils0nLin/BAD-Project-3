const form = document.querySelector("#register-form");

function check_password_again() {
    const passwordInput = document.getElementById("u_password").value;
    const confirmInput = document.getElementById("u_password_check").value;

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
    const u_username = form.u_username.value;
    const u_password = form.u_password.value;
    const u_name = form.u_name.value;
    const u_email = form.u_email.value;
    const u_birth_date = form.u_birth_date.value;
    const u_phone_number = form.u_phone_number.value;
    const u_address = form.u_address.value;
    const home_size_id = form.home_size_id.value;
    const income_id = form.income_id.value;
    const existed_pet = form.existed_pet.value;
    const pet_before = form.pet_before.value;
    const is_allergy = form.is_allergy.value;
    const smoker = form.smoker.value;
    const knowledge = form.knowledge.value;
    const future_plan = form.future_plan.value;

    let formObject = {
        u_username,
        u_password,
        u_name,
        u_email,
        u_birth_date,
        u_phone_number,
        u_address,
        home_size_id,
        income_id,
        existed_pet,
        pet_before,
        is_allergy,
        smoker,
        knowledge,
        future_plan,
    };

    const response = await fetch("/user_register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
    });

    if (response.status === 200) {
        const data = await response.json();
        window.location = "/user_login.html";
        alert("登記成功");
    } else {
        alert("登記失敗");
    }
});
