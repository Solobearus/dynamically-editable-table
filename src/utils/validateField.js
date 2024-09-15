export const validateField = (field, value) => {
  if (!value.trim()) return 'empty';

  switch (field) {
    case 'name':
      return /^[a-zA-Z\s]*$/.test(value) ? null : 'invalid';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'invalid';
    case 'phone':
      return /^\+[0-9]*$/.test(value) ? null : 'invalid';
    case 'country':
      return null; // Assuming country is always valid when selected from options
    default:
      return null;
  }
};
