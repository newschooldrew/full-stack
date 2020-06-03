const keys = require('../../config/keys')

module.exports = (survey) => {
    return `<html>
                <body>
                    <div style="text-align:center">
                        <h3> Id like your input </h3>
                        <p> please answer the question: </p>
                            <p>${survey.body}</p>
                            <div><a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a></div> 
                            <div><a href="${keys.redirectDomain}/api/surveys/thanks">No</a></div> 
                    </div>
                </body>
            </html>`
}