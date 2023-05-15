window.onload = () => {
    volProfileData();
};

async function volProfileData() {
    const resp = await fetch("/user_profile");
    const userProfile = await resp.json();
    const applyResp = await fetch("/user_apply");
    const userApply = await applyResp.json();
    console.log(userProfile);
    console.log(userApply);
    
    let userNameHtml = "";
    let userPhoneHtml = "";
    let userEmailHtml = "";
    let userAddressHtml = "";
    let userKnowHtml = "";
    let userPlanHtml = "";
    let userApplyHtml = "";
    document.querySelector("#user-name").innerHTML = "";
    document.querySelector("#user-phone").innerHTML = "";
    document.querySelector("#user-email").innerHTML = "";
    document.querySelector("#user-address").innerHTML = "";
    document.querySelector("#user-know").innerHTML = "";
    document.querySelector("#user-plan").innerHTML = "";
    document.querySelector("#apply-box").innerHTML = "";

    userNameHtml = `${userProfile.u_name}`;
    userPhoneHtml = `${userProfile.u_phone_number}`;
    userEmailHtml = `${userProfile.u_email}`;
    userAddressHtml = `${userProfile.u_address}`;
    userKnowHtml = `${userProfile.knowledge}`;
    userPlanHtml = `${userProfile.future_plan}`;

    document.querySelector("#user-name").innerHTML = userNameHtml;
    document.querySelector("#user-phone").innerHTML = userPhoneHtml;
    document.querySelector("#user-email").innerHTML = userEmailHtml;
    document.querySelector("#user-address").innerHTML = userAddressHtml;
    document.querySelector("#user-know").innerHTML = userKnowHtml;
    document.querySelector("#user-plan").innerHTML = userPlanHtml;

    for (let i = 0; i < 2; i++) {
        userApplyHtml += `
        <div class="u-align-left-xs u-container-style u-grey-70 u-list-item u-radius-15 u-repeater-item u-shape-round u-list-item-1" data-href="user_apply_info.html?caseID=${userApply[i].form_id}">
            <div class="u-container-layout u-similar-container u-valign-top-lg u-valign-top-md u-valign-top-sm u-valign-top-xl u-container-layout-1">
                <img
                    class="u-border-7 u-border-grey-5 u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xl u-image u-image-default u-image-2"
                    src="${userApply[i].img}"
                    alt=""
                    data-image-width="1200"
                    data-image-height="1197"
                    data-animation-name="customAnimationIn"
                    data-animation-duration="1500"
                    data-animation-delay="500"
                />
                <h4 class="u-custom-font u-text u-text-5"><i class="fa-solid fa-paw"></i> ${userApply[i].cat_name.slice(0,6)}</h4>
                <p class="u-hidden-xs u-text u-text-6">
                    性別：<span style="font-weight: 700">${userApply[i].gender}</span>
                </p>
                <p class="u-hidden-xs u-text u-text-7">
                    簡介：<span style="font-weight: 700">${userApply[i].intro.slice(0,6)}</span>
                </p>
            </div>
        </div>
        `;

        document.querySelector("#apply-box").innerHTML = userApplyHtml;
    }
}