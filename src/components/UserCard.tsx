import { FeedUser } from "../types/feed";

interface Props {
  user: FeedUser;
}

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={user.photoUrl}
          alt={user.username}
          className="rounded-full w-24 h-24 object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>

        {user.about && <p className="mt-2 text-sm text-gray-600">{user.about}</p>}

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {user.skills.length > 0 ? (
            user.skills.map((skill) => (
              <span key={skill} className="badge badge-primary">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-400">No skills listed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
