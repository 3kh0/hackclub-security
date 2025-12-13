// stole this from somewhre, dont even know her anymore

export const a = [
  {
    key: 'attackVector',
    label: 'Attack Vector (AV)',
    options: [
      { value: 'N', label: 'Network' },
      { value: 'A', label: 'Adjacent' },
      { value: 'L', label: 'Local' },
      { value: 'P', label: 'Physical' }
    ]
  },
  {
    key: 'attackComplexity',
    label: 'Attack Complexity (AC)',
    options: [
      { value: 'L', label: 'Low' },
      { value: 'H', label: 'High' }
    ]
  },
  {
    key: 'privilegesRequired',
    label: 'Privileges Required (PR)',
    options: [
      { value: 'N', label: 'None' },
      { value: 'L', label: 'Low' },
      { value: 'H', label: 'High' }
    ]
  },
  {
    key: 'userInteraction',
    label: 'User Interaction (UI)',
    options: [
      { value: 'N', label: 'None' },
      { value: 'R', label: 'Required' }
    ]
  },
  {
    key: 'scope',
    label: 'Scope (S)',
    options: [
      { value: 'U', label: 'Unchanged' },
      { value: 'C', label: 'Changed' }
    ]
  },
  {
    key: 'confidentiality',
    label: 'Confidentiality (C)',
    options: [
      { value: 'N', label: 'None' },
      { value: 'L', label: 'Low' },
      { value: 'H', label: 'High' }
    ]
  },
  {
    key: 'integrity',
    label: 'Integrity (I)',
    options: [
      { value: 'N', label: 'None' },
      { value: 'L', label: 'Low' },
      { value: 'H', label: 'High' }
    ]
  },
  {
    key: 'availability',
    label: 'Availability (A)',
    options: [
      { value: 'N', label: 'None' },
      { value: 'L', label: 'Low' },
      { value: 'H', label: 'High' }
    ]
  }
]

export function calc(metrics) {
  const requiredFields = ['attackVector', 'attackComplexity', 'privilegesRequired', 'userInteraction', 'scope', 'confidentiality', 'integrity', 'availability']
  if (!requiredFields.every(field => metrics[field])) {
    return 0.0
  }

  const av = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }[metrics.attackVector]
  const ac = { L: 0.77, H: 0.44 }[metrics.attackComplexity]
  
  const pr = metrics.scope === 'C' 
    ? { N: 0.85, L: 0.68, H: 0.5 }[metrics.privilegesRequired]
    : { N: 0.85, L: 0.62, H: 0.27 }[metrics.privilegesRequired]
  
  const ui = { N: 0.85, R: 0.62 }[metrics.userInteraction]
  const c = { N: 0, L: 0.22, H: 0.56 }[metrics.confidentiality]
  const i = { N: 0, L: 0.22, H: 0.56 }[metrics.integrity]
  const a = { N: 0, L: 0.22, H: 0.56 }[metrics.availability]

  const exploitability = 8.22 * av * ac * pr * ui
  const impact = metrics.scope === 'C' 
    ? 7.52 * (c + i + a - 0.029) - 3.25 * Math.pow(c + i + a - 0.02, 15)
    : 6.42 * (c + i + a)

  let baseScore
  if (impact <= 0) {
    baseScore = 0
  } else if (metrics.scope === 'C') {
    baseScore = Math.min(1.08 * (impact + exploitability), 10)
  } else {
    baseScore = Math.min(impact + exploitability, 10)
  }

  return Math.round(baseScore * 10) / 10
}

export function l(score) {
  if (score >= 9.0) return 'Critical'
  if (score >= 7.0) return 'High'
  if (score >= 4.0) return 'Medium'
  if (score >= 0.1) return 'Low'
  return 'None'
}

export function c(score) {
  if (score >= 9.0) return 'text-red'
  if (score >= 7.0) return 'text-orange'
  if (score >= 4.0) return 'text-yellow'
  if (score >= 0.1) return 'text-green'
  return 'text-secondary'
}
