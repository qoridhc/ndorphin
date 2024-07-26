-- PointRule 데이터 삽입
INSERT INTO point_rule (point_rule_id, reason, point, created_at)
VALUES (1, 'POST', 10, CURRENT_TIMESTAMP),
       (2, 'REACTION', 5, CURRENT_TIMESTAMP),
       (3, 'LIKE', 2, CURRENT_TIMESTAMP);