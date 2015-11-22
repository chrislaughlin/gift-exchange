module.exports = {
    santa( arr ) {
        // Create a copy of the passed array
        var ret = {}, copy = Array.prototype.slice.call( arr );

        // Setting the receiver to the last index item to resolve an undesired permutation
        for ( var i = 0, receiver = copy[ copy.length-1 ]; i < arr.length; i++ ) {
            while ( receiver === arr[i] || !receiver )
                // Grab a random member from the array
                // Double bitwise (~~) achieves the same effect as Math.floor
                receiver = copy[ ~~(Math.random() * copy.length) ];

            copy.splice( copy.indexOf(receiver), 1 );
            ret[ arr[i] ] = receiver;
            receiver = null;
        }

        return ret;
    }
};
