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

    var SaveEditBtn = document.getElementById('addSave');
    SaveEditBtn.value = "Add";
    SaveEditBtn.type = "submit";
    SaveEditBtn.removeAttribute("onclick")
}

function closeModal() {
    modal = document.getElementById('myModal');
    modal.style.display = "none";

    var EditName = document.getElementById('formName');
    EditName.removeAttribute("value");
    var EditLastname = document.getElementById('formLastname');
    EditLastname.removeAttribute("value");
    var EditTel = document.getElementById('formTelephone');
    EditTel.removeAttribute("value");
    var EditEmail = document.getElementById('formEmail');
    EditEmail.removeAttribute("value");
}

window.onclick = function(event) {
    modal = document.getElementById('myModal');
    if (event.target == modal){
        modal.style.display = "none";
        closeModal();
    }
}

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
    contact.email = form.email.value;
    contacts.push(contact);
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
    // FormAdd.setAttribute("onsubmit", "editYes(editbtn, form)");

    FormAdd.removeAttribute("onsubmit");

    var SaveEditBtn = document.getElementById('addSave');
    // SaveEditBtn.setAttribute("value", "Save it");

    SaveEditBtn.setAttribute("value", "Save it");
    SaveEditBtn.setAttribute("type", "button");

    var EditName = document.getElementById('formName');
    EditName.value = contact.name;
    var EditLastname = document.getElementById('formLastname');
    EditLastname.value = contact.lastname;
    var EditTel = document.getElementById('formTelephone');
    EditTel.value = contact.telephone;
    var EditEmail = document.getElementById('formEmail');
    EditEmail.value = contact.email;



    SaveEditBtn.onclick = function () {
        var contact = contacts[id];
        contact.name = EditName.value;
        contact.lastname = EditLastname.value;
        contact.telephone = EditTel.value;
        contact.email = EditEmail.value;

        if((contact.name !== "") && (contact.lastname !== "") && (contact.telephone !== "") && (contact.email !== "")){

            // contacts.push(contact);
            // var lastItem = contacts.length - 1;
            // contacts.splice(lastItem, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            document.getElementById("fullname-"+id).innerHTML = contact.name + ' ' + contact.lastname;
            document.getElementById("tel_card-"+id).value = contact.telephone;

            document.getElementById("email_card-"+id).value = contact.email;


            closeModal();
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
        str += '<input id="tel_card-'+i+'"  type="tel" value="' + contacts[i].telephone + '" readonly>';
        str += '<button class="addfieldbtn" id="add_telfield-'+ i +'"><i class="fa fa-plus" aria-hidden="true"></i>';
        str += '</button></p><p><i class="fa fa-envelope" aria-hidden="true"></i></i>';
        str += '<input id="email_card-'+i+'" type="email" value="' + contacts[i].email + '" readonly>';
        str += '<button class="addfieldbtn" id="add_emailfield-'+ i +'"><i class="fa fa-plus" aria-hidden="true"></i>';
        str += '</button></p><p><input class="save_btn" id="save_btn-'+ i +'" type="button" value="Save">';
        str += '<input class="unsave_btn" id="unsave_btn-'+i+'" type="button" value="Close"></p>';
        str += '</form></div></div>';
        divContact.innerHTML += str;
    }
    accordion();
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









