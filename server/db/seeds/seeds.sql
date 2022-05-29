-- sample users
INSERT INTO users (username, email, password) VALUES ('mudhippo', 'hippo@cat.com', 'password');
INSERT INTO users (username, email, password) VALUES ('pinkthing', 'flamingo@cat.com', 'password');
INSERT INTO users (username, email, password) VALUES ('fastbirb', 'ostrich@cat.com', 'password');
INSERT INTO users (username, email, password) VALUES ('gator', 'allidile@cat.com', 'password');
INSERT INTO users (username, email, password) VALUES ('dile', 'crocogator@cat.com', 'password');


-- sample scores for classic game
INSERT INTO classic_scores (score, user_id) VALUES (2, 1);
INSERT INTO classic_scores (score, user_id) VALUES (8, 1);
INSERT INTO classic_scores (score, user_id) VALUES (4, 1);
INSERT INTO classic_scores (score, user_id) VALUES (22, 2);
INSERT INTO classic_scores (score, user_id) VALUES (33, 3);
INSERT INTO classic_scores (score, user_id) VALUES (44, 4);
INSERT INTO classic_scores (score, user_id) VALUES (100, 4);
INSERT INTO classic_scores (score, user_id) VALUES (22, 5);
INSERT INTO classic_scores (score, user_id) VALUES (91, 5);

-- sample scores for number game
INSERT INTO number_scores (score, user_id) VALUES (8, 1);
INSERT INTO number_scores (score, user_id) VALUES (7, 1);
INSERT INTO number_scores (score, user_id) VALUES (3, 1);
INSERT INTO number_scores (score, user_id) VALUES (31, 2);
INSERT INTO number_scores (score, user_id) VALUES (70, 2);
INSERT INTO number_scores (score, user_id) VALUES (44, 4);
INSERT INTO number_scores (score, user_id) VALUES (74, 4);
INSERT INTO number_scores (score, user_id) VALUES (70, 5);
INSERT INTO number_scores (score, user_id) VALUES (53, 5);