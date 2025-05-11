import cn from '../../utils/cn';

export default function Button({ children, className }) {
  return (
    <button className={cn("flex", "items-center", className)}>
      {children}
    </button>
  );
}