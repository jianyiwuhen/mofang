const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  //格式化金额
  outputmoney: function (number) {
    number = number.toString().replace(/\,/g, "");
    if (isNaN(number) || number == "") return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
      return '-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(number) - 0);
    else
      return this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0);
  },
  //格式化金额
  outputdollars: function (number) {
    var fuhao = "";
    if (number < 0) {
      fuhao = '-';
      number = Math.abs(number);
    }
    number = number.toString();

    if (number.length <= 3)
      return (number == '' ? '0' : fuhao + number);
    else {
      var mod = number.length % 3;
      var output = (mod == 0 ? '' : (number.substring(0, mod)));
      for (i = 0; i < Math.floor(number.length / 3); i++) {
        if ((mod == 0) && (i == 0))
          output += number.substring(mod + 3 * i, mod + 3 * i + 3);
        else
          output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
      return (fuhao + output);
    }
  },
  outputcents: function (amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
  }, 
  isEmpty:function(str) {
    if (val == '' || val == undefined || val == null) return true;
    else return false;
  }
}
