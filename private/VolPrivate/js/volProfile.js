window.onload = () => {
    volProfileData();
};

async function volProfileData() {
    const resp = await fetch("/volunteerProfileData");
    const volProfile = await resp.json();
    console.log(volProfile);
    let volNameHtml = "";
    let volBoxHtml = "";
    document.querySelector("#vol-name").innerHTML = "";
    document.querySelector("#vol-info").innerHTML = "";

    volNameHtml = `<div class="info-title"><i class="fa-solid fa-user-check"></i>用戶姓名</div>
    <div class="text-box text-box-name">${volProfile.v_name}</div>`;

    volBoxHtml = `<div class="data-col">
        <div class="info-title"><i class="fa-solid fa-envelope"></i>電郵地址</div>  
            <div class="text-box">${volProfile.v_email}</div>  
        </div>
        <div class="data-col data-col-spread">
            <div>
                <div class="info-title"><i class="fa-solid fa-calendar-days"></i>出生日期</div>
                <div class="text-box text-box-spread">${new Date(
                    volProfile.v_birth_date
                ).getFullYear()}年${new Date(volProfile.v_birth_date).getMonth() + 1}月${new Date(
        volProfile.v_birth_date
    ).getDate()}日</div>
            </div>
            <div style="margin-left: 10px;">
                <div class="info-title"><i class="fa-solid fa-phone-flip"></i>電話號碼</div>
                <div class="text-box text-box-spread">${volProfile.v_phone_number}</div>
            </div>
        </div>
    <div class="data-col">
        <div class="info-title"><i class="fa-solid fa-location-dot"></i>用戶地址</div>
        <div class="text-box">${volProfile.v_address}</div>
    </div>
    <div id="submit-box">
    <a href="vol_selfProfileEdit.html"><input type="button" class="dark-button" id="change-button" value="修改資料"></a>
  </div>`;

    document.querySelector("#vol-name").innerHTML = volNameHtml;
    document.querySelector("#vol-info").innerHTML = volBoxHtml;
}
