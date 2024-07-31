import BookPageDropDown from "./BookPageCRUD/BookPageDropDown";

interface UserInfoProps {
  user: string;
  userId: number;
  setPageUpdate: (type: boolean) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userId, user, setPageUpdate }) => {
  return (
    <>
      <div className="px-14 py-2" key={userId}>
        <div className="flex justify-between items-center">
          <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/profile${userId}.png`} alt="" />
          <span className="w-full flex justify-start text-sm font-semibold">{user}</span>
          <BookPageDropDown setPageUpdate={setPageUpdate} />
        </div>
      </div>
      <hr className="bg-[#9E9E9E]" />
    </>
  );
};

export default UserInfo;
