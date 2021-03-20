<template>
    <div class="wrapper">
        <div v-if="isEmpty">
            <div class="address-wrapper" v-for="address in addresses" :key="address.firstName">
                <div class="address-item">
                    <p>{{ address.firstName }} {{ address.lastName }}</p>
                    <p>{{address.addressOne}}, {{address.addressTwo}}</p>
                    <p>{{address.city}}, {{address.state}} {{address.zipcode}}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>No addresses yet :(</h2>
        </div>
    </div>
</template>

<style scoped>

    .address-item {
        border: 1px solid #2c3e50;
        width: 100%;
        margin: 2rem;
    }

    .address-wrapper {
        display: inline-block;
        margin: 2rem;
        text-align: center;
        padding: 1rem;
    }

    .wrapper {
        width: 98%;
        padding-bottom: 4rem;
    }
</style>

<script>
    export default {
        name: "AllAddresses",
        data() {
            return {
                addresses: this.$root.$data.addresses
            }
        },
        computed: {
            isEmpty: function() {
                if (this.addresses.length > 0) return true;
                else return false;
            }
        }
    }

</script>