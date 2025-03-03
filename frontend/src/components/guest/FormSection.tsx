interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}