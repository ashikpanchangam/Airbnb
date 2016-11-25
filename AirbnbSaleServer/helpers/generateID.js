/**
 * Created by rishi on 11/22/16.
 */

function getId() {
    function s4(){
        var value = Math.floor((Math.random() * 9) + 1);
        return value.toString();
    }
    return s4() + s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() + s4() + s4();
}

exports.getId = getId;