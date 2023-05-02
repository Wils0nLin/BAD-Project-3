window.onload = async () => {
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    pendingCaseData(caseID);
};

async function pendingCaseData(caseID) {
    const resp = await fetch(`/pendingCase`);
    const pendingCase = await resp.json();
    console.log(pendingCase);
    let catBoxHtml = "";
    let userBoxHtml = "";
    document.querySelector("#cat-data").innerHTML = "";
    document.querySelector("#user-data").innerHTML = "";

    for (let file of pendingCase) {
        const smoker = file.smoker;
        const existedPet = file.existed_pet;
        const exp = file.pet_before;
        const isAllergy = file.is_allergy;

        // 計算貓貓年齡
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

        //提取貓資料
        if (file.ad_id == caseID) {
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

            userBoxHtml = `<div id="apply-detail">
            <div class="user-data-spread">
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
            </div>
            <p style="width: 10px"></p>
            <div class="user-data-spread">
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
                </div>
            </div>
            </div>
            <div id="edit-box">
                <a href="vol_applicationAfter.html?caseID=${caseID}"><input type="submit" class="dark-button" name="status" id="Accept" value="接受申請"></a>
            </div>`;
        }
    }
    document.querySelector("#cat-data").innerHTML = catBoxHtml;
    document.querySelector("#user-data").innerHTML = userBoxHtml;
}

document.querySelector("#accept").addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    let caseOBJ = { caseID: caseID };
    console.log(caseID);
    const res = await fetch("/ACCEPT", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(caseOBJ),
    });

    window.location = `vol_applicationAfter.html?caseID=${caseID}`;
});

document.querySelector("#reject").addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlSearch = new URLSearchParams(window.location.search).get("caseID");
    const caseID = parseInt(urlSearch);
    let caseOBJ = { caseID: caseID };
    console.log(caseID);
    const res = await fetch("/REJECT", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(caseOBJ),
    });
    window.location = `vol_adoptCase.html`;
});
