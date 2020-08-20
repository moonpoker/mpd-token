const Migrations = artifacts.require("Migrations");
const MPDToken = artifacts.require("MPDToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MPDToken);
};
