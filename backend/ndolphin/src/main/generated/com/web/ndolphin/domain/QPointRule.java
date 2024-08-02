package com.web.ndolphin.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPointRule is a Querydsl query type for PointRule
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPointRule extends EntityPathBase<PointRule> {

    private static final long serialVersionUID = -898568551L;

    public static final QPointRule pointRule = new QPointRule("pointRule");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<NPoint, QNPoint> nPoints = this.<NPoint, QNPoint>createList("nPoints", NPoint.class, QNPoint.class, PathInits.DIRECT2);

    public final NumberPath<Integer> Point = createNumber("Point", Integer.class);

    public final EnumPath<Reason> reason = createEnum("reason", Reason.class);

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QPointRule(String variable) {
        super(PointRule.class, forVariable(variable));
    }

    public QPointRule(Path<? extends PointRule> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPointRule(PathMetadata metadata) {
        super(PointRule.class, metadata);
    }

}

