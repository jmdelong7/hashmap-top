import createLinkedList from './linked-list.js';
// Use the following snippet whenever you access a bucket through an index.
// We want to throw an error if we try to access an out-of-bounds index:

// if (index < 0 || index >= buckets.length) {
//   throw new Error('Trying to access index out of bounds');
// }

class HashMap {
  constructor(loadFactor = null, capacity = null) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.map = [];
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const hashCode = hash(key);
    if (!this.map[hashCode]) {
      return (this.map[hashCode] = { [key]: value });
    }

    if (this.map[hashCode] && !this.map[hashCode].key) {
      return (this.map[hashCode] = { [key]: value });
    }

    if (this.map[hashCode]) {
      throw new Error('Bucket has key already assigned, needs linked list.');
    }
  }
}

function hash(key) {
  let hashCode = 0;
  const prime = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (prime * hashCode + key.charCodeAt(i)) % 16;
  }
  return hashCode;
}

const hashMap = new HashMap();
console.log(hashMap.set('abc', '123'));
console.log(hashMap.set('aaa', '456'));
console.log(hashMap.map);
