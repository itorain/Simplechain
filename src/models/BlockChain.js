// @flow
// Crappy Blockchain class implementation

const Block = require('./Block');
const CryptoJs = require('crypto-js');

class BlockChain {
    chain: Array<Block>;

    constructor() {
        this.chain = [];
        this.chain.push(BlockChain.createGenesisBlock());
    }

    static calculateHash(index: number, previousHash: string, ts: number, data: Object): string {
        const dataHash = JSON.stringify(data);
        return CryptoJs.SHA256(JSON.stringify({
            index, previousHash, ts, dataHash,
        })).toString();
    }

    static calculateHashForBlock(block: Block): string {
        return BlockChain.calculateHash(
            block.index,
            block.previousHash,
            block.timestamp,
            block.data
        );
    }

    static createGenesisBlock(): Block {
        const hash = BlockChain.calculateHash(0, '0', 1465154705, {});
        return new Block(0, '0', 1465154705, {}, hash);
    }

    static isValidateChain(bc: BlockChain): boolean {
        for (let i = 1; i < bc.chain.length; i += 1) {
            if (BlockChain.validateBlock(bc.chain[i], bc.chain[i - 1])) {
                return false;
            }
        }

        return true;
    }

    static validateBlock(block: Block, previousBlock: Block): boolean {
        if (previousBlock.index + 1 !== block.index) {
            // TODO - Throw error
            console.log('New block has invalid index');
            return false;
        }
        if (previousBlock.hash !== block.previousHash) {
            // TODO - Throw error
            console.log('New block has invalid previous hash');
            return false;
        }
        if (BlockChain.calculateHashForBlock(block) !== block.hash) {
            // TODO - Throw error
            console.log('New block has invalid hash');
            return false;
        }

        return true;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    isValidNewBlock(block: Block): boolean {
        const prevBlock = this.getLatestBlock();
        return BlockChain.validateBlock(prevBlock, block);
    }

    addBlock(block: Block): void {
        if (this.isValidNewBlock(block)) {
            this.chain.push(block);
        }
    }

    toString(): string {
        return JSON.stringify(this.chain);
    }
}

module.exports = BlockChain;
