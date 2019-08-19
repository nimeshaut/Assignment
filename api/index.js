import express from 'express';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);
  mdb = db.db('test');
  //db.close();
});

const router = express.Router();
// const contests = data.contests.reduce((obj, contest) => {
//   obj[contest.id] = contest;
//   return obj;
// }, {});

router.get('/contests', (req, res) => {
  let contests ={};
  debugger;
  console.log('in get method');

  mdb.collection('contests').find({})
  .project({
    id:1, 
    categoryName:1,
    contestName:1
  })
  .each((err, contest) => {
  assert.equal(null, err);
  if(!contest){
    res.send({contests});
    return;
   }
   contests[contest.id] = contest;
  });
  
});

router.get('/contests/:contestId', (req, res) => {
  mdb.collection('contests')
  .findOne({id: Number(req.params.contestId)})
  .then(contest => res.send(contest))
  .catch(console.err);
  // let contest = contests[req.params.contestId];
  // contest.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  // res.send(contest);
});

export default router;