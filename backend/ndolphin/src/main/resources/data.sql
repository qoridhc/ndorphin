-- PointRule 데이터 삽입
INSERT INTO point_rule (point_rule_id, reason, point, created_at)
SELECT 1, 'POST', 10, CURRENT_TIMESTAMP
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM point_rule WHERE point_rule_id = 1);

INSERT INTO point_rule (point_rule_id, reason, point, created_at)
SELECT 2, 'REACTION', 5, CURRENT_TIMESTAMP
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM point_rule WHERE point_rule_id = 2);

INSERT INTO point_rule (point_rule_id, reason, point, created_at)
SELECT 3, 'LIKE', 2, CURRENT_TIMESTAMP
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM point_rule WHERE point_rule_id = 3);

-- user 삽입
INSERT IGNORE INTO `user` (`user_id`, `email`, `nick_name`, `mbti`, `n_point`, `type`, `role`,
                    `created_at`, `updated_at`, `nick_name_updated_at`)
VALUES (1, 'dummy@example.com', 'dummy_nick', 'INTJ', 100, 1, 'USER', CURRENT_TIMESTAMP, NULL,
        NULL);

-- board 삽입
INSERT IGNORE INTO `board` (`user_id`, `subject`, `content`, `summary`, `hit`, `board_type`, `created_at`,
                     `updated_at`)
VALUES (1, 'Sample Subject', 'This is a sample content.', 'Sample summary', 0, 'RELAY_BOARD',
        CURRENT_TIMESTAMP, NULL);

-- vote_content 삽입
INSERT IGNORE INTO `vote_content` (`vote_content_id`, `board_id`, `content`, `created_at`, `updated_at`)
VALUES (1, 1, 'What is your favorite programming language?', '2024-07-25 12:34:56', NULL);

INSERT IGNORE INTO `vote_content` (`vote_content_id`, `board_id`, `content`, `created_at`, `updated_at`)
VALUES (2, 1, 'What is your name?', '2024-07-25 12:34:56', NULL);

INSERT IGNORE INTO `vote_content` (`vote_content_id`, `board_id`, `content`, `created_at`, `updated_at`)
VALUES (3, 1, 'What is your ETA?', '2024-07-25 12:34:56', NULL);

INSERT IGNORE INTO `vote_content` (`vote_content_id`, `board_id`, `content`, `created_at`, `updated_at`)
VALUES (4, 1, 'What is your MBTI?', '2024-07-25 12:34:56', NULL);
