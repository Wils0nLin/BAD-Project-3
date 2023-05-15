window.onload = async () => {
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    pendingCaseData(caseID);
    getPassEvents(caseID);
};

async function pendingCaseData(caseID) {
    const resp = await fetch(`/user_apply_info/${caseID}`);
    const catProfile = await resp.json();
    
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const cat_birth_year = new Date(catProfile[0].age).getFullYear() + 1;
    const cat_birth_month = new Date(catProfile[0].age).getMonth();
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

    let catGender = "";
    if ((catProfile[0].gender = "M")) {
        catGender = "男";
    } else {
        catGender = "女";
    }

    const lastEvent = catProfile[catProfile.length - 1];

    let volNameHtml = "";
    let volPhoneHtml = "";
    let volEmailHtml = "";
    let catInfoHtml = "";
    let applyEventHtml = "";
    let warningHtml = "";
    document.querySelector("#vol-name").innerHTML = "";
    document.querySelector("#vol-phone").innerHTML = "";
    document.querySelector("#vol-email").innerHTML = "";
    document.querySelector("#cat-info").innerHTML = "";
    document.querySelector("#apply-event").innerHTML = "";

    volNameHtml += `
    <a class="u-active-none u-border-1 u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-palette-2-light-2 u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4" data-animation-name="" data-animation-duration="0" data-animation-delay="0" data-animation-direction=""></a>
        <i></i>負責義工<br />${catProfile[0].v_name}
    `;

    volPhoneHtml += `
    <a class="u-active-none u-border-1 u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-palette-2-light-2 u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4" data-animation-name="" data-animation-duration="0" data-animation-delay="0" data-animation-direction=""></a>
        <i></i>義工電話<br />${catProfile[0].v_phone_number}
    `;

    volEmailHtml += `
    <a class="u-active-none u-border-1 u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-palette-2-light-2 u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4" data-animation-name="" data-animation-duration="0" data-animation-delay="0" data-animation-direction=""></a>
        <i></i>義工電郵<br />${catProfile[0].v_email}
    `;

    catInfoHtml += `
    <div id="cat-main"><img class="u-image u-image-circle u-preserve-proportions u-image-2" src="${catProfile[0].c_image}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/></div>
    <img class="u-image u-image-circle u-preserve-proportions u-image-3 cat-image" src="${catProfile[0].c_image}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <img class="u-image u-image-circle u-preserve-proportions u-image-4 cat-image" src="${catProfile[0].c_image}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <img class="u-image u-image-circle u-preserve-proportions u-image-5 cat-image" src="${catProfile[0].c_image}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <img class="u-image u-image-circle u-preserve-proportions u-image-6 cat-image" src="${catProfile[0].c_image}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <h1 class="u-align-center u-text u-text-4" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="750"><i class="fa-solid fa-paw"></i> ${catProfile[0].c_name}</h1>
    <p class="u-align-center u-text u-text-5">我是一隻${catAge}大的${catGender}貓貓，品種是${catProfile[0].breed}。</p>
    `;

    applyEventHtml = `<p class="u-align-left u-form-group u-form-text u-text u-text-1"><i class="fa-solid fa-list"></i> 義工已初步接受申請，請選擇${lastEvent.event}日子：</p>`;

    for (let file of catProfile) {
        if (file.is_shown) {
            applyEventHtml += `
                <div class="u-form-group u-form-group-2">
                    <label for="text-fade" class="u-label u-label-1"><i class="fa-solid fa-calendar-days"></i> ${
                        file.event
                    }日期</label>
                    <div class="click-date" id="date" data-value="${file.id}"/>${new Date(
                file.date
            ).getFullYear()}年${new Date(file.date).getMonth() + 1}月${new Date(
                file.date
            ).getDate()}日 ${file.time}</div>
                </div>
                `;
        } else {
            applyEventHtml += "";
        }
    }

    if (lastEvent.event == "家訪") {
        warningHtml = `
        <div>對貓咪來說，爬窗、跳高、磨爪子及啃咬植物等，<br>都屬正常行為，故領養貓咪前家居佈置須作出改變</div>
        <li>須全屋安裝窗網。</li>
        <li>盡可能將傢俱精簡化。</li>
        <li>貓有著很強的跳躍能力，故家中的傢俱必須穩固。</li>
        <li>籐編、皮製或布藝沙發的表面可蓋上一塊布。</li>
        <li>牆角和木傢俬腳可裝上磨爪板。</li>`;
    } else if (lastEvent.event == "睇貓") {
        warningHtml = `
        <p>可預備手套，温柔的輕撫貓咪、跟牠說話，<br>待牠適應了，自然會主動來親近你。</p>
        <p>讓貓咪主動親近你是非常重要的，<br>代表著牠已經信任你。</p>
        <p>強迫貓咪只會讓牠感到緊張而抗拒，<br>亦有可能導致攻擊行為。</p>`;
    } else if (lastEvent.event == "領養") {
        warningHtml = `
        <div>預備一個竉物籠，<br>以防在運載貓咪途中意外讓牠逃脫，<br>竉物籠必須用膠帶索好。</div>
        <p>貓咪回家前，請預備好飼養鐵籠。</p>
        <li>放置好砂盆、食物碗、水碗、</li>
        <li>預備舒適的小貓床、貓抓板及玩具。</li>
        <li>把貓咪安置在籠中一段時間，</li>
        <li>待貓咪對你和新環境不再害怕便可離開飼養鐵籠。</li>
        <li>若家中已有貓咪，兩貓咪須先隔離 14天方可接觸。</li>`;
    }

    document.querySelector("#vol-name").innerHTML = volNameHtml;
    document.querySelector("#vol-phone").innerHTML = volPhoneHtml;
    document.querySelector("#vol-email").innerHTML = volEmailHtml;
    document.querySelector("#cat-info").innerHTML = catInfoHtml;
    document.querySelector("#apply-event").innerHTML = applyEventHtml;
    document.querySelector("#warning-box").innerHTML = warningHtml;
}

async function getPassEvents(caseID) {
    const resp = await fetch(`/user_apply_event/${caseID}`);

    const result = await resp.json();
    const lastResult = result[result.length - 1];
    console.log(result);
    console.log(lastResult);

    let newEventHtml = "";
    let oldEventHtml = "";
    document.querySelector("#new-event").innerHTML = "";
    document.querySelector("#old-event").innerHTML = "";

    newEventHtml = `
  <div><i class="fa-solid fa-paw" id="new-logo"></i> <label for="text-fade" class="u-label u-label-4">已安排${new Date(
      lastResult.date
  ).getFullYear()}年${new Date(lastResult.date).getMonth() + 1}月${new Date(
        lastResult.date
    ).getDate()}日進行${lastResult.event}</label></div>
  <i class="fa-solid fa-arrow-up"></i>
  `;

    for (let i = 0; i < result.length - 1; i++) {
        oldEventHtml += `
      <div>
          <div><i class="fa-solid fa-paw" id="old-logo"></i> <label for="text-fade" class="u-label u-label-4">已安排${new Date(
              result[i].date
          ).getFullYear()}年${new Date(result[i].date).getMonth() + 1}月${new Date(
            result[i].date
        ).getDate()}日進行${result[i].event}</label></div>
          <i class="fa-solid fa-arrow-up"></i>
      </div>
      `;
    }

    document.querySelector("#new-event").innerHTML = newEventHtml;
    document.querySelector("#old-event").innerHTML = oldEventHtml;
}

document.addEventListener("click", clickHandler);

let dateSelectForm = {};

async function clickHandler(event) {
    let clicked = event.target;

    if (clicked.className === "click-date") {
        const eles = document.querySelectorAll("#date");

        eles.forEach((ele) => {
            ele.classList.remove("click-date-change");
        });

        let date_id = null;
        let date_content = null;
        date_id = null;
        date_content = null;
        clicked.classList.add("click-date-change");
        date_id = clicked.dataset.value;
        date_content = clicked.textContent;

        dateSelectForm = {
            date_id: date_id,
        };

        console.log(dateSelectForm);
    }
}

document.querySelector("#confirm-event").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(dateSelectForm);
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    console.log(caseID);
    const resp = await fetch(`/user_apply_update/${caseID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dateSelectForm),
    });

    const result = await resp.json();
    window.location = "/user_application.html";
});
