type ForumType = {
    id: number;
    name: string;
    description: string;
}

type TopicType = {
    id: number;
    forum_id: number;
    name: string;
    description: string;
}

type MajorType = {
    id: number;
    name: string;
    description: string;
}

type UserType = {
    id: number;
    user_name: string;
    email: string;
    name: string;
    last_name: string;
    profile_photo: string;
    birth_date: string;
    gender: string;
    major_id: number;
}

type PostType = {
    id: number;
    title: string;
    content: string;
    status: string;
    imageUrl: string;
    creator_id: number;
    created_at: string;
    updated_at: string;
}

export type {
    ForumType,
    TopicType,
    MajorType,
    UserType,
    PostType
};
