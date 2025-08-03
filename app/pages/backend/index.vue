<template>
  <div class="min-h-screen bg-darker p-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-8 text-center">Security Reports Dashboard</h1>
      <div class="bg-dark rounded-2xl shadow-lg p-6">
        <div v-if="loading" class="flex justify-center items-center py-12">
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
            <tr v-for="report in reports" :key="report.id" class="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer" @click="goToReport(report.id)">
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
        <div v-else class="text-center text-secondary py-12">No reports found.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const reports = ref([]);
const loading = ref(true);
const router = useRouter();

onMounted(async () => {
  const res = await fetch("/api/reports");
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

function goToReport(id) {
  router.push(`/backend/report/${id}`)
}
</script>
