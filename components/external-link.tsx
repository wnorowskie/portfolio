import { AnchorHTMLAttributes } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}
