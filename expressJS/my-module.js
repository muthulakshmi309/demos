exports.dateTime = function () {
    return new Date();
}

exports.a = function () {
    console.log('temp func ' + module.exports.b);
};

exports.b = 20;

// or
// module.exports = {
//     a: function() {
//         console.log('temp func ' + module.exports.b);
//     },
//     b: 20,
//     dateTime: function() {
//         return new Date();
//     }
// };