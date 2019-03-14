export const getParam = _param => {
  var pStr =
      window.location.hash.toString() || window.location.search.toString(),
    r = new RegExp('[?&]*' + _param + '=([^&]+)'),
    m = pStr.match(r);
  if (m) return m[1].replace('"', '');
  else return '';
};

export const getCookie = name => {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
};

export const delCookie = name => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const setCookie = (name, value, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};
