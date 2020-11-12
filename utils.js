const os = require('os');
const net = require('net');

const networkInterfaces = os.networkInterfaces( );
const isIp = [];
function getAllIps(type='v4') {
  type = type === 'v6' ? 'isIPv6' : 'isIPv4';
  function findIp(data = networkInterfaces, type='isIPv4') {
   if (typeof data === 'string') {
    if(net[type](data)) {
      isIp.push(data)
    }
    return  isIp
  } else if (Array.isArray(data)) {
    data.forEach(function(subData) {
      if (typeof subData === 'string'){
        if(net[type](subData)) {
          isIp.push(subData)
        }
      } else {
          findIp(subData, type);
      }
    });
  } else if (typeof data === 'object') {
    return findIp(Object.values(data), type)
  }
}
findIp();
 return [...isIp]
}

module.exports = { default: getAllIps, v4: getAllIps(), v6: getAllIps('v6') }