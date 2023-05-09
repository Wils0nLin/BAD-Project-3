window.onload = () => {
    userProfile();
};

async function userProfile() {
    const resp = await fetch("/user_profile");
    const profile = await resp.json();

    let userNameHtml = "";
    document.querySelector("#user-name").innerHTML = "";

    userNameHtml = `
    <div class="info-title"><i class="fa-solid fa-user-check"></i>用戶姓名</div>
    <div class="text-box text-box-spread">${profile.u_username}</div>
    `;

    document.querySelector("#user-name").innerHTML = userNameHtml;

    const formData = document.querySelector("#user-info");
}
