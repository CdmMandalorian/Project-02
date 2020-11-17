$.get("/api/user_data").then(data => {
    const memberName = data.userName;
    const emailChangeBtn = $("#change-email-button");
    const usernameChangeBtn = $("#change-username-button");
    const emailChangeTextArea = document.getElementById('change-email');
    const usernameChangeTextArea = document.getElementById('change-username');
    let oldEmail = emailChangeTextArea.innerHTML;
    let oldUsername = usernameChangeTextArea.innerHTML;
    $(".member-name").text(memberName);
    emailChangeTextArea.setAttribute('readonly', "readonly")

    function verifyRedOnlyAttr(textarea, btn, info){
        if(!textarea.attributes.readonly){
            textarea.setAttribute('readonly', "readonly")
            btn.text(`Change ${info}`);
            let newInput = "";
            let oldInput;
            if(info === "Email") {
                if(!oldInput){
                    oldInput = oldEmail;
                }
               newInput = emailChangeTextArea.value; 
            } 
            if(info === "Username") {
                if(!oldInput){
                    oldInput = oldUsername;
                }
               newInput = usernameChangeTextArea.value; 
            } 
            $.post("/api/user_data/change_email",{
                userName: memberName,
                oldInput: oldInput,
                newInput: newInput
              }).then( function( data ) {

                oldInput = newInput;
            });
        } else {
            textarea.removeAttribute('readonly')
            btn.text(`Set ${info}`);
        }   
    }
    
    emailChangeBtn.on('click', () => {
        verifyRedOnlyAttr(emailChangeTextArea, emailChangeBtn, "Email"); 
    });

    usernameChangeBtn.on('click', () => {
        verifyRedOnlyAttr(usernameChangeTextArea, usernameChangeBtn, "Username");       
    });
});
  