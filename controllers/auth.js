const createJWT = require("../utilities/createJWT");

function login (req, res){
    const userInfo = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(userInfo);
    if (!userInfo.username || !userInfo.password) {
        res.status(400).send("devono essere inseriti sia password che username");
        return;
    }
    const usersDataList = require("../db/users.json");
    const user = usersDataList.find((user) => user.username === userInfo.username && user.password === userInfo.password)
    if(!user){
        res.status(401).send("username e/o password errati");
        return;
    }
    const token = createJWT(user);

    res.json({
        token
    });


}


module.exports = {
    login,
}
