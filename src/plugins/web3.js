import Metamask from '../models/Metamask';
import abi from '@/constants/abi';
import Web3 from 'web3';

export default {
    async install(Vue, { store }){
        const provider = await Metamask.init();

        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi, '0x628a14294dFEd1dA9fD36bd242627d317Cad64ee')

        const data = {
            provider,
            getAccount: Metamask.getAccount,
            web3,
            contract
        }

        Vue.prototype.$eth = data;
        store.$eth = data;
    }


}
