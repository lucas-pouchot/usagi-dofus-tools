import { BinaryTreeLevel } from "~/classe/binary-tree-level";
import { BinaryTreeNode } from "~/classe/binary-tree-node";

export class BinaryTree<T> {
    levels: BinaryTreeLevel<T>[] = [];
    depth: number;

    constructor(depth: number) {
        this.depth = depth;
    };

    getLastLevel(): BinaryTreeLevel<T>
    {
        return this.levels.find(l => l.level === this.depth) || new BinaryTreeLevel<T>(this.depth);
    }

    initTree()
    {
        this.levels = [];
        const nodes: number[] = [];
        for (let i=0, max=this.depth; i<max; i++) {
            this.levels.push(new BinaryTreeLevel<T>(i));
        }
        for (let i=0, max=Math.pow(2,this.depth); i<max; i++) {
            nodes.push(0);
            nodes.push(0);
        }
        this._initTree(nodes);
    }

    private _initTree(nodes: number[], currentLevel=0, path=[0]): BinaryTreeNode<T>
    {
        let level = this.levels.find(r => r.level === currentLevel);
        if (!level) {
            level = new BinaryTreeLevel(currentLevel);
            this.levels.push(level);
        }
        let index = 1;
        let startIndex = 0;
        path.forEach((p, i) => {
            index += (p*(Math.pow(2,i)));
        });
        for (let i=this.depth; i>currentLevel; i--) {
            startIndex += Math.pow(2,i);
        }

        let node = level.nodes.find(n => n.index === startIndex + index);
        if (!node) {
            node = new BinaryTreeNode<T>(level, startIndex+index);
            level.nodes.push(node);
        }
        node.path = Array.from(path.slice(0, -1).reverse());
        node.left = null;
        node.right = null;

        if (nodes.length>2) {
            node.left = this._initTree(nodes.slice(0, Math.ceil(nodes.length/2)), currentLevel+1, [0].concat(path));
            node.right = this._initTree(nodes.slice(Math.ceil(nodes.length/2)), currentLevel+1, [1].concat(path));
        }

        return node;
    }
}

