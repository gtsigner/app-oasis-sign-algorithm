import users from './users'
import posts from './posts'

export default function LoadModels(db: any): any {
    return {
        users: users,
        posts: posts
    }
}