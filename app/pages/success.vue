<template>
  <div class="min-h-screen bg-darker p-2 md:p-4 text-center">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="text-center my-12">
        <h1 class="text-6xl md:text-7xl font-bold p-4 mb-4 bg-gradient-to-r from-primary to-orange bg-clip-text text-transparent">Thank you!</h1>
        <p class="text-xl text-secondary max-w-2xl mx-auto">We have sent a confirmation email to your provided address.</p>
      </div>
      <div class="bg-dark p-8 rounded-2xl">
        <h2 class="text-4xl font-bold text-white mb-4">What's next?</h2>
        <p class="text-lg text-secondary mb-4">We just got a alert to review your report, so we'll get back to you soon once we've had a chance to look it over. If we need any more information, we will send you a email. Please keep an eye on your inbox! Thank you again!</p>
        <p class="text-lg text-secondary mb-8">Your report ID is: <span class="text-primary font-bold">{{ c }}</span></p>
        <nuxt-link to="/" class="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-colors"> Return home </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      c: this.$route.query.c || 'N/A'
    };
  }
};
</script>
