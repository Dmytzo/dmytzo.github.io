//Accordion
function accordion () {
var title = document.getElementsByClassName("contact_name"),
    cont = document.getElementsByClassName("contact_card");

    for (var q = 0; q < title.length; q++) {
        var curTitle = title[q];
        title[q].addEventListener("click", function() {
            var classes = this.getAttribute("class"),
                newClasses = "",
                classesArr = classes.split(" "),
                newClassesArr = classes.split(' ');
            for (var j = 0; j < classesArr.length; j++) {
                if (classesArr[j] == "active") {
                    classesArr.splice([j], 1);
                }
            }
            if (classesArr.length === newClassesArr.length) {
                classesArr.push("active");
                newClasses = classesArr.join(" ");
            }
            else {
                newClasses = classesArr.join(" ");
            }

            for (var l = 0; l < title.length; l++) {
                oldClasses = title[l].getAttribute("class");
                oldClassesArr = oldClasses.split(" ");
                for (var k = 0; k < oldClassesArr.length; k++) {
                    if (oldClassesArr[k] == "active") {
                        oldClassesArr.splice([k], 1);
                    }
                    oldClasses = oldClassesArr.join(" ");
                    title[l].setAttribute("class", oldClasses);
                }
            }
            this.setAttribute("class", newClasses);
        })
    }
}

//Pop up

function addBtnContact() {
    document.forms["formAddContact"].reset();
    var FormAdd = document.getElementById("formAddContact");
    FormAdd.setAttribute("onsubmit", "saveContact(this)");
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var addSaveBtn = document.getElementById('addSave');
    addSaveBtn.style.display = "block";
    var SaveEditBtn = document.getElementById('addSaveEdit');
    SaveEditBtn.style.display = "none";
}

function closeModal() {
    modal = document.getElementById("myModal");
    modal.style.display = "none";
    location.reload()
}

window.onclick = function(event) {
    modal = document.getElementById("myModal");
    if (event.target == modal){
        modal.style.display = "none";
        closeModal();
    }
};

//Phonebook
function checkStorageForContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem("contacts"));
    if((contacts == null) || (contacts.length == 0)){
        document.getElementById("noContacts").style.display="block";
    }
    else{
        fetchContacts();
    }
}

function saveContact(form){
    var contacts = JSON.parse(localStorage.getItem("contacts"));
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
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


function removeContact(contact){
        var modal = document.getElementById("myModalRemove");
        modal.style.display = "block";
        document.getElementById("remove_yes").onclick = function () {
            var id = contact.id;
            contacts = JSON.parse(localStorage.getItem("contacts"));
            contacts.splice(id, 1);
            location.reload();
            if (contacts.length == 0) {
                document.getElementById("noContacts").style.display="block";
            }
            localStorage.setItem("contacts", JSON.stringify(contacts));
            var contacts = document.getElementById("contact-" +id);
            contacts.parentNode.removeChild(contacts);
            modal.style.display = "none";
        };
        document.getElementById("remove_no").onclick = function () {
            modal = document.getElementById("myModalRemove");
            modal.style.display = "none";
        };
}

function editContact(editbtn) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var id = editbtn.id;
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    var contact = contacts[id];
    var FormAdd = document.getElementById("formAddContact");
    FormAdd.removeAttribute("onsubmit");
    var SaveEditBtn = document.getElementById("addSaveEdit");
    SaveEditBtn.style.display = "block";
    var addSaveBtn = document.getElementById("addSave");
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
        }
        else {
            document.getElementById("tel_field1").style.display = "none";
        }
        if (contact.telephone2 !== "null") {
            document.getElementById("tel_field2").style.display = "block";
        }
        else {
            document.getElementById("tel_field2").style.display = "none";
        }
        if (contact.telephone3 !== "null") {
            document.getElementById("tel_field3").style.display = "block";
        }
        else {
            document.getElementById("tel_field3").style.display = "none"
        }
        if (contact.telephone4 !== "null") {
            document.getElementById("tel_field4").style.display = "block";
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
            localStorage.setItem("contacts", JSON.stringify(contacts));
            closeModal();
        }
    }
}

function fetchContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem("contacts"));
    var divContacts = document.getElementById("contacts");
    for(var i = 0; i < contacts.length; i++){
        var divContact = document.createElement("div");
        divContact.id = "contact-" + i;
        divContact.className = "contact";
        divContacts.appendChild(divContact);
        var str =  '<div id="contact_name'+i+'" class="contact_name">';
        str += '<span id="fullname-'+i+'">' + contacts[i].name + ' ' + contacts[i].lastname + '</span><form class="for_edit">';
        // str += '<span id="fullname-'+i+'"><tag id="name'+i+'">'+contacts[i].name+' </tag><tag id="lastname'+i+'">'+contacts[i].lastname+'</tag></span><form class="for_edit">';
        str += '<input class="first_name" type="text" id="firstname-'+i+'" value="' + contacts[i].name + '">';
        str += '<input class="last_name" type="text" id="lastname-'+i+'" value="' + contacts[i].lastname + '"></form></div>';
        str += '<div class="contact_card"><div class="card_actions">';
        str += '<button onclick="removeContact(this)" class="delbtn" id ="'+ i +'"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        str += '<button id="'+i+'"  onclick="editContact(this)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div></button>';
        str += '<div class="card_content"><form><div class="tels">';
        str += '<p><i class="fa fa-mobile" aria-hidden="true"></i>';
        str += '<input id="tel_card-'+i+'"  type="tel" value="' + contacts[i].telephone + '" readonly></p>';
        str += '<p class="tel_block" id="tel_block1'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
        str += '<input id="tel_card1-'+i+'"  type="tel" value="' + contacts[i].telephone1 +'" readonly></p>';
        str += '<p class="tel_block" id="tel_block2'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
        str += '<input id="tel_card2-'+i+'"  type="tel" value="' + contacts[i].telephone2 +'" readonly></p>';
        str += '<p class="tel_block" id="tel_block3'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
        str += '<input id="tel_card3-'+i+'"  type="tel" value="' + contacts[i].telephone3 +'" readonly></p>';
        str += '<p class="tel_block" id="tel_block4'+i+'"><i class="fa fa-mobile" aria-hidden="true"></i>';
        str += '<input id="tel_card4-'+i+'"  type="tel" value="' + contacts[i].telephone4 +'" readonly></p></div>';
        str += '<div class="emails"><p><i class="fa fa-envelope" aria-hidden="true"></i></i>';
        str += '<input id="email_card-'+i+'" type="email" value="' + contacts[i].email + '" readonly></p>';
        str += '<p class="email_block" id="email_block1'+i+'"><i class="fa fa-envelope" aria-hidden="true"></i></i>';
        str += '<input id="email_card1-'+i+'" type="email" value="' + contacts[i].email1 + '" readonly></p>';
        str += '<p class="email_block" id="email_block2'+i+'"><i class="fa fa-envelope" aria-hidden="true"></i></i>';
        str += '<input id="email_card2-'+i+'" type="email" value="' + contacts[i].email2 + '" readonly></p></div>';
        str += '</form></div></div>';
        divContact.innerHTML += str;
    }
    unHiddenExtraFields();
    accordion();
}

//Sorting
function compare(a,b) {
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}


// Searching
function search() {
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    var searchField = document.getElementById("search_field");
    var resetBtn = document.getElementById("reset");
    for (i = 0; i < contacts.length; i++) {
        var filter = searchField.value.toUpperCase();

            if ((contacts[i].name.toUpperCase().indexOf(filter) > -1) ||
                (contacts[i].lastname.toUpperCase().indexOf(filter) > -1)) {
                document.getElementById("contact-" + i).style.display = "";
                var noRes = 1;
            } else {
                document.getElementById("contact-" + i).style.display = "none";
            }

        if(noRes == 1){
            document.getElementById("no_res").style.display = "none"
        }
        else {
            document.getElementById("no_res").style.display = "block"
        }

    }
    resetBtn.onclick = function () {
        searchField.value = '';
    }
}


//Add field

document.getElementById("plus_tel0").onclick = function plusTel(){
    var q = 1;
        if(document.getElementById("tel_field1").style.display === "block"){
            q = 2;
        }
        if(document.getElementById("tel_field2").style.display === "block"){
            q = 3;
        }
        if(document.getElementById("tel_field3").style.display === "block"){
            document.getElementById("plus_tel0").style.display = "none";
            q = 4;
        }
        if(document.getElementById("tel_field4").style.display === "block"){
            q = 1;
        }
    document.getElementById("tel_field"+q).style.display = "block";
    document.getElementById("formTelephone"+q).value = "";
    document.getElementById("formTelephone"+q).setAttribute("required", "true");
};

document.getElementById("plus_email0").onclick = function plusEmail(){

    var w = 1;
        if(document.getElementById("email_field1").style.display === "block"){
            document.getElementById("plus_email0").style.display = "none";
            w = 2;
        }
        if(document.getElementById("email_field2").style.display === "block"){
            w = 1;
        }
    document.getElementById("email_field"+w).style.display = "block";
    document.getElementById("formEmail"+w).value = "";
    document.getElementById("formEmail"+w).setAttribute("required", "true");
};


//Remove field
function minusTel1() {
    document.getElementById("formTelephone1").value = "null";
    document.getElementById("tel_field1").style.display = "none";
    document.getElementById("plus_tel0").style.display = "inline-block";
    var d = document.getElementById('tel_field1');
    d.parentNode.appendChild(d);
    document.getElementById("tel_field1").id = "tel_field4";
    document.getElementById("minus_tel1").setAttribute("onclick", "minusTel4()");
    document.getElementById("minus_tel1").id = "minus_tel4";
    document.getElementById("formTelephone1").id = "formTelephone4";
    document.getElementById("tel_field2").id = "tel_field1";
    document.getElementById("minus_tel2").setAttribute("onclick", "minusTel1()");
    document.getElementById("minus_tel2").id = "minus_tel1";
    document.getElementById("formTelephone2").id = "formTelephone1";
    document.getElementById("tel_field3").id = "tel_field2";
    document.getElementById("minus_tel3").setAttribute("onclick", "minusTel2()");
    document.getElementById("minus_tel3").id = "minus_tel2";
    document.getElementById("formTelephone3").id = "formTelephone2";
    document.getElementById("tel_field4").id = "tel_field3";
    document.getElementById("minus_tel4").setAttribute("onclick", "minusTel3()");
    document.getElementById("minus_tel4").id = "minus_tel3";
    document.getElementById("formTelephone4").id = "formTelephone3";
}
function minusTel2() {
    document.getElementById("formTelephone2").value = "null";
    document.getElementById("tel_field2").style.display = "none";
    document.getElementById("minus_tel1").style.display = "inline-block";
    document.getElementById("plus_tel0").style.display = "inline-block";
    var d = document.getElementById('tel_field2');
    d.parentNode.appendChild(d);
    document.getElementById("tel_field2").id = "tel_field4";
    document.getElementById("minus_tel2").setAttribute("onclick", "minusTel4()");
    document.getElementById("minus_tel2").id = "minus_tel4";
    document.getElementById("formTelephone2").id = "formTelephone4";
    document.getElementById("tel_field3").id = "tel_field2";
    document.getElementById("minus_tel3").setAttribute("onclick", "minusTel2()");
    document.getElementById("minus_tel3").id = "minus_tel2";
    document.getElementById("formTelephone3").id = "formTelephone2";
    document.getElementById("tel_field4").id = "tel_field3";
    document.getElementById("minus_tel4").setAttribute("onclick", "minusTel3()");
    document.getElementById("minus_tel4").id = "minus_tel3";
    document.getElementById("formTelephone4").id = "formTelephone3";
}
    function minusTel3() {
    document.getElementById("formTelephone3").value = "null";
    document.getElementById("tel_field3").style.display = "none";
    document.getElementById("minus_tel2").style.display = "inline-block";
    document.getElementById("plus_tel0").style.display = "inline-block";
    var d = document.getElementById('tel_field3');
    d.parentNode.appendChild(d);
    document.getElementById("tel_field3").id = "tel_field4";
    document.getElementById("minus_tel3").setAttribute("onclick", "minusTel4()");
    document.getElementById("minus_tel3").id = "minus_tel4";
    document.getElementById("formTelephone3").id = "formTelephone4";
    document.getElementById("tel_field4").id = "tel_field3";
    document.getElementById("minus_tel4").setAttribute("onclick", "minusTel3()");
    document.getElementById("minus_tel4").id = "minus_tel3";
    document.getElementById("formTelephone4").id = "formTelephone3";
}
    function minusTel4() {
    document.getElementById("formTelephone4").value = "null";
    document.getElementById("tel_field4").style.display = "none";
    document.getElementById("minus_tel3").style.display = "inline-block";
    document.getElementById("plus_tel0").style.display = "inline-block";
    var d = document.getElementById('tel_field4');
    d.parentNode.appendChild(d);
}
function minusEmail1() {
    document.getElementById("formEmail1").value = "null@null.null";
    document.getElementById("email_field1").style.display = "none";
    document.getElementById("plus_email0").style.display = "inline-block";
    var t = document.getElementById('email_field1');
    t.parentNode.appendChild(t);
    document.getElementById("email_field1").id = "email_field2";
    document.getElementById("minus_email1").setAttribute("onclick", "minusEmail2()");
    document.getElementById("minus_email1").id = "minus_email2";
    document.getElementById("formEmail1").id = "formEmail2";
    document.getElementById("email_field2").id = "email_field1";
    document.getElementById("minus_email2").setAttribute("onclick", "minusEmail1()");
    document.getElementById("minus_email2").id = "minus_email1";
    document.getElementById("formEmail2").id = "formEmail1";
}
function minusEmail2() {
    document.getElementById("formEmail2").value = "null@null.null";
    document.getElementById("email_field2").style.display = "none";
    document.getElementById("minus_email1").style.display = "inline-block";
    document.getElementById("plus_email1").style.display = "inline-block";
    var t = document.getElementById('email_field2');
    t.parentNode.appendChild(t);
}

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
    var contacts = JSON.parse(localStorage.getItem("contacts"));

        for (i = 0; i < contacts.length; i++){
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
                document.getElementById("email_block2"+i).style.display = ""
            }
        }
}