window.onload = () => {
    userProfileData();
};

async function userProfileData() {
    const resp = await fetch("/user_profile");
    const userProfile = await resp.json();
    console.log(userProfile);

    const smoker = userProfile.smoker;
    const existedPet = userProfile.existed_pet;
    const exp = userProfile.pet_before;
    const isAllergy = userProfile.is_allergy;
    const home_size_id = userProfile.home_size_id;
    const income_id = userProfile.income_id;

    let u_birth_date = userProfile.u_birth_date.substring(0, 10);

    let userNameHtml = "";
    let formNameHtml = "";
    let formBirthHtml = "";
    let formPhoneHtml = "";
    let formEmailHtml = "";
    let formAddressHtml = "";
    let formHomeHtml = "";
    let formIncomeHtml = "";
    let formExpHtml = "";
    let formPetHtml = "";
    let formSmokeHtml = "";
    let formHealthHtml = "";
    let formKnowHtml = "";
    let formPlanHtml = "";
    document.querySelector("#user-name").innerHTML = "";
    document.querySelector("#form-name").innerHTML = "";
    document.querySelector("#form-birth").innerHTML = "";
    document.querySelector("#form-phone").innerHTML = "";
    document.querySelector("#form-email").innerHTML = "";
    document.querySelector("#form-address").innerHTML = "";
    document.querySelector("#form-home").innerHTML = "";
    document.querySelector("#form-income").innerHTML = "";
    document.querySelector("#form-exp").innerHTML = "";
    document.querySelector("#form-pet").innerHTML = "";
    document.querySelector("#form-smoke").innerHTML = "";
    document.querySelector("#form-health").innerHTML = "";
    document.querySelector("#form-know").innerHTML = "";
    document.querySelector("#form-plan").innerHTML = "";

    userNameHtml = `${userProfile.u_name}`;

    formNameHtml = `
    <label for="text-fade" class="u-label u-label-1"><i class="fa-solid fa-user-check"></i> 姓名</label>
    <input type="text" value="${userProfile.u_name}" id="u_name" name="u_name" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-1" required="required"/>
    `;

    formBirthHtml = `
    <label class="u-label u-label-2"><i class="fa-solid fa-calendar-days"></i> 出生日期</label>
    <input type="text" value="${u_birth_date}" id="u_birth_date" name="u_birth_date" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-2" required="" data-date-format="dd/mm/yyyy"/>
    `;

    formPhoneHtml = `
    <label class="u-label u-label-3"><i class="fa-solid fa-phone-flip"></i> 電話</label>
    <input type="number" pattern="\+?\d{0,3}[\s\(\-]?([0-9]{2,3})[\s\)\-]?([\s\-]?)([0-9]{3})[\s\-]?([0-9]{2})[\s\-]?([0-9]{2})" value="${userProfile.u_phone_number}" id="u_phone_number" name="u_phone_number" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-3" required=""/>
    `;

    formEmailHtml = `
    <label class="u-label u-label-4"><i class="fa-solid fa-envelope"></i> 電郵</label>
    <input type="email" value="${userProfile.u_email}" id="u_email" name="u_email" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-2" required="required"/>
    `;

    formAddressHtml = `
    <label class="u-label u-label-5"><i class="fa-solid fa-location-dot"></i> 地址</label>
    <input type="text" value="${userProfile.u_address}" id="u_address" name="u_address" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-2" required="required"/>
    `;

    formHomeHtml = `
    <label class="u-label u-label-6"><i class="fa-solid fa-house-chimney"></i> 居住尺數</label>
    <div class="u-form-select-wrapper">
        <select id="home_size_id" name="home_size_id" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-6" required="required">
            <option value="1" ${home_size_id == "1" ? "selected" : ""}>400呎以下</option>
            <option value="2" ${home_size_id == "2" ? "selected" : ""}>401-800呎</option>
            <option value="3" ${home_size_id == "3" ? "selected" : ""}>801呎以上</option>
        </select>                 
    </div>
    `;

    formIncomeHtml = `
    <label class="u-label u-label-7"><i class="fa-solid fa-sack-dollar"></i> 家庭總收入</label>
    <div class="u-form-select-wrapper">
        <select id="income_id" name="income_id" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-7" required="required">
            <option value="1" ${income_id == "1" ? "selected" : ""}>沒有收入</option>
            <option value="2" ${income_id == "2" ? "selected" : ""}>20000以下</option>
            <option value="3" ${income_id == "3" ? "selected" : ""}>60000以下</option>
            <option value="4" ${income_id == "4" ? "selected" : ""}>100000以上</option>
        </select>                 
    </div>
    `;

    formExpHtml = `
    <label class="u-label u-label-8"><i class="fa-solid fa-paw"></i> 是否有養貓經驗？</label>
    <div class="u-form-radio-button-wrapper">
        <div class="u-input-row">
            <input id="exp" type="radio" name="exp" value="1" class="u-field-input" required="required" ${exp ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">有</label>
        </div>
        <div class="u-input-row">
            <input id="exp" type="radio" name="exp" value="0" class="u-field-input" required="required" ${!exp ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
        </div>
    </div>
    `;

    formPetHtml = `
    <label class="u-label u-label-9"><i class="fa-solid fa-cat"></i> 是否有貓及其他寵物？</label>
    <div class="u-form-radio-button-wrapper">
        <div class="u-input-row">
            <input id="existedPet" type="radio" name="existedPet" value="1" class="u-field-input" required="required" ${existedPet ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">有</label>
        </div>
        <div class="u-input-row">
            <input id="existedPet" type="radio" name="existedPet" value="0" class="u-field-input" required="required" ${!existedPet ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
        </div>
    </div>
    `;

    formSmokeHtml = `
    <label class="u-label u-label-10"><i class="fa-solid fa-joint"></i> 有否吸煙？</label>
    <div class="u-form-radio-button-wrapper">
        <div class="u-input-row">
            <input id="smoker" type="radio" name="smoker" value="1" class="u-field-input" required="required" ${smoker ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">有</label>
        </div>
        <div class="u-input-row">
            <input id="smoker" type="radio" name="smoker" value="0" class="u-field-input" required="required" ${!smoker ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
        </div>
    </div>
    `;

    formHealthHtml = `
    <label class="u-label u-label-11"><i class="fa-solid fa-paw"></i> 是否有養貓經驗？</label>
    <div class="u-form-radio-button-wrapper">
        <div class="u-input-row">
            <input id="isAllergy" type="radio" name="isAllergy" value="1" class="u-field-input" required="required" ${isAllergy ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">有</label>
        </div>
        <div class="u-input-row">
            <input id="isAllergy" type="radio" name="isAllergy" value="0" class="u-field-input" required="required" ${!isAllergy ? "checked" : ""}/>
            <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
        </div>
    </div>
    `;

    formKnowHtml = `
    <label class="u-label u-label-12"><i class="fa-solid fa-shield-cat"></i> 對貓隻護理及知識的認識</label>
    <input type="text" value="${userProfile.knowledge}" id="knowledge" name="knowledge" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-2" required="required"/>
    `;

    formPlanHtml = `
    <label class="u-label u-label-13"><i class="fa-solid fa-laptop-file"></i> 會否將貓貓例入你未來的計劃內</label>
    <input type="text" value="${userProfile.future_plan}" id="future_plan" name="future_plan" class="u-border-2 u-border-custom-color-9 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-2" required="required"/>
    `;

    document.querySelector("#user-name").innerHTML = userNameHtml;
    document.querySelector("#form-name").innerHTML = formNameHtml;
    document.querySelector("#form-birth").innerHTML = formBirthHtml;
    document.querySelector("#form-phone").innerHTML = formPhoneHtml;
    document.querySelector("#form-email").innerHTML = formEmailHtml;
    document.querySelector("#form-address").innerHTML = formAddressHtml;
    document.querySelector("#form-home").innerHTML = formHomeHtml;
    document.querySelector("#form-income").innerHTML = formIncomeHtml;
    document.querySelector("#form-exp").innerHTML = formExpHtml;
    document.querySelector("#form-pet").innerHTML = formPetHtml;
    document.querySelector("#form-smoke").innerHTML = formSmokeHtml;
    document.querySelector("#form-health").innerHTML = formHealthHtml;
    document.querySelector("#form-know").innerHTML = formKnowHtml;
    document.querySelector("#form-plan").innerHTML = formPlanHtml;
  
    const formData = document.querySelector("#edit-form");

    formData.addEventListener("submit", async (event) => {
        event.preventDefault();
        // console.log("click");
        const formData = event.target;
        const u_name = formData.u_name.value;
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
            window.location = "/user_profile.html";
            console.log(data);
            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}
