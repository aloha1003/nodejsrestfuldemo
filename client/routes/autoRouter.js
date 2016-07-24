var baseDir = './';
module.exports = function(cb){
                return function(req, res){
                        if (cb(req, res) === false) return;
                        try{
                                require(baseDir+req.path[0])[req.path[1]](req, res);
                        }
                        catch(err){
                                res.r404();
                        }       
                }
};

