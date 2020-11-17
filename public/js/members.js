$.get("/api/user_data").then(data => {
  $(".member-name").text(data.userName);

  const createBtn = $("#create-obs");
  const accountBtn = $("#my-account");
  const exploreBtn = $("#explore");
  //const searchAllBtn = $("#search-all");

  createBtn.on("click", () => {
    window.location.replace("/locationSelect");
  });

  exploreBtn.on('click', () => {
    window.location.replace("/explore");
  });

  accountBtn.on('click', () => {
    window.location.replace("/account");
  });
});
