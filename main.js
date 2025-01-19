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
      this.buckets[index] = [[key, value]];
      return;
    }

    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    if (this.buckets[index][0] === key) {
      return this.buckets[index][1];
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      return this.buckets[index][0] === key ? true : false;
    }
    return false;
  }

  remove(key) {
    if (!this.has(key)) return false;
    const index = this.hash(key);
    delete this.buckets[index];
    return true;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) count++;
    }
    return count;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      delete this.buckets[i];
    }
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        keys.push(this.buckets[i][0]);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        values.push(this.buckets[i][1]);
      }
    }
    return values;
  }

  entries() {
    const arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i]);
      }
    }
    return arr;
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

const test = new HashMap(0.75, 16);
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');

test.set('carrott', 'asdf');
test.set('palpe', 'asdf');
test.set('appel', 'fsdf');

console.log(test.buckets);
