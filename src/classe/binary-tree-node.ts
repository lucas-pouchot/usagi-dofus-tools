import { BinaryTreeLevel } from "~/classe/binary-tree-level";

export class BinaryTreeNode<T> {
    data: T|null;
    index: number;
    level: BinaryTreeLevel<T>;
    left: BinaryTreeNode<T>|null;
    right: BinaryTreeNode<T>|null;
    parent: BinaryTreeNode<T>|null;
    path: number[] = [];

    constructor(level: BinaryTreeLevel<T>, index: number, data: T|null = null, parent: BinaryTreeNode<T>|null = null) {
        this.data = data;
        this.index = index;
        this.level = level;
        this.parent = parent;
        this.left = null;
        this.right = null;
    };
};
