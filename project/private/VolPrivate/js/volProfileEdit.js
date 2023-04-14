window.onload = () => {
    volProfileData();
};

async function volProfileData() {
    const resp = await fetch("/volunteerProfileData");
    const volProfile = await resp.json();
    let volNameHtml = "";
    let volBoxHtml = "";
    document.querySelector("#vol-name").innerHTML = "";
    document.querySelector("#vol-info").innerHTML = "";

    const v_birth_date = volProfile.v_birth_date.substring(0, 10);

    volNameHtml = `<div class="info-title"><i class="fa-solid fa-user-check"></i>用戶姓名</div>
    <input type="text" class="text-box text-box-spread" value="${volProfile.v_name}"  name="v_name">`;

    volNameHtml = `<div class="info-title"><i class="fa-solid fa-user-check"></i>用戶姓名</div>
    <input type="text" class="text-box text-box-spread  text-box-name" value="${volProfile.v_name}"  name="v_name">`;

    volBoxHtml = `<div class="data-col">
        <div class="info-title"><i class="fa-solid fa-envelope"></i>電郵地址</div>  
            <input type="text" class="text-box text-box-profile" name="v_email" value="${volProfile.v_email}">  
        </div>
        <div class="data-col data-col-spread">
            <div>
                <div class="info-title"><i class="fa-solid fa-calendar-days"></i>出生日期</div>
                <input type="date" class="text-box text-box-spread" name="v_birth_date" value="${v_birth_date}" >
            </div>
            <div id="data-col-right">
                <div class="info-title"><i class="fa-solid fa-phone-flip"></i>電話號碼</div>
                <input type="text" class="text-box text-box-spread" name="v_phone_number" value="${volProfile.v_phone_number}">
            </div>
        </div>
    <div class="data-col">
        <div class="info-title"><i class="fa-solid fa-location-dot"></i>用戶地址</div>
        <input type="text" class="text-box text-box-profile" name="v_address" value="${volProfile.v_address}">
    </div>
    <div id="edit-box">
    <input type="submit" class="dark-button" id="change-button" value="提交修改">
  </div>`;

    document.querySelector("#vol-name").innerHTML = volNameHtml;
    document.querySelector("#vol-info").innerHTML = volBoxHtml;

    const formData = document.querySelector("#vol-info");

    formData.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = event.target;
        const v_name = document.querySelector(".text-box-name").value;
        const v_email = formData.v_email.value;
        const v_birth_date = formData.v_birth_date.value;
        const v_phone_number = formData.v_phone_number.value;
        const v_address = formData.v_address.value;

        let formObject = {
            v_name,
            v_email,
            v_birth_date,
            v_phone_number,
            v_address,
        };

        const response = await fetch(`/volunteer_register/${volProfile.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObject),
        });

        if (response.status === 200) {
            const data = await response.json();
            window.location = "/vol_selfProfile.html";
            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}
