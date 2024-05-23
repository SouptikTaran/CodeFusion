
const { python } = require('compile-run');
function parseErrorMessage(errorMessage) {
    // Search for the position of the first occurrence of 'SyntaxError:'
    const startIndex = errorMessage.indexOf('SyntaxError:');
    if (startIndex !== -1) {
        // Extract the substring starting from 'SyntaxError:' to the end of the error message
        return errorMessage.substring(startIndex);
    } else {
        // Return the original error message if 'SyntaxError:' is not found
        return errorMessage;
    }
}




module.exports.compilerGet = (req, res) => {
    res.status(200).render("code-compiler")
}

module.exports.compilerCode = async (req, res) => {
    const sourcecode = req.body.code;
    let resultPromise = python.runSource(sourcecode);
    resultPromise
        .then(result => {
            if (result.stderr !== '') {
                const errorMessage = parseErrorMessage(result.stderr);
                res.send(errorMessage);
            } else {
                res.send(result.stdout);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).render('internalError');
        }); 
}

