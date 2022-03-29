import detectEthereumProvider from '@metamask/detect-provider';

export class Metamask {
    constructor() {
        this.provider = null;
    }

    async init() {
        this.provider = await detectEthereumProvider();
        return this.provider;
    }

    async getAccount() {
        if (this.provider) {
            const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        }
        return null;
    }
}

export default new Metamask();
