"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.contentType('text/html');
    res.send(Buffer.from(`
    <body>
    <div style="display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    height: 100%;">
    <p>
    <h1 > Kadinle V2 </h1>
    </p>
    </div>
    </body>`));
});
exports.homeRoutes = router;
