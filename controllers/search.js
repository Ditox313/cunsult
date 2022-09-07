const Case = require('../models/Case');
const { search } = require('../routes/search');
const errorHandler = require('../Utils/errorHendler');






module.exports.searchWidget = async function(req, res) {
    try {

        searchData = req.body.searchData
        xsearch = await Case.find({ title: { $regex: new RegExp('^' + searchData +'.*', 'i')}}).exec();
        xsearch = xsearch.slice(0,10);

        res.status(200).json(xsearch);
    } catch (e) {
        errorHandler(res, e);
    }

};


