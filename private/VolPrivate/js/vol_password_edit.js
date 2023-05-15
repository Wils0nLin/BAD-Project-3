window.onload = () => {
    volProfile();
};

function check_password_again() {
    const passwordInput = document.getElementById("v_password").value;
    const confirmInput = document.getElementById("v_password_check").value;

    if (passwordInput != confirmInput) {
        alert("兩次密碼須一致");
    } else {
        return passwordInput, confirmInput;
    }
}

async function volProfile() {
    const resp = await fetch("/volunteer_profile");
    const profile = await resp.json();
    console.log(profile);

    let userNameHtml = "";
    document.querySelector("#user-name").innerHTML = "";

    userNameHtml = `
    <label class="u-label u-label-1"><i class="fa-solid fa-user-check"></i> 姓名</label>
    <input type="text" readonly="readonly" placeholder="${profile.v_name}" class="u-border-2 u-border-custom-color-3 u-input u-input-rectangle u-radius-10 u-input-1" required=""/>
    `;

    document.querySelector("#user-name").innerHTML = userNameHtml;

    const formData = document.querySelector("#reset-form");

    formData.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = event.target;
        const password = formData.v_password.value;
        let formObject = {
            password,
        };
        
        const response = await fetch(`/public_volunteer_reset`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObject),
        });

        if (response.status === 200) {
            const data = await response.json();
            window.location = "/public_volunteer_login.html";

            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}