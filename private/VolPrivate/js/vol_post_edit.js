window.onload = () => {
    catProfileData();
};

async function catProfileData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const resp = await fetch(`/volunteer_post_info/${urlSearchParams.get("caseID")}`);
    const catProfile = await resp.json();
    console.log(catProfile);

    const catDateFormat = catProfile.age.substring(0, 10);
    
    let catNameHtml = "";
    let catBirthHtml = "";
    let catBreedHtml = "";
    let catGenderHtml = "";
    let catCharacterHtml = "";
    let catHabitHtml = "";
    let catHealthHtml = "";
    let catIntroHtml = "";
    let catFileHtml = "";
    document.querySelector("#cat-name").innerHTML = "";
    document.querySelector("#cat-birth").innerHTML = "";
    document.querySelector("#cat-breed").innerHTML = "";
    document.querySelector("#cat-gender").innerHTML = "";
    document.querySelector("#cat-character").innerHTML = "";
    document.querySelector("#cat-habit").innerHTML = "";
    document.querySelector("#cat-health").innerHTML = "";
    document.querySelector("#cat-intro").innerHTML = "";
    document.querySelector("#cat-file").innerHTML = "";

    catNameHtml = `
    <label class="u-label u-label-1"><i class="fa-solid fa-paw"></i> 貓貓的名稱*</label>
    <input type="text" value="${catProfile.cat_name}" id="names" name="names" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-1" required="required"/>
    `;

    catBirthHtml = `
    <label class="u-label u-label-2"><i class="fa-solid fa-calendar-days"></i> 貓貓的出生日期*</label>
    <input type="date" value="${catDateFormat}" id="age" name="age" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-2" required="" data-date-format="dd/mm/yyyy"/>
    `;

    catBreedHtml = `
    <label class="u-label u-label-3"><i class="fa-solid fa-cat"></i> 貓貓的品種*</label>
    <input type="text" value="${catProfile.breed}" id="breed" name="breed" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-3" required="required"/>
    `;

    catGenderHtml = `
    <label class="u-label u-label-5"><i class="fa-solid fa-restroom"></i> 貓貓的性別*</label>
    <input type="text" value="${catProfile.gender}" id="gender" name="gender" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-4" required="required"/>
    `;

    catCharacterHtml = `
    <label class="u-label u-label-5"><i class="fa-solid fa-face-smile"></i> 貓貓的性格*</label>
    <input type="text" value="${catProfile.characters}" id="characters" name="characters" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-4" required="required"/>
    `;

    catHabitHtml = `
    <label class="u-label u-label-6"><i class="fa-solid fa-fish"></i> 貓貓的進食習慣*</label>
    <input type="text" value="${catProfile.food_habits}" id="food_habits" name="food_habits" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-5" required="required"/>
    `;

    catHealthHtml = `
    <label class="u-label u-label-7"><i class="fa-solid fa-stethoscope"></i> 貓貓的身體狀況*</label>
    <input type="text" value="${catProfile.cat_health}" id="cat_health" name="cat_health" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-6" required="required"/>
    `;

    catIntroHtml = `
    <label class="u-label u-label-8"><i class="fa-solid fa-file"></i> 貓貓的簡介*</label>
    <textarea rows="4" cols="50" id="intro" form="intro" name="intro" class="u-border-2 u-border-custom-color-3 u-grey-10 u-input u-input-rectangle u-radius-10 u-input-7" required="">${catProfile.intro}</textarea>
    `;

    catFileHtml = `
    <div class="u-align-center u-container-style u-custom-color-5 u-group u-radius-20 u-shape-round u-group-1" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500">
        <div class="u-container-layout u-valign-bottom-lg u-valign-bottom-sm u-valign-bottom-xl u-valign-bottom-xs u-container-layout-1">
            <h1 class="u-align-left u-text u-text-custom-color-4 u-text-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="750">${catProfile.cat_name}</h1>
        </div>
    </div>
    <img
        class="u-border-7 u-border-grey-5 u-image u-image-circle u-preserve-proportions u-image-2"
        src="${catProfile.img[0]}"
        alt=""
        ata-image-width="1200"
        data-image-height="1197"
        data-animation-name="customAnimationIn"
        data-animation-duration="1500"
        data-animation-delay="500"
    />
    `;
   
    document.querySelector("#cat-name").innerHTML = catNameHtml;
    document.querySelector("#cat-birth").innerHTML = catBirthHtml;
    document.querySelector("#cat-breed").innerHTML = catBreedHtml;
    document.querySelector("#cat-gender").innerHTML = catGenderHtml;
    document.querySelector("#cat-character").innerHTML = catCharacterHtml;
    document.querySelector("#cat-habit").innerHTML = catHabitHtml;
    document.querySelector("#cat-health").innerHTML = catHealthHtml;
    document.querySelector("#cat-intro").innerHTML = catIntroHtml;
    document.querySelector("#cat-file").innerHTML = catFileHtml;
    
    const formData = document.querySelector("#edit-form");

    formData.addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.target;
        const age = form.age.value;
        const gender = form.gender.value;
        const breed = form.breed.value;
        const characters = form.characters.value;
        const food_habits = form.food_habits.value;
        const cat_health = form.cat_health.value;
        const intro = document.querySelector("#intro").value;

        let formObject = {
            age,
            gender,
            breed,
            characters,
            food_habits,
            cat_health,
            intro,
        };
        
        const urlSearchParams = new URLSearchParams(window.location.search);
        const caseID = urlSearchParams.get("caseID");

        const response = await fetch(`/volunteer_post_update/${caseID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        });

        if (response.status === 200) {
            const data = await response.json();
            window.location = `/volunteer_post_info.html?caseID=${caseID}`;
            console.log(data);
            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}
