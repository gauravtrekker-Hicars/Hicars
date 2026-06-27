import { Suspense } from 'react';
import SearchResults from '../../src/screens/SearchResults';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-amber-50 pt-24" />}>
      <SearchResults />
    </Suspense>
  );
}
