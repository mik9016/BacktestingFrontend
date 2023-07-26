<script setup lang="ts">

import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import {ref} from "vue";
import {useUserStore} from '@/stores/UserStore'
import router from "@/router";


interface ILoginData {
  username: string,
  email: string,
  password: string
}


const store = useUserStore();
const showEmailErr = ref(false)
const isOk = ref(false)
const loginData = ref<ILoginData>({
  username: '',
  email: '',
  password: ''
})

const validateEmail = (data: string) => {
  showEmailErr.value = isEmailValid(data)
  loginData.value.email = data
}

const validatePassword = (data: string): void => {
  loginData.value.password = data
}
const validateUsername = (data: string): void => {
  loginData.value.username = data
}

const isPasswordValid = (pass: string): boolean => {
  return pass.length <= 8
}

const isEmailValid = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailPattern.test(email);
}
const message = 'YAY!'

const login = () => {
  const body = {
    username: loginData.value.username,
    password: loginData.value.password,
    email: loginData.value.email
  }
  console.log(body)
  const url = 'https://localhost:7051/api/auth/login'

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then(response => response.json())
      .then(json => {
        store.setAuthToken(json.token)
        store.setUser(json.user)
      }).then(() => {
        isOk.value = true
        router.push('/');
    // redirect to different site or show error
  })

}

const goToRegister = () => {
  router.push('register')
}

const errMsg = "Email is not Valid"
</script>

<template>
  <section class="wrapper center-flex">
    <h1 class="title siteTitle">Backtester.io</h1>
    <h2 class="subtitle">Sign In</h2>
    <p>Need an account?
      <a class="link" target="_blank" referrerpolicy="no-referrer" @click="goToRegister">Sign Up</a></p>
    <div class="card">
      <TextInput label="Email" name="email" id="email" type="text" @typed="validateEmail" :error-msg="errMsg"
                 :show-error="showEmailErr" :autofocus="true"/>
      <TextInput label="Password" name="password" id="password" type="password" @typed="validatePassword"
      />
      <p class="ok" v-if="isOk">{{message}}</p>
      <Button text="Login" @click="login"/>
    </div>
  </section>
</template>

<style lang="css" scoped>

.ok{
  color: green;
}
.wrapper {
  width: 100%;
  height: 100vh;
  background-color: var(--background-Color);
  color: var(--text-light-color);

  .title {
    font-weight: var(--font-weight-big);
    font-size: var(--font-big);
    margin-bottom: .4rem;
    font-family: 'Montserrat', sans-serif;
  }
  .siteTitle{
    margin: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 500;
  }

  .subtitle {
    font-weight: var(--font-weight-big);
    font-size: var(--font-semi-big);
    margin-bottom: .4rem;
  }

  .link {
    color: var(--link-color);
    cursor: pointer;
  }

  .card {
    width: 352px;
    height: fit-content;
    min-height: 320px;
    background-color: var(--card-background);
    border-radius: 12px;
    color: var(--card-text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem 0;
  }
}


</style>


