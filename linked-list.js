class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  head() {
    return this.first;
  }

  tail() {
    if (this.first === undefined) return {};

    let currNode = this.first;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }

    return currNode;
  }

  size() {
    if (this.first === undefined) return 0;

    let counter = 1;
    let currNode = this.first;
    while (currNode.nextNode !== null) {
      counter++;
      currNode = currNode.nextNode;
    }

    return counter;
  }

  at(index) {
    const size = this.size();
    if (size === 0) return 'empty';
    if (index > size - 1) return 'index out of range';
    if (index === 0) return this.first;

    let counter = 0;
    let currNode = this.first;
    while (counter !== index) {
      counter++;
      currNode = currNode.nextNode;
    }

    return currNode;
  }

  prepend(value) {
    if (Object.keys(this).length === 0) {
      this.first = new Node(value);
      return;
    }

    const newFirst = new Node(value);
    newFirst.nextNode = this.first;
    this.first = newFirst;
  }

  append(value) {
    if (Object.keys(this).length === 0) {
      this.first = new Node(value);
      return;
    }

    let currNode = this.first;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }
    currNode.nextNode = new Node(value);
  }

  pop() {
    if (this.size() < 1) return 'empty';
    if (this.size() === 1) {
      delete this.first;
      return;
    }

    let currNode = this.first;
    let newLast = null;
    while (currNode.nextNode !== null) {
      newLast = currNode;
      currNode = currNode.nextNode;
    }

    newLast.nextNode = null;
  }

  contains(value) {
    if (this.size() < 1) return false;

    let currNode = this.first;
    if (currNode.value === value) return true;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
      if (currNode.value === value) return true;
    }

    return false;
  }

  find(value) {
    if (this.size() < 1) return null;

    let currNode = this.first;
    let index = 0;
    if (currNode.value === value) return index;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
      index++;
      if (currNode.value === value) return index;
    }

    return null;
  }

  toString() {
    if (this.size() < 1) return 'empty';
    if (this.size() === 1) return `( ${this.first.value} ) -> `;

    let string = '';
    let currNode = this.first;
    while (currNode.nextNode !== null) {
      string = string + `( ${currNode.value} ) -> `;
      currNode = currNode.nextNode;
      if (currNode.nextNode === null) {
        string = string + `( ${currNode.value} ) -> `;
      }
    }

    return string + 'null';
  }
}

export default function createLinkedList() {
  return new LinkedList();
}
