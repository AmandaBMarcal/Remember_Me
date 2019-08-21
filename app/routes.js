module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // INFO SECTION ====================
  app.get('/info', function (req, res) {
    res.render('info.ejs')
  });

  app.post('/info', (req, res) => {
    db.collection('player').save({
      name: req.body.name,
      bday: req.body.bday,
      contact: req.body.con,
      contactTelephone: req.body.tele,
      email: req.user.local.email,
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('profile');
    })
  });


  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('recipes').find().toArray((err, result) => {
      if (err) return console.log(err)
      db.collection('scores').find().toArray((er, info) => {
        console.log(info, "info");
        if (er) return console.log(er)
        result = result[Math.floor(Math.random() * result.length)]; //randomized data from db
        res.render('profile.ejs', {   //this is what is passing and rendering data to the DOM
          user: req.user.local.email,
          recipe: result,
          info: info,
          other: req
        })
      })
    })
  });

  // PLAYER SECTION ====================

  app.get('/player', function (req, res) {
    db.collection('player').find().toArray((err, info) => {
      if (err) return res.send(err)
      info.filter((data)=>{
        let test = [];
        if (data.email === req.user.local.email) {
          test.push(data)
        }
        info = test
        return info
      });

      res.send({ data: info })
    })
  });


  // SCORE SECTION ==============================
  app.post('/score', (req, res) => {
    console.log(req.body.score, "req.body.score");
    db.collection('scores').save({
      score: req.body.score,
      email: req.user.local.email
    }, (err, result) => {
      if (err) return console.log(err)
      res.redirect('profile');
    })
  });


  app.get('/score', function (req, res) {
    console.log(req.user, "req.user");
    db.collection('scores').find({email: req.user.local.email}).toArray((err, info) => {
      if (err) return res.send(err)
      res.send({ data: info, info: info })
    })
  });


  app.put('/score', (req, res) => {
    db.collection('player')
    .findOneAndUpdate({
      email: req.user.local.email
    }, {
      $set: {
        score: req.body.score
      }
    }, {
      sort: {
        _id: -1
      },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })


// Delete-ish
  app.delete('/score', (req, res) => {
    db.collection('scores').findOneAndDelete({email: req.user.local.email, score: req.body.score}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Score Deleted!')
    })
  })




  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================

  // app.delete('/messages', (req, res) => {
  //   db.collection('memory_game').findOneAndDelete({
  //     name: req.body.name,
  //     msg: req.body.msg
  //   }, (err, result) => {
  //     if (err) return res.send(500, err)
  //     res.send('Message deleted!')
  //   })
  // })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/info', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    return next();

    res.redirect('/');
  }
}
