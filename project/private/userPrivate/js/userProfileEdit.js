window.onload = () => {
    userProfileData();
};

async function userProfileData() {
    const resp = await fetch("/user_profile_data");
    const userProfile = await resp.json();
    console.log(userProfile);
    const smoker = userProfile.smoker;
    const existedPet = userProfile.existed_pet;
    const exp = userProfile.pet_before;
    const isAllergy = userProfile.is_allergy;
    const home_size_id = userProfile.home_size_id;
    const income_id = userProfile.income_id;

    let u_birth_date = userProfile.u_birth_date.substring(0, 10);

    userNameHtml = `<div class="info-title"><i class="fa-solid fa-user-check"></i>用戶姓名</div>
  <input type="text" class="text-box text-box-spread  text-box-name" value="${userProfile.u_name}" name="u_name">`;

    userBoxHtml = `<div class="data-col">
    <div class="info-title"><i class="fa-solid fa-envelope"></i>電郵</div>
    <input type="text" class="text-box text-box-profile" value="${
        userProfile.u_email
    }" name="u_email">
  </div>
  <div class="data-col data-col-spread">
    <div>
      <div class="info-title"><i class="fa-solid fa-calendar"></i>出生日期</div>
      <input type="date" class="text-box text-box-spread" 
      value="${u_birth_date}" name="u_birth_date">
    </div>
    <div id="data-col-right">
      <div class="info-title"><i class="fa-solid fa-phone-flip"></i>電話</div>
      <input type="text" class="text-box text-box-spread" value="${
          userProfile.u_phone_number
      }" name="u_phone_number">
    </div>
  </div>
  <div class="data-col" class="info-title">
    <div><i class="fa-solid fa-location-dot"></i>地址</div>
    <input type="text" class="text-box text-box-profile" value="${
        userProfile.u_address
    }" name="u_address">
  </div>
  <div class="data-col data-col-spread">
    <div>
      <div><i class="fa-solid fa-house-chimney"></i>居住尺數</div>
      <select name="home_size_id" class="text-box text-box-spread">
        <option value="1" ${home_size_id == "1" ? "selected" : ""}>400呎以下</option>
        <option value="2" ${home_size_id == "2" ? "selected" : ""}>401-800呎</option>
        <option value="3" ${home_size_id == "3" ? "selected" : ""}>801呎以上</option>
      </select>
     
    </div>
    <div id="data-col-right">
      <div><i class="fa-solid fa-sack-dollar"></i>家庭總收入</div>
      <select name="income_id" class="text-box text-box-spread">
        <option value="1" ${income_id == "1" ? "selected" : ""}>沒有收入</option>
        <option value="2" ${income_id == "2" ? "selected" : ""}>20000以下</option>
        <option value="3" ${income_id == "3" ? "selected" : ""}>60000以下</option>
        <option value="4" ${income_id == "4" ? "selected" : ""}>100000以上</option>
      </select>
    
    </div>
  </div>
  <div class="data-col" id="data-col-radio">
  <div id="data-col-left">
      <div><i class="fa-solid fa-paw"></i>是否有養貓經驗？</div>
      <label>是</label>
      <input type="radio" ${exp ? "checked" : ""} name="exp" value="1">
      <label>否</label>
      <input type="radio" ${!exp ? "checked" : ""} name="exp" value="0">
  </div>
  <div id="data-col-right">
      <div><i class="fa-solid fa-cat"></i>是否有貓及其他寵物？</div>
      <label>是</label>
      <input type="radio" ${existedPet ? "checked" : ""} name="existedPet" value="1">
      <label>否</label>
      <input type="radio" ${!existedPet ? "checked" : ""} name="existedPet" value="0">
    </div>
  </div>
  <div class="data-col" id="data-col-radio">
    <div id="data-col-left">
      <div><i class="fa-solid fa-joint"></i>有否吸煙？</div>
      <label>是</label>
      <input type="radio"  ${smoker ? "checked" : ""} name="smoker" value="1">
      <label>否</label>
      <input type="radio"  ${!smoker ? "checked" : ""} name="smoker" value="0">
    </div>
    <div id="data-col-right">
      <div><i class="fa-solid fa-stethoscope"></i>哮喘，其他呼吸系統疾病？</div>
      <label>是</label>
      <input type="radio" ${isAllergy ? "checked" : ""} name="isAllergy" value="1">
      <label>否</label>
      <input type="radio" ${!isAllergy ? "checked" : ""} name="isAllergy" value="0">
    </div>
  </div>
  <div class="data-col">
    <div><i class="fa-solid fa-shield-cat"></i>對貓隻護理及知識有多認識</div>
    <input type="text" class="text-box text-box-profile" value="${
        userProfile.knowledge
    }" name="knowledge">
  </div>
  <div class="data-col">
    <div><i class="fa-solid fa-laptop-file"></i>會否將貓貓例入你未來的計劃內</div>
    <input type="text" class="text-box text-box-profile" value="${
        userProfile.future_plan
    }" name="future_plan">
  </div>
  <div id="edit-box">
    <input type="submit" class="dark-button" id="change-button" value="提交修改">
  </div>`;

    document.querySelector("#user-name").innerHTML = userNameHtml;
    document.querySelector("#user-info").innerHTML = userBoxHtml;

    //Change User Profile DATA
    const formData = document.querySelector("#user-info");

    formData.addEventListener("submit", async (event) => {
        event.preventDefault();
        // console.log("click");
        const formData = event.target;
        const u_name = document.querySelector(".text-box-name").value;
        const u_email = formData.u_email.value;
        const u_birth_date = formData.u_birth_date.value;
        const u_phone_number = formData.u_phone_number.value;
        const u_address = formData.u_address.value;
        const home_size_id = formData.home_size_id.value;
        const income_id = formData.income_id.value;
        const exp = formData.exp.value;
        const existedPet = formData.existedPet.value;
        const smoker = formData.smoker.value;
        const isAllergy = formData.isAllergy.value;
        const knowledge = formData.knowledge.value;
        const future_plan = formData.future_plan.value;
        let formObject = {
            u_name,
            u_email,
            u_birth_date,
            u_phone_number,
            u_address,
            home_size_id,
            income_id,
            exp,
            existedPet,
            smoker,
            isAllergy,
            knowledge,
            future_plan,
        };

        // console.log(userProfile.id);
        const response = await fetch(`/user_profile_update/${userProfile.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObject),
        });

        if (response.status === 200) {
            const data = await response.json();
            window.location = "/user_selfProfile.html";
            console.log(data);
            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}
