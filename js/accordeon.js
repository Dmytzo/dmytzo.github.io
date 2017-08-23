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








// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("addBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





function checkStorageForContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem('contacts'));

    if(contacts == null){
        document.getElementById("noContacts").style.display="block";
    }else{
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
    contact.telephone = form.telephone.value;
    contact.email = form.email.value;
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}





function fetchContacts(){
    var contacts = [ ];
    contacts = JSON.parse(localStorage.getItem('contacts'));
    var divContacts = document.getElementById("contacts");
    for(var i = 0; i < contacts.length; i++){

        var divContact = document.createElement('div');
        divContact.id = "contact-" + i;
        divContact.className = "contact";
        // divContact.onclick = function() {
        //     showContactInformation(this);
        //     }
        divContacts.appendChild(divContact);

        var divContactName = document.createElement('div');
        divContactName.id = "divContactName-" + i;
        divContactName.className = "contact_name";
        divContact.appendChild(divContactName);
        // divContactName.onclick = accordion();

        var spanContactName = document.createElement('span');
        spanContactName.innerHTML = contacts[i]["name"];
        divContactName.appendChild(spanContactName);





        var divContactCard = document.createElement('div');
        divContactCard.id = "contact_card-" + i;
        divContactCard.className = "contact_card";
        divContact.appendChild(divContactCard);
        // divContactInformation.style.display="none";

        var divContactActions = document.createElement('div');
        divContactActions.className = "card_actions";
        divContactCard.appendChild(divContactActions);
        var divContactActionsDel = document.createElement('i');
        divContactActionsDel.className = "fa fa-trash-o";
        divContactActions.appendChild(divContactActionsDel);
        var divContactActionsEdit = document.createElement('i');
        divContactActionsEdit.className = "fa fa-pencil-square-o";
        divContactActions.appendChild(divContactActionsEdit);

        var divContactCont = document.createElement('div');
        divContactCont.className = "card_content";
        divContactCard.appendChild(divContactCont);

        var formContact = document.createElement('form');
        formContact.id = "formContact-" + i;
        // divContact.onclick = function() {
        //     showContactInformation(this);
        //     }
        divContactCont.appendChild(formContact);
        
        var formContactP = document.createElement('p');
        formContact.appendChild(formContactP);

        var formContactMob = document.createElement('i');
        formContactMob.className = "fa fa-mobile";
        formContactP.appendChild(formContactMob);


        var inputTel = document.createElement('input');
        inputTel.id = "inputTel" + i;
        inputTel.setAttribute("value", contacts[i]["telephone"])
        inputTel.setAttribute("readonly", true)
        inputTel.setAttribute("type", "tel")
        // inputTel.innerHTML = contacts[i]["telephone"];
        formContactP.appendChild(inputTel);


        var formContactPlus = document.createElement('i');
        formContactPlus.className = "fa fa-plus";
        formContactP.appendChild(formContactPlus);  

        var formContactP2 = document.createElement('p');
        formContact.appendChild(formContactP2);


        var formContactMail = document.createElement('i');
        formContactMail.className = "fa fa-envelope";
        formContactP2.appendChild(formContactMail);


        var inputMail = document.createElement('input');
        inputMail.id = "inputMail" + i;
        inputMail.setAttribute("value", contacts[i]["email"])
        inputMail.setAttribute("readonly", true)
        inputMail.setAttribute("type", "email")
        // inputTel.innerHTML = contacts[i]["telephone"];
        formContactP2.appendChild(inputMail);


        var formContactPlus = document.createElement('i');
        formContactPlus.className = "fa fa-plus";
        formContactP2.appendChild(formContactPlus);

        var formContactP3 = document.createElement('p');
        formContact.appendChild(formContactP3);

        var inputSave = document.createElement('input');
        inputSave.className = "save_btn";
        inputSave.setAttribute("value", "Save")
        inputSave.setAttribute("type", "button")
        // inputTel.innerHTML = contacts[i]["telephone"];
        formContactP3.appendChild(inputSave);




    }accordion();
// }
// function showContactInformation(contact){
//     var contacts = [ ];
//     contacts = JSON.parse(localStorage.getItem('contacts'));
//     var id = contact.id.split("-").pop();
//     var divContactInformation = document.getElementById("contactInformation-"+id);

//     if (divContactInformation.style.display == "none"){
//         divContactInformation.style.display = "block";
//     }else{
//         divContactInformation.style.display = "none";       
//     }   
}

accordion(accordion());











