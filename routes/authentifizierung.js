const express = require('express'),
  router = express.Router(),
  verbindung = require('./../db/db'),
  passworthash = require('password-hash'),
  benutzerModel = require('../models/benutzer'),
  authguard = require('../guards/auth'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config'),
  tabelle = 'benutzer';

router.post('/registrieren', (req, res) => {

  let vorname = req.body['vorname'] || null,
    nachname = req.body['nachname'] || null,
    passwort = passworthash.generate(req.body['passwort']),
    benutzername = req.body['benutzername'],
    sql = `SELECT COUNT(benutzername) FROM benutzer WHERE benutzername = '${benutzername}'`;

  verbindung.query(sql, (err, result) => {
    if (err) {
      res.status(502).json({
        message: 'Datenbankfehler'
      });
    }
    if (result[0]["COUNT(benutzername)"] == 1) {
      res.status(409).json({
        message: 'Benutzer ist schon angemeldet'
      });
    } else {
      let sql2 = `INSERT INTO ${tabelle}(vorname, nachname, benutzername, passwort) VALUES('${vorname}', '${nachname}', '${benutzername}', '${passwort}')`;
      verbindung.query(sql2, (err, result) => {
        if (err) {
          res.status(502).json({
            message: 'Datenbankfehler'
          })
        }else{
          res.status(200).json({
            message: 'Erfolgreich registriert'
          });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {

  let benutzername = req.body['benutzername'],
    passwort = req.body['passwort'],
    sql = `SELECT * FROM ${tabelle} WHERE benutzername = '${benutzername}'`;

  verbindung.query(sql, (err, result) => {
    if (result.length !== 0) {
      let benutzerdaten = result[0];
      if (passworthash.verify(passwort, benutzerdaten['passwort'])) {

        let token = jwt.sign({id: benutzerdaten['id']}, config.sekret, {
          expiresIn: 86400
        });

        res.status(200).send({
          auth: true,
          token: token
        });
        
      } else {
        res.status(200).json({
          auth: false,
          message: 'Falscher benutzername oder passwort'
        });
      }
    } else {
      res.status(200).json({
        auth: false,
        message: 'Falscher benutzername oder passwort'
      });
    }
  });

});

router.post('/test', authguard.isAuth, (req, res) => {

  res.json({
    'success': req.benutzerdaten
  })

});

module.exports = router;