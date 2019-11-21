const chai = require('chai');
const { User } = require('./../models/user');
const { app } = require('./../server');
const { users, populateUsers } = require('./seed/seed');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);



it("should return hello world response", (done) => {
  chai.request(app)
    .get('/')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.keys('error', 'name');
      expect(res).to.have.header('content-type', "application/json; charset=utf-8");
      return done();
    })
    .catch(err => done(err));
});



describe("Users: ", () => {
  // Clean database of garbage data.
  after(() => {
    User.deleteMany({})
      .exec((err, users) => {
        users.remove();
      });
  });

  beforeEach(populateUsers) // populate seed data for users

  describe("Authentication: ", () => {

    it("should create new user", (done) => {
      const demoUser = { email: "azua@makeschool.com", password: "zxcqwe123" };
      chai.request(app)
        .post('/users')
        .send(demoUser)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.header('x-auth');
          expect(res.headers['x-auth']).to.exist;
          expect(res.body).to.have.keys('_id', 'email');
          User.findOne({ email: demoUser.email }).then((user) => {
            // Test to make sure the password is being hashed.
            expect(demoUser.password).to.not.equal(user.password);
          });
          return done();
        })
        .catch(err => done(err));
    });

    it('should return validation errors if request invalid', (done) => {
      chai.request(app)
        .post('/users')
        .send({
          email: 'makeschool',
          password: '123'
        })
        .then((res) => {
          expect(res).to.have.status(400);
          return done();
        })
        .catch(err => done(err));
    });

    it('should not create user if email in use', (done) => {
      chai.request(app)
        .post('/users')
        .send({
          email: users[0].email,
          password: users[0].password
        })
        .then((res) => {
          expect(res).to.have.status(400);
          return done();
        })
        .catch(err => done(err));
    });

    it('should login user and return a auth token', (done) => {
      chai.request(app)
        .post('/users/login')
        .send({
          email: users[1].email,
          password: users[1].password
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.headers['x-auth']).to.exist;
          User.findById(users[1]._id).then((user) => {
            expect(user.tokens[0]).to.include({
              access: 'auth',
              token: res.header['x-auth']
            });
          }).catch(err => done(err));
          return done();
        })
        .catch(err => done(err));
    });

    it('should reject invalid login', (done) => {
      chai.request(app)
        .post('/users/login')
        .send({
          email: users[1].email,
          password: '123'
        })
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.headers['x-auth']).to.not.exist;
          User.findById(users[1]._id).then((user) => {
            expect(user.tokens.length).to.equal(0);
          }).catch(err => done(err));
          return done();
        })
        .catch(err => done(err));
    });

    it('should logout', (done) => {
      chai.request(app)
        .delete('/users/logout')
        .set('x-auth', users[0].tokens[0].token)
        .then((res) => {
          expect(res).to.have.status(200);
          User.findById(users[0]._id).then((user) => {
            expect(user.tokens.length).to.equal(0);
          });
          return done();
        })
        .catch(err => done(err));
    });
  }); // end of... Authentication: Describe

  describe("Authorization: ", () => {

    it("should return 200 if user is authenticated", (done) => {
      chai.request(app)
        .get('/bananas')
        .set('x-auth', users[0].tokens[0].token)
        .then((res) => {
          expect(res).to.have.status(200); // start with the simpliest test.
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('_id', 'email');
          expect(res.body.email).to.equal(users[0].email);
          expect(res.body._id).to.equal(users[0]._id.toHexString())
          return done();
        })
        .catch(err => done(err));
    });

    it("should return 401 if user not authenticated", (done) => {
      chai.request(app)
        .get('/bananas')
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.not.have.any.keys('_id', 'email');
          return done();
        })
        .catch(err => done(err))
    });
  }); // end of... Authorization: Describe

}); // end of... Users: Describe