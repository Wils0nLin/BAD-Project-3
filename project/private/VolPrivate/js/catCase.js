window.onload = () => {
    catProfileData();
};

async function catProfileData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams.get("caseID"));

    const resp = await fetch(`/getEditCaseDetails/${urlSearchParams.get("caseID")}`);
    const catProfile = await resp.json();
    console.log(catProfile);

    // 計算貓貓年齡
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const cat_birth_year = new Date(catProfile.age).getFullYear() + 1;
    const cat_birth_month = new Date(catProfile.age).getMonth();
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

    // 提取貓貓資料;

    console.log(catProfile.video);
    let htmlStr = "";
    let imageStr = "";

    for (let mini of catProfile.img) {
        imageStr += `<div class="cat-image-mini"><img src="${mini}" id="cat-image" width="50px"></div>`;
    }

    htmlStr = `
    <div id="cat-data">
        <div>
            <div class="cat-name"><i class="fa-solid fa-paw"></i>${catProfile.cat_name}</div>
            <div><i class="fa-solid fa-calendar-days"></i>歲數<div class="text-box text-box-spread">${catAge}</div></div>
            <div><i class="fa-solid fa-restroom"></i>性別<div class="text-box text-box-spread">${
                catProfile.gender
            }</div></div>
            <div><i class="fa-solid fa-cat"></i>品種<div class="text-box text-box-spread">${
                catProfile.breed
            }</div></div>
        </div>
        <div id="image-box">
            <div id="cat-image-main"><img src="${
                catProfile.img[0]
            }" id="cat-image" width="200px"></div>
            <div id="image-list"></div>
        </div>
    </div>
    <div id="user-data">
        <div class="user-data-spread">
            <div class="data-col"> 
                <div><i class="fa-solid fa-face-smile"></i>性格</div>
                <div class="text-box text-box-profile">${catProfile.characters}</div>
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-fish"></i>進食習慣</div>
                <div class="text-box text-box-profile">${catProfile.food_habits}</div>
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-stethoscope"></i>身體狀況</div>
                <div class="text-box text-box-profile">${catProfile.cat_health}</div>
            </div>
        </div>
        <p style="width: 10px"></p>
        <div class="user-data-spread">
            <div class="data-col">
                <div><i class="fa-solid fa-file"></i>簡介</div>
                <div class="text-box text-box-intro">${catProfile.intro}</div>
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-video"></i>生活短片</div>
                <video controls class="text-box text-box-video" style="height: 300px">
                    <source src="${catProfile.video[0]}" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
<a href="vol_editAdoptCasePage.html?caseID=${urlSearchParams.get(
        "caseID"
    )}"><input type="button" class="dark-button" id="adopt-button" value="修改資料"></a>`;
    document.querySelector("#content-box").innerHTML = htmlStr;
    document.querySelector("#image-list").innerHTML = imageStr;

    const miniClick = document.querySelectorAll(".cat-image-mini");
    for (let miniC of miniClick) {
        miniC.addEventListener("click", function (e) {
            const miniImage = e.target;
            document.querySelector(
                "#cat-image-main"
            ).innerHTML = `<img src="${miniImage.src}" id="cat-image" width="200px">`;
        });
    }
}