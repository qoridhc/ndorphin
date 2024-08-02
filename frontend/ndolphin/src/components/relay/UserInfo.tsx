import BookPageDropDown from "./BookPageCRUD/BookPageDropDown";

interface UserInfoProps {
  user: string;
  userId: number;
  badget: string;
  setPageUpdate: (type: boolean) => void;
  handleDelete: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userId, user, badget, setPageUpdate, handleDelete }) => {
  return (
    <>
      <div className="px-14 py-2" key={userId}>
        <div className="flex justify-between items-center">
          {<img className="w-7" src={`/assets/${badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
          <img className="w-9 h-9 mx-3 rounded-[50%]" src={`/assets/profile/profile${userId}.png`} alt="" />
          <span className="w-full flex justify-start text-sm font-semibold">{user}</span>
          <BookPageDropDown setPageUpdate={setPageUpdate} handleDelete={handleDelete} />
        </div>
      </div>
      <hr className="bg-[#9E9E9E]" />
    </>
  );
};

export default UserInfo;
