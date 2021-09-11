<template>
    <div class="wrapper">
            <h2>{{user.firstName}} {{user.lastName}}</h2><Button class="buttons" @click="logout">Logout</Button>
            <select class="selector" v-model="selectedGroup">
                    <option v-for="group in groups" :key="group.name">{{group.name}}</option>
            </select>
            <textarea v-model="newGroupName" class="text-area"></textarea>
            <button class="buttons center-button" v-on:click="createGroup">Add group</button>
            <button class="buttons center-button" v-on:click="deleteGroup">Delete group</button>
            <div class="address-wrapper" v-for="address in currentAddresses" :key="address.firstName">
                <div class="address-item">
                    <p>{{ address.firstName }} {{ address.lastName }}</p>
                    <p>{{address.addressOne}}, {{address.addressTwo}}</p>
                    <p>{{address.city}}, {{address.state}} {{address.zipcode}}</p>
                    <button class="buttons" v-on:click="deleteAddress(address)">Delete</button>
                </div>
            </div>
            <hr>
            <div v-if="isEmpty">
                <h2>Unassigned Addresses</h2>
                    <div class="address-wrapper" v-for="address in filteredAddresses" :key="address.firstName">
                        <div class="address-item">
                            <p>{{ address.firstName }} {{ address.lastName }}</p>
                            <p>{{address.addressOne}}, {{address.addressTwo}}</p>
                            <p>{{address.city}}, {{address.state}} {{address.zipcode}}</p>
                            <button class="buttons" v-on:click="deleteAddress(address)">Delete</button>
                            <button class="buttons group-button" v-on:click="groupAddress(address)">Add to current group</button>
                        </div>
                    </div>
            </div>
            <div v-else>
                <h2>No addresses yet :(</h2>
            </div>
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
    export default {
        name: "AddressGroups",
        data() {
            return {
                addresses: [],
                selectedGroup: null,
                groups: [],
                newGroupName: "New Group Name"
            }
        },
        created() {
            this.getAddresses();
            this.getGroups();
        },
        computed: {
            user() {
                return this.$root.$data.user;
            },
            isEmpty: function() {
                if (this.addresses.length > 0) return true;
                else return false;
            },
            filteredAddresses: function () {
                return this.addresses.filter(item => item.group == null);
            },
            currentGroup: function() {
                return this.groups.filter( group => group.name == this.selectedGroup );
            },
            currentAddresses: function() {
                let groupID = "";
                this.groups.forEach(group => {
                    if (group.name == this.selectedGroup) {
                        groupID = group._id;
                    }
                });
                return this.addresses.filter(address => address.group == groupID);
            }
        },
        methods: {
            async getAddresses() {
                try {
                    const response = await axios.get("/api/addresses");
                    this.addresses = response.data;
                } catch (error) {
                    //console.log(error);
                }
            },

            async deleteAddress(address) {
                try {
                    //should delete all items belonging to address first
                    await axios.delete(`/api/address/${address._id}`);
                    await this.getAddresses();
                } catch(error) {
                    //console.log(error);
                }
            },

            async createGroup() {
                try {
                    await axios.post("/api/group", {
                        name: this.newGroupName
                    });
                    await this.getGroups();
                } catch(error) {
                    //console.log(error);
                }
            },

            async getGroups() {
                try {
                    const response = await axios.get("/api/groups");
                    this.groups = response.data;
                } catch (error) {
                    //console.log(error);
                }
            },

            async groupAddress(address) {
                if (this.currentGroup.length == 0) {
                    return;
                }
                try {
                    axios.put(`/api/groups/${this.currentGroup[0]._id}/addresses/${address._id}`);
                    this.getGroups();
                    this.getAddresses();
                } catch (error) {
                    //console.log(error);
                }
            },

            async deleteGroup() {
                try {
                    this.currentAddresses.forEach( address => {
                        this.deleteAddress(address);
                    });
                    await axios.delete(`/api/group/${this.currentGroup[0]._id}`);
                    await this.getGroups();
                    await this.getAddresses();
                } catch(error) {
                    //console.log(error);
                }
            },
            async logout() {
                try {
                    await axios.delete("/api/users");
                    this.$root.$data.user = null;
                } catch (error) {
                    this.$root.$data.user = null;
                }
            },

        }
    }

</script>