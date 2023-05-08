window.onload = async () => {
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    pendingCaseData(caseID);
    getPassEvents(caseID);
};

async function pendingCaseData(caseID) {
    const resp = await fetch(`/volunteer_case_info/${caseID}`);
    const pendingCase = await resp.json();
    console.log(pendingCase);
    let catBoxHtml = "";
    let userBoxHtml = "";
    document.querySelector("#cat-data").innerHTML = "";
    document.querySelector("#user-data-spread").innerHTML = "";

    const lastEvent = pendingCase[pendingCase.length - 1];

    for (let file of pendingCase) {
        const smoker = file.smoker;
        const existedPet = file.existed_pet;
        const exp = file.pet_before;
        const isAllergy = file.is_allergy;

        //------------------ 計算貓貓年齡-----------------//
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();
        const cat_birth_year = new Date(file.age).getFullYear() + 1;
        const cat_birth_month = new Date(file.age).getMonth();
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

        //------------------ -----------------//

        catBoxHtml = `
            <div>
                <div class="cat-name"><i class="fa-solid fa-paw"></i>${file.c_name}</div>
                <div><i class="fa-solid fa-calendar-days"></i>歲數<div class="text-box text-box-spread">${catAge}</div></div>
                <div><i class="fa-solid fa-restroom"></i>性別<div class="text-box text-box-spread">${file.gender}</div></div>
                <div><i class="fa-solid fa-cat"></i>品種<div class="text-box text-box-spread">${file.breed}</div></div>
            </div>
            <div id="image-box">
                <div id="cat-image-main"><img src="${file.c_image}" id="cat-image" width="200px"></div>
            </div>
        `;
        userBoxHtml = `
            <div class="data-col"> 
                    <div><i class="fa-solid fa-user-check"></i>用戶姓名</div>
                    <div class="text-box text-box-profile">${file.u_name}</div>
                </div>
                <div class="data-col">
                    <div><i class="fa-solid fa-envelope"></i>電郵地址</div>
                    <div class="text-box text-box-profile">${file.u_email}</div>
                </div>
                <div class="data-col data-col-spread">
                    <div>
                        <div><i class="fa-solid fa-calendar-days"></i>出生日期</div>
                        <div class="text-box text-box-spread">${new Date(
                            file.u_birth_date
                        ).getFullYear()}年${new Date(file.u_birth_date).getMonth() + 1}月${new Date(
            file.u_birth_date
        ).getDate()}日</div>
                    </div>
                    <div id="data-col-right">
                        <div><i class="fa-solid fa-phone-flip"></i>電話號碼</div>
                        <div class="text-box text-box-spread">${file.u_phone_number}</div>
                    </div>
                </div>
                <div class="data-col">
                    <div><i class="fa-solid fa-location-dot"></i>地址</div>
                    <div class="text-box text-box-profile">${file.u_address}</div>
                </div>
                <div class="data-col data-col-spread">
                    <div>
                        <div><i class="fa-solid fa-house-chimney"></i>居住尺數</div>
                        <div class="text-box text-box-spread">${file.home_size_id}</div>
                    </div>
                    <div id="data-col-right">
                        <div><i class="fa-solid fa-sack-dollar"></i>家庭總收入</div>
                        <div class="text-box text-box-spread">${file.income_id}</div>
                    </div>
                </div>
                <div class="data-col" id="data-col-radio">
                    <div id="data-col-left">
                        <div><i class="fa-solid fa-paw"></i>是否有養貓經驗？</div>
                        <label>是</label>
                        <input type="radio" ${exp ? "checked" : ""} name="exp" >
                        <label>否</label>
                        <input type="radio" ${!exp ? "checked" : ""} name="exp" >
                    </div>
                    <div id="data-col-right">
                        <div><i class="fa-solid fa-cat"></i>是否有貓及其他寵物？</div>
                        <label>是</label>
                        <input type="radio" ${existedPet ? "checked" : ""} name="existedPet">
                        <label>否</label>
                        <input type="radio" ${!existedPet ? "checked" : ""} name="existedPet">
                    </div>
                </div>
                <div class="data-col" id="data-col-radio">
                    <div id="data-col-left">
                        <div><i class="fa-solid fa-joint"></i>有否吸煙？</div>
                        <label>是</label>
                        <input type="radio"  ${smoker ? "checked" : ""}  name="smoker">
                        <label>否</label>
                        <input type="radio"  ${!smoker ? "checked" : ""}  name="smoker">
                    </div>
                    <div id="data-col-right">
                        <div><i class="fa-solid fa-stethoscope"></i>哮喘，其他呼吸系統疾病？</div>
                        <label>是</label>
                        <input type="radio" ${isAllergy ? "checked" : ""} name="isAllergy">
                        <label>否</label>
                        <input type="radio" ${!isAllergy ? "checked" : ""} name="isAllergy">
                    </div>
                </div>
                <div class="data-col">
                    <div><i class="fa-solid fa-shield-cat"></i>對貓隻護理及知識有多認識</div>
                    <div class="text-box text-box-profile">${file.knowledge}</div>
                </div>
                <div class="data-col">
                    <div><i class="fa-solid fa-laptop-file"></i>會否將貓貓例入你未來的計劃內</div>
                    <div class="text-box text-box-profile">${file.future_plan}</div>
                </div>
                <div class="data-col">
                    <div><i class="fa-solid fa-file-image"></i>申請者家居情況</div>
                    <div><img src="${file.f_image}" id="home-image"></div>
                </div>`;
    }
    document.querySelector("#cat-data").innerHTML = catBoxHtml;
    document.querySelector("#user-data-spread").innerHTML = userBoxHtml;
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
