import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {session.user.name || session.user.email}!
          </h1>
          <p className="text-gray-600">
            You are now signed in to your Letters account.
          </p>
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-500">
              <strong>Email:</strong> {session.user.email}
            </p>
            <p className="text-sm text-gray-500">
              <strong>User ID:</strong> {session.user.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
