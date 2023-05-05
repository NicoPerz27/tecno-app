const { Router } = require("express");
const router = Router();
const {
  getCredits,
  createCredit,
  getCredit,
  updateCredit,
  deleteCredit,
  updateValue,
  getCreditByCC
} = require("../controllers/Credit.controller");

router.route("/")
    .get(getCredits)
    .post(createCredit);

router.route("/:id")
    .get(getCreditByCC)
    .put(updateCredit)
    .delete(deleteCredit)
    .patch(updateValue)

module.exports = router;
