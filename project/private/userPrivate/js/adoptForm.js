window.onload = () => {
    userProfileData();
};

async function userProfileData() {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const resp = await fetch(`/formPrePlace/${urlSearchParams.get("id")}`);
    const catName = await resp.json();

    const resp1 = await fetch("/userProfileData");
    const userProfile = await resp1.json();
    let catBoxHtml = "";
    let userBoxHtml = "";
    document.querySelector("#cat-data").innerHTML = "";
    document.querySelector("#user-data").innerHTML = "";

    const smoker = userProfile.smoker;
    const existedPet = userProfile.existed_pet;
    const exp = userProfile.pet_before;
    const isAllergy = userProfile.is_allergy;
    const home_size_id = userProfile.home_size_id;
    const income_id = userProfile.income_id;

    //------------------ 計算貓貓年齡-----------------//
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const cat_birth_year = new Date(catName.age).getFullYear() + 1;
    const cat_birth_month = new Date(catName.age).getMonth();
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

    catBoxHtml = `<div>
        <div class="cat-name"><i class="fa-solid fa-paw"></i>${catName.c_name}</div>
        <div><i class="fa-solid fa-calendar-days"></i>歲數<div class="text-box text-box-spread">${catAge}</div></div>
        <div><i class="fa-solid fa-restroom"></i>性別<div class="text-box text-box-spread">${catName.gender}</div></div>
        <div><i class="fa-solid fa-cat"></i>品種<div class="text-box text-box-spread">${catName.breed}</div></div>
    </div>
    <div id="image-box">
        <div class="cat-image-main"><img src="${catName.c_image}" id="cat-image-main"></div>
    </div>`;

    userBoxHtml = `<div class="data-col">
        <div><i class="fa-solid fa-user-check"></i>用戶姓名</div>
        <input type="text" class="text-box text-box-form" value="${userProfile.u_name}">
    </div>
    <div class="data-col">             
        <div><i class="fa-solid fa-envelope"></i>電郵地址</div>
        <input type="text" class="text-box text-box-form" value="${userProfile.u_email}">
    </div>
    <div class="data-col data-col-spread">
        <div>
            <div><i class="fa-solid fa-calendar-days"></i>出生日期</div>
            <input type="text" class="text-box text-box-spread" value="${new Date(
                userProfile.u_birth_date
            ).getFullYear()}年${new Date(userProfile.u_birth_date).getMonth() + 1}月${new Date(
        userProfile.u_birth_date
    ).getDate()}日">
        </div>
        <div id="data-col-right">
            <div><i class="fa-solid fa-phone-flip"></i>電話號碼</div>
            <input type="text" class="text-box text-box-spread" value="${
                userProfile.u_phone_number
            }">
        </div>
    </div>
    <div class="data-col">
        <div><i class="fa-solid fa-location-dot"></i>地址</div>
        <input type="text" class="text-box text-box-form" value="${userProfile.u_address}">
    </div>
    <div class="data-col data-col-spread">
        <div>
            <div><i class="fa-solid fa-house-chimney"></i>居住尺數</div>
            <select name="home_size_id" class="text-box text-box-spread" >
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
    <div class="data-col">
        <div id="data-col-radio">
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
    <div class="data-col">
        <div><i class="fa-solid fa-shield-cat"></i>對貓隻護理及知識有多認識</div>
        <input type="text" class="text-box text-box-form" value="${userProfile.knowledge}">
    </div>
    <div class="data-col">
        <div><i class="fa-solid fa-laptop-file"></i>會否將貓貓例入你未來的計劃內</div>
        <input type="text" class="text-box text-box-form" value="${userProfile.future_plan}">
    </div>
    <div class="data-col">
        <div><i class="fa-solid fa-file-image"></i>請拍攝家居情況並上傳，以供義工評估：</div>
        <form action="" id="Apply-form" enctype="multipart/form-data">
            <input type="file" class="text-box text-box-form" name="image" multiple>
            <input type="hidden" name="user_id" value="${userProfile.id}">
            <input type="hidden" name="cat_id" value="${catName.id}">
            <div id="submit-box">
                <input type="submit" class="dark-button" id="adopt-button" value="提交申請">
            </div>
        </form>
    </div>
    `;

    console.log(catName.id, userProfile.id);

    document.querySelector("#cat-data").innerHTML = catBoxHtml;
    document.querySelector("#user-data").innerHTML = userBoxHtml;

    document.querySelector("#user-data").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const ApplyForm = new FormData(form);

        const resp = await fetch("/applyForm", {
            method: "POST",
            body: ApplyForm,
        });
        const result = await resp.json();

        window.location = "../user_myApplication.html";
    });
}
