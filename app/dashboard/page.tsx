import { AuthWrapper } from "@/components/auth-wrapper";
import { someProtectedAction } from "@/actions/auth-actions";
import PageTitle from "@/components/page-title";

export default async function DashboardPage() {
  const result = await someProtectedAction();

  if (!result.success) {
    return (
      <AuthWrapper authError={true}>
        <div>Loading...</div>
      </AuthWrapper>
    );
  }

  return (
    <div>
      <PageTitle title="لوحة التحكم" />
      {/* Your dashboard content */}
    </div>
  );
}
