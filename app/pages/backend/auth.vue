<script setup lang="ts">
import { ref } from 'vue'
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const email = ref('')
const code = ref('')
const step = ref(1)
const loading = ref(false)

async function r() {
  loading.value = true
  await $fetch('/api/auth/e', {
    method: 'POST',
    body: { email: email.value }
  })
  loading.value = false
  step.value = 2
}

async function verifyCode() {
  loading.value = true
  await $fetch('/api/auth/c', {
    method: 'POST',
    body: { email: email.value, code: code.value }
  })
  .then(async () => {
    await refreshSession()
    await navigateTo('/backend/')
  })
  .catch(() => alert('Rejected'))
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <form v-if="step === 1" @submit.prevent="r" class="bg-dark p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-white mb-4 text-center">Welcome!</h2>
      <p class="text-secondary mb-4 text-center">Enter your email to receive a code to login</p>
      <div class="mb-6">
        <input v-model="email" type="email" placeholder="Email" class="w-full p-3 rounded bg-darker border border-darkless text-white focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <button type="submit" class="w-full py-3 bg-primary text-white rounded font-semibold hover:bg-primary/80 transition" :disabled="loading">
        {{ loading ? 'Sending code...' : 'Send code' }}
      </button>
    </form>
    <form v-else @submit.prevent="verifyCode" class="bg-dark p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-white mb-4 text-center">Enter your code</h2>
      <p class="text-secondary mb-4 text-center">If you are registered, a code has been sent to your email.</p>
      <div class="mb-6">
        <input v-model="code" type="number" maxlength="6" placeholder="000000" class="w-full p-3 rounded bg-darker border border-darkless text-white focus:outline-none focus:ring-2 focus:ring-primary font-mono" />
      </div>
      <button type="submit" class="w-full py-3 bg-primary text-white rounded font-semibold hover:bg-primary/80 transition" :disabled="loading">
        {{ loading ? 'Verifying...' : 'Verify Code' }}
      </button>
      <button type="button" class="mt-4 w-full py-2 bg-darkless text-secondary rounded hover:bg-darkless/80 transition" @click="step = 1">Back</button>
    </form>
  </div>
</template>
