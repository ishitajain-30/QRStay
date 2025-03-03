import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GuestList } from "@/components/guest-admin/GuestList";

export function GuestAdminDashboard() {
  return (
    <div className="w-screen">
      <DashboardLayout title="Guest Management">
        <div className="max-w-7xl mx-auto">
          <GuestList />
        </div>
      </DashboardLayout>
    </div>
  );
}
