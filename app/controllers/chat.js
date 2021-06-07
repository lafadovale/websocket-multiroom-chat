module.exports.startChat = function(application, req, res){

    let formData = req.body;

    req.assert('alias', 'Name or alias is required.').notEmpty();
    req.assert('alias', 'Name or alias must have between 3 and 15 characters.').len(3, 15);

    let errors = req.validationErrors();

    if(errors){
        res.render("index", {validation: errors});
        return;
    };

    application.get('io').emit(
        'msgToClient',
        {alias: formData.alias, msg: ' just joined the chat.'}
    );
    
    res.render("chat", {formData: formData});
};