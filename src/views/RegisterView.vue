<script setup lang="ts">

import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import {ref} from "vue";
import router from "@/router";
import NoMenuLayout from "@/layouts/NoMenuLayout.vue";


interface IRegisterData {
  username: string,
  email: string,
  password: string
}


const showEmailErr = ref(false)
const showRegisterErr = ref(false)
const registerErrMsg = ref('')

const showSuccess = ref(false)
const registerData = ref<IRegisterData>({
  username: '',
  email: '',
  password: ''
})

const setEmail = (data: string) => {
  registerData.value.email = data
}

const setPassword = (data: string): void => {
  registerData.value.password = data
}
const setUsername = (data: string): void => {
  registerData.value.username = data
}

const isPasswordValid = (pass: string): boolean => {
  return pass.length >= 8
}

const isUsernameValid = (username: string): boolean => {
  return username.length > 0
}

const isEmailValid = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

const validateFields = (body: IRegisterData): void => {
  if (!isUsernameValid(body.username)) {
    registerErrMsg.value = "Username can not be empty!"
  } else if (!isEmailValid(body.email)) {
    registerErrMsg.value = "Email is not valid!"
  } else if (!isPasswordValid(body.password)) {
    registerErrMsg.value = "Password needs to be at least 8 characters long!"
  }
}

const register = () => {
  const body = {
    username: registerData.value.username,
    password: registerData.value.password,
    email: registerData.value.email
  }
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/register`
  if (isUsernameValid(body.username) && isPasswordValid(body.password) && isEmailValid(body.email)) {

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(body)
    }).then(response => response.json())
        .then(json => {
          showRegisterErr.value = false
          if (json.status === 200) {
            showSuccess.value = true
          } else {
            showRegisterErr.value = true
            registerErrMsg.value = json["msg"]
          }
        }).catch(er => {
      registerErrMsg.value = er["msg"]
      showRegisterErr.value = true
    })
  } else {
    showRegisterErr.value = true
    validateFields(body)
  }

}

const goToLogin = () => {
  router.push('login')
}

const errMsg = "Email is not Valid"
</script>

<template>
  <NoMenuLayout/>
  <section class="wrapper center-flex">
    <dialog class="success center-flex" v-if="showSuccess" :open="showSuccess">
      <h1>Success! Go to Sign In page and login!</h1>
      <Button text="Ok" @click="goToLogin"/>
    </dialog>
    <h2 :class="['subtitle', showSuccess ? 'blurred' : '']">Sign Up</h2>
    <p :class="showSuccess ? 'blurred': ' ' ">Already have an account? <a class="link" target="_blank" referrerpolicy="no-referrer" @click="goToLogin">Sign
      In</a></p>
    <div :class="['card', showSuccess ? 'blurred' : '']">
      <TextInput label="Username" name="username" id="username" type="text" @typed="setUsername" :autofocus="true"
      />
      <TextInput label="Email" name="email" id="email" type="text" @typed="setEmail" :error-msg="errMsg"
                 :show-error="showEmailErr"/>
      <TextInput label="Password" name="password" id="password" type="password" @typed="setPassword"
      />
      <p v-if="showRegisterErr" class="error">{{ registerErrMsg }}</p>
      <Button text="Sign Up" @click="register" :class="showSuccess ? 'blurred': ' ' "/>
    </div>
  </section>
</template>

<style lang="css" scoped>


.wrapper {
  width: 100%;
  height: 100vh;
  background-color: var(--background-Color);
  color: var(--text-light-color);

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
    width: var(--card-width);
    height: fit-content;
    min-height: 320px;
    background-color: var(--card-background);
    border-radius: var(--card_radius);
    color: var(--card-text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem 0;
  }

  .error {
    color: var(--error-color);
    margin-bottom: 0;
    padding: 0 .5rem;
    text-align: center;
  }
}

.success {
  border-radius: var(--card_radius);
  width: var(--card-width);
  height: 200px;
  color: var(--text-light-color);
  background-color: var(--card-background);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
  z-index: 98;
}
.blurred{
  filter: blur(5px);
}

</style>


