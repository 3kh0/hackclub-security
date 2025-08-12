<template>
  <div class="min-h-screen bg-darker p-2 md:p-4">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="text-center my-12 relative">
        <h1 class="text-6xl md:text-7xl font-bold p-4 mb-4 bg-gradient-to-r from-primary to-orange bg-clip-text text-transparent">Hack Club Security Program</h1>
        <div id="c" class="hidden absolute right-0 bottom-0 font-[Minecraft] -translate-x-1/4 -translate-y-1/2 rotate-[-15deg] text-[#fdfd0e] font-bold text-xl s" style="z-index: 10">
          <a href="https://hcb.hackclub.com/hack-club-security/transactions" target="_blank" rel="noopener noreferrer" class="hover:text-blue/80 transition-colors">$<span id="a"></span> paid out!</a>
        </div>
      </div>
      <div class="bg-dark p-8 rounded-2xl">
        <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
          <img src="@/assets/s.png" alt="meow" class="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain flex-shrink-0" />
          <div class="max-w-2xl text-secondary text-xl space-y-4 flex flex-col justify-center h-full">
            <p>
              Hi! I’m
              <a href="https://github.com/ading2210" target="_blank" rel="noopener noreferrer" class="text-blue font-semibold hover:text-blue/80 transition-colors">Allen</a> and I’m <a href="https://github.com/3kh0" target="_blank" rel="noopener noreferrer" class="text-blue font-semibold hover:text-blue/80 transition-colors">Echo</a>. We are running the security bounty program for Hack Club. This is a trial until <span class="font-semibold">September 30th</span>, and if it goes well, we will continue it indefinitely. Thank you for your help in keeping Hack Club secure!
            </p>
            <p>We both have backgrounds in earning security bounties and are excited to bring this to Hack Club.</p>
            <ul class="list-disc list-inside space-y-1">
              <li>
                Allen earned a
                <a href="https://ading.dev/blog/posts/chrome_sandbox_escape.html" target="_blank" rel="noopener noreferrer" class="font-bold text-blue hover:text-blue/80 transition-colors">$20k bounty for a Chromium bug</a>.
              </li>
              <li>Echo participated in the <span class="font-bold">Coinbase Security Bounty Program</span>.</li>
            </ul>
          </div>
        </div>

        <div class="rounded-2xl my-8">
          <h2 class="text-2xl font-bold mb-4 text-white">Participating Programs</h2>
          <p class="text-xl text-secondary mb-6">Not all Hack Club programs are under this security program, so keep in mind what is open to testing. We are currently working with the following Hack Club programs:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="program in programs" :key="program.id" class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-bold text-white mb-2">{{ program.name }}</h3>
              <p class="text-secondary text-sm mb-3">{{ program.description }}</p>
              <div class="space-y-1">
                <div v-for="domain in program.domains" :key="domain" class="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                  {{ domain }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl my-4">
          <h2 class="text-2xl font-bold mb-4 text-white">PII Severity Definitions</h2>
          <p class="text-xl text-secondary mb-4">One thing we have a lot here at Hack Club is information, and we want to make sure that it is well protected. We have defined the severity of the information based on how much it could be used to harm someone.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div class="p-6 bg-red/10 border border-red/30 rounded-xl">
              <h3 class="text-2xl font-bold text-red mb-4">Critical</h3>
              <ul class="space-y-2 text-white text-lg">
                <li>• Government-issued ID</li>
                <li>• Identity verification documents</li>
              </ul>
            </div>

            <div class="p-6 bg-orange/10 border border-orange/30 rounded-xl">
              <h3 class="text-2xl font-bold text-orange mb-4">High Severity</h3>
              <ul class="space-y-2 text-white text-lg">
                <li>• Physical address</li>
              </ul>
            </div>

            <div class="p-6 bg-yellow/10 border border-yellow/30 rounded-xl">
              <h3 class="text-2xl font-bold text-yellow mb-4">Medium Severity</h3>
              <ul class="space-y-2 text-white text-md">
                <li>• Private email address on Hack Club platforms</li>
                <li>• Phone numbers</li>
                <li>• Birthday or age</li>
              </ul>
            </div>

            <div class="p-6 bg-green/10 border border-green/30 rounded-xl">
              <h3 class="text-2xl font-bold text-green mb-4">Low Severity</h3>
              <ul class="space-y-2 text-white text-md">
                <li>• IP addresses</li>
                <li>• Legal names</li>
                <li>• Non-public program information</li>
              </ul>
            </div>
          </div>

          <div class="mb-4 p-6 bg-white/5 rounded-xl border border-white/10">
            <p class="text-secondary text-lg">We define a leak as any person who has not signed a Hack Club NDA having access to the above data due to our systems failing to keep it safe. If the user self-declares any information covered in these tiers, it is not considered a vulnerability.</p>
          </div>

          <h2 class="text-2xl font-bold mb-4 text-white">Payout Tiers</h2>
          <p class="text-xl text-secondary mb-4">As a thank you for helping us keep Hack Club secure, we are offering bounties for finding vulnerabilities in our systems. The payouts are based on the severity of the vulnerability and the impact it has on our users.</p>

          <h3 class="text-xl font-bold mb-4 text-white">PII Bounty Tiers</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div class="p-6 bg-orange/10 border border-orange/30 rounded-xl">
              <div class="text-2xl font-bold text-orange mb-2">$300</div>
              <div class="text-white text-lg mb-2">High severity PII leak</div>
              <div class="text-md text-secondary">affecting 100+ people</div>
            </div>

            <div class="p-6 bg-yellow/10 border border-yellow/30 rounded-xl">
              <div class="text-2xl font-bold text-yellow mb-2">$150</div>
              <div class="text-white text-lg mb-2">Medium severity PII leak</div>
              <div class="text-md text-secondary">affecting 50+ people</div>
            </div>

            <div class="p-6 bg-green/10 border border-green/30 rounded-xl">
              <div class="text-2xl font-bold text-green mb-2">$50</div>
              <div class="text-white text-lg mb-2">Medium severity (5+ people)</div>
              <div class="text-md text-secondary">or Low severity (50+ people)</div>
            </div>

            <div class="p-6 bg-cyan/10 border border-cyan/30 rounded-xl">
              <div class="text-xl font-bold text-cyan mb-2">$20</div>
              <div class="text-white text-lg mb-2">Low severity PII leak</div>
              <div class="text-md text-secondary">affecting 10+ people</div>
            </div>
          </div>

          <h3 class="text-xl font-bold my-4 text-white">Remote Code Execution</h3>
          <div class="grid md:grid-cols-2 gap-4 my-4">
            <div class="p-6 bg-red/10 border border-red/30 rounded-xl">
              <div class="text-3xl font-bold text-red mb-2">$500</div>
              <div class="text-white text-lg mb-2">Root access to servers</div>
              <div class="text-md text-secondary">*.selfhosted.hackclub.com, hcb.hackclub.com, or admin access to vercel.com/@hackclub GitHub (outside Docker)</div>
            </div>

            <div class="p-6 bg-orange/10 border border-orange/30 rounded-xl">
              <div class="text-2xl font-bold text-orange mb-2">$250</div>
              <div class="text-white text-lg mb-2">Non-root access</div>
              <div class="text-md text-secondary">to any of the above (outside Docker)</div>
            </div>
          </div>

          <h3 class="text-xl font-bold my-4 text-white">Other Vulnerabilities</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-6 bg-red/10 border border-red/30 rounded-xl">
              <div class="text-2xl font-bold text-red mb-2">$100</div>
              <div class="text-white text-lg mb-2">Authentication Bypass</div>
              <div class="text-md text-secondary">OAuth flaws, session management vulnerabilities, improper access controls</div>
            </div>

            <div class="p-6 bg-purple/10 border border-purple/30 rounded-xl">
              <div class="text-2xl font-bold text-purple mb-2">$100</div>
              <div class="text-white text-lg mb-2">SQL Injection</div>
              <div class="text-md text-secondary">Or any other exploit against Postgres or Airtable databases</div>
            </div>

            <div class="p-6 bg-yellow/10 border border-yellow/30 rounded-xl">
              <div class="text-xl font-bold text-yellow mb-2">$50</div>
              <div class="text-white text-lg mb-2">Information Disclosure</div>
              <div class="text-md text-secondary">Exposed admin panels, configuration issues</div>
            </div>

            <div class="p-6 bg-blue/10 border border-blue/30 rounded-xl">
              <div class="text-lg font-bold text-blue mb-2">XSS & Others</div>
              <div class="text-white text-lg mb-2">Cross-Site Scripting, CSRF, etc.</div>
              <div class="text-md text-secondary">Paid according to PII impact (see above)</div>
            </div>
          </div>

          <h3 class="text-xl font-bold my-4 text-white">Bonus</h3>
          <div class="p-6 bg-green/10 border border-green/30 rounded-xl">
            <div class="text-xl font-bold text-green mb-2">+25% bonus</div>
            <div class="text-white text-lg mb-2">Include Fix with Report</div>
            <div class="text-md text-secondary">Submit a git diff that fixes the vulnerability being reported</div>
          </div>
        </div>

        <h2 class="text-2xl font-bold mb-4 text-white">Out of Scope</h2>
        <p class="text-lg text-secondary mb-4">When reporting vulnerabilities, please consider attack scenario, and potential impact of the bug. Also note that any program not participating in this program is out of scope. While you are welcome to report issues regarding them, you are not guaranteed a payout. The following issues are generally considered to be out of scope (not an complete list):</p>
        <div class="bg-primary/20 rounded-2xl p-6 border border-primary/30">
          <div class="grid md:grid-cols-2 gap-6 text-lg">
            <ul class="list-disc list-inside text-red space-y-2">
              <li>Scraping public Slack information or account enumeration</li>
              <li>Brute force attacks</li>
              <li>Clickjacking without significant impact</li>
              <li>Automated scanner outputs without real-world impact</li>
            </ul>
            <ul class="list-disc list-inside text-red space-y-2">
              <li>Social engineering or phishing attacks</li>
              <li>Self-exploitation requiring user interaction</li>
              <li>Denial of Service causing resource exhaustion</li>
              <li>Programs that are not participating in this program</li>
            </ul>
          </div>
        </div>

        <div class="my-4">
          <h1 class="text-2xl font-bold mb-4 text-white">Notice for AI Generated Reports</h1>
          <p class="text-lg text-secondary">Bounty programs have seen AI-generated submissions that lack any real-world impact. While the use of AI as a tool to help improve your report is allowed, submissions that are entirely AI-generated with no original researcher input will not be accepted. We are looking for original research with real-world impact. AI should support your research, not replace it.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mt-4">
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 class="text-2xl font-bold mb-4 text-primary">How to Report</h3>
            <p class="text-secondary mb-4">Submit vulnerabilities via this site, and we will pursue further contact via email</p>
            <nuxt-link to="/submit" class="inline-block px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-colors"> Submit Report → </nuxt-link>
          </div>

          <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 class="text-2xl font-bold mb-4 text-green">Payout Options</h3>
            <div class="space-y-2 text-secondary">
              <div>Check by mail, Wise Transfers, HCB Visa Card, or cryptocurrency</div>
            </div>
            <p class="text-md text-secondary mt-4">If these payout options do not work, we will try our best to figure out the best possible way to award you. The program in which the vulnerability is found will cover the cost of the payout.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import programs from "@/assets/data/programs.json";

useHead({
  title: "Hack Club Security Bounty Program",
  meta: [
    {
      name: "description",
      content: "Help keep Hack Club secure. Report vulnerabilities and earn bounties through our security program.",
    },
  ],
});

onMounted(() => {
  const p = document.getElementById("a");
  const pc = document.getElementById("c");
  if (p) {
    fetch("/api/payout")
      .then((response) => response.json())
      .then((data) => {
        p.textContent = data.t.toLocaleString();
        pc.classList.remove("hidden");
      })
      .catch((error) => {
        console.error("wuh", error);
        p.textContent = "1,000";
      });
  }
});
</script>
