window.onload = async () => {
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    pendingCaseData(caseID);
    getPassEvents(caseID);
};

async function pendingCaseData(caseID) {
    const resp = await fetch(`/volunteer_case_info/${caseID}`);
    const volCase = await resp.json();
    console.log(volCase);

    let userNameHtml = "";
    let userBirthHtml = "";
    let userPhoneHtml = "";
    let userEmailHtml = "";
    let userAddressHtml = "";
    let userExpHtml = "";
    let userPetHtml = "";
    let userSmokeHtml = "";
    let userHealthHtml = "";
    let userKnowHtml = "";
    let userPlanHtml = "";
    let userHomeHtml = "";
    let catInfoHtml = "";

    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const cat_birth_year = new Date(volCase[0].age).getFullYear() + 1;
    const cat_birth_month = new Date(volCase[0].age).getMonth();
    let cat_year_difference = thisYear - cat_birth_year;
    if (cat_year_difference < 0) {
        cat_year_difference = 0;
    }
    let cat_month_difference = "";
    if (cat_birth_month <= thisMonth) {
        cat_month_difference = thisMonth - cat_birth_month;
    } else {
        cat_month_difference = 13 - cat_birth_month + thisMonth;
    }
    const catAge = cat_year_difference + "歲" + cat_month_difference + "個月";

    catInfoHtml = `
    <img
        class="u-border-7 u-border-grey-5 u-image u-image-circle u-preserve-proportions u-image-2"
        src="${volCase[0].c_image}"
        alt=""
        data-image-width="1200"
        data-image-height="1197"
        data-animation-name="customAnimationIn"
        data-animation-duration="1500"
        data-animation-delay="500"
    />
    <h1 class="u-align-left u-text u-text-custom-color-4 u-text-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="750">${volCase[0].c_name}</h1>
    <h3 class="u-align-left u-text u-text-3">歲數：${catAge}</h3>
    <h3 class="u-align-left u-text u-text-4">性別：${volCase[0].gender}</h3>
    <h3 class="u-align-left u-text u-text-5">品種：${volCase[0].breed}</h3>
    `;

    for (let file of volCase) {
        const smoker = file.smoker;
        const existedPet = file.existed_pet;
        const exp = file.pet_before;
        const isAllergy = file.is_allergy;

        userNameHtml = `
        <label class="u-label u-label-1"><i class="fa-solid fa-user-check"></i> 姓名</label>
        <input type="text" value="${file.u_name}" class="u-border-2 u-border-custom-color-3 u-input u-input-rectangle u-radius-10 u-input-1" readonly="readonly"/>
        `;

        userBirthHtml = `
        <label class="u-label u-label-2"><i class="fa-solid fa-calendar-days"></i> 出生日期</label>
        <input type="text" value="${new Date(file.u_birth_date).getFullYear()}年${new Date(file.u_birth_date).getMonth() + 1}月${new Date(file.u_birth_date).getDate()}日" class="u-border-2 u-border-custom-color-3 u-input u-input-rectangle u-radius-10 u-input-2" readonly="readonly"/>
        `;

        userPhoneHtml = `
        <label class="u-label u-label-3"><i class="fa-solid fa-phone-flip"></i> 電話</label>
        <input type="text" value="${file.u_phone_number}" class="u-border-2 u-border-custom-color-3  u-input u-input-rectangle u-radius-10 u-input-3" readonly="readonly"/>
        `;

        userEmailHtml = `
        <label class="u-label u-label-4"><i class="fa-solid fa-envelope"></i> 電郵</label>
        <input type="email" value="${file.u_email}" class="u-border-2 u-border-custom-color-3 u-input u-input-rectangle u-radius-10 u-input-4" readonly="readonly"/>
        `;

        userAddressHtml = `
        <label class="u-label u-label-5"><i class="fa-solid fa-location-dot"></i> 地址</label>
        <input type="text" value="${file.u_address}" class="u-border-2 u-border-custom-color-3 u-input u-input-rectangle u-radius-10 u-input-5" readonly="readonly"/>
        `;

        userExpHtml = `
        <label class="u-label u-label-8"><i class="fa-solid fa-paw"></i> 是否有養貓經驗？</label>
        <div class="u-form-radio-button-wrapper">
            <div class="u-input-row">
                <input type="radio" name="exp" value="1" class="u-field-input" ${exp ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">有</label>
            </div>
            <div class="u-input-row">
                <input type="radio" name="exp" value="0" class="u-field-input" ${!exp ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
                </div>
        </div>
        `;

        userPetHtml = `
        <label class="u-label u-label-9"><i class="fa-solid fa-cat"></i> 是否有貓及其他寵物？</label>
        <div class="u-form-radio-button-wrapper">
            <div class="u-input-row">
                <input type="radio" name="existedPet" value="1" class="u-field-input" ${existedPet ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">有</label>
            </div>
            <div class="u-input-row">
                <input type="radio" name="existedPet" value="0" class="u-field-input" ${!existedPet ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
            </div>
        </div>
        `;

        userSmokeHtml = `
        <label class="u-label u-label-10"><i class="fa-solid fa-joint"></i> 有否吸煙？</label>
        <div class="u-form-radio-button-wrapper">
            <div class="u-input-row">
                <input type="radio" name="smoker" value="1" class="u-field-input" ${smoker ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">有</label>
            </div>
            <div class="u-input-row">
                <input type="radio" name="smoker" value="0" class="u-field-input" ${!smoker ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
            </div>
        </div>
        `;

        userHealthHtml = `
        <label class="u-label u-label-11"><i class="fa-solid fa-stethoscope"></i> 呼吸系統疾病？</label>
        <div class="u-form-radio-button-wrapper">
            <div class="u-input-row">
                <input type="radio" name="isAllergy" value="1" class="u-field-input" ${isAllergy ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">有</label>
            </div>
            <div class="u-input-row">
                <input type="radio" name="isAllergy" value="0" class="u-field-input" ${!isAllergy ? "checked" : ""}/>
                <label class="u-field-label" style="font-size: 1.125rem">沒有</label>
            </div>
        </div>
        `;

        userKnowHtml = `
        <label class="u-label u-label-12"><i class="fa-solid fa-shield-cat"></i> 對貓隻護理及知識的認識</label>
        <input type="text" value="${file.knowledge}" class="u-border-2 u-border-custom-color-3 u-input u-input-rectangle u-radius-10 u-input-5" readonly="readonly"/>
        `;

        userPlanHtml = `
        <label for="text-b7d4" class="u-label u-label-13"><i class="fa-solid fa-laptop-file"></i> 會否將貓貓例入你未來的計劃內</label>
        <input type="text" value="${file.future_plan}" class="u-border-2 u-border-custom-color-3 u-input u-input-rectangle u-radius-10 u-input-5" readonly="readonly"/>
        `;

        userHomeHtml = `
        <label for="text-b7d4" class="u-label u-label-13"><i class="fa-solid fa-file-image"></i> 申請者家居情況</label>
        <img src="${file.f_image}" id="home-image">
        `;
    }

    document.querySelector("#user-name").innerHTML = userNameHtml;
    document.querySelector("#user-birth").innerHTML = userBirthHtml;
    document.querySelector("#user-phone").innerHTML = userPhoneHtml;
    document.querySelector("#user-email").innerHTML = userEmailHtml;
    document.querySelector("#user-address").innerHTML = userAddressHtml;
    document.querySelector("#user-exp").innerHTML = userExpHtml;
    document.querySelector("#user-pet").innerHTML = userPetHtml;
    document.querySelector("#user-smoke").innerHTML = userSmokeHtml;
    document.querySelector("#user-health").innerHTML = userHealthHtml;
    document.querySelector("#user-know").innerHTML = userKnowHtml;
    document.querySelector("#user-plan").innerHTML = userPlanHtml;
    document.querySelector("#user-home").innerHTML = userHomeHtml;
    document.querySelector("#cat-info").innerHTML = catInfoHtml;
}

async function getPassEvents(caseID) {
    const resp = await fetch(`/volunteer_case_event/${caseID}`);

    const result = await resp.json();
    const lastResult = result[result.length - 1];
    console.log(result);
    console.log(lastResult);

    let newEventHtml = "";
    let oldEventHtml = "";
    document.querySelector("#new-event").innerHTML = "";
    document.querySelector("#old-event").innerHTML = "";

    newEventHtml = `
  <div><i class="fa-solid fa-paw" id="new-logo"></i>已安排${new Date(
      lastResult.date
  ).getFullYear()}年${new Date(lastResult.date).getMonth() + 1}月${new Date(
        lastResult.date
    ).getDate()}日進行${lastResult.event}</div>
  <i class="fa-solid fa-arrow-up"></i>
  `;

    for (let i = 0; i < result.length - 1; i++) {
        oldEventHtml += `
      <div>
          <div><i class="fa-solid fa-paw" id="old-logo"></i>已安排${new Date(
              result[i].date
          ).getFullYear()}年${new Date(result[i].date).getMonth() + 1}月${new Date(
            result[i].date
        ).getDate()}日進行${result[i].event}</div>
          <i class="fa-solid fa-arrow-up"></i>
      </div>
      `;
    }

    document.querySelector("#new-event").innerHTML = newEventHtml;
    document.querySelector("#old-event").innerHTML = oldEventHtml;
}

document.querySelector("#data-button").addEventListener("click", (e) => {
    e.preventDefault();

    const node = document.getElementById("date-box");
    const clone = node.cloneNode(true);
    document.getElementById("date-box").appendChild(clone);
});

document.querySelector("#APPLY").addEventListener("click", async (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(window.location.search);
    let eventSelecArr = document.querySelectorAll("#event");
    let dateSelectArr = document.querySelectorAll("#date");

    let dateArr = [];
    let eventArr = [];
    let eventObjectArr = [];

    for (let event of eventSelecArr) {
        eventArr.push(event.value);
    }

    for (let date of dateSelectArr) {
        dateArr.push(date.value);
    }
    console.log(eventArr.length);
    for (let i = 0; i < eventArr.length; i++) {
        let eventObject = {};
        eventObject.Date = dateArr[i];
        eventObject.Event = eventArr[i];
        eventObject.id = urlSearchParams.get("caseID");
        eventObjectArr[i] = eventObject;
        console.log(eventObject);
    }
    console.log(eventObjectArr);

    const formA = { eventObjectArr };
    console.log();

    const resp = await fetch("/volunteer_case_update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObjectArr),
    });
    const result = await resp.json();
    window.location = "/volunteer_case.html";
});

document.querySelector("#Reject").addEventListener("click", (e) => {
    console.log("Reject");

    const formR = { message: "Case Reject" };
});
document.querySelector("#Finish").addEventListener("click", (e) => {
    console.log("Finish");
    const formF = {
        message: "Case Finish",
    };
});
