window.onload = () => {
    userProfile();
};

function check_password_again() {
    const passwordInput = document.getElementById("u_password").value;
    const confirmInput = document.getElementById("u_password_check").value;

    if (passwordInput != confirmInput) {
        alert("兩次密碼須一致");
    } else {
        return passwordInput, confirmInput;
    }
}

async function userProfile() {
    const resp = await fetch("/user_profile");
    const profile = await resp.json();
    console.log(profile);

    let userNameHtml = "";
    document.querySelector("#user-name").innerHTML = "";

    userNameHtml = `
    <label class="u-label u-label-1"><i class="fa-solid fa-user-check"></i> 姓名</label>
    <input type="text" readonly="readonly" placeholder="${profile.u_name}" class="u-border-2 u-border-palette-3-light-1 u-input u-input-rectangle u-radius-10 u-input-1" required=""/>
    `;

    document.querySelector("#user-name").innerHTML = userNameHtml;

    const formData = document.querySelector("#reset-form");

    formData.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = event.target;
        const password = formData.u_password.value;
        let formObject = {
            password,
        };
        
        const response = await fetch(`/public_user_reset`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObject),
        });

        if (response.status === 200) {
            const data = await response.json();
            window.location = "/public_user_login.html";

            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}
