const phoneFormat = (val, phone) => {
  const ascii = val.charCodeAt(val.length - 1);
  let c = "";
  if (val.length > phone.length) {
    if (ascii < 48 || ascii > 57 || val.length === 15) {
      return phone;
    }
    switch (phone.length) {
      case 0:
        c += "(" + val;
        break;
      case 4:
        c += val.slice(0, val.length - 1) + ") " + val.slice(val.length - 1);
        break;
      case 9:
        c += val.slice(0, val.length - 1) + "-" + val.slice(val.length - 1);
        break;
      default:
        c += val;
    }
    return c;
  } else {
    switch (phone.length) {
      case 11:
        c += val;
        c = c.replace("-", "");
        break;
      case 7:
        c += val;
        c = c.trim().replace(")", "");
        break;
      case 2:
        c = "";
        break;
      default:
        c += val;
    }
    return c;
  }
};

export default phoneFormat;
