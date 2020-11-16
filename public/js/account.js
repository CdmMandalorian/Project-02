$.get("/api/user_data").then(data => {
    const memberName = data.userName;
    $(".member-name").text(memberName);

});
  