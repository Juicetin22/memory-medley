const router = require('express').Router();

module.exports = (db) => {
    // get all scores
    router.get("/", (req, res) => {
      const command = `
        SELECT * 
        FROM number_scores`;
      db.query(command).then(data => {
        res.json(data.rows);
      })
    });

    // get high score out of all scores
    router.get("/all_time", (req, res) => {
      const command = `
        SELECT * 
        FROM number_scores
        ORDER BY score DESC
        LIMIT 1`;
      db.query(command).then(data => {
        res.json(data.rows[0]);
      })
    });
  
    // get all scores for a specific user
    router.get("/:id", (req, res) => {
      const command = `
        SELECT * 
        FROM number_scores 
        WHERE user_id = $1`;
      const params = [req.params.id];
      db.query(command, params).then(data => {
        res.json(data.rows);
      })
    });
  
    // get high score for a specific user
    router.get("/:id/high", (req, res) => {
      const command = `
        SELECT * 
        FROM number_scores 
        WHERE user_id = $1 
        ORDER BY score DESC 
        LIMIT 1`;
      const params = [req.params.id];
      db.query(command, params).then(data => {
        res.json(data.rows[0]);
      })
    });
  
    // get most recent score for a specific user
    router.get("/:id/prev", (req, res) => {
      const command = `
        SELECT * 
        FROM number_scores 
        WHERE user_id = $1 
        ORDER BY id DESC 
        LIMIT 1`;
      const params = [req.params.id];
      db.query(command, params).then(data => {
        res.json(data.rows[0]);
      })
    }); 
  
    // add score to database
    router.post("/", (req, res) => {
      const command = `
        INSERT INTO number_scores (score, user_id) 
        VALUES ($1, $2) 
        RETURNING *;`;
      const params = [req.body.score, req.body.user_id];
      db.query(command, params)
        .then((data) => {
          console.log(data.rows[0]);
          res.json(data.rows[0]);
        })
    });

  return router;
}