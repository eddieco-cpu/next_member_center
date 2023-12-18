export function emailValidator(email) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
    email
  );
}

export function mobileNumberValidator(number) {
  return /09\d{2}(\d{6}|-\d{3}-\d{3})$/.test(number);
}

export function naturalValidator(string) {
  return /^[a-zA-Z]{2}[0-9]{14}$/.test(string);
}

export function barcodeValidator(string) {
  return /^\/{1}[0-9A-Z.+-]{7}$/.test(string);
}

export function ubnValidator(string) {
  return /^[0-9]{8}$/.test(string);
}
