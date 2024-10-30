class HashMap {
    constructor() {
        this.capacity = 16;
        this.storage = new Array(this.capacity);
        this.loadFactor = 0.75;
        this.keyCount = 0;
        this.keysInBucket = new Array(this.capacity);
        this.keysInBucket.fill(0);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    grow() {
        const oldStorage = this.storage;
        this.capacity *= 2;
        this.storage = new Array(this.capacity);
        this.keysInBucket = new Array(this.capacity).fill(0);
        this.keyCount = 0;


        for (let bucket of oldStorage) {
            if (bucket) {
                for (let item of bucket ) {
                    this.set(item.key, item.value)
                }
            }
        }
    }

    set(key, value) {
        const index = this.hash(key);
        if (!this.storage[index]) {
            this.storage[index] = [];
        }

        for (let i = 0; i < this.storage[index].length; i++) {
            if(this.storage[index][i].key == key) {
                this.storage[index][i].value = value;
                return;
            }
        }

        this.storage[index].push({ key, value});
        this.keyCount++
        this.keysInBucket[index]++;

        if (this.keyCount / this.capacity >= this.loadFactor) {
            this.grow();
        }
    }

    get(key) {
        const index = this.hash(key);
        if (!this.storage[index]) {
            return null;
        }
        for (let item of this.storage[index]) {
            if (item.key === key) {
                return item.value;
            }
            return null;
        }

        return this.storage[index].value;
    }

    has(key) {
        const index = this.hash(key);

        if (!this.storage[index]) {
            return false;
        }

        for (let item of this.storage[index]){
            if (item.key === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);

        if (!this.storage[index]){
            return false;
        }

        for (let i = 0; i < this.storage[index].length; i++) {
            if (this.storage[index][i].key === key) {
                this.storage[index].splice(i, 1);
                this.keyCount--;
                this.keysInBucket[index]--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.keyCount;
    }

    clear() {
        this.storage = new Array(this.capacity);
        this.keyCount = 0;
        this.keysInBucket = new Array(this.capacity).fill(0);
    }

    keys() {
        const allKeys = []

        for (let bucket of this.storage) {
            if (bucket) {
                for (let item of bucket) {
                    allKeys.push(item.key);
                }
            }
        }
        return allKeys;
    }

    values() {
        const allValues = [];

        for (let bucket of this.storage) {
            if (bucket) {
                for (let item of bucket) {
                    allValues.push(item.value);
                }
            }
        }
        return allValues;
    }

    entries() {
        const allPairs = [];

        for (let bucket of this.storage) {
            if (bucket) {
                for (let item of bucket) {
                    allPairs.push([item.key, item.value]);
                }
            }
        }
        return allPairs;
    }
}

export {HashMap}