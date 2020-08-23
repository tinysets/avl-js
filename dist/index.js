"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AVL_1 = require("./AVL");
setTimeout(() => {
    let avl = new AVL_1.AVL();
    avl.init([5, 6, 8, 3, 2, 4, 7, 1]);
    avl.delete(5);
    console.log(avl);
}, 1000);
//# sourceMappingURL=index.js.map