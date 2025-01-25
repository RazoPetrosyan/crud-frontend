const passwordRequirements = [
  { id: 'length', test: (value) => value.length >= 8, label: 'Minimum 8 characters' },
  { id: 'uppercase', test: (value) => /[A-Z]/.test(value), label: 'At least one uppercase letter' },
  { id: 'lowercase', test: (value) => /[a-z]/.test(value), label: 'At least one lowercase letter' },
  { id: 'number', test: (value) => /\d/.test(value), label: 'At least one number' },
  { id: 'special', test: (value) => /[!@#$%^&*()_+\-=[\]{};:"|,.<>/?]/.test(value), label: 'At least one special character' },
];

export default passwordRequirements;
