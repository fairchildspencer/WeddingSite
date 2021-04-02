<template>
    <div class="wrapper">
        <div v-if="isEmpty" class="masonry-wrapper">
            <div class="reserved-items" v-for="item in reservedItems" :key="item.id">
                <div class="item-wrapper">
                    <h2>{{item.item_name}}</h2>
                    <p>${{item.price}}</p>
                    <button class="unReserve-button" @click="unReserve(item)">Cancel Reservation</button>
                    <img class="item-image" :src="'/images/' + item.image"/>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>No items reserved yet :(</h2>
        </div>

    </div>
</template>

<style scoped>

    .masonry-wrapper {
        column-count: 3;
        column-gap: 1rem;
        width: 100%;
    }

    .item-wrapper {
        background-color: rgb(245, 245, 245);
        display: inline-block;
        margin: 0 0 0.5em;
    }

    .item-image {
        width: 100%;
    }

    .unReserve-button {
        margin: 1rem;
        background-color: #ec0014be;
        border-radius: 0.25rem;
        color: whitesmoke;
        border: 1px solid #2c3e50;
    }

    .wrapper {
        width: 98%;
        padding-bottom: 4rem;
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    @media only screen and (max-width: 500px) {
        .masonry-wrapper {
            column-count: 1;
        }
    }
</style>

<script>
    export default {
        name: "Reserved",
        data() {
            return {
                reservedItems: this.$root.$data.reserved
            }
        },
        methods: {
            unReserve(item) {
                let index = 0;
                for (let i = 0; i < this.reservedItems.length; i++) {
                    if (this.reservedItems[i].id === item.id) {
                        index = i;
                        break;
                    }
                }
                this.reservedItems.splice(index,1);

                this.$root.$data.items.push(item);
            }
        },
        computed: {
            isEmpty: function() {
                if (this.reservedItems.length > 0) return true;
                else return false;
            }
        }
    }

</script>