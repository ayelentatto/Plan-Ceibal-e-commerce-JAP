const inputEmail = document.getElementById("emailProfile");
const dataProfile = document.querySelectorAll('.valueProfile');
const btnSaveDataUser = document.getElementById("saveDataUser");
const formProfile = document.getElementsByName("formProfile");
const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', (e) => { //BOTON DE GUARDAR DATOS
    e.preventDefault();
    saveData();
    changeEmail();
})

const firstName = document.getElementById("nameProfile");//GRUPO DE INPUTS
const secName = document.getElementById("2nameProfile");
const firstSurname = document.getElementById("surnameProfile");
const secSurname = document.getElementById("2surnameProfile");
const phone = document.getElementById("phone");

function saveData() {
    let userData = {//NEVO OBJETO (USUARIO)
        first_Name: firstName.value,
        sec_Name: secName.value,
        first_Surname: firstSurname.value,
        sec_Surname: secSurname.value,
        telephone: phone.value
    };
    const dataOfUser = JSON.stringify(userData);
    localStorage.setItem("datos de usuario", dataOfUser);
    showDataUser(dataOfUserJson);

}

const dataOfUserJson = JSON.parse(localStorage.getItem("datos de usuario"));//CONSTANTE OBJ USUARIO


function showDataUser(dataOfUserJson) {// AUTOCOMPLETAR DATOS
    if ("datos de usuario" in localStorage) {
        firstName.setAttribute("value", dataOfUserJson.first_Name);
        secName.setAttribute("value", dataOfUserJson.sec_Name);
        firstSurname.setAttribute("value", dataOfUserJson.first_Surname);
        secSurname.setAttribute("value", dataOfUserJson.sec_Surname);
        phone.setAttribute("value", dataOfUserJson.telephone);

    }
}



document.addEventListener("DOMContentLoaded", () => {// cuando carga aparecen los datos autoocmpletados
    showEmailInput();
    showDataUser(dataOfUserJson);
    showImgProfile(photoProfile)

})
function showEmailInput() {
    if ("email" in localStorage) {
        inputEmail.setAttribute("value", localStorage.getItem("email"));
        
    }
}
function changeEmail(){
    if(inputEmail.value!==localStorage.getItem("email")){
        localStorage.setItem("email", inputEmail.value)
    }
}

//foto de perfil
const divIMGProfile = document.querySelector('.profile-pic-div');
const photoProfile = document.querySelector('#photoProfile');
const imgFile = document.querySelector('#fileIMG');
const labelIMGProfile = document.querySelector('#labelFileIMG');



imgFile.addEventListener('change', function () {
    const choosedFile = this.files[0];
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            photoProfile.setAttribute('src', reader.result);
            let IMGelegida =  photoProfile.getAttribute('src');
            localStorage.setItem("photo Profile", IMGelegida);
        });
        reader.readAsDataURL(choosedFile);
       
    }
})
function showImgProfile(photoProfile){
    if("photo Profile" in localStorage){
photoProfile.setAttribute('src',localStorage.getItem('photo Profile'))
       
    }
}
 function showSelectPhoto (variable){
    variable.addEventListener('mouseenter', function () {
        labelIMGProfile.style.display = "block";
})
}

function hideSelectPhoto (variable){
    variable.addEventListener('mouseleave', function () {
        labelIMGProfile.style.display = "none";
    });
}

showSelectPhoto (divIMGProfile);
hideSelectPhoto (divIMGProfile);
showSelectPhoto (photoProfile);
hideSelectPhoto (photoProfile);
showSelectPhoto (labelIMGProfile);
hideSelectPhoto (labelIMGProfile);
