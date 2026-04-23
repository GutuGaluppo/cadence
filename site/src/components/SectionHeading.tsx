type HeadingTag = "h1" | "h2";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleTag?: HeadingTag;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleTag = "h2",
  titleClassName,
}: SectionHeadingProps) {
  const TitleTag = titleTag;

  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <TitleTag className={titleClassName}>{title}</TitleTag>
      {description ? <p className="section-text">{description}</p> : null}
    </div>
  );
}
