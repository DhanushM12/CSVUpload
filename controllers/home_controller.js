module.exports.home = function (req, res) {
  return res.render("home", {
    path: "home",
    title: "CSV Upload Home Page",
  });
};
