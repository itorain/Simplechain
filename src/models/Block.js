// @flow

class Block {
    index: number;
    previousHash: string;
    timestamp: number;
    data: Object;
    hash: string;

    constructor(
        index: number,
        previousHash: string,
        timestamp: number,
        data: Object,
        hash: string,
    ) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
    }

    toString() {
        const dataStr = JSON.stringify(this.data);
        return JSON.stringify(`{ index: ${this.index}, previousHash: ${this.previousHash}, timestamp: ${this.timestamp}, data: ${dataStr}, hash: ${this.hash}}`);
    }
}
