<template>
  <div class="min-h-screen bg-darker p-2 md:p-4">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="text-center my-12">
        <h1 class="text-6xl md:text-7xl font-bold p-4 mb-4 bg-gradient-to-r from-primary to-orange bg-clip-text text-transparent">Submit Security Report</h1>
        <p class="text-xl text-secondary max-w-2xl mx-auto">Help us keep Hack Club secure by reporting vulnerabilities here</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div class="bg-dark p-8 rounded-2xl">
          <div class="mb-6">
            <h3 class="text-3xl font-bold text-white mb-4">The legal stuff</h3>
            <p class="text-lg text-secondary mb-6">Finding vulnerabilities is fun and rewarding, but it's important to do it responsibly and properly. To make sure everyone is on the same page about what's allowed and what's not, please read and affirm that you agree to the terms and rules written up by our best lawyer racoons.</p>
          </div>

          <div class="space-y-4 text-white max-h-96 overflow-y-auto bg-darker p-4 rounded-lg mb-6">
            <div class="space-y-3 text-md">
              <p>
                <i>Adpted from the <a href="https://www.hackerone.com/terms/disclosure-guidelines" target="_blank" class="text-primary">HackerOne Vulnerability Disclosure Guidelines</a></i>
              </p>
              <p>Thank you for taking the time read this! We're excited to hear from you and your findings, but we want to make sure that we are all on the same page about what's allowed and what's not.</p>
              <p>In this program, we have two parties, the finders and the security team.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Finders should...</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li><b>Respect the rules.</b> Rules are here for a reason, respect them. If you disagree with a rule, let us know instead of breaking them.</li>
                <li><b>Respect user data.</b> In case of a vulnerability, do not tamper with user data unless it supports your reporting. Do the least amount of damage possible to demonstrate your vulnerability.</li>
                <li><b>Be clear and concise.</b> Hack Club is huge, and all systems operate in widely different ways. Be clear and concise in your reports so that we can understand what the full scope of your vulnerability is.</li>
                <li><b>Do no harm.</b> Act in good faith. Do not leverage your findings to harm others and Hack Club's systems.</li>
              </ul>
              <p>We keep guidelines for how reporters should act, but we also keep guidelines for how security teams should act.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Security Teams should...</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li><b>Prioritize security.</b> If there is a problem in the system, fix it, fix it well, and fix it fast. Keep the finder informed about the status of their report.</li>
                <li><b>Respect Finders.</b> Finders are here to help, and they deserve your respect, do not take advantage of their efforts.</li>
                <li><b>Be clear and concise.</b> If you disagree with a finding, be clear and concise about why you disagree. Do not leave finders in the dark.</li>
                <li><b>Do no harm.</b> Act in good faith. Do not take unreasonable punitive actions against finders and their research.</li>
              </ul>
              <h4 class="text-lg font-bold mt-4 mb-2">Eligibility</h4>
              <p>Anyone and everyone is welcome to participate in Hack Club's Security Program. If you are under the age of 18, you must have parental consent to participate. Due to legal restrictions, if you are subject to U.S. trade sanctions, as determined by <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information" target="_blank" class="text-primary">OFAC</a>, you will not be eligible for monetary rewards.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Disclosure</h4>
              <p>When you submit a report, by default it should remain private. This is to protect the our systems and the privacy of anyone affected. We ask you do the same and not disclose anything until we confirm the issue has been fixed. Once the issue is fixed, we will let you know and you can disclose your findings publicly. We may also ask for you to complete a write up if you would like to share your findings in more detail to be published on our website.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">In Scope</h4>
              <p>While we encourage you to test all aspects of Hack Club and our systems, a few parts are considered off limits for testing:</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Out of Scope</h4>
              <p>While we encourage you to test all aspects of Hack Club and our systems, a few parts are considered off limits for testing:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>Any systems that are not operated by HQ. Different clubs and other community teams may have their own rules and guidelines, ensure you are aware of them before testing.</li>
                <li>Social Engineering attacks against users or staff is not a valid testing method. Any reports of this nature will be dismissed.</li>
                <li>Performing any denial of service or resource exhaustion attacks is not allowed as this impacts legitimate users while being a unfair testing method.</li>
                <li>Any actions that could disrupt the normal operation of our systems, such as DDoS attacks or spamming.</li>
                <li>Any report that is not based on real-world testing or does not demonstrate a clear understanding of the issue will be dismissed.</li>
              </ul>
              <p>This is not a list of every possible item, and we reserve the right to modify these rules. If you are unsure if what you are doing is allowed, it is likely not allowed, but you can always ask for clarification.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Rewards and Recognition</h4>
              <p>We take security seriously and want to make sure that when people find vulnerabilities, they are recognized for their efforts. If you find a vulnerability, you can receive a reward based on the severity and impact of the issue. We will also consider monetary rewards depending on the impact of the issue.</p>
              <p>If we do determine a monetary reward is deserved, we will reach out to you to discuss the details, including payment options. Please note that since we are based in the United States, we legally can not pay bounties if you are under trade and/or export restrictions determined by <a href="https://ofac.treasury.gov/sanctions-programs-and-country-information" target="_blank" class="text-primary underline">OFAC</a>.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Disagreements</h4>
              <p>We are human, and we make mistakes. If you believe we made a mistake in processing your report whether that is related to the severity, reward, or any other factor, please do not hesitate to contact us to share your perspective.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Notice for AI Generated Reports</h4>
              <p>Bounty programs have seen AI-generated submissions that lack any real-world impact. While the use of AI as a tool to help improve your report is allowed, submissions that are entirely AI-generated with no original researcher input will not be accepted. We are looking for original research with real-world impact. AI should support your research, not replace it.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">Anything else?</h4>
              <p>We reserve the right to make changes to this at any time, with or without notice. We also reserve the right to make the final decision about a report's validity, including whether it qualifies for a bounty. Reward payouts are at our discretion and may vary based on the severity and impact of the issue, as well as the quality of the actual report. While we will use the payout guidelines as a reference, we may adjust payouts based on the specific circumstances of each report. We promise to be fair in our decisions and to act in good faith in all cases, in that commitment, we ask that you also act in good faith when submitting reports and respect our decisions regarding the validity of a report and any associated rewards.</p>
              <h4 class="text-lg font-bold mt-4 mb-2">By submitting a report, you agree to the above terms and rules, and you confirm that you have read and understood them.</h4>
            </div>
          </div>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="form.termsAccepted" type="checkbox" required class="w-5 h-5 text-primary bg-darker border border-darkless rounded focus:ring-primary" />
            <span class="text-white font-medium">I have read and accept the terms and rules above to submit my report.</span>
          </label>
        </div>

        <div class="bg-dark p-8 rounded-2xl">
          <div class="mb-6">
            <h3 class="text-3xl font-bold text-white mb-2">And who am I speaking with?</h3>
            <p class="text-lg text-secondary">Let's get to know you better.</p>
          </div>
          <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-lg text-white font-medium mb-2">How should we address you? *</label>
                <input v-model="form.name" type="text" required class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none" placeholder="Spongebob" />
              </div>
              <div>
                <label class="block text-lg text-white font-medium mb-2">What is your email? *</label>
                <input v-model="form.email" type="email" required class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none" placeholder="spongebob@bikinibottom.com" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-lg text-white font-medium mb-2">Got Slack? (Optional)</label>
                <input v-model="form.slackId" type="text" class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none" placeholder="@username or User ID" />
                <p class="text-sm text-secondary mt-1">Slack is our preferred channel for communication, and commonly leads to faster responses.</p>
              </div>
              <div>
                <label class="block text-lg text-white font-medium mb-2">Where are you located? *</label>
                <select v-model="form.region" required class="w-full p-3 rounded-lg h-[54px] bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none">
                  <option value="">Select your region</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="eu">European Union</option>
                  <option value="uk">United Kingdom</option>
                  <option value="in">India</option>
                  <option value="au">Australia</option>
                  <option value="as">Asia Pacific</option>
                  <option value="other">Other</option>
                </select>
                <p class="text-sm text-secondary mt-1">This is to help with payouts!</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-dark p-8 rounded-2xl">
          <div class="mb-6">
            <h3 class="text-3xl font-bold text-white mb-2">What is affected?</h3>
            <p class="text-lg text-secondary">What is impacted by this vulnerability? Select all that apply.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="program in programs" :key="program.id" class="p-4 rounded-lg border transition-colors cursor-pointer" :class="form.affected.includes(program.id) ? 'bg-primary/20 border-primary text-white' : 'bg-darker border-darkless text-secondary hover:border-white/40'" @click="toggleProgram(program.id)">
              <div class="flex items-start space-x-3">
                <input type="checkbox" :checked="form.affected.includes(program.id)" class="mt-1 w-4 h-4 text-primary bg-darker border-darkless rounded focus:ring-primary" @change="toggleProgram(program.id)" />
                <div>
                  <h4 class="font-semibold">{{ program.name }}</h4>
                  <p class="text-sm opacity-80">{{ program.description }}</p>
                  <p class="text-xs opacity-60 mt-1">{{ program.domains.join(", ") }}</p>
                </div>
              </div>
            </div>
            <div class="p-4 rounded-lg border transition-colors cursor-pointer" :class="form.affected.includes('other') ? 'bg-primary/20 border-primary text-white' : 'bg-darker border-darkless text-secondary hover:border-white/40'" @click="toggleProgram('other')">
              <div class="flex items-start space-x-3">
                <input type="checkbox" :checked="form.affected.includes('other')" class="mt-1 w-4 h-4 text-primary bg-darker border-darkless rounded focus:ring-primary" @change="toggleProgram('other')" />
                <div class="w-full">
                  <h4 class="font-semibold">Something else...</h4>
                  <p class="text-sm opacity-80 mb-2">Something not listed above (please specify)</p>
                  <div v-if="form.affected.includes('other')" class="mt-3" @click="$event.stopPropagation()">
                    <input v-model="form.otherProgram" type="text" placeholder="Specify the program, domain, or service..." class="w-full p-2 rounded bg-darker border border-darkless text-white text-sm focus:border-primary focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-dark p-8 rounded-2xl">
          <div class="mb-6">
            <h3 class="text-3xl font-bold text-white mb-2">How bad's the damage?</h3>
            <p class="text-lg text-secondary">This helps us figure out how urgent the matter is and the potential impact on users.</p>
          </div>
          <div class="space-y-6">
            <div class="bg-darker p-4 rounded-lg">
              <label class="block text-lg text-white font-medium mb-3">Can someone exploit this vulnerability from the internet?</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center space-x-2 cursor-pointer p-3 rounded border transition-colors" :class="form.severity.remote === 'yes' ? 'bg-primary/20 border-primary text-white' : 'border-transparent text-secondary hover:border-white/40'">
                  <input v-model="form.severity.remote" type="radio" value="yes" class="w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary" />
                  <span>Yes, from anywhere on the internet</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-3 rounded border transition-colors" :class="form.severity.remote === 'no' ? 'bg-primary/20 border-primary text-white' : 'border-transparent text-secondary hover:border-white/40'">
                  <input v-model="form.severity.remote" type="radio" value="no" class="w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary" />
                  <span>No, they need special access</span>
                </label>
              </div>
            </div>

            <div class="bg-darker p-4 rounded-lg">
              <label class="block text-lg text-white font-medium mb-3">What's the worst thing an attacker could do?</label>
              <div class="grid grid-cols-1 gap-3">
                <label v-for="impact in impactOptions" :key="impact.value" class="flex items-center space-x-2 cursor-pointer p-3 rounded border transition-colors" :class="form.severity.impact === impact.value ? 'bg-primary/20 border-primary text-white' : 'border-transparent text-secondary hover:border-white/40'">
                  <input v-model="form.severity.impact" type="radio" :value="impact.value" class="w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary" />
                  <span>{{ impact.label }}</span>
                </label>
              </div>
            </div>

            <div class="bg-darker p-4 rounded-lg">
              <label class="block text-lg text-white font-medium mb-3">How difficult is this to exploit?</label>
              <div class="grid grid-cols-1 gap-3">
                <label v-for="complexity in complexityOptions" :key="complexity.value" class="flex items-center space-x-2 cursor-pointer p-3 rounded border transition-colors" :class="form.severity.complexity === complexity.value ? 'bg-primary/20 border-primary text-white' : 'border-transparent text-secondary hover:border-white/40'">
                  <input v-model="form.severity.complexity" type="radio" :value="complexity.value" class="w-4 h-4 text-primary bg-darker border-darkless focus:ring-primary" />
                  <span>{{ complexity.label }}</span>
                </label>
              </div>
            </div>

            <div v-if="calculatedSeverity" class="bg-green/10 border border-green/30 p-4 rounded-lg">
              <div class="flex items-center justify-between">
                <span class="text-white font-medium">Estimated Severity:</span>
                <span class="text-2xl font-bold text-green">{{ calculatedSeverity.level }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-dark p-8 rounded-2xl">
          <div class="mb-6">
            <h3 class="text-3xl font-bold text-white mb-2">What's the deets?</h3>
            <p class="text-lg text-secondary">Give us the lowdown on the vulnerability. Be as detailed as possible.</p>
          </div>
          <div class="space-y-6">
            <div>
              <label class="block text-lg text-white font-medium mb-2">Report Title *</label>
              <input v-model="form.title" type="text" required class="w-full p-3 rounded-lg bg-darker border border-darkless text-lg text-white focus:border-primary focus:outline-none" placeholder="A short, descriptive title of the exploit" />
            </div>

            <div>
              <label class="block text-lg text-white font-medium mb-2">Detailed Description *</label>
              <textarea
                v-model="form.description"
                required
                rows="15"
                class="w-full p-3 rounded-lg bg-darker border border-darkless text-white focus:border-primary focus:outline-none font-mono text-sm"
                placeholder="Please include:
- Steps to reproduce the vulnerability
- What data or systems are affected
- Proof of concept (if safe to include)
- Any other relevant details"
              />
            </div>
          </div>
        </div>

        <!-- Submit Section -->
        <div class="bg-dark p-8 rounded-2xl">
          <div class="mb-6">
            <h3 class="text-3xl font-bold text-white mb-2">Ready to submit?</h3>
            <p class="text-lg text-secondary">Take one last look before hitting submit. Make sure everything is correct and you have provided as much detail as possible!</p>
          </div>

          <div class="flex justify-between items-center">
            <nuxt-link to="/" class="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"> Cancel </nuxt-link>

            <button type="submit" :disabled="!canSubmit || isSubmitting" class="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isSubmitting ? "Submitting..." : "Submit Report" }}
            </button>
          </div>
        </div>

        <div v-if="showTurnstile" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.7)">
          <div class="bg-dark rounded-2xl p-8 max-w-md w-full relative">
            <div v-if="!turnstileToken && !isSubmitting" class="text-center">
              <h3 class="text-2xl font-bold text-white mb-4">Security Check</h3>
              <p class="text-secondary mb-6">Please complete this verification before we submit your report.</p>
              <div id="turnstile-container" class="flex justify-center mb-4" />
              <button class="px-4 py-2 text-secondary hover:text-white transition-colors cursor-pointer" @click="showTurnstile = false">Cancel</button>
            </div>

            <div v-else-if="turnstileToken && isSubmitting" class="text-center">
              <div class="animate-spin w-10 h-10 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-white mb-2">Submitting your report...</h3>
              <p class="text-secondary">Hold tight!</p>
            </div>
          </div>
        </div>

        <!-- Status Message -->
        <div v-if="statusMessage" role="alert" class="mt-6 p-4 rounded-lg" :class="isSuccess ? 'bg-green/20 border border-green/30 text-green' : 'bg-red/20 border border-red/30 text-red'">
          <div class="flex items-center space-x-2">
            <span v-if="isSuccess" class="text-2xl">✅</span>
            <span v-else class="text-2xl">❌</span>
            <span class="font-medium">{{ statusMessage }}</span>
          </div>
          <div v-if="isSuccess && reportId" class="mt-2 text-sm">
            Report ID: <code class="bg-dark px-2 py-1 rounded text-green">{{ reportId }}</code>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import programs from "@/assets/data/programs.json";

useHead({
  title: "Submit Security Report - Hack Club Security Program",
  meta: [
    {
      name: "description",
      content: "Submit a security vulnerability report to the Hack Club Security Bounty Program",
    },
  ],
});

const config = useRuntimeConfig();
const turnstilePublicKey = config.public.tpublic;

const isSubmitting = ref(false);
const statusMessage = ref("");
const isSuccess = ref(false);
const reportId = ref("");
const turnstileToken = ref("");
const showTurnstile = ref(false);

const form = reactive({
  termsAccepted: false,
  name: "",
  email: "",
  slackId: "",
  region: "",
  affected: [],
  otherProgram: "",
  severity: {
    remote: "",
    impact: "",
    complexity: "",
  },
  title: "",
  description: "",
});

const impactOptions = [
  { value: "high", label: "Take complete control of the system or access all user data" },
  { value: "medium", label: "Access some user data or perform unauthorized actions" },
  { value: "low", label: "Gather information or cause minor disruption" },
];

const complexityOptions = [
  { value: "low", label: "Very easy - anyone can do it with basic tools" },
  { value: "medium", label: "Moderate - requires some technical knowledge" },
  { value: "high", label: "Difficult - requires advanced skills and specific conditions" },
];

const calculatedSeverity = computed(() => {
  if (!form.severity.remote || !form.severity.impact || !form.severity.complexity) {
    return null;
  }

  let score = 0;
  let payout = 0;

  // Remote access factor
  if (form.severity.remote === "yes") score += 3;
  else score += 1;

  // Impact factor
  if (form.severity.impact === "high") {
    score += 4;
    payout += 300;
  } else if (form.severity.impact === "medium") {
    score += 2;
    payout += 100;
  } else {
    score += 1;
    payout += 25;
  }

  // Complexity factor (inverse - easier = higher score)
  if (form.severity.complexity === "low") score += 2;
  else if (form.severity.complexity === "medium") score += 1;

  // Determine level
  let level = "Low";
  if (score >= 7) {
    level = "Critical";
    payout = Math.max(payout, 250);
  } else if (score >= 5) {
    level = "High";
    payout = Math.max(payout, 100);
  } else if (score >= 3) {
    level = "Medium";
    payout = Math.max(payout, 50);
  } else {
    payout = Math.max(payout, 15);
  }

  return { level, payout };
});

const canSubmit = computed(() => {
  return form.termsAccepted && form.name && form.email && form.region && form.affected.length > 0 && form.severity.remote && form.severity.impact && form.severity.complexity && form.title && form.description;
});

function toggleProgram(programId) {
  const index = form.affected.indexOf(programId);
  if (index > -1) {
    form.affected.splice(index, 1);
  } else {
    form.affected.push(programId);
  }
}

function getRegionDisplay(region) {
  const regions = {
    us: "United States",
    canada: "Canada",
    eu: "European Union",
    uk: "United Kingdom",
    australia: "Australia",
    asia: "Asia Pacific",
    other: "Other",
  };
  return regions[region] || "Not selected";
}

function getAffectedDisplay() {
  if (form.affected.length === 0) return "None selected";

  const programNames = form.affected.map((id) => {
    if (id === "other") return form.otherProgram || "Other";
    const program = programs.find((p) => p.id === id);
    return program ? program.name : id;
  });

  return programNames.join(", ");
}

function getVulnTypeDisplay() {
  return "";
}

async function handleSubmit() {
  if (!canSubmit.value) return;

  showTurnstile.value = true;
  loadTurnstile();
}

function loadTurnstile() {
  const container = document.getElementById("turnstile-container");
  if (window.turnstile && container) {
    window.turnstile.render(container, {
      sitekey: turnstilePublicKey,
      callback: (token) => {
        turnstileToken.value = token;
        submitReport();
      },
    });
  } else {
    setTimeout(loadTurnstile, 100);
  }
}

async function submitReport() {
  isSubmitting.value = true;
  try {
    const response = await $fetch("/api/submit", {
      method: "POST",
      body: {
        ...form,
        turnstileToken: turnstileToken.value,
        calculatedSeverity: calculatedSeverity.value,
      },
    });

    if (response.success) {
      statusMessage.value = response.message;
      isSuccess.value = true;
      reportId.value = response.reportId;

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      throw new Error(response.message || "Submission failed");
    }
  } catch (error) {
    statusMessage.value = error.message || "Failed to submit report. Please try again.";
    isSuccess.value = false;
  } finally {
    isSubmitting.value = false;
    showTurnstile.value = false;
    turnstileToken.value = "";
  }
}

onMounted(() => {
  // Load Turnstile script
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  document.head.appendChild(script);
  window.addEventListener("beforeunload", function () {
    this.event.returnValue = "Are you sure you want to leave? Your progress will not be saved.";
  });
});
</script>
