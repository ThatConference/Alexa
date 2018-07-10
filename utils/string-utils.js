module.exports = {
    autocase: (text) => {
        return text.replace(/(&)?([a-z])([a-z]{2,})(;)?/ig, function (all, prefix, letter, word, suffix) {
            if (prefix && suffix) {
                return all;
            }

            return letter.toUpperCase() + word.toLowerCase();
        });
    }
};