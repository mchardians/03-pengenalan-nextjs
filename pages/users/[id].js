import Link from "next/link";
import {useRouter} from "next/router";

const UserDetail = ({user}) => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/users"
                    className="inline-block mb-8 px-6 py-3 bg-white border-2 border-black rounded-lg transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2  hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] text-black font-bold"
                >
                    Kembali
                </Link>

                <div className="space-y-8">
                    <div className="bg-blue-100 border-2 border-black rounded-lg p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 rounded-lg bg-white border-2 border-black flex items-center justify-center text-3xl text-black font-bold">
                                {user.name.substring(0,2).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl text-black font-bold mb-2">{user.name}</h1>
                                <p className="text-xl text-black mb-3">@{user.username}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-black rounded-lg p-8">
                        <h2 className="text-2xl text-black font-bold mb-6">Informasi Kontak</h2>
                        <div className="space-y-4">
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Email:</span>
                                {user.email}
                            </p>
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Phone:</span>
                                {user.phone}
                            </p>
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Website:</span>
                                {user.website}
                            </p>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="bg-yellow-100 border-2 border-black rounded-lg p-8">
                        <h2 className="text-2xl text-black font-bold mb-6">Informasi Perusahaan</h2>
                        <div className="space-y-4">
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Nama:</span>
                                {user.company.name}
                            </p>
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Slogan:</span>
                                {user.company.catchPhrase}
                            </p>
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Slogan Bisnis:</span>
                                {user.company.bs}
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-100 border-2 border-black rounded-lg p-8">
                        <h2 className="text-2xl text-black font-bold mb-6">Alamat</h2>
                        <div className="space-y-4">
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Jalan:</span>
                                {user.address.street}
                            </p>
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Kediaman:</span>
                                {user.address.suite}
                            </p>
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Kota:</span>
                                {user.address.city}
                            </p>
                            <p className="flex items-center gap-2 text-black">
                                <span className="font-bold min-w-[100px]">Kode Pos:</span>
                                {user.address.zipcode}
                            </p>
                            <div className="mt-4 p-4 bg-white border-2 border-black rounded-lg">
                                <p className="text-black font-bold mb-2">Geografis:</p>
                                <p className="text-black">Latitude: {user.address.geo.lat}</p>
                                <p className="text-black">Longitude: {user.address.geo.lng}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const paths = users.map((user) => ({
        params: { id: user.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}){
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params?.id}`);
        const user = await res.json();

        if(!user.id) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                user
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default UserDetail;