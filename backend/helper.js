const User = require('./models/User');

async function isLibrarian(id){
  const user = await User.findById(id);

    if(user.userType == 'Student'){
      return false;
    }
    return true;
}

module.exports = isLibrarian;