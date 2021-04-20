<template>
    <div class="wrapper">
        <div v-if="!submitted">
            <div class="title">
                <h1>We need your address!</h1>
                <p>Please fill out the form below to receive a wedding invitation</p>
            </div>
            <div class="form-content">
                <div class="form-text">
                    <label for="fName">First Name: </label>
                    <input type="text" id="fName" name="fName" v-model="firstName" class="text-input"><br>
                    <label for="lName">Last Name: </label>
                    <input type="text" id="lName" name="lname" v-model="lastName" class="text-input"><br>
                    <label for="addressOne">Address: </label>
                    <input type="text" id="addressOne" name="addressOne" v-model="addressOne" class="text-input"><br>
                    <label for="addressTwo">Address Two: </label>
                    <input type="text" id="addressTwo" name="addressTwo" v-model="addressTwo" class="text-input"><br>
                    <label for="city">City: </label>
                    <input type="text" id="city" name="city" v-model="city" class="text-input"><br>
                    <label for="state">State: </label>
                    <input type="text" id="state" name="state" v-model="state" class="text-input"><br>
                    <label for="zipcode">Zipcode: </label>
                    <input type="text" id="zipcode" name="zipcode" v-model="zipcode" class="text-input"><br>
                    <label for="plusOne" class="checkbox-input">I need a plus one: </label>
                    <input type="checkbox" id="plusOne" name="plusOne" v-model="plusOne" class="checkbox-input">
                    <input type="submit" id="submit" name="submit" class="submitButton" v-on:click="submitForm">
                </div>
                <img src="/images/engagement.jpg" class="form-image"/>
            </div>
        </div>
        <div v-else>
            <h2>Thanks for your address! :)</h2>
            <h3>We'll be sure to send it to: </h3>
            <p>{{ firstName }} {{ lastName }}</p>
            <p>{{addressOne}}, {{addressTwo}}</p>
            <p>{{city}}, {{state}} {{zipcode}}</p>
        </div>

    </div>
</template>

<style scoped>

    .title {
          font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .form-text {
        padding: 2rem;
        text-align: right;
        margin-bottom: 2rem;
        width:60%;
        margin-right: 2rem;
    }

    .text-input {
        margin-bottom: 2rem;
        width: 60%;
    }

    .form-content {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        width: 100%;
        margin-left: 1rem;
        margin-right: 1rem;
    }

    .form-image {
        width: 30%;
        margin-right: 10%;
    }

    .wrapper {
        width: 100%;
        padding-bottom: 4rem;
    }

    .submitButton {
        margin-left: 2rem;
        width: 4rem;
        background-color: #2c3e50;
        border-radius: 0.25rem;
        color: whitesmoke;
        border: 1px solid #2c3e50;
    }

    .buttons {
        background-color: #2c3e50;
        border-radius: 0.25rem;
        color: whitesmoke;
        border: 1px solid #2c3e50;
    }

    @media only screen and (max-width: 500px) {
        .form-content {
            display: block;
            margin:0;
        }

        .form-text {
            text-align: center;
            margin-left: 2rem;
        }

        .text-input {
            width: 80%;
        }

        .submitButton {
            margin-top: 1rem;
            margin-left: 1rem;
        }

        .form-image {
            width: 100%;
            margin: 0;
            padding: 0;
        }
    }

</style>

<script>
    import axios from 'axios';
    export default {
        name: 'Address',
        data() {
            return {
                firstName: "",
                lastName: "",
                addressOne: "",
                addressTwo: "",
                city: "",
                state: "",
                zipcode: "",
                plusOne: false,
                submitted: false,
                groups: []
            }
        },
        methods: {
            async submitForm() {
                this.submitted = true;
                try {
                    await axios.post("/api/address", {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        addressOne: this.addressOne,
                        addressTwo: this.addressTwo,
                        city: this.city,
                        zipcode: this.zipcode,
                        plusOne: this.plusOne,
                        group: null
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            getCurrentGroup() {
                this.groups.forEach((item) => {
                    if (item.name == "Unassigned group") {
                        return item;
                    }
                });
            },
            async getGroups() {
                try {
                    const response = await axios.get("/api/groups");
                    this.groups = response.data;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        created() {
            this.getGroups();
        }
    }

</script>