module.exports = {
    //Hàm chuyển các đối tượng từ db => objects vì không thể truy cập this.imange(chính sách bảo mật của handlebars)
    toMultiObject: function (multi) {
        return multi.map((m) => m.toObject());
    },

    toSingleObject: function (single) {
        return single ? single.toObject() : single;
    },
};
