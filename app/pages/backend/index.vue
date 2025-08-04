<template>
  <div class="min-h-screen bg-darker p-0 m-0 flex flex-col">
    <div class="max-w-8xl mx-auto w-full flex-1 flex flex-col">
      <div class="flex justify-between items-center mt-8 mb-4">
        <div>
          <h1 class="text-4xl font-bold text-white mb-2 text-left">Security Reports Dashboard</h1>
        </div>
        <div class="flex flex-col items-end gap-2">
          <span
            class="font-mono px-3 py-1 rounded cursor-pointer transition-colors relative"
            :class="user?.role === 'admin' ? 'text-primary bg-darkless' : 'text-secondary bg-darkless'"
            @mouseenter="h = true"
            @mouseleave="h = false"
            @click="logout"
          >
            <span v-if="h" class="absolute inset-0 flex items-center justify-center text-red font-bold bg-darkless/80 z-10">Click to log out</span>
            <span :class="h ? 'opacity-0' : ''">{{ user?.email }}</span>
          </span>
        </div>
      </div>
      <div class="bg-dark rounded-2xl shadow-lg p-6 flex-1 flex flex-col">
        <div v-if="loading" class="flex justify-center items-center py-12 flex-1">
          <span class="text-secondary animate-pulse text-xl">Loading reports...</span>
        </div>
        <table v-else-if="reports.length" class="w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
          <thead>
            <tr class="bg-primary/10 text-primary">
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Timestamp</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Region</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Title</th>
              <th class="px-4 py-2 text-left">Severity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reports" :key="report.id" class="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer" @click="go(report.id)">
              <td class="px-4 py-2 text-xs text-secondary font-mono">{{ report.id }}</td>
              <td class="px-4 py-2 text-xs text-secondary">{{ report.timestamp }}</td>
              <td class="px-4 py-2 text-white font-semibold">{{ report.name }}</td>
              <td class="px-4 py-2 text-secondary">{{ report.email }}</td>
              <td class="px-4 py-2 text-secondary">{{ report.region }}</td>
              <td class="px-4 py-2 text-primary font-bold">{{ report.vuln_type }}</td>
              <td class="px-4 py-2 text-white">{{ report.title }}</td>
              <td class="px-4 py-2">
                <span :class="severityClass(report.severity)">{{ report.severity }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center text-secondary py-12 flex-1">No reports found.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user, clear: clearSession } = useUserSession()
const reports = ref([]);
const loading = ref(true);
const router = useRouter();
const h = ref(false)

definePageMeta({
  middleware: ['auth'],
})

async function logout() {
  await clearSession()
  await navigateTo('/')
}

onMounted(async () => {
  const res = await fetch("/api/backend/reports");
  if (res.ok) {
    reports.value = await res.json();
  }
  loading.value = false;
});

function severityClass(sev) {
  if (sev === "critical") return "text-red font-bold";
  if (sev === "high") return "text-orange font-bold";
  if (sev === "medium") return "text-yellow font-bold";
  if (sev === "low") return "text-green font-bold";
  return "text-white";
}

function go(id) {
  router.push(`/backend/report/${id}`)
}
</script>
