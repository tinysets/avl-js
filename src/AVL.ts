export class AVLNode {
    value: number = null;
    left: AVLNode = null;
    right: AVLNode = null;
    height: number = 1;
    constructor(value) {
        this.value = value;
    }
}

export class AVL {
    // [5,6,8,3,2,4,7,1]
    root: AVLNode = null;
    init(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            this.root = this._insert(this.root, arr[i]);
        }
    }

    insert(value: number) {
        this.root = this._insert(this.root, value);
    }

    private _insert(root: AVLNode, value: number): AVLNode {
        if (!root) {
            root = new AVLNode(value);
            return root;
        } else {
            if (value < root.value) {
                root.left = this._insert(root.left, value);
                root = this.balance(root);
                this.update_height(root);
                return root;
            } else if (value > root.value) {
                root.right = this._insert(root.right, value);
                root = this.balance(root);
                this.update_height(root);
                return root;
            } else {
                return root;
            }
        }
    }

    delete(value: number) {
        this.root = this._delete(this.root, value);
    }

    private _delete(root: AVLNode, value: number) {
        if (root) {
            if (value < root.value) {
                root.left = this._delete(root.left, value);
                root = this.balance(root);
                this.update_height(root);
                return root;
            } else if (value > root.value) {
                root.right = this._delete(root.right, value);
                root = this.balance(root);
                this.update_height(root);
                return root;
            } else { // value == root.value
                if (!root.right) {
                    root = root.left;
                    root = this.balance(root);
                    this.update_height(root);
                    return root;
                } else if (!root.left) {
                    root = root.right;
                    root = this.balance(root);
                    this.update_height(root);
                    return root;
                } else { //  root.left && root.right
                    let frontNodeParent = root;
                    let frontNode = root.left;
                    let frontNodeParentDir = -1; // -1=left  +1=right
                    while (frontNode.right) {
                        frontNodeParent = frontNode;
                        frontNode = frontNode.right;
                        frontNodeParentDir = +1;
                    }
                    root.value = frontNode.value;
                    if (frontNodeParentDir == -1) { // left
                        frontNodeParent.left = frontNode.left;
                    } else { // right
                        frontNodeParent.right = frontNode.left;
                    }
                    root.left = this.recursiveBalanceRightTree(root.left);
                    root = this.balance(root);
                    this.update_height(root);
                    return root;
                }
            }
        } else {
            return root;
        }
    }

    private recursiveBalanceRightTree(root: AVLNode): AVLNode {
        if (root) {
            root.right = this.recursiveBalanceRightTree(root.right);
            root = this.balance(root);
            this.update_height(root);
            return root;
        } else {
            return root;
        }
    }

    private rotate_left(root: AVLNode): AVLNode {
        let new_root = root.right;
        root.right = new_root.left;
        new_root.left = root;
        this.update_height(root);
        this.update_height(new_root);
        return new_root;
    }

    private rotate_right(root: AVLNode): AVLNode {
        let new_root = root.left;
        root.left = new_root.right;
        new_root.right = root;
        this.update_height(root);
        this.update_height(new_root);
        return new_root;
    }

    private balance(root: AVLNode): AVLNode {
        if (root) {
            let bf = this.get_bf(root);
            if (bf == 2) {
                let leftBF = this.get_bf(root.left);
                if (leftBF < 0) {
                    // LR
                    root.left = this.rotate_left(root.left);
                    root = this.rotate_right(root);
                    return root;
                } else {
                    // R
                    root = this.rotate_right(root);
                    return root;
                }
            } else if (bf == -2) {
                let rightBF = this.get_bf(root.right);
                if (rightBF > 0) {
                    // RL
                    root.right = this.rotate_right(root.right);
                    root = this.rotate_left(root);
                    return root;
                } else {
                    // L
                    root = this.rotate_left(root);
                    return root;
                }
            } else {// is balance
                return root;
            }
        } else {
            return root;
        }
    }

    private get_bf(root: AVLNode) {
        return this.get_height(root.left) - this.get_height(root.right);
    }

    private get_height(root: AVLNode) {
        return root ? root.height : 0;
    }

    private update_height(root: AVLNode) {
        if (root) {
            root.height = Math.max(this.get_height(root.left), this.get_height(root.right)) + 1;
        }
    }
}