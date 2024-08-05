package com.web.ndolphin.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1983294018L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final ListPath<Board, QBoard> boards = this.<Board, QBoard>createList("boards", Board.class, QBoard.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public final ListPath<Favorite, QFavorite> favorites = this.<Favorite, QFavorite>createList("favorites", Favorite.class, QFavorite.class, PathInits.DIRECT2);

    public final ListPath<Follow, QFollow> followers = this.<Follow, QFollow>createList("followers", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final ListPath<Follow, QFollow> followings = this.<Follow, QFollow>createList("followings", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final ListPath<Likes, QLikes> likes = this.<Likes, QLikes>createList("likes", Likes.class, QLikes.class, PathInits.DIRECT2);

    public final StringPath mbti = createString("mbti");

    public final BooleanPath mbtiChanged = createBoolean("mbtiChanged");

    public final StringPath nickName = createString("nickName");

    public final DateTimePath<java.time.LocalDateTime> nickNameUpdatedAt = createDateTime("nickNameUpdatedAt", java.time.LocalDateTime.class);

    public final ListPath<Notification, QNotification> notifications = this.<Notification, QNotification>createList("notifications", Notification.class, QNotification.class, PathInits.DIRECT2);

    public final NumberPath<Long> nPoint = createNumber("nPoint", Long.class);

    public final ListPath<NPoint, QNPoint> nPoints = this.<NPoint, QNPoint>createList("nPoints", NPoint.class, QNPoint.class, PathInits.DIRECT2);

    public final StringPath profileImage = createString("profileImage");

    public final ListPath<Reaction, QReaction> reactions = this.<Reaction, QReaction>createList("reactions", Reaction.class, QReaction.class, PathInits.DIRECT2);

    public final EnumPath<RoleType> role = createEnum("role", RoleType.class);

    public final QToken token;

    public final EnumPath<LoginType> type = createEnum("type", LoginType.class);

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final ListPath<Vote, QVote> votes = this.<Vote, QVote>createList("votes", Vote.class, QVote.class, PathInits.DIRECT2);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.token = inits.isInitialized("token") ? new QToken(forProperty("token"), inits.get("token")) : null;
    }

}

