const { Router } = require("express");
const router = Router();
const {
  getCredits,
  createCredit,
  getCredit,
  updateCredit,
  deleteCredit,
  updateValue
} = require("../controllers/Credit.controller");

router.route("/")
    .get(getCredits)
    .post(createCredit);

router.route("/:id")
    .get(getCredit)
    .put(updateCredit)
    .delete(deleteCredit)
    .patch(updateValue)

module.exports = router;
