"use client";

import AdminGate from '../../src/components/AdminGate';
import AdminBlog from '../../src/components/AdminBlog';

export default function Page() {
  return (
    <AdminGate title="Blog Admin">
      <AdminBlog />
    </AdminGate>
  );
}