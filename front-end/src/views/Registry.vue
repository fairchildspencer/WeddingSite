<template>
    <div class="wrapper">
        <div class="masonry-wrapper">
            <div class="registry-items" v-for="item in items" :key="item.id">
                <div class="item-wrapper">
                    <h2>{{item.item_name}}</h2>
                    <p>${{item.price}}</p>
                    <button class="reserve-button" @click="reserveItem(item)">Reserve</button>
                    <p v-if="item['must-have']"><em>Must Have Item</em></p>
                    <img class="item-image" :src="'/images/' + item.image"/>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>

    .masonry-wrapper {
        column-count: 2;
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

    .wrapper {
        width: 98%;
        padding-bottom: 4rem;
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .reserve-button {
        margin: 1rem;
        background-color: #2c3e50;
        border-radius: 0.25rem;
        color: whitesmoke;
        border: 1px solid #2c3e50;
    }

    @media only screen and (max-width: 500px) {
        .masonry-wrapper {
            column-count: 1;
        }
    }
</style>

<script>
    export default {
        name: "Registry",
        data() {
            return {
                items: this.$root.$data.items
            }
        },
        methods: {
            reserveItem: function(item) {
                let index = 0;
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].id === item.id) {
                        index = i;
                        break;
                    }
                }
                this.items.splice(index,1);

                this.$root.$data.reserved.push(item);
            }
        }

    }

</script>