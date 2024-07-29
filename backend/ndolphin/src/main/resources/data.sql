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
