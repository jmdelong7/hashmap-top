class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
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

  adjustCapacity() {
    const numNodes = this.length();
    const capacity = this.capacity;
    const increaseCapacityAt = this.loadFactor * capacity;

    let update = false;
    if (numNodes >= increaseCapacityAt) {
      this.capacity = capacity * 2;
      update = true;
    }

    if (update === false) return;

    const oldBuckets = this.buckets;
    this.buckets = Array(this.capacity);
    for (let i = 0; i < this.buckets.length; i++) {
      if (oldBuckets[i]) {
        oldBuckets[i].map((pair) => this.set(pair[0], pair[1]));
      }
    }
  }

  set(key, value) {
    const index = this.hash(key);
    this.adjustCapacity();
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
    if (!this.buckets[index]) return null;

    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) return false;

    for (let pair of this.buckets[index]) {
      if (pair[0] === key) return true;
    }

    return false;
  }

  remove(key) {
    if (!this.has(key)) return false;
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const length = bucket.length;

    for (let i = 0; i < length; i++) {
      if (bucket[i][0] === key) {
        delete bucket[i];
        if (!(i in bucket)) delete this.buckets[index];
        return true;
      }
    }
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        this.buckets[i].forEach(() => count++);
      }
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
        this.buckets[i].forEach((pair) => keys.push(pair[0]));
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        this.buckets[i].forEach((pair) => values.push(pair[1]));
      }
    }
    return values;
  }

  entries() {
    const pairs = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        this.buckets[i].forEach((pair) => pairs.push(pair));
      }
    }
    return pairs;
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
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');
test.set('moon', 'gray');

console.log(test.buckets);
