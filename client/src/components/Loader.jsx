export default function Loader({ text = "Loading..." }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-lg font-semibold">{text}</div>
    </div>
  );
}
