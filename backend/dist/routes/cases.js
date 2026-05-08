"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const caseController_ts_1 = require("../controllers/caseController.ts");
const authenticate_ts_1 = require("../middleware/authenticate.ts");
const router = express_1.default.Router();
//Authenticate routes
router.use(authenticate_ts_1.authenticate);
//Get all cases
router.get('/', caseController_ts_1.getCases);
//Post a new case
router.post('/', caseController_ts_1.postCase);
//Get a case by id
router.get('/:id', caseController_ts_1.getCase);
//Update a case
router.patch('/:id', caseController_ts_1.patchCase);
exports.default = router;
//# sourceMappingURL=cases.js.map