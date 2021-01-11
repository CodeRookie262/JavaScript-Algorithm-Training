export class Node<T = any> {
  val: T;
  next: Node<T> | null;
  constructor(val: any) {
    this.val = val;
    this.next = null;
  }
}

export const HEAD = Symbol('HEAD');

export class LikedList {
  private head: Node;

  constructor() {
    this.head = new Node(HEAD);
  }

  /**
   * 添加节点
   * @param node NodeValue
   */
  append<N = any>(node: N): Node {
    let curNode: Node = this.head;

    while (curNode.next) {
      curNode = curNode.next;
    }
    curNode.next = new Node(node);

    return curNode.next;
  }

  /**
   * 查找节点
   * @param nodeVal NodeValue
   */
  findNode<V>(nodeVal: V): Node {
    let curNode: Node = this.head.next;

    //开始查找
    while (curNode && curNode.val !== nodeVal) {
      curNode = curNode.next;
    }

    return curNode;
  }

  /**
   * 根据 index 查找节点
   * @param ele NodeValue
   */
  findByIndex(index: number): Node {
    let curNode = this.head.next;
    let idx: number = 0;
    while (curNode) {
      if (idx === index) return curNode;
      curNode = curNode.next;
      idx++;
    }

    return null;
  }

  /**
   * 在指定节点后面插入新的节点
   * @param traget Target NodeValue
   * @param ele Insert NodeValue
   */
  insert<T, E>(traget: T, ele: E): Node {
    const curNode: Node = this.findNode<T>(traget);
    if (!curNode) {
      console.warn(`Can not find Node(${traget}),insert failed!!!`);
      return null;
    }
    let tail: Node = curNode.next;
    let node: Node = new Node(ele);
    curNode.next = node;
    node.next = tail;
    return node;
  }

  /**
   * 删除指定元素
   * @param ele NodeValue
   */
  remove<E>(ele: E): boolean {
    // 分为 3 种情况，删除的元素分别在 head，body，tail
    // 不过这里我们该用了**哨兵模式**，无需考虑那么多类型，统一处理即可

    // 查找上一个 Node
    let preNode: Node = this.findPre(ele);
    if (!preNode) return false;
    preNode.next = preNode.next.next;
    return true;
  }

  /**
   * 查找指定元素的前一个节点
   * @param target NodeValue
   */
  findPre<V>(target: V): Node {
    let curNode: Node = this.head;

    while (curNode.next && curNode.next.val !== target) {
      curNode = curNode.next;
    }

    if (curNode.next === null) {
      return null;
    }

    return curNode;
  }

  /**
   * 打印所有节点的 value
   */
  log(): void {
    let curNode = this.head.next;
    while (curNode) {
      console.log(curNode.val);
      curNode = curNode.next;
    }
  }
}

// let likedList = new LikedList();

// likedList.append(3);
// likedList.append('u');
// likedList.append('9');

// console.log(likedList);
