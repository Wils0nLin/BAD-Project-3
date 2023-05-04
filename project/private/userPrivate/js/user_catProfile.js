window.onload = () => {
    loadCatIndividualData();
};

async function loadCatIndividualData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (!urlSearchParams.has("id")) {
        window.location = "/";
        return;
    }

    const resp = await fetch(`/cat_adopt_data/${urlSearchParams.get("id")}`);
    const cats = await resp.json();
    const imageResp = await fetch(`/get_edit_case_detail/${urlSearchParams.get("id")}`);
    const catProfile = await imageResp.json();
    console.log(catProfile);
    // const today = new Date().getFullYear();
    // const cat_birth_year = new Date(cats.age).getFullYear();
    // const catAge = today - cat_birth_year;

    //計算貓貓年齡
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const cat_birth_year = new Date(cats.age).getFullYear() + 1;
    const cat_birth_month = new Date(cats.age).getMonth();
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

    //提取貓貓資料
    let htmlStr;
    let imageStr = "";

    for (let mini of catProfile.img) {
        imageStr += `<div class="cat-image-mini"><img src="${mini}" id="cat-image" width="50px"></div>`;
    }

    htmlStr = `
    <div id="cat-data">
        <div>
            <div class="cat-name"><i class="fa-solid fa-paw"></i>${cats.c_name}</div>
            <div><i class="fa-solid fa-calendar-days"></i>歲數<div class="text-box text-box-spread">${catAge}</div></div>
            <div><i class="fa-solid fa-restroom"></i>性別<div class="text-box text-box-spread">${
                cats.gender
            }</div></div>
            <div><i class="fa-solid fa-cat"></i>品種<div class="text-box text-box-spread">${
                cats.breed
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
            <div class="data-col data-col-spread">
                <div>
                    <div><i class="fa-solid fa-user-check"></i>負責義工</div>
                    <div class="text-box text-box-spread">${cats.v_name}</div>
                </div>
                <div id="data-col-right">
                    <div><i class="fa-solid fa-phone-flip"></i>義工電話</div>
                    <div class="text-box text-box-spread">${cats.v_phone_number}</div>
                </div>
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-envelope"></i>義工電郵</div>
                <div class="text-box text-box-profile">${cats.v_email}</div>
            </div>
            <div class="data-col"> 
                <div><i class="fa-solid fa-face-smile"></i>性格</div>
                <div class="text-box text-box-profile">${cats.character}</div>
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-fish"></i>進食習慣</div>
                <div class="text-box text-box-profile">${cats.food_habits}</div>
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-stethoscope"></i>身體狀況</div>
                <div class="text-box text-box-profile">${cats.cat_health}</div>
            </div>
        </div>
        <p style="width: 10px"></p>
        <div class="user-data-spread">
            <div class="data-col">
                <div><i class="fa-solid fa-file"></i>簡介</div>
                <div class="text-box text-box-intro">${cats.intro}</div>
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-video"></i>生活短片</div>
                <video controls class="text-box text-box-video" style="height: 300px">
                    <source src="${catProfile.video[0]}" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
    <div><a href="user_adoptNote.html?id=${urlSearchParams.get(
        "id"
    )}"><input type="submit" class="dark-button" id="adopt-button" value="申請領養"></a></div>
    `;

    document.querySelector("#profile-content").innerHTML = htmlStr;
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
