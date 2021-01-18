/**
 * ===== API =====
 * append
 * findNode
 * findByIndex
 * insert
 * remove
 * findPre
 * log
 */

//  为了安全性，避免用户直接访问修改
const HEAD = Symbol('HEAD');

// 暴力深拷贝 这里先不进行深拷贝吧 ~
// const copy = listedList => JSON.parse(JSON.stringify(listedList))

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglLinkedList {
  constructor() {
    this[HEAD] = new Node(HEAD);
  }

  get() {
    return this[HEAD].next;
  }

  /**
   * 添加节点(可填入多个)
   * @param  {...any} nodes
   */
  append(...nodes) {
    let curNode = this[HEAD];
    if (!nodes.length) {
      console.log('nodes 参数为空哦~');
      return false;
    }

    let node = new Node(nodes.shift());

    nodes.reduce(
      (preNode, curNode) => (preNode.next = new Node(curNode)),
      node
    );

    while (curNode.next) {
      curNode = curNode.next;
    }

    curNode.next = node;

    return node;
  }

  /**
   * 查找节点
   * @param {any} node 节点值
   */
  findNode(node) {
    let curNode = this[HEAD].next;
    while (curNode) {
      // console.log(curNode.value === node, curNode);
      if (curNode.val === node) return curNode;
      curNode = curNode.next;
    }

    return curNode;
  }

  /**
   * 查找指定元素的前一个元素
   * @param {*} target 指定元素节点内容
   */
  findPre(target) {
    let curNode = this[HEAD];
    while (curNode.next) {
      if (curNode.next.val === target) return curNode;
      curNode = curNode.next;
    }
    return curNode;
  }

  findIndex(index) {
    let curNode = this[HEAD].next;
    let idx = 0;
    while (curNode && idx !== index) {
      curNode = curNode.next;
      idx++;
    }
    return curNode;
  }

  /**
   * 插入到指定元素的后面
   * @param {*} target 目标元素
   * @param {*} node 插入元素
   */
  insert(target, node) {
    let curNode = this[HEAD];

    while (curNode.next && curNode.val !== target) {
      curNode = curNode.next;
    }

    let temp = curNode.next;
    let inserNode = new Node(node);
    curNode.next = inserNode;
    inserNode.next = temp;

    return inserNode;
  }

  remove(target) {
    const curNode = this.findPre(target);
    if (!curNode) return false;
    curNode.next = curNode.next.next;
    return true;
  }

  reverse() {
    let cur = this[HEAD].next;
    let pre = null;

    while (cur) {
      let next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }

    return (this[HEAD].next = pre);
  }
}

// const listedList = new SinglLinkedList();
// listedList.append(1, 2, 3, 4, 5, 6);
// listedList.append(4, 6, 9);
// listedList.insert(4, 77);
// // listedList.remove(6);
// console.log(listedList.reverse());
// listedList.reverse();

module.exports = SinglLinkedList;
