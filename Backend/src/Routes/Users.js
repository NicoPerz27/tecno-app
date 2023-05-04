const {Router} = require("express")
const router = Router();
const {getUsers, createUser, deleteUser, getUser} = require("../controllers/User.controller");



router.route("/")
    .get(getUsers)
    .post(createUser)
    
router.route("/:id")
    .get(getUser)
    .delete(deleteUser)
    
module.exports = router