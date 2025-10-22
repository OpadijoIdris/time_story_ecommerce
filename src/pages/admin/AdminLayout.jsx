import AdminDashboard from "../Admin.jsx";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminDashboard />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;