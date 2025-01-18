import createLinkedList from './linked-list.js';
// Use the following snippet whenever you access a bucket through an index.
// We want to throw an error if we try to access an out-of-bounds index:

// if (index < 0 || index >= buckets.length) {
//   throw new Error('Trying to access index out of bounds');
// }

class HashMap {
  constructor(loadFactor = null, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(this.capacity);
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
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return (this.buckets[index] = { [key]: value });
    }

    if (this.buckets[index] && !this.buckets[index].key) {
      return (this.buckets[index] = { [key]: value });
    }

    if (this.buckets[index]) {
      throw new Error('Bucket has key already assigned, needs linked list.');
    }
  }

  get(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      if (Object.keys(this.buckets[index]).includes(key)) {
        return this.buckets[index][key];
      }
    }
    return null;
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
console.log(hashMap.get('ab'));
