interface FormSectionTitleProps {
  title: string
  subtitle?: string
}

export default function FormSectionTitle({ title, subtitle }: FormSectionTitleProps) {
  return (
    <div className="mb-2">
      <span className="text-lg font-bold">{title}</span>
      {subtitle && <div className="text-sm font-normal text-base-content/70 mt-1">{subtitle}</div>}
    </div>
  )
}
