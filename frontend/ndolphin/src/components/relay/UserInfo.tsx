import BookPageDropDown from "./BookPageCRUD/BookPageDropDown";

interface UserInfoProps {
  firstPage: boolean;
  user: string;
  badget: string;
  setPageUpdate: (type: boolean) => void;
  handleDelete: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ firstPage, user, badget, setPageUpdate, handleDelete }) => {
  return (
    <>
      <div className="px-14 py-2" key={user}>
        <div className="flex justify-between items-center">
          <div className="w-full flex items-center">
            <img className="w-9 h-9 mx-3 rounded-[50%]" src={`/assets/profile/profile1.png`} alt="" />
            <span className="w-full flex justify-start text-sm font-semibold">
              {user}
              {<img className="w-5 ml-1" src={`/assets/${badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
            </span>
          </div>
          {!firstPage && <BookPageDropDown setPageUpdate={setPageUpdate} handleDelete={handleDelete} />}
        </div>
      </div>
      <hr className="bg-[#9E9E9E]" />
    </>
  );
};

export default UserInfo;
