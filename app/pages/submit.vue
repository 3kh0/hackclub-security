<template>
  <div class="min-h-screen bg-darker p-2 md:p-4">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="text-center my-12">
        <h1 class="text-6xl md:text-7xl font-bold p-4 mb-4 bg-gradient-to-r from-primary to-orange bg-clip-text text-transparent">
          Submit Security Report
        </h1>
        <p class="text-xl text-secondary max-w-2xl mx-auto">
          Help us keep Hack Club secure by reporting vulnerabilities here
        </p>
      </div>

      <div class="bg-dark p-6 rounded-2xl">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
              :class="s > index ? 'bg-green text-white' : s === index ? 'bg-primary text-white' : 'bg-white/20 text-secondary'"
            >
              {{ index + 1 }}
            </div>
            <span 
              class="ml-2 text-md font-medium transition-colors"
              :class="s >= index ? 'text-white' : 'text-secondary'"
            >
              {{ step.title }}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-dark p-8 rounded-2xl">
        <form @submit.prevent="handleStepSubmit">
          
          <div v-if="s === 0" class="space-y-6">
            <div class="mb-6">
              <h3 class="text-3xl font-bold text-white mb-2">Let's get to know you first!</h3>
              <p class="text-lg text-secondary">We need this to follow up on your report, and issue you your bounty!</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-lg text-white font-medium mb-2">Name *</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  required
                  class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none"
                  placeholder="What should we call you?"
                >
              </div>
              <div>
                <label class="block text-lg text-white font-medium mb-2">Email *</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  required
                  class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none"
                  placeholder="cool@example.com"
                >
              </div>
            </div>

            <div>
              <label class="block text-lg text-white font-medium mb-2">Region *</label>
              <select 
                v-model="form.region" 
                required
                class="w-full p-3 rounded-lg h-[54px] bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none"
              >
                <option value="">Select your region</option>
                <option value="us">United States</option>
                <option value="canada">Canada</option>
                <option value="eu">European Union</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
                <option value="asia">Asia Pacific</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div v-if="s === 1" class="space-y-6">
            <div class="mb-6">
              <h3 class="text-3xl font-bold text-white mb-2">What is affected?</h3>
              <p class="text-lg text-secondary">Select all that apply. This helps us figure out the right people to contact</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="program in p" 
                :key="program.id"
                class="p-4 rounded-lg border transition-colors cursor-pointer"
                :class="form.affected.includes(program.id) 
                  ? 'bg-primary/20 border-primary text-white' 
                  : 'bg-darkless border-darkless text-secondary hover:darkless'"
                @click="u(program.id)"
              >
                <div class="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    :checked="form.affected.includes(program.id)"
                    class="mt-1 w-4 h-4 text-primary bg-darker border-darkless rounded focus:ring-primary"
                    @change="u(program.id)"
                  >
                  <div>
                    <h4 class="font-semibold">{{ program.name }}</h4>
                    <p class="text-md opacity-80">{{ program.description }}</p>
                    <p class="text-sm opacity-60 mt-1">{{ program.domains.join(', ') }}</p>
                  </div>
                </div>
              </div>

              <!-- Other option -->
              <div 
                class="p-4 rounded-lg border transition-colors cursor-pointer"
                :class="form.affected.includes('other') 
                  ? 'bg-primary/20 border-primary text-white' 
                  : 'bg-darkless border-darkless text-secondary hover:darkless'"
                @click="u('other')"
              >
                <div class="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    :checked="form.affected.includes('other')"
                    class="mt-1 w-4 h-4 text-primary bg-darker border-darkless rounded focus:ring-primary"
                    @change="u('other')"
                  >
                  <div class="w-full">
                    <h4 class="font-semibold">Other Program/Service</h4>
                    <p class="text-md opacity-80 mb-2">Something not listed above. Do note that programs not participating in this program may be out of scope. Payout is not guaranteed.</p>
                    <div v-if="form.affected.includes('other')" class="mt-3" @click="$event.stopPropagation()">
                      <input 
                        v-model="form.otherProgram" 
                        type="text" 
                        placeholder="Specify the program, domain, or service..."
                        class="w-full p-2 rounded bg-darker border border-darkless text-white text-sm focus:border-primary focus:outline-none"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="s === 2" class="space-y-6">
            <div class="mb-6">
              <h3 class="text-3xl font-bold text-white mb-2">What type of vulnerability is this?</h3>
              <p class="text-lg text-secondary">Try to narrow it down to the best category, this helps us triage your report quickly.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="vulnType in v" 
                :key="vulnType.id"
                class="p-4 rounded-lg border transition-colors cursor-pointer"
                :class="form.vulnType === vulnType.id 
                  ? 'bg-primary/20 border-primary text-white' 
                  : 'bg-darkless border-darkless text-secondary hover:darkless'"
                @click="form.vulnType = vulnType.id"
              >
                <div class="flex items-start space-x-3">
                  <input 
                    v-model="form.vulnType"
                    type="radio" 
                    :value="vulnType.id"
                    class="mt-1 w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary"
                  >
                  <div>
                    <h4 class="font-semibold">{{ vulnType.name }}</h4>
                    <p class="text-md opacity-80">{{ vulnType.description }}</p>
                    <p class="text-sm text-green mt-1">{{ vulnType.payout }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="s === 3" class="space-y-6">
            <div class="mb-6">
              <h3 class="text-3xl font-bold text-white mb-2">How bad is it?</h3>
              <p class="text-lg text-secondary">
                Answer these questions to calculate the severity, or manually enter a score if you prefer. We will also take into account the context of the vulnerability.
                We are using the CVSS 3.0 framework,
                <a href="https://www.first.org/cvss/v3-0/specification-document" target="_blank" rel="noopener" class="text-primary underline hover:text-primary/80">learn more here</a>.
              </p>
            </div>

            <div class="flex items-center space-x-4 mb-6 text-lg">
              <label class="flex items-center space-x-2">
                <input 
                  v-model="m"
                  type="radio" 
                  value="calculator"
                  class="w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary"
                >
                <span class="text-white">Use CVSS Calculator</span>
              </label>
              <label class="flex items-center space-x-2 ">
                <input 
                  v-model="m"
                  type="radio" 
                  value="manual"
                  class="w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary"
                >
                <span class="text-white">Manual Score Entry</span>
              </label>
            </div>

            <div v-if="m === 'calculator'" class="space-y-4">
              <div v-for="metric in cvssMetrics" :key="metric.key" class="bg-white/5 p-4 rounded-lg">
                <label class="block text-lg text-white font-medium mb-2">{{ metric.label }}</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <label 
                    v-for="option in metric.options" 
                    :key="option.value"
                    class="flex items-center space-x-2 cursor-pointer p-2 rounded border transition-colors"
                    :class="form.cvss[metric.key] === option.value 
                      ? 'bg-primary/20 border-primary text-white' 
                      : 'border-darkless text-secondary hover:border-white/40'"
                  >
                    <input 
                      v-model="form.cvss[metric.key]"
                      type="radio" 
                      :value="option.value"
                      class="w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary"
                    >
                    <span class="text-sm">{{ option.label }}</span>
                  </label>
                </div>
              </div>

              <div class="bg-green/10 border border-green/30 p-4 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-white font-medium">Calculated CVSS Score:</span>
                  <span class="text-2xl font-bold text-green">{{ q }}</span>
                </div>
                <div class="text-md text-secondary mt-1">
                  Severity: <span :class="c(q)" class="font-medium">{{ l(q) }}</span>
                </div>
              </div>
            </div>

            <div v-if="m === 'manual'" class="space-y-4">
              <div>
                <label class="block text-lg text-white font-medium mb-2">CVSS Score (0.0 - 10.0)</label>
                <input 
                  v-model.number="form.manualCvss" 
                  type="number" 
                  min="0" 
                  max="10" 
                  step="0.1"
                  class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none"
                  placeholder="e.g., 7.5"
                >
              </div>
              <div v-if="form.manualCvss" class="bg-green/10 border border-green/30 p-4 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-white font-medium">Manual CVSS Score:</span>
                  <span class="text-2xl font-bold text-green">{{ form.manualCvss }}</span>
                </div>
                <div class="text-md text-secondary mt-1">
                  Severity: <span :class="c(form.manualCvss)" class="font-medium">{{ l(form.manualCvss) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="s === 4" class="space-y-6">
            <div class="mb-6">
              <h3 class="text-3xl font-bold text-white mb-2">Now for the detailed report</h3>
              <p class="text-secondary">Provide a clear title and comprehensive description of the vulnerability.</p>
            </div>

            <div>
              <label class="block text-lg text-white font-medium mb-2">Report Title *</label>
              <input 
                v-model="form.title" 
                type="text" 
                required
                class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none"
                placeholder="A clear and concise title includes the type of vulnerability and the impacted asset."
              >
            </div>

            <div>
              <label class="block text-lg text-white font-medium mb-2">Detailed Description *</label>
              <textarea 
                v-model="form.description" 
                required
                rows="20"
                class="w-full p-3 rounded-lg bg-darker border border-darkless text-white focus:border-primary focus:outline-none font-mono text-sm"
              />
            </div>
          </div>

          <div v-if="s === 5" class="space-y-6">
            <div class="mb-6">
              <h3 class="text-3xl font-bold text-white mb-2">Final step: Security verification</h3>
              <p class="text-secondary">Complete the CAPTCHA to verify you're human and submit your report.</p>
            </div>

            <div class="bg-white/5 p-6 rounded-lg border border-white/10">
              <h4 class="text-lg font-semibold text-white mb-4">Report Summary</h4>
              <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-secondary">Reporter:</span>
                  <span class="text-white ml-2">{{ form.name }} ({{ form.email }})</span>
                </div>
                <div>
                  <span class="text-secondary">Region:</span>
                  <span class="text-white ml-2">{{ d(form.region) }}</span>
                </div>
                <div>
                  <span class="text-secondary">Affected Programs:</span>
                  <span class="text-white ml-2">{{ e() }}</span>
                </div>
                <div>
                  <span class="text-secondary">Vulnerability Type:</span>
                  <span class="text-white ml-2">{{ f() }}</span>
                </div>
                <div>
                  <span class="text-secondary">CVSS Score:</span>
                  <span class="text-white ml-2">{{ h() }} ({{ l(h()) }})</span>
                </div>
                <div>
                  <span class="text-secondary">Estimated Payout:</span>
                  <span class="text-green font-bold ml-2">{{ g() }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center mt-8">
            <button
              v-if="s > 0"
              type="button"
              class="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
              @click="s--"
            >
              ← Previous
            </button>
            <div v-else />

            <div class="flex space-x-4">
              <nuxt-link 
                to="/" 
                class="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
              >
                Cancel
              </nuxt-link>
              
              <button 
                type="submit" 
                :disabled="!canProceed"
                class="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ s === 5 ? 'Submit Report' : 'Next →' }}
              </button>
            </div>
          </div>
        </form>

        <div 
          v-if="turnstile" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          style="backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.7);"
        >
          <div class="bg-dark rounded-2xl p-8 max-w-md w-full relative">
            <div v-if="!t && !x" class="text-center">
              <h3 class="text-2xl font-bold text-white mb-4">Let's double check something</h3>
              <p class="text-secondary mb-6">Please complete this check before we submit your report.</p>
              <div id="turnstile-container" class="flex justify-center mb-4" />
              <button 
                class="px-4 py-2 text-secondary hover:text-white transition-colors cursor-pointer"
                @click="turnstile = false"
              >
                nvm get me outta here
              </button>
            </div>

            <div v-else-if="t && x" class="text-center">
              <div class="animate-spin w-10 h-10 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-white mb-2">Submitting your report...</h3>
              <p class="text-secondary">Hold tight!</p>
            </div>
          </div>
        </div>

        <div v-if="y" role="alert" class="mt-6 p-4 rounded-lg" :class="z ? 'bg-green/20 border border-green/30 text-green' : 'bg-red/20 border border-red/30 text-red'">
          <div class="flex items-center space-x-2">
            <span v-if="z" class="text-2xl">✅</span>
            <span v-else class="text-2xl">❌</span>
            <span class="font-medium">{{ y }}</span>
          </div>
          <div v-if="z && r" class="mt-2 text-sm">
            Report ID: <code class="bg-dark px-2 py-1 rounded text-green">{{ r }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import data from '~/assets/data/programs.json'
import { a, calc, l, c } from '~/utils/cvss'

useHead({
  title: 'Submit Security Report - Hack Club Security Program',
  meta: [
    {
      name: 'description',
      content: 'Submit a security vulnerability report to the Hack Club Security Bounty Program'
    }
  ]
})

const x = ref(false)
const y = ref('')
const z = ref(false)
const r = ref('')
const config = useRuntimeConfig()
const t = ref('')
const k = config.public.tpublic
const s = ref(0)
const m = ref('calculator')
const turnstile = ref(false)

const steps = [
  { title: 'Contact Info' },
  { title: 'Programs' },
  { title: 'Vulnerability' },
  { title: 'Severity' },
  { title: 'Details' },
  { title: 'Submit' }
]

const p = data.programs

const v = [
  { id: 'rce-root', name: 'Remote Code Execution (Root)', description: 'Root access to servers', payout: '$500' },
  { id: 'rce-nonroot', name: 'Remote Code Execution (Non-root)', description: 'Non-root access to servers', payout: '$250' },
  { id: 'auth-bypass', name: 'Authentication Bypass', description: 'OAuth flaws, session management vulnerabilities', payout: '$100' },
  { id: 'sqli', name: 'SQL Injection', description: 'Database exploitation vulnerabilities', payout: '$100' },
  { id: 'pii-critical', name: 'PII Leak (Critical)', description: 'Government-issued ID, identity documents', payout: '$300+' },
  { id: 'pii-high', name: 'PII Leak (High)', description: 'Physical addresses', payout: '$300+' },
  { id: 'pii-medium', name: 'PII Leak (Medium)', description: 'Email addresses, phone numbers, age', payout: '$50-150' },
  { id: 'pii-low', name: 'PII Leak (Low)', description: 'IP addresses, legal names', payout: '$20-50' },
  { id: 'info-disclosure', name: 'Information Disclosure', description: 'Exposed admin panels, configuration issues', payout: '$50' },
  { id: 'xss', name: 'Cross-Site Scripting', description: 'XSS, CSRF, and similar client-side attacks', payout: 'Variable' },
  { id: 'other', name: 'Other Vulnerability', description: 'Other issue not listed above, be prepared to describe it later', payout: 'Variable' }
]

const cvssMetrics = a

const form = reactive({
  name: '',
  email: '',
  region: '',
  affected: [],
  otherProgram: '',
  vulnType: '',
  title: '',
  description: `**Description:**
[add more details about this vulnerability]

**Impact:**
[please describe what impact this bug has]

**Steps To Reproduce:**
  1. [add step]
  2. [add step]
  3. [add step]

**Attachments:**

  * List any additional screenshots, logs, or videos
  * If this vulnerability affects your account, please include the email address tied to it.`,
  cvss: {
    attackVector: '',
    attackComplexity: '',
    privilegesRequired: '',
    userInteraction: '',
    scope: '',
    confidentiality: '',
    integrity: '',
    availability: ''
  },
  manualCvss: null
})

const q = computed(() => {
  return calc(form.cvss)
})

const canProceed = computed(() => {
  switch (s.value) {
    case 0:
      return form.name && form.email && form.region
    case 1:
      return form.affected.length > 0
    case 2:
      return form.vulnType
    case 3:
      return m.value === 'manual' ? form.manualCvss !== null : q.value > 0
    case 4:
      return form.title && form.description
    case 5:
      return true
    default:
      return false
  }
})

const onTurnstileSuccess = (token) => {
  t.value = token
  w()
}

onMounted(() => {
  window.onTurnstileSuccess = onTurnstileSuccess
})

const u = (programId) => {
  const index = form.affected.indexOf(programId)
  if (index > -1) {
    form.affected.splice(index, 1)
  } else {
    form.affected.push(programId)
  }
}

const handleStepSubmit = () => {
  if (s.value < steps.length - 1) {
    s.value++
  } else {
    turnstile.value = true
    nextTick(() => {
      if (window.turnstile && !t.value) {
        window.turnstile.render('#turnstile-container', {
          sitekey: k,
          theme: 'dark',
          callback: onTurnstileSuccess,
          'error-callback': (error) => {
            console.error('Turnstile error:', error)
            y.value = 'CAPTCHA error. Please refresh the page.'
          }
        })
      } else if (!window.turnstile) {
        console.error('Turnstile script not loaded')
        y.value = 'CAPTCHA system not available. Please refresh the page.'
      }
    })
  }
}

const w = async () => {
  if (!t.value) {
    z.value = false
    y.value = 'Please complete the security verification.'
    return
  }

  x.value = true
  y.value = ''
  r.value = ''
  
  const affectedPrograms = form.affected.filter(id => id !== 'other')
  if (form.affected.includes('other') && form.otherProgram) {
    affectedPrograms.push(`other:${form.otherProgram}`)
  }
  
  const submissionData = {
    name: form.name,
    email: form.email,
    region: form.region,
    affectedPrograms: affectedPrograms,
    vulnType: form.vulnType,
    title: form.title,
    description: form.description,
    cvssScore: h(),
    severity: l(h()).toLowerCase(),
    turnstileToken: t.value
  }
  
  try {
    const response = await $fetch('/api/tmbx', {
      method: 'POST',
      body: submissionData,
      timeout: 30000
    })
    
    z.value = true
    y.value = 'Report submitted successfully! We will review it and get back to you ASAP! Thank you for helping us keep Hack Club secure!'
    r.value = response.id
    
    turnstile.value = false
    
    Object.keys(form).forEach(key => {
      if (Array.isArray(form[key])) {
        form[key] = []
      } else if (typeof form[key] === 'object' && form[key] !== null) {
        Object.keys(form[key]).forEach(subKey => {
          form[key][subKey] = ''
        })
      } else if (key === 'description') {
        form[key] = `> NOTE! Thanks for submitting a report! Please replace *all* the [square] sections below with the pertinent details. Remember, the more detail you provide, the easier it is for us to verify and then potentially issue a bounty, so be sure to take your time filling out the report!

**Description:**
[add more details about this vulnerability]

**Impact:**
[Please describe explicitly what impact to user privacy, digital or fiat currencies, or availability to systems that this bug affects. Examples of this could be leakage of user addresses, improperly credited funds, or an amplification denial of service against a core service.]

## Steps To Reproduce:
(Add details for how we can reproduce the issue)

  1. [add step]
  1. [add step]
  1. [add step]

## Supporting Material/References:

  * List any additional material (e.g. screenshots, logs, etc.)
  * Please include the request and response that demonstrates impact if necessary.
  * If your actions directly affect your user account, please include the email address associated with that account.`
      } else {
        form[key] = ''
      }
    })
    
    s.value = 0
    t.value = ''
    if (window.turnstile) {
      window.turnstile.reset()
    }
    
    setTimeout(() => {
      document.querySelector('[role="alert"]')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    
  } catch (error) {
    z.value = false
    console.error('Submission error:', error)
    
    if (error.response?.status === 400) {
      y.value = error.response._data?.statusMessage || 'Validation error. Please check your input.'
    } else if (error.response?.status >= 500) {
      y.value = 'Server error. Please try again later or contact us directly at echo@hackclub.com'
    } else if (error.name === 'FetchError' || error.code === 'NETWORK_ERROR') {
      y.value = 'Network error. Please check your connection.'
    } else {
      y.value = 'Failed to submit report. Please try again or contact us directly at echo@hackclub.com'
    }
    
    turnstile.value = false
    
    if (window.turnstile) {
      setTimeout(() => {
        window.turnstile.reset()
        t.value = ''
      }, 1000)
    }
  } finally {
    x.value = false
  }
}

const h = () => {
  return m.value === 'manual' ? form.manualCvss : q.value
}

const d = (region) => {
  const regions = {
    us: 'United States',
    canada: 'Canada',
    eu: 'European Union',
    uk: 'United Kingdom',
    australia: 'Australia',
    asia: 'Asia Pacific',
    other: 'Other'
  }
  return regions[region] || region
}

const e = () => {
  const programs = form.affected
    .filter(id => id !== 'other')
    .map(id => p.find(p => p.id === id)?.name)
    .filter(Boolean)
  
  if (form.affected.includes('other') && form.otherProgram) {
    programs.push(`Other: ${form.otherProgram}`)
  } else if (form.affected.includes('other')) {
    programs.push('Other (not specified)')
  }
  
  return programs.join(', ')
}

const f = () => {
  return v.find(v => v.id === form.vulnType)?.name || form.vulnType
}

const g = () => {
  const vulnType = v.find(v => v.id === form.vulnType)
  return vulnType ? vulnType.payout : 'TBD'
}
</script>
