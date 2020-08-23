import { AVL } from "./AVL";


setTimeout(() => {

    let avl = new AVL();
    avl.init([5, 6, 8, 3, 2, 4, 7, 1]);
    avl.delete(5);
    console.log(avl);
}, 1000);