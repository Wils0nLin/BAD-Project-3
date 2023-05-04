window.onload = async () => {
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    pendingCaseData(caseID);
    getPassEvents(caseID);
};

async function pendingCaseData(caseID) {
    console.log(caseID);
    const resp = await fetch(`/pending_case_data/${caseID}`);
    const pendingCase = await resp.json();
    console.log(resp);
    let catBoxHtml = "";
    let dataApplyHtml = "";
    document.querySelector("#cat-data").innerHTML = "";
    document.querySelector("#data-apply").innerHTML = "";

    //------------------ 計算貓貓年齡-----------------//
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const cat_birth_year = new Date(pendingCase[0].age).getFullYear() + 1;
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

    dataApplyHtml = `<div><i class="fa-solid fa-list"></i>義工已初步接受申請，請選擇${lastEvent.event}日子：</div>`;

    for (let file of pendingCase) {
        if (file.is_show) {
            dataApplyHtml += `
        <div id="date-title">
            <i class="fa-solid fa-calendar-days"></i>日期
        </div>
        <div>${file.event}</div>
        <div class="click-date" id="date" data-value='${file.id}'
        font-size: 1em;">${file.date}</div>`;
        } else {
            dataApplyHtml += "";
        }
    }

    document.querySelector("#cat-data").innerHTML = catBoxHtml;
    document.querySelector("#data-apply").innerHTML = dataApplyHtml;
}

async function getPassEvents(caseID) {
    const resp = await fetch(`/get_event/${caseID}`);

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

document.querySelector("#user-data").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(dateSelectForm);
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    console.log(caseID);
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
