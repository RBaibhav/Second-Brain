export function random (len: number) {
  let options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let lenght = options.length;

  let result = "";
  for (let i = 0; i < len; i++) {
    result += options.charAt(Math.floor(Math.random() * lenght));
  }
  return result;

}