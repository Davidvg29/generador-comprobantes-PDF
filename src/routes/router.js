const {Router} = require("express")
const router = Router()

const triggerPDF = require("../controllers/triggerPDF.js")

router.get("/", triggerPDF)

module.exports = router