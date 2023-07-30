<script setup lang="ts">

import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import {ref} from "vue";
import {useUserStore} from '@/stores/UserStore'
import router from "@/router";
import NoMenuLayout from "@/layouts/NoMenuLayout.vue";


interface ILoginData {
  email: string,
  password: string
}


const store = useUserStore();
const showEmailErr = ref(false)
const showAuthErr = ref(false)
const authErrMsg = ref<string>('')
const loginData = ref<ILoginData>({
  email: '',
  password: ''
})

const validateEmail = (data: string) => {
  showEmailErr.value = isEmailValid(data)
  loginData.value.email = data
}

const setPassword = (data: string): void => {
  loginData.value.password = data
}

const isEmailValid = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailPattern.test(email);
}

const login = () => {
  const body = {
    password: loginData.value.password,
    email: loginData.value.email,
  }
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then(response => response.json())
      .then(json => {
        showAuthErr.value = false
        if (json.status === 200) {
          store.setAuthToken(json["token"])
          store.setUser(json.user)
          store.setIsAuthenticated(true)
          router.push('/');
        } else {
          showAuthErr.value = true
          authErrMsg.value = json["msg"]
        }
      }).catch(er => {
          authErrMsg.value = er["msg"]
          showAuthErr.value = true
  })

}

const goToRegister = () => {
  router.push('register')
}

const errMsg = "Email is not Valid"

</script>

<template>
  <NoMenuLayout/>
  <section class="wrapper center-flex">
    <h2 class="subtitle">Sign In</h2>
    <p>Need an account?
      <a class="link" target="_blank" referrerpolicy="no-referrer" @click="goToRegister">Sign Up</a></p>
    <div class="card">
      <TextInput label="Email" name="email" id="email" type="text" @typed="validateEmail" :error-msg="errMsg"
                 :show-error="showEmailErr" :autofocus="true"/>
      <TextInput label="Password" name="password" id="password" type="password" @typed="setPassword"
      />
      <Button text="Login" @click="login"/>
    </div>
    <p v-if="showAuthErr" class="error">{{authErrMsg}}</p>
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

.error{
  color: var(--error-color);
  margin-bottom: 0;
}
</style>


