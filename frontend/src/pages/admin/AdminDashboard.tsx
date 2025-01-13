import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HotelList } from "@/components/admin/HotelList";

export function AdminDashboard() {
  return (
    <div className="w-screen">
      <DashboardLayout title="Hotel Management">
        <div className="max-w-7xl mx-auto">
          <HotelList />
        </div>
      </DashboardLayout>
    </div>
  );
}
