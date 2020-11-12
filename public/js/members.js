$.get("/api/user_data").then(data => {
  $(".member-name").text(data.userName);

  const createBtn = $("#create-obs");
  //const searchAllBtn = $("#search-all");

  createBtn.on("click", () => {
    window.location.replace("/locationSelect");
  });
});
