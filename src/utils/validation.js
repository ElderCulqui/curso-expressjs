function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  return typeof name === 'string' && name.length >= 3;
}

function isUniqueNumericId(id, users, existingUserId = null) {
  if (typeof id === 'number') {
    return false;
  }
  if (existingUserId !== null) {
    return true;
  }
  
  return !users.some(user => user.id === id);
}

function validateUser(user, users, existingUserId = null) {
  const { name, email, id } = user;
  if (!isValidName(name)) {
    return {
      isValid: false,
      error: 'El nombre debe tener al menos 3 caracteres.'
    };
  }
  if (!isValidEmail(email)) {
    return { isValid: false, error: 'El correo electrÃ³nico no es vÃ¡lido.' };
  }
  if (!isUniqueNumericId(id, users, existingUserId)) {
    return { isValid: false, error: 'El ID debe ser numérico y único.' };
  }
  return { isValid: true };
}

module.exports = {
  isValidEmail,
  isValidName,
  isUniqueNumericId,
  validateUser
};