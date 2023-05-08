window.onload = () => {
    userProfileData();
};

async function userProfileData() {
    const resp = await fetch("/user_profile");
    const userProfile = await resp.json();
    console.log(userProfile);
    // console.log(userProfile.u_name);
    const smoker = userProfile.smoker;
    const existedPet = userProfile.existed_pet;
    const exp = userProfile.pet_before;
    const isAllergy = userProfile.is_allergy;
    let userNameHtml = "";
    let userBoxHtml = "";
    document.querySelector("#user-name").innerHTML = "";
    document.querySelector("#user-info").innerHTML = "";

    userNameHtml = `
    <div class="info-title"><i class="fa-solid fa-user-check"></i>用戶姓名</div>
    <div class="text-box text-box-spread">${userProfile.u_name}</div>
    `;

    userBoxHtml = `
    <div class="data-col">
      <div class="info-title"><i class="fa-solid fa-envelope"></i>電郵</div>
      <div class="text-box text-box-profile">${userProfile.u_email}</div>
    </div>
    <div class="data-col data-col-spread">
      <div>
        <div class="info-title"><i class="fa-solid fa-calendar"></i>出生日期</div>
        <div class="text-box text-box-spread">${new Date(
            userProfile.u_birth_date
        ).getFullYear()}年${new Date(userProfile.u_birth_date).getMonth() + 1}月${new Date(
        userProfile.u_birth_date
    ).getDate()}日</div>
      </div>
      <div id="data-col-right">
        <div class="info-title"><i class="fa-solid fa-phone-flip"></i>電話</div>
        <div class="text-box text-box-spread">${userProfile.u_phone_number}</div>
      </div>
    </div>
    <div class="data-col" class="info-title">
      <div><i class="fa-solid fa-location-dot"></i>地址</div>
      <div class="text-box text-box-profile">${userProfile.u_address}</div>
    </div>
    <div class="data-col data-col-spread">
      <div>
        <div><i class="fa-solid fa-house-chimney"></i>居住尺數</div>
        <div class="text-box text-box-spread">${userProfile.home_size}</div>
      </div>
      <div id="data-col-right">
        <div><i class="fa-solid fa-sack-dollar"></i>家庭總收入</div>
        <div class="text-box text-box-spread">${userProfile.income_value}</div>
      </div>
    </div>
    <div class="data-col" id="data-col-radio">
    <div id="data-col-left">
      <div><i class="fa-solid fa-paw"></i>是否有養貓經驗？</div>
      <label>是</label>
      <input type="radio" ${exp ? "checked" : ""}>
      <label>否</label>
      <input type="radio" ${!exp ? "checked" : ""}>
  </div>
  <div id="data-col-right">
      <div><i class="fa-solid fa-cat"></i>是否有貓及其他寵物？</div>
      <label>是</label>
      <input type="radio" ${existedPet ? "checked" : ""} >
      <label>否</label>
      <input type="radio" ${!existedPet ? "checked" : ""}>
    </div>
  </div>
  <div class="data-col" id="data-col-radio">
        <div id="data-col-left">
      <div><i class="fa-solid fa-joint"></i>有否吸煙？</div>
      <label>是</label>
      <input type="radio"  ${smoker ? "checked" : ""}>
      <label>否</label>
      <input type="radio"  ${!smoker ? "checked" : ""}>
    </div>
    <div id="data-col-right">
      <div><i class="fa-solid fa-stethoscope"></i>哮喘，其他呼吸系統疾病？</div>
      <label>是</label>
      <input type="radio" ${isAllergy ? "checked" : ""}>
      <label>否</label>
      <input type="radio" ${!isAllergy ? "checked" : ""}>
    </div>
  </div>
  <div class="data-col">
    <div><i class="fa-solid fa-shield-cat"></i>對貓隻護理及知識有多認識</div>
    <div class="text-box text-box-profile">${userProfile.knowledge}</div>
  </div>
  <div class="data-col">
    <div><i class="fa-solid fa-laptop-file"></i>會否將貓貓例入你未來的計劃內</div>
    <div class="text-box text-box-profile">${userProfile.future_plan}</div>
  </div>
  <div id="submit-box">
    <a href="user_selfProfileEdit.html"><input type="button" class="dark-button" id="change-button" value="修改資料"></a>
  </div>`;

    document.querySelector("#user-name").innerHTML = userNameHtml;
    document.querySelector("#user-info").innerHTML = userBoxHtml;
}
