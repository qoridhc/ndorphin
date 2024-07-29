interface UserInfoProps {
  user: string;
  userId: string;
}

const UserInfo: React.FC<UserInfoProps> = ({}) => {
  
  return (
    <>
      {/* <div className="px-14 py-2" key={userId}>
        <div className="flex items-center">
          <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/profile${userId}.png`} alt="" />
          <p className="font-semibold">{user}</p>
        </div>
      </div>
      <hr className="bg-[#9E9E9E]" /> */}
    </>
  );
}

export default UserInfo;
