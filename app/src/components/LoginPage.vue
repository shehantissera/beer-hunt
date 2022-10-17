<template lang="">
    <div class="loginpage">
        <form class="login-panel" @submit="login($event)">
        <div>
            <h2>Please enter your email</h2>
        </div>
        <div>
            <input type="email" v-model="emailAddress" name="email" placeholder="...">
            <span class="error-msg" v-if="errorMessage != ''">{{errorMessage}}</span>
        </div>
        <div class="actions">
            <input :disabled="emailAddress == ''" class="btn btn-primary" type="submit" value="Continue">
        </div>
    </form>
    </div>

</template>
<script>
export default {
    data() {
        return {
            emailAddress: "",
            errorMessage: "",
        }
    },
    methods: {
        login(e) {
            this.errorMessage = "";
            e.preventDefault()
            if (this.validateEmailAddress(this.emailAddress)) {
                localStorage.setItem('x-user', this.emailAddress);
                this.$router.push('/')
            } else {
                this.errorMessage = "Please enter an valid emaill address"
            }
        },
        validateEmailAddress(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }
    }
}
</script>
<style scoped>
.loginpage {
    display: flex;
    align-items: center;
}

.actions {
    display: flex;
    justify-content: end;
}

.error-msg {
    color: rgb(255, 128, 128);
}

.login-panel {
    background-color: #242424;
    padding: 15px;
    border-radius: 10px;
    width: 500px;
    display: flex;
    flex-direction: column;
    border: 1px solid grey;
}

input {
    padding: 12px 20px 12px 20px;
}

input[type=email] {
    width: 100%;
    display: flex;
    margin: 20px 0px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;

}
</style>