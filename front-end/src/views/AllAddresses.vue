<template>
    <div class="wrapper">
        <AddressGroups v-if="user"/>
        <Login v-else/>
    </div>
</template>

<style scoped>
    .group-button {
        margin-left:1rem;
    }
    .text-area {
        height: 1rem;
        margin: 1rem;
    }
    .selector {
        display: block;
        margin: 0 auto;
        margin-top: 2rem;
    }

    .center-button {
        display: block;
        margin: 0 auto;
        width: 6rem;
        height: 1.5rem;
    }

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
    import Login from '@/components/Login.vue';
    import AddressGroups from '@/components/AddressGroups.vue';
    export default {
        name: "AllAddresses",
        components: {
            Login,
            AddressGroups
        },
        data() {
            return {
            }
        },
        async created() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
        computed: {
            user() {
                return this.$root.$data.user;
            },
        },
        methods: {

        }
    }

</script>