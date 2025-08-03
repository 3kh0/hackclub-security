<template>
  <div class="min-h-screen bg-darker p-6">
    <div class="max-w-3xl mx-auto bg-dark rounded-2xl p-8 shadow-lg">
      <template v-if="error">
        <h1 class="text-3xl font-bold text-red mb-6">Report Not Found</h1>
        <p class="text-secondary">The report you are looking for does not exist or an error occurred.</p>
      </template>
      <template v-else>
        <h1 class="text-3xl font-bold text-white mb-6">Viewing Report {{ report?.id }}</h1>
        <div v-if="report">
          <div class="mb-4">
            <span class="text-secondary">Status:</span>
            <select v-model="status" class="ml-2 p-2 rounded bg-darker border border-darkless text-white">
              <option value="open">Open</option>
              <option value="in_review">In Review</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <button @click="updateStatus" class="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80">Update</button>
          </div>
          <div class="mb-4">
            <span class="text-secondary">Title:</span>
            <span class="text-white ml-2">{{ report.title }}</span>
          </div>
          <div class="mb-4">
            <span class="text-secondary">Reporter:</span>
            <span class="text-white ml-2">{{ report.name }} ({{ report.email }})</span>
          </div>
          <div class="mb-4">
            <span class="text-secondary">Region:</span>
            <span class="text-white ml-2">{{ report.region }}</span>
          </div>
          <div class="mb-4">
            <span class="text-secondary">Affected Programs:</span>
            <span class="text-white ml-2">{{ report.affected_programs?.join(', ') }}</span>
          </div>
          <div class="mb-4">
            <span class="text-secondary">Severity:</span>
            <span class="text-white ml-2">{{ report.severity }}</span>
          </div>
          <div class="mb-4">
            <span class="text-secondary">CVSS Score:</span>
            <span class="text-white ml-2">{{ report.cvss_score }}</span>
          </div>
          <div class="mb-4">
            <span class="text-secondary">Description:</span>
            <pre class="bg-darker p-4 rounded text-white whitespace-pre-wrap">{{ report.description }}</pre>
          </div>
        </div>
        <div v-else class="text-secondary">Loading...</div>
      </template>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const report = ref(null)
const status = ref('open')
const error = ref(false)

async function fetchReport() {
  const res = await fetch(`/api/report/${route.params.id}`)
  if (res.ok) {
    const data = await res.json()
    if (data.error) {
      error.value = true
      report.value = null
    } else {
      report.value = data
      status.value = data.status
      error.value = false
    }
  } else {
    error.value = true
    report.value = null
  }
}

async function updateStatus() {
  await fetch(`/api/report/${route.params.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: status.value })
  })
  await fetchReport()
}

onMounted(fetchReport)
</script>
