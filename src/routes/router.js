const {Router} = require("express")
const router = Router()

const triggerPDF = require("../controllers/triggerPDF.js")

router.post("/", triggerPDF)

module.exports = router