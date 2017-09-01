//Аккордион
function accordion () {
var title = document.getElementsByClassName('contact_name'),
    cont = document.getElementsByClassName('contact_card');

    for (var q = 0; q < title.length; q++) {
        var curTitle = title[q];
        title[q].addEventListener('click', function() {
            var classes = this.getAttribute('class'),
                newClasses = '',
                classesArr = classes.split(' '),
                newClassesArr = classes.split(' ');
            for (var j = 0; j < classesArr.length; j++) {
                if (classesArr[j] == 'active') {
                    classesArr.splice([j], 1);
                }
            }
            if (classesArr.length === newClassesArr.length) {
                classesArr.push('active');

                newClasses = classesArr.join(' ');
            } else {

                newClasses = classesArr.join(' ');
            }

            for (var l = 0; l < title.length; l++) {
                oldClasses = title[l].getAttribute('class');
                oldClassesArr = oldClasses.split(' ');
                for (var k = 0; k < oldClassesArr.length; k++) {
                    if (oldClassesArr[k] == 'active') {
                        oldClassesArr.splice([k], 1);
                    }
                    oldClasses = oldClassesArr.join(' ');
                    title[l].setAttribute('class', oldClasses);
                }
            }
            this.setAttribute('class', newClasses);
        })
    }
}

//Поп-ап для создания контакта

function addBtnContact() {
    document.forms["formAddContact"].reset();
    var FormAdd = document.getElementById('formAddContact');
    FormAdd.setAttribute("onsubmit", "saveContact(this)");
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

    var addSaveBtn = document.getElementById('addSave');
    addSaveBtn.style.display = "block";
    var SaveEditBtn = document.getElementById('addSaveEdit');
    SaveEditBtn.style.display = "none";
}

function closeModal() {
    modal = document.getElementById('myModal');
    modal.style.display = "none";
    // var EditName = document.getElementById('formName');
    // EditName.removeAttribute("value");
    // var EditLastname = document.getElementById('formLastname');
    // EditLastname.removeAttribute("value");
    // var EditTel = document.getElementById('formTelephone');
    // EditTel.removeAttribute("value");
    // var EditEmail = document.getElementById('formEmail');
    // EditEmail.removeAttribute("value");


    location.reload()
}

window.onclick = function(event) {
    modal = document.getElementById('myModal');
    if (event.target == modal){
        modal.style.display = "none";
        closeModal();
    }
};

//Телефонная книга
function checkStorageForContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem('contacts'));
    if((contacts == null) || (contacts.length == 0)){
        document.getElementById("noContacts").style.display="block";
    }
    else{
        fetchContacts();
    }
}

function saveContact(form){
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    if(contacts == null){

        var contacts = [ ];
    }
    var contact = { };
    contact.name = form.name.value;
    contact.lastname = form.lastname.value;
    contact.telephone = form.telephone.value;
    contact.telephone1 = form.telephone1.value;
    contact.telephone2 = form.telephone2.value;
    contact.telephone3 = form.telephone3.value;
    contact.telephone4 = form.telephone4.value;
    contact.email = form.email.value;
    contact.email1 = form.email1.value;
    contact.email2 = form.email2.value;
    contacts.push(contact);
    contacts.sort(compare);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}


function removeContact(contact){
        var modal = document.getElementById('myModalRemove');
        modal.style.display = "block";
        document.getElementById('remove_yes').onclick = function () {
            var id = contact.id;
            contacts = JSON.parse(localStorage.getItem('contacts'));
            contacts.splice(id, 1);
            if (contacts.length == 0) {
                document.getElementById("noContacts").style.display="block";
            }
            localStorage.setItem('contacts', JSON.stringify(contacts));
            var contacts = document.getElementById('contact-' +id);
            contacts.parentNode.removeChild(contacts);
            modal.style.display = "none";
        };
        document.getElementById('remove_no').onclick = function () {
            modal = document.getElementById('myModalRemove');
            modal.style.display = "none";
        };
}

function editContact(editbtn) {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

    var id = editbtn.id;
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    var contact = contacts[id];

    var FormAdd = document.getElementById('formAddContact');
    FormAdd.removeAttribute("onsubmit");

    var SaveEditBtn = document.getElementById('addSaveEdit');
    SaveEditBtn.style.display = "block";


    var addSaveBtn = document.getElementById('addSave');
    addSaveBtn.style.display = "none";


    var EditName = document.getElementById('formName');
    EditName.value = contact.name;
    var EditLastname = document.getElementById('formLastname');
    EditLastname.value = contact.lastname;
    var EditTel = document.getElementById('formTelephone');
    EditTel.value = contact.telephone;
    var EditTel1 = document.getElementById('formTelephone1');
    EditTel1.value = contact.telephone1;
    var EditTel2 = document.getElementById('formTelephone2');
    EditTel2.value = contact.telephone2;
    var EditTel3 = document.getElementById('formTelephone3');
    EditTel3.value = contact.telephone3;
    var EditTel4 = document.getElementById('formTelephone4');
    EditTel4.value = contact.telephone4;
    var EditEmail = document.getElementById('formEmail');
    EditEmail.value = contact.email;
    var EditEmail1 = document.getElementById('formEmail1');
    EditEmail1.value = contact.email1;
    var EditEmail2 = document.getElementById('formEmail2');
    EditEmail2.value = contact.email2;




        if (contact.telephone1 !== "null") {
            document.getElementById("tel_field1").style.display = "block";
            document.getElementById("plus_tel0").style.display = "none"

        }
        else {
            document.getElementById("tel_field1").style.display = "none";
        }

        if (contact.telephone2 !== "null") {
            document.getElementById("tel_field2").style.display = "block";
            document.getElementById("plus_tel1").style.display = "none"

        }
        else {
            document.getElementById("tel_field2").style.display = "none";
        }

        if (contact.telephone3 !== "null") {
            document.getElementById("tel_field3").style.display = "block";
            document.getElementById("plus_tel2").style.display = "none"

        }
        else {
            document.getElementById("tel_field3").style.display = "none"
        }

        if (contact.telephone4 !== "null") {
            document.getElementById("tel_field4").style.display = "block";
            document.getElementById("plus_tel3").style.display = "none"

        }
        else {
            document.getElementById("tel_field4").style.display = "none"
        }
        if (contact.email1 !== "null@null.null") {
            document.getElementById("email_field1").style.display = "block";
            document.getElementById("plus_email0").style.display = "none"

        }
        else {
            document.getElementById("email_field1").style.display = "none"
        }

        if (contact.email2 !== "null@null.null") {
            document.getElementById("email_field2").style.display = "block";
            document.getElementById("plus_email1").style.display = "none"

        }
        else {
            document.getElementById("email_field2").style.display = "none"
        }



    SaveEditBtn.onclick = function () {
        var contact = contacts[id];
        contact.name = EditName.value;
        contact.lastname = EditLastname.value;
        contact.telephone = EditTel.value;
        contact.telephone1 = EditTel1.value;
        contact.telephone2 = EditTel2.value;
        contact.telephone3 = EditTel3.value;
        contact.telephone4 = EditTel4.value;
        contact.email = EditEmail.value;
        contact.email1 = EditEmail1.value;
        contact.email2 = EditEmail2.value;

        if((contact.name !== "") && (contact.lastname !== "") && (contact.telephone !== "") && (contact.email !== "")
            && (contact.telephone1 !== "") && (contact.telephone2 !== "") && (contact.telephone3 !== "") &&
            (contact.telephone4 !== "") && (contact.email1 !== "") && (contact.email2 !== "")){
            contacts.sort(compare);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            // document.getElementById("fullname-"+id).innerHTML = contact.name + ' ' + contact.lastname;
            // document.getElementById("tel_card-"+id).value = contact.telephone;
            // document.getElementById("email_card-"+id).value = contact.email;


            closeModal();
            // location.reload()
        }
    }
}

function fetchContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem('contacts'));
    var divContacts = document.getElementById("contacts");
    for(var i = 0; i < contacts.length; i++){
        var divContact = document.createElement('div');
        divContact.id = "contact-" + i;
        divContact.className = "contact";
        divContacts.appendChild(divContact);

        var str =  '<div id="contact_name'+i+'" class="contact_name">';
        str += '<span id="fullname-'+i+'">' + contacts[i].name + ' ' + contacts[i].lastname + '</span><form class="for_edit">';
        str += '<input class="first_name" type="text" id="firstname-'+i+'" value="' + contacts[i].name + '">';
        str += '<input class="last_name" type="text" id="lastname-'+i+'" value="' + contacts[i].lastname + '"></form></div>';
        str += '<div class="contact_card"><div class="card_actions">';
        str += '<button onclick="removeContact(this)" class="delbtn" id ="'+ i +'"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        str += '<button id="'+i+'"  onclick="editContact(this)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div></button>';
        str += '<div class="card_content"><form>';
        str += '<p><i class="fa fa-mobile" aria-hidden="true"></i>';
        str += '<input id="tel_card-'+i+'"  type="tel" value="' + contacts[i].telephone + '" readonly></p>';

            str += '<p class="tel_block" id="tel_block1'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
            str += '<input id="tel_card1-'+i+'"  type="tel" value="' + contacts[i].telephone1 +'" readonly></p>';
            str += '<p class="tel_block" id="tel_block2'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
            str += '<input id="tel_card2-'+i+'"  type="tel" value="' + contacts[i].telephone2 +'" readonly></p>';
            str += '<p class="tel_block" id="tel_block3'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
            str += '<input id="tel_card3-'+i+'"  type="tel" value="' + contacts[i].telephone3 +'" readonly></p>';
            str += '<p class="tel_block" id="tel_block4'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
            str += '<input id="tel_card4-'+i+'"  type="tel" value="' + contacts[i].telephone4 +'" readonly></p>';

        str += '<p><i class="fa fa-envelope" aria-hidden="true"></i></i>';
        str += '<input id="email_card-'+i+'" type="email" value="' + contacts[i].email + '" readonly></p>';

            str += '<p class="email_block" id="email_block1'+i+'"><i class="fa fa-envelope" aria-hidden="true"></i></i>';
            str += '<input id="email_card1-'+i+'" type="email" value="' + contacts[i].email1 + '" readonly></p>';
            str += '<p class="email_block" id="email_block2'+i+'"><i class="fa fa-envelope" aria-hidden="true"></i></i>';
            str += '<input id="email_card2-'+i+'" type="email" value="' + contacts[i].email2 + '" readonly></p>';

        str += '<p><input class="save_btn" id="save_btn-'+ i +'" type="button" value="Save">';
        str += '<input class="unsave_btn" id="unsave_btn-'+i+'" type="button" value="Close"></p>';
        str += '</form></div></div>';
        divContact.innerHTML += str;
    }
    unHiddenExtraFields();
    accordion();
}






//Sorting
function compare(a,b) {
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

// function sortIt() {
//     var contacts = JSON.parse(localStorage.getItem('contacts'));
//     contacts.sort(compare);
//     localStorage.setItem('contacts', JSON.stringify(contacts));
// };


// Searching


function search() {
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    var searchField = document.getElementById("search_field");
    var resetBtn = document.getElementById("reset");
    for (i = 0; i < contacts.length; i++) {
        var filter = searchField.value.toUpperCase();
        // var contact = document.getElementById("contact-" + i)[0];
            if ((contacts[i].name.toUpperCase().indexOf(filter) > -1) ||
                (contacts[i].lastname.toUpperCase().indexOf(filter) > -1)) {
                document.getElementById("contact-" + i).style.display = "";
                // alert(contacts[i].name +' true');
            } else {
                document.getElementById("contact-" + i).style.display = "none";
                // alert(contacts[i].name +' false');
            }
        }
    resetBtn.onclick = function () {
        searchField.value = '';
    }
}


    //Plusiki


document.getElementById("plus_tel0").onclick = function plusTel() {
    document.getElementById("tel_field1").style.display = "block";
    document.getElementById("formTelephone1").value = "";
    document.getElementById("formTelephone1").setAttribute("required", "true");
    document.getElementById("plus_tel0").style.display = "none"
};
document.getElementById("plus_tel1").onclick = function plusTel1() {
    document.getElementById("tel_field2").style.display = "block";
    document.getElementById("formTelephone2").value = "";
    document.getElementById("formTelephone2").setAttribute("required", "true");
    document.getElementById("plus_tel1").style.display = "none"
};
document.getElementById("plus_tel2").onclick = function plusTel2() {
    document.getElementById("tel_field3").style.display = "block";
    document.getElementById("formTelephone3").value = "";
    document.getElementById("formTelephone3").setAttribute("required", "true");
    document.getElementById("plus_tel2").style.display = "none"
};
document.getElementById("plus_tel3").onclick = function plusTel3() {
    document.getElementById("tel_field4").style.display = "block";
    document.getElementById("formTelephone4").value = "";
    document.getElementById("formTelephone4").setAttribute("required", "true");
    document.getElementById("plus_tel3").style.display = "none"
};
document.getElementById("plus_email0").onclick = function plusEmail() {
    document.getElementById("email_field1").style.display = "block";
    document.getElementById("formEmail1").value = "";
    document.getElementById("formEmail1").setAttribute("required", "true");
    document.getElementById("plus_email0").style.display = "none"
};
document.getElementById("plus_email1").onclick = function plusEmail() {
    document.getElementById("email_field2").style.display = "block";
    document.getElementById("formEmail2").value = "";
    document.getElementById("formEmail2").setAttribute("required", "true");
    document.getElementById("plus_email1").style.display = "none"
};





function unHiddenExtraFields() {


            var EditTel1 = document.getElementById('formTelephone1');
            var EditTel2 = document.getElementById('formTelephone2');
            var EditTel3 = document.getElementById('formTelephone3');
            var EditTel4 = document.getElementById('formTelephone4');
            var EditEmail1 = document.getElementById('formEmail1');
            var EditEmail2 = document.getElementById('formEmail2');
            var telBlock1 = document.getElementById('tel_block1');
            var telBlock2 = document.getElementById('tel_block2');
            var telBlock3 = document.getElementById('tel_block3');
            var telBlock4 = document.getElementById('tel_block4');
            var emailBlock1 = document.getElementById('email_block1');
            var emailBlock2 = document.getElementById('email_block2');


            var contacts = JSON.parse(localStorage.getItem('contacts'));

            for (i = 0; i < contacts.length; i++) {

                if (contacts[i].telephone1 !== "null") {
                    document.getElementById("tel_block1"+i).style.display = "block"
                }
                else {
                    document.getElementById("tel_block1"+i).style.display = ""
                }

                if (contacts[i].telephone2 !== "null") {
                    document.getElementById("tel_block2"+i).style.display = "block"
                }
                else {
                    document.getElementById("tel_block2"+i).style.display = ""
                }

                if (contacts[i].telephone3 !== "null") {
                    document.getElementById("tel_block3"+i).style.display = "block"
                }
                else {
                    document.getElementById("tel_block3"+i).style.display = ""
                }

                if (contacts[i].telephone4 !== "null") {
                    document.getElementById("tel_block4"+i).style.display = "block"
                }
                else {
                    document.getElementById("tel_block4"+i).style.display = ""
                }
                if (contacts[i].email1 !== "null@null.null") {
                    document.getElementById("email_block1"+i).style.display = "block"
                }
                else {
                    document.getElementById("email_block1"+i).style.display = ""
                }

                if (contacts[i].email2 !== "null@null.null") {
                    document.getElementById("email_block2"+i).style.display = "block"
                }
                else {
                    document.getElementById("email_block1"+i).style.display = ""
                }
            }
        }






















    //     Вариант 2 - добавление

    //     111111111var divContactName = document.createElement('div');
    //     divContactName.id = "divContactName-" + i;
    //     divContactName.className = "contact_name";
    //     divContact.appendChild(divContactName);
    //     // divContactName.onclick = accordion();
    //
    //     var spanContactName = document.createElement('span');
    //     spanContactName.innerHTML = contacts[i]["name"] + " " + contacts[i]["lastname"];
    //     divContactName.appendChild(spanContactName);
    //
    //     var divContactCard = document.createElement('div');
    //     divContactCard.id = "contact_card-" + i;
    //     divContactCard.className = "contact_card";
    //     divContact.appendChild(divContactCard);
    //     // divContactInformation.style.display="none";
    //
    //     var divContactActions = document.createElement('div');
    //     divContactActions.className = "card_actions";
    //     divContactCard.appendChild(divContactActions);
    //     var divContactActionsDel = document.createElement('i');
    //     divContactActionsDel.className = "fa fa-trash-o";
    //     divContactActions.appendChild(divContactActionsDel);
    //     var divContactActionsEdit = document.createElement('i');
    //     divContactActionsEdit.className = "fa fa-pencil-square-o";
    //     divContactActions.appendChild(divContactActionsEdit);
    //
    //     var divContactCont = document.createElement('div');
    //     divContactCont.className = "card_content";
    //     divContactCard.appendChild(divContactCont);
    //
    //     var formContact = document.createElement('form');
    //     formContact.id = "formContact-" + i;
    //     // divContact.onclick = function() {
    //     //     showContactInformation(this);
    //     //     }
    //     divContactCont.appendChild(formContact);
    //
    //     var formContactP = document.createElement('p');
    //     formContact.appendChild(formContactP);
    //
    //     var formContactMob = document.createElement('i');
    //     formContactMob.className = "fa fa-mobile";
    //     formContactP.appendChild(formContactMob);
    //
    //
    //     var inputTel = document.createElement('input');
    //     inputTel.id = "inputTel" + i;
    //     inputTel.setAttribute("value", contacts[i]["telephone"])
    //     inputTel.setAttribute("readonly", true)
    //     inputTel.setAttribute("type", "tel")
    //     // inputTel.innerHTML = contacts[i]["telephone"];
    //     formContactP.appendChild(inputTel);
    //
    //
    //     var formContactPlus = document.createElement('i');
    //     formContactPlus.className = "fa fa-plus";
    //     formContactP.appendChild(formContactPlus);
    //
    //     var formContactP2 = document.createElement('p');
    //     formContact.appendChild(formContactP2);
    //
    //
    //     var formContactMail = document.createElement('i');
    //     formContactMail.className = "fa fa-envelope";
    //     formContactP2.appendChild(formContactMail);
    //
    //
    //     var inputMail = document.createElement('input');
    //     inputMail.id = "inputMail" + i;
    //     inputMail.setAttribute("value", contacts[i]["email"]);
    //     inputMail.setAttribute("readonly", true);
    //     inputMail.setAttribute("type", "email");
    //     // inputTel.innerHTML = contacts[i]["telephone"];
    //     formContactP2.appendChild(inputMail);
    //
    //
    //     var formContactPlus = document.createElement('i');
    //     formContactPlus.className = "fa fa-plus";
    //     formContactP2.appendChild(formContactPlus);
    //
    //     var formContactP3 = document.createElement('p');
    //     formContact.appendChild(formContactP3);
    //
    //     var inputSave = document.createElement('input');
    //     inputSave.className = "save_btn";
    //     inputSave.setAttribute("value", "Save");
    //     inputSave.setAttribute("type", "button");
    //     // inputTel.innerHTML = contacts[i]["telephone"];
    //     formContactP3.appendChild(inputSave);
    //
    //
    //
    //
    // }









