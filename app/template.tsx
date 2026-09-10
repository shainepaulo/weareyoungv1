/** Re-mounts on every navigation, which is exactly what an enter animation wants. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="page">
      {children}
    </main>
  );
}
