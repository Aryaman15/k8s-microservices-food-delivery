// src/components/ui/empty.tsx
export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg">
      {children}
    </div>
  );
}

Empty.Header = function EmptyHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mb-4">{children}</div>;
};

Empty.Title = function EmptyTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
};

Empty.Description = function EmptyDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-gray-500">{children}</p>;
};

Empty.Footer = function EmptyFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-6">{children}</div>;
};
