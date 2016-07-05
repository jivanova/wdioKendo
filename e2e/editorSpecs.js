
var execSync = require('child_process').execSync;
module.exports = function(client){    

    client.addCommand('paste', function (text) {
        execSync('printf ' + escape([text]) + ' | pbcopy');
        return this.press(['Ctrl', 'V']);
    });

    client.addCommand('move', function (count) {
            var direction = count > 0 ? 'RightArrow' : 'LeftArrow';
            var keys = repeat(direction, Math.abs(count || 1));
            return this.keys(keys);
        });

    client.addCommand('select', function (count) {
        var direction = count > 0 ? 'RightArrow' : 'LeftArrow';
        var keys = repeat(direction, Math.abs(count || 1));
        keys.unshift('Shift');
        keys.push('Shift');
        return this.keys(keys);
    });

    client.addCommand('delete', function(count){
        return this.keys(repeat('Delete', count));
    });
    return client;
};