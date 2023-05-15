window.onload = () => {
    volProfileData();
};

async function volProfileData() {
    const resp = await fetch("/volunteer_profile");
    const volProfile = await resp.json();
    
    let volNameHtml = "";
    let formNameHtml = "";
    let formBirthHtml = "";
    let formPhoneHtml = "";
    let formEmailHtml = "";
    let formAddressHtml = "";
    document.querySelector("#vol-name").innerHTML = "";
    document.querySelector("#form-name").innerHTML = "";
    document.querySelector("#form-birth").innerHTML = "";
    document.querySelector("#form-phone").innerHTML = "";
    document.querySelector("#form-email").innerHTML = "";
    document.querySelector("#form-address").innerHTML = "";

    const v_birth_date = volProfile.v_birth_date.substring(0, 10);

    volNameHtml = `${volProfile.v_name}`;

    formNameHtml = `
    <label class="u-label u-label-1"><i class="fa-solid fa-user-check"></i> 姓名</label>
    <input type="text" value="${volProfile.v_name}" id="v_name" name="v_name" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-1" required="required"/>
    `;

    formBirthHtml = `
    <label class="u-label u-label-2"><i class="fa-solid fa-calendar-days"></i> 出生日期</label>
    <input type="date" value="${v_birth_date}" id="v_birth_date" name="v_birth_date" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-2" required="" data-date-format="dd/mm/yyyy"/>
    `;

    formPhoneHtml = `
    <label class="u-label u-label-3"><i class="fa-solid fa-phone-flip"></i> 電話</label>
    <input type="number" pattern="\+?\d{0,3}[\s\(\-]?([0-9]{2,3})[\s\)\-]?([\s\-]?)([0-9]{3})[\s\-]?([0-9]{2})[\s\-]?([0-9]{2})" value="${volProfile.v_phone_number}" id="v_phone_number" name="v_phone_number" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-3" required=""/>
    `;

    formEmailHtml = `
    <label class="u-label u-label-4"><i class="fa-solid fa-envelope"></i> 電郵</label>
    <input type="email" value="${volProfile.v_email}" id="v_email" name="v_email" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-4" required="required"/>
    `;

    formAddressHtml = `
    <label for="text-2557" class="u-label u-label-5"><i class="fa-solid fa-location-dot"></i> 地址</label>
    <input type="text" value="${volProfile.v_address}" id="v_address" name="v_address" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-5" required="required"/>
    `;
    
    document.querySelector("#vol-name").innerHTML = volNameHtml;
    document.querySelector("#form-name").innerHTML = formNameHtml;
    document.querySelector("#form-birth").innerHTML = formBirthHtml;
    document.querySelector("#form-phone").innerHTML = formPhoneHtml;
    document.querySelector("#form-email").innerHTML = formEmailHtml;
    document.querySelector("#form-address").innerHTML = formAddressHtml;

    const formData = document.querySelector("#edit-form");

    formData.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const formData = event.target;
        const v_name = formData.v_name.value;
        const v_email = formData.v_email.value;
        const v_birth_date = formData.v_birth_date.value;
        const v_phone_number = formData.v_phone_number.value;
        const v_address = formData.v_address.value;

        let formObject = {
            v_name,
            v_email,
            v_birth_date,
            v_phone_number,
            v_address,
        };
        
        const response = await fetch(`/volunteer_profile_update/${volProfile.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObject),
        });

        if (response.status === 200) {
            const data = await response.json();
            window.location = "/volunteer_profile.html";
            console.log(data);
            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}
