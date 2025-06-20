type Props = {
  className: string;
};

export const VideoclipeIcon = ({ className }: Props) => {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25zM0 2.75C0 1.784.784 1 1.75 1h12.5c.967 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25z"></path>
      <path d="m6 5 5.196 3L6 11z"></path>
    </svg>
  );
};
