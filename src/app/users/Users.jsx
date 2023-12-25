import Link from 'next/link'

export default async function Users() {
	const users = await fetch('http://localhost:3000/api/users', {
		method: 'GET',
		cache: 'no-store'
	}).then((res) => res.json())
	return (
		<>
			<div>Users (Total: {users.length})</div>
			<div className="flex flex-col gap-4">
				{users.map((user) => (
					<Link
						key={user.id}
						href={`/users/${user.email}`}
						className="flex items-center gap-3"
					>
						<div>{user.username}</div>
						<div>•</div>
						<div>{user.email}</div>
						<div>•</div>
						<div>{user.id}</div>
					</Link>
				))}
			</div>
		</>
	)
}
