import Link from "next/link";

export default function Users({ users }) {
    return (
        <div className={"min-h-screen p-8 bg-gray-100"}>
            <div className="max-w-7xl mx-auto">
                <Header title={"Daftar Pengguna"} description={"Menampilkan seluruh pengguna yang telah terdaftar pada sistem."} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Header = ({title, description}) => {
    return (
        <div className={"mb-12 bg-blue-200 border-2 border-black p-6 rounded-lg"}>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

const UserCard = ({ user }) => {
    return (
        <div className={"rounded-lg bg-amber-100 border-2 border-black transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"}>
            <article className="p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white border-2 border-black flex items-center justify-center text-xl text-black font-bold">
                            {user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl text-black font-bold">{user.name}</h2>
                            <p className="text-black text-base">@{user.username}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="flex items-center gap-2 text-black">
                        <span className="font-bold">Email:</span>
                        {user.email}
                    </p>
                    <p className="flex items-center gap-2 text-black">
                        <span className="font-bold">Phone:</span>
                        {user.phone}
                    </p>
                    <p className="flex items-center gap-2 text-black">
                        <span className="font-bold">Company:</span>
                        {user.company.name}
                    </p>
                    <p className="flex items-center gap-2 text-black">
                        <span className="font-bold">City:</span>
                        {user.address.city}
                    </p>
                </div>
                <div className="mt-6">
                    <Link href={`/users/${user.id}`} className="block py-2 bg-white border-2 border-black rounded-lg text-center hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:bg-gray-200 text-black font-bold">Lihat Detail</Link>
                </div>
            </article>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    return {
        props: {
            users
        },
    }
}