export default function BtnSubmit({
  children,
  onClick,
  className,
  type,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`
                flex w-full py-3 items-center justify-center gap-1 rounded-md bg-linear-to-br from-cyan-400 to-blue-600 cursor-pointer 
                hover:from-[#68d6f7] hover:to-[#3b6aee] active:from-[#0a89c0] active:to-[#072bc1] 
                md:w-1/4
                ${className}`}
      >
        {children}
      </button>
    </>
  );
}
