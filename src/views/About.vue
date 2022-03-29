<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong>MintNFT</strong>
      </div>

      <el-form ref="form" :model="form">
        <el-form-item label="NumOfTokens">
          <el-input v-model="form.quantity" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Signature">
          <el-input :disabled="true" v-model="form.signature"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="mint" :loading="loading" style="width: 100%">
            Mint
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <pre>
      {{ result }}
    </pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      address: null,
      result: null,
      form: {
        amount: 0.004,
        quantity: 1,
        signature: ''
      }
    }
  },

  methods: {
    async mint() {
      this.loading = true;
      try {
        this.address = await this.$eth.getAccount();
        await this.getSignature();
        await this.sendRequest();
      } catch (e) {
        console.log(e)
      }
      this.loading = false;
    },

    async getSignature() {
      const msgHash = this.$eth.web3.utils.utf8ToHex(this.address);

      this.form.signature = await this.$eth.web3.eth.personal.sign(msgHash, this.address, this.address);
    },

    async sendRequest() {
      const trx = {
        from: this.address,
        to: this.$eth.contract._address,
        data: this.$eth.contract.methods.mintNFT(
            this.form.quantity, this.form.signature
        ).encodeABI(),
      };
      console.log(trx);
      this.result = await this.$eth.provider.request({
        method: 'eth_sendTransaction',
        params: [trx],
      })
    }
  }
}
</script>
<style lang="scss">
.about{
  width: 100%;
  padding: 30px;
  max-width: 550px;

  .box-card{
  }
}
</style>
