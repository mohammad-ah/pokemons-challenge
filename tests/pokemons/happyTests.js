//Require the dev-dependencies
var request = require("request");
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
let expect = chai.expect;
chai.use(chaiHttp);


// test main /pokemon get method
describe("Get /Pokemons", function() {
    var url = "http://localhost:3000/pokemons";

    it("returns status 200 with body of data array consists 50 element", function() {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).data.length).to.equal(50);
        });
    });
});

// test  /pokemons/name/:name get method
describe("Get /pokemons/name/Bulbasaur", function() {
    var url = "http://localhost:3000/pokemons/name/Bulbasaur";

    it("returns status 200 with body of data name equals to Bulbasaur", function() {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).data.name).to.equal('Bulbasaur');
        });
    });
});

// we can also test all other APIs this way

// test /pokemons?name&types get method
describe("Get /pokemons?name=nido&types=ground", function() {
    var url = "http://localhost:3000/pokemons?name=nido&types=ground";

    it("returns status 200 with body of data name contain to nido word and types to contain ground", function() {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).data[1].name.toLowerCase()).to.contains('nido');
            expect(JSON.parse(body).data[1].types).to.contains('Ground');
        });
    });
});


// test  /pokemons/2/favorite post method
describe("Post /pokemons/2/favorite with mark=true", () => {
    it('should respond with favorite=true', function(done) {

        var url = 'http://localhost:3000';
        let token = 'Bearer eyJhbGciOiJIUzI1NiJ9.UEFOREE.YM4Fa-oUUnQmNKWiPvJQ82B4RVHlijhW6c8NSQkMLzw';

        chai.request(url)
            .post('/pokemons/2/favorite')
            .send({'mark': true})
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.data.favorite).to.be.true;

                done(); // Don't forget the done callback to indicate we're done!
            })
    });
});


// we can cover all needed casses based on what we want
// we can create our own DB for testing purposses
// here are some scenarios that we can cover
// with happy flow and bad flow scenarios, and stress testing
//
// 1.	Init DB
// 2.	Init DB with force=true
// 3.	Init DB with force=false
// 4.	Get pokemon by ID
// 5.	Change pokemon favorite with mark=true
// 6.	Change pokemon favorite with mark=false
// 7.	Get pokemon by Name
// 8.	Get pokemon by types
// 9.	Check general query
//      a.	With name parameter
//      b.	With limit and skip
//      c.	With favorite filter
//      d.	With types filter
//      e.	With mix between them
// 10.	Login API
