const Word = require("./word.model");
const _ = require("lodash")

function handleError(res, err) {
    return res.send(500, err);
}


exports.index = function(req, res) {
    Word.find(function(err, words) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, words);
    });
};

exports.show = function(req, res) {
    Word.findOne({'word': req.params.word}, function (err, word) {
        if (err) {
            return handleError(res, err);
        }
        if (!word) {
            return res.send(404);
        }
        return res.json(word);
    });
};

exports.create = function(req, res) {
    Word.create(req.body, function (err, word) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, word);
    });
};

exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    Word.findById(req.params.id, function(err, word) {
        if (err) {
            return handleError(res, err);
        }

        if (!word) {
            return res.send(404);
        }

        const updated = _.merge(word, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(200, word);
        });
    });
};

exports.delete = function(req, res) {
    Word.findById(req.params.id, function (err, word) {
        if (err) {
            return handleError(res, err);
        }
        if (!word) {
            return res.send(404);
        }
        word.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};