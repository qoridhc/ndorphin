import DropDown from "./DropDown";

interface UserInfoProps {
  user: string;
  userId: number;
}

const UserInfo: React.FC<UserInfoProps> = ({userId, user}) => {
  return (
    <>
      <div className="px-14 py-2" key={userId}>
        <div className="flex justify-between items-center">
          <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/profile${userId}.png`} alt="" />
          <span className="w-full flex justify-start text-sm font-semibold">{user}</span>
          <DropDown />
        </div>
      </div>
      <hr className="bg-[#9E9E9E]" />
    </>
  );
}

export default UserInfo;
