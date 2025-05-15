import { Router } from "express";

// import { parseErrorMessage } from "../util/parseErrorMessage.js";
// import { isUser } from "../middlewares/authMiddleware.js";
// import tripService from "../services/tripService.js";
// import { getTypeOftrip } from "../util/getTypeOftrip.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const tripController = Router();

// SHARED TRIPS
tripController.get("/", async (req, res) => {
    return res.render("trip/shared-trips");
});

export default tripController;