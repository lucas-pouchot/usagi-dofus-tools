import { BinaryTreeNode } from "~/classe/binary-tree-node";

export class BinaryTreeLevel<T> {
    level: number;
    nodes: BinaryTreeNode<T>[];
    constructor(level: number) {
        this.nodes = [];
        this.level = level;
    };
}
