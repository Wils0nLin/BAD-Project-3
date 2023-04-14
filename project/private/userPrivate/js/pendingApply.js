window.onload = async () => {
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    pendingCaseData(caseID);
    getPassEvents(caseID);
};

async function pendingCaseData(caseID) {
    const resp = await fetch(`/pendingCaseData/${caseID}`);
    const pendingCase = await resp.json();
    let catBoxHtml = "";
    let dataApplyHtml = "";
    document.querySelector("#cat-data").innerHTML = "";
    document.querySelector("#data-apply").innerHTML = "";
    document.querySelector("#warning-box").innerHTML = "";

    //------------------ 計算貓貓年齡-----------------//
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const cat_birth_year = new Date(pendingCase[0].age).getFullYear();
    const cat_birth_month = new Date(pendingCase[0].age).getMonth();
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

    const lastEvent = pendingCase[pendingCase.length - 1];

    catBoxHtml = `
        <div>
            <div class="cat-name"><i class="fa-solid fa-paw"></i>${pendingCase[0].c_name}</div>
            <div><i class="fa-solid fa-calendar-days"></i>歲數<div class="text-box text-box-spread">${catAge}</div></div>
            <div><i class="fa-solid fa-restroom"></i>性別<div class="text-box text-box-spread">${pendingCase[0].gender}</div></div>
            <div><i class="fa-solid fa-cat"></i>品種<div class="text-box text-box-spread">${pendingCase[0].breed}</div></div>
        </div>
        <div id="image-box">
            <img src="/${pendingCase[0].c_image}" id="cat-image-main">
        </div>
    `;

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

    dataApplyHtml = `<div><i class="fa-solid fa-list"></i>義工已初步接受申請，請選擇${lastEvent.event}日子：</div>`;

    for (let file of pendingCase) {
        if (file.is_show) {
            dataApplyHtml += `
        <div id="date-title">
            <i class="fa-solid fa-calendar-days"></i>日期
        </div>
        <div>${file.event}</div>
        <div class="click-date" id="date" data-value='${file.id}'
        font-size: 1em;">${new Date(file.date).getFullYear()}年${
                new Date(file.date).getMonth() + 1
            }月${new Date(file.date).getDate()}日 ${file.time}</div>`;
        } else {
            dataApplyHtml += "";
        }
    }

    document.querySelector("#cat-data").innerHTML = catBoxHtml;
    document.querySelector("#data-apply").innerHTML = dataApplyHtml;
    document.querySelector("#warning-box").innerHTML = warningHtml;
}

async function getPassEvents(caseID) {
    const resp = await fetch(`/getEvent/${caseID}`);

    const result = await resp.json();
    const lastResult = result[result.length - 1];

    let newEventHtml = "";
    let oldEventHtml = "";
    document.querySelector("#new-event").innerHTML = "";
    document.querySelector("#old-event").innerHTML = "";

    newEventHtml = `
    <div><i class="fa-solid fa-paw" id="new-logo"></i>已安排${new Date(
        lastResult.date
    ).getFullYear()}年${new Date(lastResult.date).getMonth() + 1}月${new Date(
        lastResult.date
    ).getDate()}日${lastResult.time}進行${lastResult.event}</div>
    <i class="fa-solid fa-arrow-up"></i>
    `;

    for (let i = 0; i < result.length - 1; i++) {
        oldEventHtml += `
        <div>
            <div><i class="fa-solid fa-paw" id="old-logo"></i>已安排${new Date(
                result[i].date
            ).getFullYear()}年${new Date(result[i].date).getMonth() + 1}月${new Date(
            result[i].date
        ).getDate()}日${result[i].time}進行${result[i].event}</div>
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
    }
}

document.querySelector("#user-data").addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    const resp = await fetch(`/confirm/${caseID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dateSelectForm),
    });

    const result = await resp.json();
    window.location = "/user_myApplication.html";
});
