import Image from "next/image";
import * as queries from "@/queries";
import { auth } from "@/auth";
import profileDefaultImage from "@/assets/images/profile.png";
import ProfilePropertiesList from "@/components/ProfilePropertiesList";

const ProfilePage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unahthorized access. You must be signed in", { status: 401 });
  }

  const properties = await queries.getPropertiesByUserId(session.user.id);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={session.user.image ? session.user.image : profileDefaultImage}
                  alt="User"
                  width={0}
                  height={0}
                  sizes="100%"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {session.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {session.user.email}
              </h2>
            </div>
            {/* Listings */}
            <ProfilePropertiesList properties={properties} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
