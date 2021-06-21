function getTime (count, type) { if (type === 'm') { return count * 60000 }; if (type === 'h') { return count * 60000 * 60 } };




module.exports = {
  getTime
} 
