<template>
  <div class="min-h-screen text-white" style="padding: 32px 0;">
    <div class="max-w-7xl mx-auto border border-white/20 px-6 bg-black">
      <!-- Header -->
      <header class="py-12 border-b border-gray-600">
        <div class="text-center space-y-4">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight">Hack Club</h1>
          <h2 class="text-2xl md:text-3xl font-light text-gray-400">Security program</h2>
          <div id="c" class="hidden mt-6">
            <div class="inline-flex items-center space-x-2 text-sm border border-gray-700 px-4 py-2 bg-gray-900">
              <span class="text-gray-400">PAID OUT:</span>
              <a href="https://hcb.hackclub.com/hack-club-security/transactions" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-300 transition-colors">
                $<span id="a"></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Introduction -->
      <section class="py-12 border-b border-gray-600">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6 text-sm leading-relaxed font-mono">
            <p>
              TODO: PUT SOME SHIT HERE IDK, IMAGINE THIS IS A COOL INTRO THING OR SOMETHING IDK
            </p>
          </div>
        </div>
      </section>

      <!-- Participating Programs -->
      <section class="py-12 border-b border-gray-600">
        <h2 class="text-xl font-bold mb-8 font-mono tracking-wider">PARTICIPATING PROGRAMS</h2>
        <p class="text-sm text-gray-400 mb-8 font-mono leading-relaxed">
          NOT ALL HACK CLUB PROGRAMS ARE UNDER THIS SECURITY PROGRAM. 
          KEEP IN MIND WHAT IS OPEN TO TESTING.
        </p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="program in programs" :key="program.id" class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600">
              <h3 class="font-bold font-mono text-sm tracking-wide">{{ program.name }}</h3>
            </div>
            <div class="p-4 space-y-3">
              <p class="text-xs text-gray-400 font-mono leading-relaxed">{{ program.description }}</p>
              <div class="space-y-1">
                <div v-for="domain in program.domains" :key="domain" class="text-xs font-mono text-gray-300 border border-gray-700 px-2 py-1 bg-black/50">
                  {{ domain }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PII Severity Definitions -->
      <section class="py-12 border-b border-gray-600">
        <h2 class="text-xl font-bold mb-4 font-mono tracking-wider">PII SEVERITY DEFINITIONS</h2>
        <p class="text-sm text-gray-400 mb-8 font-mono leading-relaxed max-w-4xl">
          WE HAVE DEFINED THE SEVERITY OF INFORMATION BASED ON HOW MUCH IT COULD BE USED TO HARM SOMEONE.
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 bg-gray-800/50">
              <h3 class="text-sm font-bold font-mono">CRITICAL</h3>
            </div>
            <div class="p-4 space-y-2 text-xs font-mono text-gray-300">
              <p>• GOVERNMENT-ISSUED ID</p>
              <p>• IDENTITY VERIFICATION DOCS</p>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 bg-gray-800/50">
              <h3 class="text-sm font-bold font-mono">HIGH SEVERITY</h3>
            </div>
            <div class="p-4 space-y-2 text-xs font-mono text-gray-300">
              <p>• PHYSICAL ADDRESS</p>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 bg-gray-800/50">
              <h3 class="text-sm font-bold font-mono">MEDIUM SEVERITY</h3>
            </div>
            <div class="p-4 space-y-2 text-xs font-mono text-gray-300">
              <p>• PRIVATE EMAIL ADDRESS</p>
              <p>• PHONE NUMBERS</p>
              <p>• BIRTHDAY OR AGE</p>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 bg-gray-800/50">
              <h3 class="text-sm font-bold font-mono">LOW SEVERITY</h3>
            </div>
            <div class="p-4 space-y-2 text-xs font-mono text-gray-300">
              <p>• IP ADDRESSES</p>
              <p>• LEGAL NAMES</p>
              <p>• NON-PUBLIC PROGRAM INFO</p>
            </div>
          </div>
        </div>

        <div class="border border-gray-700 bg-gray-900/20 p-6">
          <p class="text-xs font-mono text-gray-400 leading-relaxed">
            WE DEFINE A LEAK AS ANY PERSON WHO HAS NOT SIGNED A HACK CLUB NDA HAVING ACCESS TO THE ABOVE DATA 
            DUE TO OUR SYSTEMS FAILING TO KEEP IT SAFE. IF THE USER SELF-DECLARES ANY INFORMATION COVERED IN 
            THESE TIERS, IT IS NOT CONSIDERED A VULNERABILITY.
          </p>
        </div>
      </section>

      <!-- Payout Tiers -->
      <section class="py-12 border-b border-gray-600">
        <h2 class="text-xl font-bold mb-4 font-mono tracking-wider">PAYOUT TIERS</h2>
        <p class="text-sm text-gray-400 mb-8 font-mono leading-relaxed max-w-4xl">
          PAYOUTS ARE BASED ON THE SEVERITY OF THE VULNERABILITY AND THE IMPACT IT HAS ON OUR USERS.
        </p>

        <!-- PII Bounty Tiers -->
        <h3 class="text-lg font-bold mb-4 font-mono tracking-wide">PII BOUNTY TIERS</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-2xl font-bold font-mono">$300</div>
            </div>
            <div class="p-4 text-center">
              <div class="text-xs font-mono text-gray-300 mb-2">HIGH SEVERITY PII LEAK</div>
              <div class="text-xs font-mono text-gray-400">AFFECTING 100+ PEOPLE</div>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-2xl font-bold font-mono">$150</div>
            </div>
            <div class="p-4 text-center">
              <div class="text-xs font-mono text-gray-300 mb-2">MEDIUM SEVERITY PII LEAK</div>
              <div class="text-xs font-mono text-gray-400">AFFECTING 50+ PEOPLE</div>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-2xl font-bold font-mono">$50</div>
            </div>
            <div class="p-4 text-center">
              <div class="text-xs font-mono text-gray-300 mb-2">MEDIUM SEVERITY (5+ PEOPLE)</div>
              <div class="text-xs font-mono text-gray-400">OR LOW SEVERITY (50+ PEOPLE)</div>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-xl font-bold font-mono">$20</div>
            </div>
            <div class="p-4 text-center">
              <div class="text-xs font-mono text-gray-300 mb-2">LOW SEVERITY PII LEAK</div>
              <div class="text-xs font-mono text-gray-400">AFFECTING 10+ PEOPLE</div>
            </div>
          </div>
        </div>

        <!-- Remote Code Execution -->
        <h3 class="text-lg font-bold mb-4 font-mono tracking-wide">REMOTE CODE EXECUTION</h3>
        <div class="grid md:grid-cols-2 gap-4 mb-8">
          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-3xl font-bold font-mono">$500</div>
            </div>
            <div class="p-4">
              <div class="text-xs font-mono text-gray-300 mb-2 text-center">ROOT ACCESS TO SERVERS</div>
              <div class="text-xs font-mono text-gray-400 text-center">*.SELFHOSTED.HACKCLUB.COM, HCB.HACKCLUB.COM, OR ADMIN ACCESS TO VERCEL.COM/@HACKCLUB GITHUB (OUTSIDE DOCKER)</div>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-2xl font-bold font-mono">$250</div>
            </div>
            <div class="p-4">
              <div class="text-xs font-mono text-gray-300 mb-2 text-center">NON-ROOT ACCESS</div>
              <div class="text-xs font-mono text-gray-400 text-center">TO ANY OF THE ABOVE (OUTSIDE DOCKER)</div>
            </div>
          </div>
        </div>

        <!-- Other Vulnerabilities -->
        <h3 class="text-lg font-bold mb-4 font-mono tracking-wide">OTHER VULNERABILITIES</h3>
        <div class="grid md:grid-cols-2 gap-4 mb-8">
          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-2xl font-bold font-mono">$100</div>
            </div>
            <div class="p-4">
              <div class="text-xs font-mono text-gray-300 mb-2 text-center">AUTHENTICATION BYPASS</div>
              <div class="text-xs font-mono text-gray-400 text-center">OAUTH FLAWS, SESSION MANAGEMENT VULNERABILITIES, IMPROPER ACCESS CONTROLS</div>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-2xl font-bold font-mono">$100</div>
            </div>
            <div class="p-4">
              <div class="text-xs font-mono text-gray-300 mb-2 text-center">SQL INJECTION</div>
              <div class="text-xs font-mono text-gray-400 text-center">OR ANY OTHER EXPLOIT AGAINST POSTGRES OR AIRTABLE DATABASES</div>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-xl font-bold font-mono">$50</div>
            </div>
            <div class="p-4">
              <div class="text-xs font-mono text-gray-300 mb-2 text-center">INFORMATION DISCLOSURE</div>
              <div class="text-xs font-mono text-gray-400 text-center">EXPOSED ADMIN PANELS, CONFIGURATION ISSUES</div>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600 text-center">
              <div class="text-lg font-bold font-mono">XSS & OTHERS</div>
            </div>
            <div class="p-4">
              <div class="text-xs font-mono text-gray-300 mb-2 text-center">CROSS-SITE SCRIPTING, CSRF, ETC.</div>
              <div class="text-xs font-mono text-gray-400 text-center">PAID ACCORDING TO PII IMPACT (SEE ABOVE)</div>
            </div>
          </div>
        </div>

        <!-- Bonus -->
        <h3 class="text-lg font-bold mb-4 font-mono tracking-wide">BONUS</h3>
        <div class="border border-gray-600 bg-gray-900/30">
          <div class="p-4 border-b border-gray-600 text-center">
            <div class="text-xl font-bold font-mono">+25% BONUS</div>
          </div>
          <div class="p-4">
            <div class="text-xs font-mono text-gray-300 mb-2 text-center">INCLUDE FIX WITH REPORT</div>
            <div class="text-xs font-mono text-gray-400 text-center">SUBMIT A GIT DIFF THAT FIXES THE VULNERABILITY BEING REPORTED</div>
          </div>
        </div>
      </section>

      <!-- Out of Scope -->
      <section class="py-12 border-b border-gray-600">
        <h2 class="text-xl font-bold mb-4 font-mono tracking-wider">OUT OF SCOPE</h2>
        <p class="text-sm text-gray-400 mb-8 font-mono leading-relaxed max-w-4xl">
          WHEN REPORTING VULNERABILITIES, PLEASE CONSIDER ATTACK SCENARIO, AND POTENTIAL IMPACT OF THE BUG. 
          ALSO NOTE THAT ANY PROGRAM NOT PARTICIPATING IN THIS PROGRAM IS OUT OF SCOPE. WHILE YOU ARE WELCOME 
          TO REPORT ISSUES REGARDING THEM, YOU ARE NOT GUARANTEED A PAYOUT.
        </p>
        <div class="border border-gray-600 bg-gray-900/30 p-6">
          <div class="grid md:grid-cols-2 gap-6 text-xs font-mono">
            <div class="space-y-2 text-gray-300">
              <p>• SCRAPING PUBLIC SLACK INFORMATION OR ACCOUNT ENUMERATION</p>
              <p>• BRUTE FORCE ATTACKS</p>
              <p>• CLICKJACKING WITHOUT SIGNIFICANT IMPACT</p>
              <p>• AUTOMATED SCANNER OUTPUTS WITHOUT REAL-WORLD IMPACT</p>
            </div>
            <div class="space-y-2 text-gray-300">
              <p>• SOCIAL ENGINEERING OR PHISHING ATTACKS</p>
              <p>• SELF-EXPLOITATION REQUIRING USER INTERACTION</p>
              <p>• DENIAL OF SERVICE CAUSING RESOURCE EXHAUSTION</p>
              <p>• PROGRAMS THAT ARE NOT PARTICIPATING IN THIS PROGRAM</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI Generated Reports Notice -->
      <section class="py-12 border-b border-gray-600">
        <h2 class="text-xl font-bold mb-4 font-mono tracking-wider">NOTICE FOR AI GENERATED REPORTS</h2>
        <p class="text-sm text-gray-400 font-mono leading-relaxed max-w-4xl">
          BOUNTY PROGRAMS HAVE SEEN AI-GENERATED SUBMISSIONS THAT LACK ANY REAL-WORLD IMPACT. 
          WHILE THE USE OF AI AS A TOOL TO HELP IMPROVE YOUR REPORT IS ALLOWED, SUBMISSIONS 
          THAT ARE ENTIRELY AI-GENERATED WITH NO ORIGINAL RESEARCHER INPUT WILL NOT BE ACCEPTED. 
          WE ARE LOOKING FOR ORIGINAL RESEARCH WITH REAL-WORLD IMPACT. AI SHOULD SUPPORT YOUR RESEARCH, NOT REPLACE IT.
        </p>
      </section>

      <!-- How to Report & Payout Options -->
      <section class="py-12">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600">
              <h3 class="text-lg font-bold font-mono tracking-wider">HOW TO REPORT</h3>
            </div>
            <div class="p-6 space-y-4">
              <p class="text-sm text-gray-400 font-mono">
                SUBMIT VULNERABILITIES VIA THIS SITE, AND WE WILL PURSUE FURTHER CONTACT VIA EMAIL
              </p>
              <nuxt-link to="/submit" class="inline-block border border-gray-700 bg-white text-black px-6 py-3 font-mono text-sm font-bold hover:bg-gray-200 transition-colors">
                SUBMIT REPORT →
              </nuxt-link>
            </div>
          </div>

          <div class="border border-gray-600 bg-gray-900/30">
            <div class="p-4 border-b border-gray-600">
              <h3 class="text-lg font-bold font-mono tracking-wider">PAYOUT OPTIONS</h3>
            </div>
            <div class="p-6 space-y-4">
              <div class="text-sm text-gray-400 font-mono">
                CHECK BY MAIL, WISE TRANSFERS, HCB VISA CARD, OR CRYPTOCURRENCY
              </div>
              <p class="text-xs text-gray-400 font-mono leading-relaxed">
                IF THESE PAYOUT OPTIONS DO NOT WORK, WE WILL TRY OUR BEST TO FIGURE OUT THE 
                BEST POSSIBLE WAY TO AWARD YOU. THE PROGRAM IN WHICH THE VULNERABILITY IS FOUND 
                WILL COVER THE COST OF THE PAYOUT.
              </p>
            </div>
          </div>
        </div>
      </section>
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
    fetch("/api/front/count")
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
