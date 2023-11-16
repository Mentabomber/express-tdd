const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const bearerToken = req.header("Authorization");
    console.log(bearerToken);
    if (!bearerToken){
        return res.status(401).send("Token mancante");
    }
    const token = bearerToken.split(" ")[1];
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    req["user"] = jwtPayload;

    next();
}