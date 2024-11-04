const subAddress = (address) => {
  const subStr = address.substring(0, 5);
  const lastSubStr = address.substr(address.length - 4, 4);
  return subStr + "..." + lastSubStr;
};

export default subAddress;
