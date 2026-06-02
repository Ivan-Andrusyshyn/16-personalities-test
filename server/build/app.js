"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// ====
const cors_2 = __importDefault(require("./secure/cors"));
const mongo_1 = require("./db/mongo");
const limiter_1 = require("./secure/limiter");
// ======
const _16_personalties_route_1 = __importDefault(require("./routes/tests/16-personalties.route"));
const google_drive_route_1 = __importDefault(require("./routes/google-drive.route"));
const load_files_route_1 = __importDefault(require("./routes/load-files.route"));
const consultations_route_1 = __importDefault(require("./routes/consultations.route"));
const mailer_route_1 = __importDefault(require("./routes/mailer.route"));
const google_sheets_route_1 = __importDefault(require("./routes/google-sheets.route"));
const star_rating_route_1 = __importDefault(require("./routes/star-rating.route"));
const monopay_route_1 = __importDefault(require("./routes/monopay.route"));
const redise_service_1 = require("./services/redise.service");
const server = (0, express_1.default)();
server.set('trust proxy', 1);
server.set('view engine', 'pug');
server.set('views', path_1.default.join(__dirname, 'views'));
server.use((0, cors_1.default)(cors_2.default));
server.use((0, helmet_1.default)());
server.use(limiter_1.limiter);
const port = 3000;
server.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
server.use((0, cookie_parser_1.default)());
server.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(body_parser_1.default.json({ limit: '50mb' }));
server.use((0, morgan_1.default)('dev'));
server.use('/api/monopay', monopay_route_1.default);
server.use('/api/rating', star_rating_route_1.default);
server.use('/api/google-drive', google_drive_route_1.default);
server.use('/api/files', load_files_route_1.default);
server.use('/api/consultation', consultations_route_1.default);
server.use('/api/send-email', mailer_route_1.default);
server.use('/api/google', google_sheets_route_1.default);
server.use('/api/tests', _16_personalties_route_1.default);
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redise_service_1.redisService.connect();
        // initBot();
        yield (0, mongo_1.connectToDB)();
        server.listen(port, () => {
            console.log('All configs works!');
        });
    }
    catch (error) {
        console.error('Startup error:', error);
        process.exit(1);
    }
});
start();
