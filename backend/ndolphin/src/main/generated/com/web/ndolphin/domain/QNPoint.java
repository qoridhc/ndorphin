package com.web.ndolphin.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNPoint is a Querydsl query type for NPoint
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNPoint extends EntityPathBase<NPoint> {

    private static final long serialVersionUID = 787493621L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNPoint nPoint = new QNPoint("nPoint");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QPointRule pointRule;

    public final QUser user;

    public QNPoint(String variable) {
        this(NPoint.class, forVariable(variable), INITS);
    }

    public QNPoint(Path<? extends NPoint> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNPoint(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNPoint(PathMetadata metadata, PathInits inits) {
        this(NPoint.class, metadata, inits);
    }

    public QNPoint(Class<? extends NPoint> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pointRule = inits.isInitialized("pointRule") ? new QPointRule(forProperty("pointRule")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

