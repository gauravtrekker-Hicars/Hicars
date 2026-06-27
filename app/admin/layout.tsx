import AdminGate from '../../src/components/AdminGate';

export default function Layout({ children }: { children: React.ReactNode; }) {
  return <AdminGate title="Admin Panel">{children}</AdminGate>;
}