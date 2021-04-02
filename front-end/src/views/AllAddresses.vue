<template>
    <div class="wrapper">
        <div v-if="isEmpty">
            <div class="address-wrapper" v-for="address in addresses" :key="address.firstName">
                <div class="address-item">
                    <p>{{ address.firstName }} {{ address.lastName }}</p>
                    <p>{{address.addressOne}}, {{address.addressTwo}}</p>
                    <p>{{address.city}}, {{address.state}} {{address.zipcode}}</p>
                    <button class="buttons" v-on:click="deleteAddress(address)">Delete</button>
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

    .buttons {
        background-color: #2c3e50;
        border-radius: 0.25rem;
        color: whitesmoke;
        border: 1px solid #2c3e50;
        margin-bottom: 0.5rem;
    }
</style>

<script>
    import axios from 'axios';
    export default {
        name: "AllAddresses",
        data() {
            return {
                addresses: []
            }
        },
        created() {
            this.getAddresses();
        },
        computed: {
            isEmpty: function() {
                if (this.addresses.length > 0) return true;
                else return false;
            }
        },
        methods: {
            async getAddresses() {
                try {
                    const response = await axios.get("/api/addresses");
                    this.addresses = response.data;
                } catch (error) {
                    console.log(error);
                }
            },

            async deleteAddress(address) {
                try {
                    //should delete all items belonging to address first
                    await axios.delete(`/api/address/${address._id}`);
                    await this.getAddresses();
                } catch(error) {
                    console.log(error);
                }
            }
        }
    }

</script>