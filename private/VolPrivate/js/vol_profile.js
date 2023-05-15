window.onload = () => {
    volProfileData();
};

async function volProfileData() {
    const resp = await fetch("/volunteer_profile");
    const volProfile = await resp.json();
    const postResp = await fetch("/volunteer_post");
    const volPost = await postResp.json();
    const caseResp = await fetch("/volunteer_case");
    const volCase = await caseResp.json();
    console.log(volPost);
    console.log(volCase);
    
    let volNameHtml = "";
    let volEmailHtml = "";
    let volPhoneHtml = "";
    let volPostHtml = "";
    let volCaseHtml = "";
    document.querySelector("#vol-name").innerHTML = "";
    document.querySelector("#vol-email").innerHTML = "";
    document.querySelector("#vol-phone").innerHTML = "";
    document.querySelector("#post-box").innerHTML = "";
    document.querySelector("#case-box").innerHTML = "";

    volNameHtml = `${volProfile.v_name}`;
    volEmailHtml = `${volProfile.v_email}`;
    volPhoneHtml = `${volProfile.v_phone_number}`;

    document.querySelector("#vol-name").innerHTML = volNameHtml;
    document.querySelector("#vol-email").innerHTML = volEmailHtml;
    document.querySelector("#vol-phone").innerHTML = volPhoneHtml;

    if (volPost) {
        volPostHtml += `
        <div class="u-align-left-xs u-container-style u-grey-70 u-list-item u-radius-15 u-repeater-item u-shape-round u-list-item-1" data-href="volunteer_post_info.html?caseID=${volPost[0].id}">
            <div class="u-container-layout u-similar-container u-valign-top-lg u-valign-top-md u-valign-top-sm u-valign-top-xl u-container-layout-1">
                <img
                    class="u-border-7 u-border-grey-5 u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xl u-image u-image-default u-image-1"
                    src="${volPost[0].c_image}"
                    alt=""
                    data-image-width="1200"
                    data-image-height="1197"
                    data-animation-name="customAnimationIn"
                    data-animation-duration="1500"
                    data-animation-delay="500"
                />
                <h4 class="u-custom-font u-text u-text-3" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"><i class="fa-solid fa-paw"></i> ${volPost[0].c_name.slice(0,6)}</h4>
                <p class="u-hidden-xs u-text u-text-4" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                    性別：<span style="font-weight: 700">${volPost[0].gender}</span>
                </p>
                <p class="u-hidden-xs u-text u-text-5" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                    簡介：<span style="font-weight: 700">${volPost[0].intro.slice(0,6)}</span>
                </p>
            </div>
        </div>
        `;

        if (volPost[1]) {
            volPostHtml += `
            <div class="u-align-left-xs u-container-style u-grey-70 u-list-item u-radius-15 u-repeater-item u-shape-round u-list-item-1" data-href="volunteer_post_info.html?caseID=${volPost[1].id}">
                <div class="u-container-layout u-similar-container u-valign-top-lg u-valign-top-md u-valign-top-sm u-valign-top-xl u-container-layout-1">
                    <img
                        class="u-border-7 u-border-grey-5 u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xl u-image u-image-default u-image-1"
                        src="${volPost[1].c_image}"
                        alt=""
                        data-image-width="1200"
                        data-image-height="1197"
                        data-animation-name="customAnimationIn"
                        data-animation-duration="1500"
                        data-animation-delay="500"
                    />
                    <h4 class="u-custom-font u-text u-text-3" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"><i class="fa-solid fa-paw"></i> ${volPost[1].c_name.slice(0,6)}</h4>
                    <p class="u-hidden-xs u-text u-text-4" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                        性別：<span style="font-weight: 700">${volPost[1].gender}</span>
                    </p>
                    <p class="u-hidden-xs u-text u-text-5" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                        簡介：<span style="font-weight: 700">${volPost[1].intro.slice(0,6)}</span>
                    </p>
                </div>
            </div>
            `;
        }
    }

    document.querySelector("#post-box").innerHTML = volPostHtml;
    
    for (let j = 0; j < 3; j++) {
        if (volCase[j].adopt_status == "pending") {
            volCaseHtml += `
            <div class="u-align-left-xs u-container-style u-grey-70 u-list-item u-radius-15 u-repeater-item u-shape-round u-list-item-3" data-href="volunteer_case_info.html?caseID=${volCase[j].form_id}">
                <div class="u-container-layout u-similar-container u-valign-bottom-lg u-valign-bottom-md u-valign-bottom-xl u-container-layout-3">
                    <img
                        class="u-align-center u-border-7 u-border-grey-5 u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-default u-image-3"
                        src="${volCase[j].img}"
                        alt=""
                        data-image-width="1200"
                        data-image-height="1197"
                        data-animation-name="customAnimationIn"
                        data-animation-duration="1500"
                        data-animation-delay="500"
                    />
                    <h4 class="u-custom-font u-text u-text-9" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">${volCase[j].cat_name.slice(0,6)}</h4>
                </div>
            </div>
            `;
        } else if (volCase[j].adopt_status == "ACCEPT") {
            volCaseHtml += `
            <div class="u-align-left-xs u-container-style u-grey-70 u-list-item u-radius-15 u-repeater-item u-shape-round u-list-item-3" data-href="volunteer_case_update.html?caseID=${volCase[j].form_id}">
                <div class="u-container-layout u-similar-container u-valign-bottom-lg u-valign-bottom-md u-valign-bottom-xl u-container-layout-3">
                    <img
                        class="u-align-center u-border-7 u-border-grey-5 u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-default u-image-3"
                        src="${volCase[j].img}"
                        alt=""
                        data-image-width="1200"
                        data-image-height="1197"
                        data-animation-name="customAnimationIn"
                        data-animation-duration="1500"
                        data-animation-delay="500"
                    />
                    <h4 class="u-custom-font u-text u-text-9" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">${volCase[j].cat_name.slice(0,5)}</h4>
                </div>
            </div>
            `;
        }

        document.querySelector("#case-box").innerHTML = volCaseHtml;
    }
}
