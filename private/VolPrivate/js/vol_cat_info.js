window.onload = () => {
    loadCatIndividualData();
};

async function loadCatIndividualData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const resp = await fetch(`/public_cat_info/${urlSearchParams.get("id")}`);
    const catProfile = await resp.json();
    
    let catImg2 = "";
    let catImg3 = "";
    let catImg4 = "";
    if (!catProfile.img[1]) {
        catImg2 = catProfile.img[0]
    } else {
        catImg2 = catProfile.img[1]
    }

    if (!catProfile.img[1]) {
        catImg3 = catProfile.img[0]
    } else {
        catImg3 = catProfile.img[2]
    }

    if (!catProfile.img[1]) {
        catImg4 = catProfile.img[0]
    } else {
        catImg4 = catProfile.img[3]
    }
    
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

    let catGender = "";
    if (catProfile.gender = "M") {
        catGender = "男"
    } else {
        catGender = "女"
    }

    let volNameHtml = "";
    let volPhoneHtml = "";
    let volEmailHtml = "";
    let catInfoHtml = "";
    let catDataHtml = "";
    let catIntroHtml = "";
    let catVideoHtml = "";
    document.querySelector("#vol-name").innerHTML = "";
    document.querySelector("#vol-phone").innerHTML = "";
    document.querySelector("#vol-email").innerHTML = "";
    document.querySelector("#cat-info").innerHTML = "";
    document.querySelector("#cat-data").innerHTML = "";
    document.querySelector("#cat-intro").innerHTML = "";
    document.querySelector("#cat-video").innerHTML = "";

    volNameHtml += `
    <a class="u-active-none u-border-1 u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-palette-2-light-2 u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4" data-animation-name="" data-animation-duration="0" data-animation-delay="0" data-animation-direction=""></a>
        <i></i>負責義工<br />${catProfile.v_name}
    `;

    volPhoneHtml += `
    <a class="u-active-none u-border-1 u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-palette-2-light-2 u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4" data-animation-name="" data-animation-duration="0" data-animation-delay="0" data-animation-direction=""></a>
        <i></i>義工電話<br />${catProfile.v_phone_number}
    `;

    volEmailHtml += `
    <a class="u-active-none u-border-1 u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-palette-2-light-2 u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4" data-animation-name="" data-animation-duration="0" data-animation-delay="0" data-animation-direction=""></a>
        <i></i>義工電郵<br />${catProfile.v_email}
    `;

    catInfoHtml += `
    <div id="cat-main"><img class="u-image u-image-circle u-preserve-proportions u-image-2" src="${catProfile.img[0]}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/></div>
    <img class="u-image u-image-circle u-preserve-proportions u-image-3 cat-image" src="${catProfile.img[0]}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <img class="u-image u-image-circle u-preserve-proportions u-image-4 cat-image" src="${catImg2}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <img class="u-image u-image-circle u-preserve-proportions u-image-5 cat-image" src="${catImg3}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <img class="u-image u-image-circle u-preserve-proportions u-image-6 cat-image" src="${catImg4}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
    <h1 class="u-align-center u-text u-text-4" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="750"><i class="fa-solid fa-paw"></i> ${catProfile.cat_name}</h1>
    <p class="u-align-center u-text u-text-5">我是一隻${catAge}大的${catGender}貓貓，品種是${catProfile.breed}。</p>
    `;

    catDataHtml += `
    <div class="u-container-style u-list-item u-repeater-item u-shape-rectangle u-list-item-1" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="250">
        <div class="u-container-layout u-similar-container u-valign-top-xl u-container-layout-1">
            <p class="u-text u-text-palette-5-light-1 u-text-2"><i class="fa-solid fa-face-smile"></i> 性格<span style="font-weight: 700"></span></p>
            <h6 class="u-text u-text-default-xl u-text-3">${catProfile.characters}</h6>
        </div>
    </div>
    <div class="u-container-style u-list-item u-repeater-item u-shape-rectangle u-list-item-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="250">
        <div class="u-container-layout u-similar-container u-valign-top-xl u-container-layout-2">
            <p class="u-text u-text-palette-5-light-1 u-text-4"><i class="fa-solid fa-fish"></i> 進食習慣</p>
            <h6 class="u-text u-text-default-xl u-text-5">${catProfile.food_habits}</h6>
        </div>
    </div>
    <div class="u-container-style u-list-item u-repeater-item u-shape-rectangle u-list-item-3" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="250">
        <div class="u-container-layout u-similar-container u-valign-top-xl u-container-layout-3">
            <p class="u-text u-text-palette-5-light-1 u-text-6"><i class="fa-solid fa-stethoscope"></i> 身體狀況</p>
            <h6 class="u-text u-text-default-xl u-text-7">${catProfile.cat_health}</h6>
        </div>
    </div>
    `;

    catIntroHtml += `${catProfile.intro}`;

    catVideoHtml += `
    <div class="u-container-layout u-container-layout-2">
        <video controls id="info-video">
            <source src="${catProfile.video[0]}" type="video/mp4">
        </video>
    </div>
    `;

    document.querySelector("#vol-name").innerHTML = volNameHtml;
    document.querySelector("#vol-phone").innerHTML = volPhoneHtml;
    document.querySelector("#vol-email").innerHTML = volEmailHtml;
    document.querySelector("#cat-info").innerHTML = catInfoHtml;
    document.querySelector("#cat-data").innerHTML = catDataHtml;
    document.querySelector("#cat-intro").innerHTML = catIntroHtml;
    document.querySelector("#cat-video").innerHTML = catVideoHtml;

    const miniClick = document.querySelectorAll(".cat-image");
    for (let miniC of miniClick) {
        miniC.addEventListener("click", function (e) {
            const miniImage = e.target;
            document.querySelector(
                "#cat-main"
            ).innerHTML = `
            <img class="u-image u-image-circle u-preserve-proportions u-image-2" src="${miniImage.src}" alt="" data-image-width="1200" data-image-height="1197" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"/>
            `;
        });
    }
}