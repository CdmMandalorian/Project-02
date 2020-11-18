$.get("/api/user_data").then(data => {
    const memberName = data.userName;
    const emailChangeBtn = $("#change-email-button");
    const usernameChangeBtn = $("#change-username-button");
    const emailChangeTextArea = document.getElementById('change-email');
    const usernameChangeTextArea = document.getElementById('change-username');
    let oldEmail = data.email;

    $(".member-name").text(memberName);
    emailChangeTextArea.setAttribute('readonly', "readonly")
    usernameChangeTextArea.setAttribute('readonly', "readonly")

    function verifyRedOnlyAttrUsername(textarea, btn, info){
        if(!textarea.attributes.readonly){
            textarea.setAttribute('readonly', "readonly")
            btn.text(`Change ${info}`);
            let newInput = textarea.value;
            $.post("/api/user_data/change_username",{
                userName: memberName,
                oldInput: oldEmail,
                newInput: newInput
              })
            return window.location.replace("/logout");
        } else {
            textarea.removeAttribute('readonly')
            btn.text(`Set ${info}`);
        }   
    }
    function verifyRedOnlyAttrEmail(textarea, btn, info){
        if(!textarea.attributes.readonly){
            textarea.setAttribute('readonly', "readonly")
            btn.text(`Change ${info}`);
            let newInput = textarea.value;
            $.post("/api/user_data/change_email",{
                userName: memberName,
                oldInput: oldEmail,
                newInput: newInput
            })
            oldEmail = newInput;
            return window.location.replace("/logout");
        } else {
            textarea.removeAttribute('readonly')
            btn.text(`Set ${info}`);
        }   
    }
    
    emailChangeBtn.on('click', () => {
        verifyRedOnlyAttrEmail(emailChangeTextArea, emailChangeBtn, "Email"); 
    });

    usernameChangeBtn.on('click', () => {
        verifyRedOnlyAttrUsername(usernameChangeTextArea, usernameChangeBtn, "Username");       
    });
});

$.get("/api/previous_post").then(data => {
    console.log(data)
})
  