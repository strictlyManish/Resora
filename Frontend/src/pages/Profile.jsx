import { useSelector } from "react-redux";

function Profile() {
  const { user, loading } = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div className="min-h-screen bg-[#120e12]">
      
    </div>
  );
}

export default Profile;
